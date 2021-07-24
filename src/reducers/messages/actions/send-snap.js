import { createAsyncThunk } from '@reduxjs/toolkit'

import { selectCurrentSnapRecipient } from '..'
import { selectMyId } from '../../users'

import sendPreparedSnap from './send-snap-2'

const sendSnap = createAsyncThunk(
  'messages/send-snap',
  (receiverId, { dispatch, getState, requestId }) => {
    const state = getState()
    const preparedSnap = {
      _id: requestId,
      content: selectCurrentSnapRecipient(state),
      kind: 'Snap',
      receiverId: selectCurrentSnapRecipient(state),
      senderId: selectMyId(state),
      sentAt: Date.now(),
    }
    dispatch(sendPreparedSnap(preparedSnap))
  },
)

export default sendSnap
