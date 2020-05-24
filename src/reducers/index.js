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

export default configureStore({ reducer })
