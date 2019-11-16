import { createStackNavigator } from 'react-navigation-stack'

import Login from '../screens/Login'

export default createStackNavigator(
  {
    Login: { screen: Login },
  },
  { initialRouteName: 'Login', headerMode: 'none' },
)
