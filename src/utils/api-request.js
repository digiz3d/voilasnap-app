import axios from 'axios'

import { version } from '../../package.json'

const axiosConf = axios.create({
  baseURL: 'http://localhost:3000',
  // baseURL: 'https://voilasnap.cf',
  timeout: 5000,
})

const apiRequest = async (getState, { data = null, method = 'GET', url }) => {
  const state = getState()

  const headers = {}

  if (state.auth.jwt) {
    headers.Authorization = `Bearer ${state.auth.jwt}`
  }

  headers['Client-Version'] = version

  const { data: responseData } = await axiosConf({ data, headers, method, url })
  return responseData
}

export default apiRequest
