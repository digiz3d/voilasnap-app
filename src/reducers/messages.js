import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit'

import { uniqAdd } from '../utils/uniq'
import apiRequest from '../utils/api-request'

import { selectMyId } from './users'

const initialState = {
  allIds: [],
  byId: {},
  currentSnap: null,
}

export const cancelSnap = createAction('messages/cancel-snap')
export const setCurrentSnap = createAction('messages/set-sending-snap-data')

export const sendSnap = createAsyncThunk(
  'messages/prepare-sending-snap',
  (receiverId, { dispatch, getState, requestId }) => {
    const state = getState()
    const preparedSnap = {
      _id: requestId,
      content: selectCurrentSnap(state).base64,
      kind: 'Snap',
      receiverId,
      senderId: selectMyId(state),
      sentAt: Date.now(),
    }
    dispatch(sendPreparedSnap(preparedSnap))
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
  [cancelSnap](state) {
    return {
      ...state,
      currentSnap: null,
    }
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
  [sendSnap.fulfilled](state, { payload }) {
    return {
      ...state,
      currentSnap: payload,
    }
  },
  [setCurrentSnap](state, { payload }) {
    return {
      ...state,
      currentSnap: payload,
    }
  },
})

export const selectCurrentSnap = (state) => state.messages.currentSnap

export default messagesReducer
