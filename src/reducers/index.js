import { combineReducers, configureStore } from '@reduxjs/toolkit'

import auth from './auth'
import ui from './ui'
import users from './users'
import snaps from './snaps'

const reducer = combineReducers({
  auth,
  ui,
  users,
  snaps,
})

export default configureStore({ reducer })
