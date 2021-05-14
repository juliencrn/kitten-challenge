import React from "react"

import { createStackNavigator } from "@react-navigation/stack"

import ForgotPasswordScreen from "../screens/ForgotPassword"
import HomeScreen from "../screens/Home"
import LoginScreen from "../screens/Login"
import RegisterScreen from "../screens/Register"

const { Navigator, Screen } = createStackNavigator()

export default function LoggedOutStack() {
  return (
    <Navigator headerMode="none">
      <Screen name="Home" component={HomeScreen} />
      <Screen name="Login" component={LoginScreen} />
      <Screen name="Register" component={RegisterScreen} />
      <Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Navigator>
  )
}
