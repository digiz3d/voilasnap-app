import { createAction, createReducer } from '@reduxjs/toolkit'

const initialState = {
  isUserSearchMode: false,
}

export const setIsUserSearchMode = createAction('ui/searchmode')

const ui = createReducer(initialState, {
  [setIsUserSearchMode](state, { payload }) {
    return {
      ...state,
      isUserSearchMode: payload,
    }
  },
})

export const selectIsUserSearchMode = (state) => state.ui.isUserSearchMode

export default ui
