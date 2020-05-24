import { createAction, createReducer } from '@reduxjs/toolkit'

import { setCurrentSnap } from './messages'

const initialState = {
  isSelectingRecipient: false,
  isUserSearchMode: false,
  userSearchString: '',
}

export const setIsSelectingRecipient = createAction('ui/set-is-selecting-recipient')
export const setUserSearchString = createAction('ui/set-user-search-string')

const ui = createReducer(initialState, {
  [setIsSelectingRecipient](state, { payload }) {
    return {
      ...state,
      isSelectingRecipient: payload,
    }
  },
  [setCurrentSnap](state) {
    return {
      ...state,
      isSelectingRecipient: false,
    }
  },
  [setUserSearchString](state, { payload }) {
    return {
      ...state,
      userSearchString: payload,
      isUserSearchMode: !!payload.length,
    }
  },
})

export const selectIsSelectingRecipient = (state) => state.ui.isSelectingRecipient
export const selectIsUserSearchMode = (state) => state.ui.isUserSearchMode
export const selectUserSearchString = (state) => state.ui.userSearchString

export default ui
