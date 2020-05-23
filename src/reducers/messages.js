import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit'

import { uniqAdd } from '../utils/uniq'
import apiRequest from '../utils/api-request'

import { selectFirstFriend, selectMyId } from './users'

const initialState = {
  allIds: [],
  byId: {},
  currentSnap: null,
}

export const setCurrentSnap = createAction('messages/set-sending-snap-data')

export const prepareSnap = createAsyncThunk(
  'messages/prepare-sending-snap',
  (receiverId, { dispatch, getState, requestId }) => {
    const state = getState()
    const newSnap = {
      _id: requestId,
      content: selectCurrentSnap(state).base64,
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
  [setCurrentSnap](state, { payload }) {
    return { ...state, currentSnap: payload }
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
      currentSnap: null,
    }
  },
  [sendPreparedSnap.fulfilled](state, { meta: { arg: preparedSnap } }) {
    return {
      ...state,
      byId: {
        ...state.byId,
        [preparedSnap._id]: { ...state.byId[preparedSnap._id], isSending: false },
      },
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
    }
  },
})

export const selectCurrentSnap = (state) => state.messages.currentSnap

export default messagesReducer
