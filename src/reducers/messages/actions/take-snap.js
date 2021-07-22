import { createAsyncThunk } from '@reduxjs/toolkit'
import { Camera } from 'expo-camera'

const takeSnap = createAsyncThunk(
  'messages/take-snap',
  async ({ cameraRef, cameraSide }, { rejectWithValue }) => {
    if (cameraRef.current) {
      try {
        const snap = await cameraRef.current.takePictureAsync({
          quality: 1,
          skipProcessing: true,
        })
        return { snap, isFront: cameraSide === Camera.Constants.Type.front }
      } catch (e) {
        console.warn(e)
        return rejectWithValue(e)
      }
    }
    return rejectWithValue(null)
  },
)

export default takeSnap
