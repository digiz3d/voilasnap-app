import store from '../store'

export default async ({ url, method = 'GET', data = null }) => {
  const state = store.getState()

  const fetchParams = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }

  if (state.auth.jwt) {
    fetchParams.headers.Authorization = `Bearer ${jwt}`
  }

  if (data) {
    fetchParams.body = JSON.stringify(data)
  }

  console.log(fetchParams)
  try {
    const data = await fetch(`http://192.168.0.1:3000${url}`, fetchParams)
      .then(async response => {
        if (response.status >= 200 && response.status < 300) {
          return response
        }
        throw await response.json()
      })
      .then(response => response.json())
    return data
  } catch (error) {
    throw error.details
  }
}
