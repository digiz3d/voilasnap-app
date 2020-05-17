import axios from 'axios'

import { version } from '../../package.json'

const apiRequest = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://voilasnap.cf',
  timeout: 5000,
})

export default async (getState, { data = null, method = 'GET', url }) => {
  const state = getState()

  const headers = {}

  if (state.auth.jwt) {
    headers.Authorization = `Bearer ${state.auth.jwt}`
  }

  headers['Client-Version'] = version

  const { data: responseData } = await apiRequest({ data, headers, method, url })
  return responseData
}
