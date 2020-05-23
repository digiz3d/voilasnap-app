import { createAction, createReducer } from '@reduxjs/toolkit'

import { setCurrentSnap } from './messages'

const initialState = {
  isSnapPreviewEnabled: false,
  isSnapRecipientsEnabled: false,
  isUserSearchMode: false,
}

export const setIsUserSearchMode = createAction('ui/searchmode')

const ui = createReducer(initialState, {
  [setCurrentSnap](state) {
    return {
      ...state,
      isSnapPreviewEnabled: true,
    }
  },
  [setIsUserSearchMode](state, { payload }) {
    return {
      ...state,
      isUserSearchMode: payload,
    }
  },
})

export const selectIsSnapPreviewEnabled = (state) => state.ui.isSnapPreviewEnabled
export const SelectIsSnapRecipientsEnabled = (state) => state.ui.isSnapRecipientsEnabled
export const selectIsUserSearchMode = (state) => state.ui.isUserSearchMode

export default ui
