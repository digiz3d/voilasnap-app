import { createAsyncThunk, createReducer, createSelector } from '@reduxjs/toolkit'
import apiRequest from '../utils/api-request'

const initialState = {
  byId: {},
  error: null,
  isFriendsListError: null,
  isFriendsListLoading: true,
  friendsList: [],
  isMeError: null,
  isMeLoading: true,
  me: null,
  receivedList: [],
  sentList: [],
}

export const fetchMe = createAsyncThunk('users/get-me', async (_, { getState }) =>
  apiRequest(getState, { url: '/auth/me' }),
)

export const fetchFriends = createAsyncThunk('friends/get-friends', async (_, { getState }) => {
  const res = await apiRequest(getState, { url: '/friends' })
  console.log(res.friends)
  return res.friends
})

const usersReducer = createReducer(initialState, {
  [fetchMe.pending](state) {
    return { ...state, me: null, isMeError: false, isMeLoading: true }
  },
  [fetchMe.fulfilled](state, { payload }) {
    return {
      ...state,
      byId: { ...state.byId, [payload._id]: payload },
      me: payload._id,
      isMeError: false,
      isMeLoading: false,
    }
  },
  [fetchMe.rejected](state, { payload }) {
    return { ...state, me: null, isMeError: true, isMeLoading: false, error: payload }
  },
  [fetchFriends.pending](state) {
    return { ...state, isFriendsListError: false, isFriendsListLoading: true }
  },
  [fetchFriends.fulfilled](state, { payload }) {
    const newUsersById = {}

    payload.forEach((friend) => {
      newUsersById[friend._id] = friend
    })

    return {
      ...state,
      byId: { ...state.byId, ...newUsersById },
      isFriendsListError: false,
      isFriendsListLoading: false,
      friendsList: payload.map((friend) => friend._id),
    }
  },
  [fetchFriends.rejected](state, { payload }) {
    return { ...state, isFriendsListError: true, isFriendsListLoading: false, error: payload }
  },
})

export const selectMyId = (state) => state.users.me
export const selectUsersById = (state) => state.users.byId
export const selectMyFriendsIds = (state) => state.users.friendsList

export const selectMe = createSelector([selectMyId, selectUsersById], (myId, usersById) => {
  if (myId && usersById[myId]) return usersById[myId]
  else return null
})

export const selectMyFriends = createSelector(
  [selectMyFriendsIds, selectUsersById],
  (myFriendsIds, usersById) => myFriendsIds.map((id) => usersById[id]),
)

export default usersReducer
