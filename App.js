import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginScreen from "./Screens/LoginScreen";
// import { MapView, Permissions, Location } from "expo";

export default class App extends React.Component {

  render() {
    return (
      <AppContainer/>
    );
  }
}

const AppStackNavigator = createStackNavigator({
  LoginScreen: {screen:LoginScreen}
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
