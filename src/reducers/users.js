import { createAsyncThunk, createReducer, createSelector } from '@reduxjs/toolkit'

import apiRequest from '../utils/api-request'

import { setIsUserSearchMode } from './ui'

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
  requestReceivedList: [],
  requestSentList: [],
  searchList: [],
}

export const fetchMe = createAsyncThunk('users/get-me', async (_, { getState }) =>
  apiRequest(getState, { url: '/auth/me' }),
)

export const fetchFriends = createAsyncThunk('friends/get-friends', async (_, { getState }) => {
  const { friends, received, sent } = await apiRequest(getState, { url: '/friends' })
  return { friends, received, sent }
})

export const searchUsers = createAsyncThunk('users/search', async (username, { getState }) => {
  if (username.length < 3) return []
  const { users } = await apiRequest(getState, {
    url: '/users/search',
    method: 'POST',
    data: { username },
  })
  return users
})

export const addFriend = createAsyncThunk('friends/ask', async (id, { getState }) => {
  await apiRequest(getState, { url: `/friends/${id}`, method: 'POST' })
  return id
})

export const removeFriend = createAsyncThunk('friends/remove', async (id, { getState }) => {
  await apiRequest(getState, { url: `/friends/${id}`, method: 'DELETE' })
  return id
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
  [fetchMe.rejected](state, { error }) {
    return { ...state, me: null, isErrorMe: true, isLoadingMe: false, error }
  },
  [fetchFriends.pending](state) {
    return { ...state, isErrorFriendsList: false, isLoadingFriendsList: true }
  },
  [fetchFriends.fulfilled](state, { payload: { friends, received, sent } }) {
    const newUsersById = {}

    const users = [...friends, ...received, ...sent]

    users.forEach((friend) => {
      newUsersById[friend._id] = friend
    })

    return {
      ...state,
      byId: { ...state.byId, ...newUsersById },
      isErrorFriendsList: false,
      isLoadingFriendsList: false,
      friendsList: friends.map((friend) => friend._id),
      requestReceivedList: received.map((friend) => friend._id),
      requestSentList: sent.map((friend) => friend._id),
    }
  },
  [fetchFriends.rejected](state, { error }) {
    return { ...state, isErrorFriendsList: true, isLoadingFriendsList: false, error }
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
      byId: { ...newUsersById, ...state.byId },
      isErrorSearch: false,
      isLoadingSearch: false,
      searchList: payload.map((user) => user._id),
    }
  },
  [searchUsers.rejected](state, { error }) {
    return { ...state, isErrorSearch: true, isLoadingSearch: false, error }
  },
  [setIsUserSearchMode](state) {
    return { ...state, searchList: [] }
  },
  [addFriend.fulfilled](state, { payload }) {
    const isReceived = state.requestReceivedList.includes(payload)
    const isFriend = state.friendsList.includes(payload)

    const newState = {}

    if (isReceived) {
      newState.requestReceivedList = state.requestReceivedList.filter((id) => id !== payload)
      newState.friendsList = [...new Set([...state.friendsList, payload])]
    } else if (!isFriend) {
      newState.requestSentList = [...new Set([...state.requestSentList, payload])]
    }

    return { ...state, ...newState }
  },
  [removeFriend.fulfilled](state, { payload }) {
    return {
      ...state,
      friendsList: state.friendsList.filter((id) => id !== payload),
      requestReceivedList: state.requestReceivedList.filter((id) => id !== payload),
      requestSentList: state.requestSentList.filter((id) => id !== payload),
    }
  },
})

export const selectMyFriendsIds = (state) => state.users.friendsList
export const selectMyId = (state) => state.users.me
export const selectRequestReceivedIds = (state) => state.users.requestReceivedList
export const selectRequestSentIds = (state) => state.users.requestSentList
export const selectSearchUserIds = (state) => state.users.searchList
export const selectUsersById = (state) => state.users.byId

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
