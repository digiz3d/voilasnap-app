import { version } from '../../package.json'

export default async (getState, { url, method = 'GET', data = null }) => {
  const state = getState()

  const fetchParams = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }

  if (state.auth.jwt) {
    fetchParams.headers.Authorization = `Bearer ${state.auth.jwt}`
  }

  fetchParams.headers['Client-Version'] = version

  if (data) {
    fetchParams.body = JSON.stringify(data)
  }

  //return fetch(`https://voilasnap.cf${url}`, fetchParams)
  return fetch(`http://localhost:3000${url}`, fetchParams)
    .then(async (response) => {
      if (response.status >= 200 && response.status < 300) {
        return response
      }
      throw await response.json()
    })
    .then((response) => response.json())
}
