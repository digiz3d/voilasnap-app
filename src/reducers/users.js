import { createAsyncThunk, createReducer, createSelector } from '@reduxjs/toolkit'

import apiRequest from '../utils/api-request'
import { uniqAdd } from '../utils/uniq'

import { setIsUserSearchMode } from './ui'

const initialState = {
  allIds: [],
  byId: {},
  error: null,
  isErrorFriendsList: false,
  isErrorMe: false,
  isErrorSearch: false,
  isLoadingFriendsList: true,
  isLoadingMe: true,
  isLoadingSearch: false,
  me: null,
  searchList: [],
}

export const fetchMe = createAsyncThunk('users/get-me', async (_, { getState }) =>
  apiRequest(getState, { url: '/auth/me' }),
)

export const fetchFriends = createAsyncThunk('users/get-friends', async (_, { getState }) =>
  apiRequest(getState, { url: '/friends' }),
)

export const searchUsers = createAsyncThunk('users/search', async (username, { getState }) => {
  if (username.length < 3) return { users: [] }
  return apiRequest(getState, {
    url: '/users/search',
    method: 'POST',
    data: { username },
  })
})

export const addFriend = createAsyncThunk('users/add-friend', async (id, { getState }) => {
  await apiRequest(getState, { url: `/friends/${id}`, method: 'POST' })
  return id
})

export const removeFriend = createAsyncThunk('users/remove-friend', async (id, { getState }) => {
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
      allIds: uniqAdd(state.allIds, payload._id),
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
  [fetchFriends.fulfilled](state, { payload: { users } }) {
    const newUsersById = {}

    users.forEach((friend) => {
      newUsersById[friend._id] = friend
    })

    return {
      ...state,
      allIds: uniqAdd(
        state.allIds,
        users.map(({ _id }) => _id),
      ),
      byId: { ...state.byId, ...newUsersById },
      isErrorFriendsList: false,
      isLoadingFriendsList: false,
    }
  },
  [fetchFriends.rejected](state, { error }) {
    return { ...state, isErrorFriendsList: true, isLoadingFriendsList: false, error }
  },
  [searchUsers.pending](state) {
    return { ...state, isErrorSearch: false, isLoadingSearch: true }
  },
  [searchUsers.fulfilled](state, { payload: { users } }) {
    const newUsersById = {}
    users.forEach((user) => {
      newUsersById[user._id] = user
    })
    return {
      ...state,
      allIds: uniqAdd(
        state.allIds,
        users.map((user) => user._id),
      ),
      byId: { ...state.byId, ...newUsersById },
      isErrorSearch: false,
      isLoadingSearch: false,
      searchList: users.map((user) => user._id),
    }
  },
  [searchUsers.rejected](state, { error }) {
    return { ...state, isErrorSearch: true, isLoadingSearch: false, error }
  },
  [setIsUserSearchMode](state) {
    return { ...state, searchList: [] }
  },
  [addFriend.fulfilled](state, { payload }) {
    const { isFriend, isReceived, isSent } = state.byId[payload]
    const newAttr = {}

    if (!isFriend) {
      if (isReceived) {
        newAttr.isReceived = false
        newAttr.isFriend = true
      } else if (!isSent) newAttr.isSent = true
    }

    return { ...state, byId: { ...state.byId, [payload]: { ...state.byId[payload], ...newAttr } } }
  },
  [removeFriend.fulfilled](state, { payload }) {
    return {
      ...state,
      byId: {
        ...state.byId,
        [payload]: {
          ...state.byId[payload],
          isFriend: false,
          isReceived: false,
          isSent: false,
        },
      },
    }
  },
})

export const selectUserIds = (state) => state.users.allIds
export const selectUsersById = (state) => state.users.byId
export const selectMyId = (state) => state.users.me
export const selectSearchUserIds = (state) => state.users.searchList

export const selectUsers = createSelector([selectUserIds, selectUsersById], (userIds, usersById) =>
  userIds.map((id) => usersById[id]),
)
export const selectMyFriends = createSelector([selectUsers], (users) =>
  users.filter(({ isFriend }) => isFriend),
)

export const selectFirstFriend = createSelector([selectMyFriends], (friends) => friends[0])

export const selectMe = createSelector([selectMyId, selectUsersById], (myId, usersById) => {
  if (myId && usersById[myId]) return usersById[myId]
  else return null
})

export const selectSearchedUsers = createSelector(
  [selectSearchUserIds, selectUsersById],
  (searchedIds, usersById) => searchedIds.map((id) => usersById[id]),
)

export default usersReducer
