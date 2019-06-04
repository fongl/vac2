import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginScreen from "./Screens/LoginScreen";
import ConfirmationScreen from "./Screens/ConfirmationScreen";
import MapScreen from "./Screens/MapScreen";
// import ConfirmationScreen from "./Screens/ConfirmationScreen";
// import { MapView, Permissions, Location } from "expo";

export default class App extends React.Component {

  render() {
    return (
      <AppContainer/>
    );
  }
}

const AppStackNavigator = createStackNavigator({
  LoginScreen: {screen:LoginScreen},
  ConfirmationScreen: {screen:ConfirmationScreen},
  MapScreen:{screen:MapScreen}
  
})

const AppContainer = createAppContainer(AppStackNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems:'center',
    justifyContent:'center',
  }
});
