import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit'

import { uniqAdd } from '../utils/uniq'
import apiRequest from '../utils/api-request'

import { selectFirstFriend, selectMyId } from './users'

const initialState = {
  allIds: [],
  byId: {},
  isSending: false,
  sendingSnapData: '',
}

export const setCurrentSnapData = createAction('messages/set-sending-snap-data')

export const prepareSnap = createAsyncThunk(
  'messages/prepare-sending-snap',
  (receiverId, { dispatch, getState, requestId }) => {
    const state = getState()
    const newSnap = {
      _id: requestId,
      content: selectSendingSnapData(state),
      kind: 'Snap',
      receiverId: selectFirstFriend(state)._id,
      senderId: selectMyId(state),
      sentAt: Date.now(),
    }
    dispatch(sendPreparedSnap(newSnap))
  },
)

export const sendPreparedSnap = createAsyncThunk('messages/send-snap', (snap, { getState }) =>
  apiRequest(getState, {
    url: `/users/${snap.receiverId}/message`,
    method: 'POST',
    data: { image: snap.content },
    timeout: 200000,
  }),
)

const messagesReducer = createReducer(initialState, {
  [setCurrentSnapData](state, { payload }) {
    return { ...state, sendingSnapData: payload }
  },
  [sendPreparedSnap.pending](state, { meta: { arg: preparedSnap } }) {
    return {
      ...state,
      allIds: uniqAdd(state.allIds, preparedSnap._id),
      byId: {
        ...state.byId,
        [preparedSnap._id]: {
          ...preparedSnap,
          isSending: true,
        },
      },
      isSending: true,
      sendingSnapData: '',
    }
  },
  [sendPreparedSnap.fulfilled](state, { meta: { arg: preparedSnap } }) {
    return {
      ...state,
      byId: {
        ...state.byId,
        [preparedSnap._id]: { ...state.byId[preparedSnap._id], isSending: false },
      },
      isSending: false,
      sendingSnapData: '',
    }
  },
  [sendPreparedSnap.rejected](state, { error, meta: { arg: preparedSnap } }) {
    return {
      ...state,
      byId: {
        ...state.byId,
        [preparedSnap._id]: {
          ...state.byId[preparedSnap._id],
          isSending: false,
          isSendingError: true,
          error,
        },
      },
      isSending: false,
      sendingSnapData: '',
    }
  },
})

export const selectSendingSnapData = (state) => state.messages.sendingSnapData

export default messagesReducer
