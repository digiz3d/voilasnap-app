import React from 'react'
import { createAppContainer } from 'react-navigation'
import { Provider } from 'react-redux'

import store from './src/store'
import MainSwitchNavigator from './src/navigation/MainSwitchNavigator'

const AppNavigationContainer = createAppContainer(MainSwitchNavigator)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigationContainer />
      </Provider>
    )
  }
}
