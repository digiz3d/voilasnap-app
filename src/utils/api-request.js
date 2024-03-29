import axios from 'axios'

import { version } from '../../package.json'

const axiosConf = axios.create({
  // baseURL: 'http://localhost:3000',
  baseURL: 'https://api.julien.computer',
  timeout: 5000,
})

const apiRequest = async (getState, { data = null, method = 'GET', timeout = null, url }) => {
  const state = getState()

  const headers = {}

  if (state.auth.jwt) {
    headers.Authorization = `Bearer ${state.auth.jwt}`
  }

  headers['Client-Version'] = version
  const queryConf = { headers, method, url }
  if (data) queryConf.data = data
  if (timeout) queryConf.timeout = timeout
  const { data: responseData } = await axiosConf(queryConf)
  return responseData
}

export default apiRequest
