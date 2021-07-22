import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit'

import { uniqAdd } from '../../utils/uniq'
import apiRequest from '../../utils/api-request'
import { selectMyId } from '../users'

import takeSnap from './actions/take-snap'

const initialState = {
  allIds: [],
  byId: {},
  currentSnap: null,
  currentSnapIsFront: false,
  currentSnapRecipient: null,
}

export const cancelSnap = createAction('messages/cancel-snap')
export const setCurrentSnapRecipient = createAction('messages/set-current-snap-recipient')

export const sendSnap = createAsyncThunk(
  'messages/send-snap',
  (receiverId, { dispatch, getState, requestId }) => {
    const state = getState()
    const preparedSnap = {
      _id: requestId,
      content: selectCurrentSnap(state).base64,
      kind: 'Snap',
      receiverId: selectCurrentSnapRecipient(state),
      senderId: selectMyId(state),
      sentAt: Date.now(),
    }
    dispatch(sendPreparedSnap(preparedSnap))
  },
)

export const sendPreparedSnap = createAsyncThunk(
  'messages/send-snap-step-2',
  (snap, { getState }) =>
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
  [takeSnap.fulfilled](state, { payload: { isFront, snap } }) {
    return {
      ...state,
      currentSnap: snap,
      currentSnapIsFront: isFront,
      currentSnapRecipient: null,
    }
  },
  [setCurrentSnapRecipient](state, { payload }) {
    return {
      ...state,
      currentSnapRecipient: state.currentSnapRecipient === payload ? null : payload,
    }
  },
})

export const selectCurrentSnap = (state) => state.messages.currentSnap
export const selectCurrentSnapIsFront = (state) => state.messages.currentSnapIsFront
export const selectCurrentSnapRecipient = (state) => state.messages.currentSnapRecipient

export default messagesReducer
