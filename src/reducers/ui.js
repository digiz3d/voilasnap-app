import { createAction, createReducer } from '@reduxjs/toolkit'

const initialState = {
  isUserSearchMode: false,
  userSearchString: '',
}

export const setUserSearchString = createAction('ui/set-user-search-string')

const ui = createReducer(initialState, {
  [setUserSearchString](state, { payload }) {
    return {
      ...state,
      userSearchString: payload,
      isUserSearchMode: !!payload.length,
    }
  },
})

export const selectIsUserSearchMode = (state) => state.ui.isUserSearchMode
export const selectUserSearchString = (state) => state.ui.userSearchString

export default ui
