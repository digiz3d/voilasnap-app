import React from 'react'
import { Provider } from 'react-redux'

import store from './src/store'
import MainStackNavigator from './src/navigation/MainStackNavigator'

function App() {
  return (
    <Provider store={store}>
      <MainStackNavigator />
    </Provider>
  )
}

export default App
