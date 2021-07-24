import { combineReducers, configureStore } from '@reduxjs/toolkit'

import auth from './auth'
import messages from './messages'
import ui from './ui'
import users from './users'

const reducer = combineReducers({
  auth,
  messages,
  ui,
  users,
})

const logger = () => (next) => (action) => {
  console.log('action.type', action.type)
  return next(action)
}

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})
