import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit'

import apiRequest from '../utils/api-request'

import { selectFirstFriend } from './users'

const initialState = {
  allIds: [],
  byId: {},
  isSending: false,
  sendingSnapData: '',
}

export const setCurrentSnapData = createAction('messages/set-sending-snap-data')

export const sendSnap = createAsyncThunk('messages/send-snap', (receiverId, { getState }) => {
  const state = getState()
  const firstFriend = selectFirstFriend(state)
  const image = selectSendingSnapData(state)

  return apiRequest(getState, {
    url: `/users/${firstFriend._id}/message`,
    method: 'POST',
    data: { image },
    timeout: 200000,
  })
})

const messagesReducer = createReducer(initialState, {
  [setCurrentSnapData](state, { payload }) {
    return { ...state, sendingSnapData: payload }
  },
  [sendSnap.pending](state) {
    return { ...state, isSending: true }
  },
  [sendSnap.fulfilled](state) {
    return { ...state, isSending: false, sendingSnapData: '' }
  },
  [sendSnap.rejected](state) {
    return { ...state, isSending: false, sendingSnapData: '' }
  },
})

export const selectSendingSnapData = (state) => state.messages.sendingSnapData

export default messagesReducer
