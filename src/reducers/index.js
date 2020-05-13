import { combineReducers } from '@reduxjs/toolkit'

import auth from './auth'
import snaps from './snaps'

export default combineReducers({
  auth,
  snaps,
})
