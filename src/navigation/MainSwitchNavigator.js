import { createSwitchNavigator } from 'react-navigation'

import AuthLoading from '../screens/AuthLoading'
import AuthStackNavigator from './AuthStackNavigator'

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    AuthStack: AuthStackNavigator,
  },
  { initialRouteName: 'AuthLoading' },
)
