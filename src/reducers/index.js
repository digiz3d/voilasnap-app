import { combineReducers, configureStore } from '@reduxjs/toolkit'

import auth from './auth'
import users from './users'
import snaps from './snaps'

const reducer = combineReducers({
  auth,
  users,
  snaps,
})

export default configureStore({ reducer })
