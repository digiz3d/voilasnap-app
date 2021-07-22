import AsyncStorage from '@react-native-async-storage/async-storage'
import { createAsyncThunk } from '@reduxjs/toolkit'

const logout = createAsyncThunk('auth/logout', async () => AsyncStorage.removeItem('jwt'))

export default logout
