import AsyncStorage from '@react-native-async-storage/async-storage'
import { createAsyncThunk } from '@reduxjs/toolkit'

import apiRequest from '../../../utils/api-request'

const login = createAsyncThunk('auth/login', async ({ login, password }, { getState }) => {
  const { token } = await apiRequest(getState, {
    url: '/auth/signin',
    method: 'POST',
    data: { username: login, password },
  })
  await AsyncStorage.setItem('jwt', token)
  return token
})

export default login
