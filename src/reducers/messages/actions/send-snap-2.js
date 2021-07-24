import { createAsyncThunk } from '@reduxjs/toolkit'

import apiRequest from '../../../utils/api-request'

const sendPreparedSnap = createAsyncThunk('messages/send-snap-step-2', (snap, { getState }) => {
  console.log('snap', snap)

  apiRequest(getState, {
    url: `/users/${snap.receiverId}/message`,
    method: 'POST',
    data: { image: snap.content },
    timeout: 200000,
  })
})

export default sendPreparedSnap
