import { createAsyncThunk, createReducer, createSelector } from '@reduxjs/toolkit'
import apiRequest from '../utils/api-request'

const initialState = {
  byId: {},
  error: null,
  friendsList: [],
  isErrorFriendsList: false,
  isErrorMe: false,
  isErrorSearch: false,
  isLoadingFriendsList: true,
  isLoadingMe: true,
  isLoadingSearch: false,
  me: null,
  receivedList: [],
  searchList: [],
  sentList: [],
}

export const fetchMe = createAsyncThunk('users/get-me', async (_, { getState }) =>
  apiRequest(getState, { url: '/auth/me' }),
)

export const fetchFriends = createAsyncThunk('friends/get-friends', async (_, { getState }) => {
  const res = await apiRequest(getState, { url: '/friends' })
  return res.friends
})

export const searchUsers = createAsyncThunk('users/search', async (username, { getState }) => {
  if (username.length < 3) return []
  console.log('making request')
  const res = await apiRequest(getState, {
    url: '/users/search',
    method: 'POST',
    data: { username },
  })
  console.log('request done', res)
  return res.payload
})

const usersReducer = createReducer(initialState, {
  [fetchMe.pending](state) {
    return { ...state, me: null, isErrorMe: false, isLoadingMe: true }
  },
  [fetchMe.fulfilled](state, { payload }) {
    return {
      ...state,
      byId: { ...state.byId, [payload._id]: payload },
      me: payload._id,
      isErrorMe: false,
      isLoadingMe: false,
    }
  },
  [fetchMe.rejected](state, { payload }) {
    return { ...state, me: null, isErrorMe: true, isLoadingMe: false, error: payload }
  },
  [fetchFriends.pending](state) {
    return { ...state, isErrorFriendsList: false, isLoadingFriendsList: true }
  },
  [fetchFriends.fulfilled](state, { payload }) {
    const newUsersById = {}

    payload.forEach((friend) => {
      newUsersById[friend._id] = friend
    })

    return {
      ...state,
      byId: { ...state.byId, ...newUsersById },
      isErrorFriendsList: false,
      isLoadingFriendsList: false,
      friendsList: payload.map((friend) => friend._id),
    }
  },
  [fetchFriends.rejected](state, { payload }) {
    return { ...state, isErrorFriendsList: true, isLoadingFriendsList: false, error: payload }
  },
  [searchUsers.pending](state) {
    return { ...state, isErrorSearch: false, isLoadingSearch: true }
  },
  [searchUsers.fulfilled](state, { payload }) {
    const newUsersById = {}
    payload.forEach((user) => {
      newUsersById[user._id] = user
    })
    return {
      ...state,
      byId: { ...state.byId, ...newUsersById },
      isErrorSearch: false,
      isLoadingSearch: false,
      searchList: payload.map((user) => user._id),
    }
  },
  [searchUsers.rejected](state, { payload }) {
    return { ...state, isErrorSearch: true, isLoadingSearch: false, error: payload }
  },
})

export const selectMyId = (state) => state.users.me
export const selectUsersById = (state) => state.users.byId
export const selectMyFriendsIds = (state) => state.users.friendsList
export const selectSearchUserIds = (state) => state.users.searchList

export const selectMe = createSelector([selectMyId, selectUsersById], (myId, usersById) => {
  if (myId && usersById[myId]) return usersById[myId]
  else return null
})

export const selectMyFriends = createSelector(
  [selectMyFriendsIds, selectUsersById],
  (myFriendsIds, usersById) => myFriendsIds.map((id) => usersById[id]),
)

export const selectSearchedUsers = createSelector(
  [selectSearchUserIds, selectUsersById],
  (searchedIds, usersById) => searchedIds.map((id) => usersById[id]),
)

export default usersReducer
