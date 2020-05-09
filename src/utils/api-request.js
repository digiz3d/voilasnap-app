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

  if (data) {
    fetchParams.body = JSON.stringify(data)
  }

  console.log(fetchParams)
  try {
    const response = await fetch(`http://cybr.ovh:51149${url}`, fetchParams)
      .then(async (response) => {
        if (response.status >= 200 && response.status < 300) {
          return response
        }
        throw await response.json()
      })
      .then((response) => response.json())
    return data
  } catch (error) {
    throw error.details
  }
}