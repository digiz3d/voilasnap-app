import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import * as SplashScreen from 'expo-splash-screen'

import store from './src/reducers'
import MainStackNavigator from './src/navigation/MainStackNavigator'
import AuthLoading from './src/screens/AuthLoading'

function App() {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    SplashScreen.preventAutoHideAsync()
    if (isReady) SplashScreen.hideAsync()
  }, [isReady])

  return (
    <Provider store={store}>
      {isReady ? <MainStackNavigator /> : <AuthLoading setIsReady={setIsReady} />}
    </Provider>
  )
}

export default App
