import React from "react";
import { createAppContainer } from "react-navigation";
import MainSwitchNavigator from "./navigation/MainSwitchNavigator";

const AppNavigationContainer = createAppContainer(MainSwitchNavigator);

export default class App extends React.Component {
  render() {
    return <AppNavigationContainer />;
  }
}
