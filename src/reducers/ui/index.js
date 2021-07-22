import { createAction, createReducer } from '@reduxjs/toolkit'

import takeSnap from '../messages/actions/take-snap'

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
  [takeSnap.fulfilled](state) {
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

export default ui
