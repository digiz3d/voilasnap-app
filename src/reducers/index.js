import { combineReducers, configureStore } from '@reduxjs/toolkit'

import auth from './auth'
import snaps from './snaps'

const reducer = combineReducers({
  auth,
  snaps,
})

export default configureStore({ reducer })
