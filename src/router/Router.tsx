import React from "react"

import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import { useAuth } from "../hooks/useAuth"
import CreateChallengeScreen from "../screens/private/CreateChallenge"
import MyChallengesScreen from "../screens/private/MyChallenges"
import ProfileScreen from "../screens/private/Profile"
import ProfileSettingsScreen from "../screens/private/ProfileSettings"
import ForgotPasswordScreen from "../screens/public/ForgotPassword"
import HomeScreen from "../screens/public/Home"
import LoginScreen from "../screens/public/Login"
import RegisterScreen from "../screens/public/Register"
import { Routes } from "./routes"

const { Navigator, Screen } = createStackNavigator()

const PrivateRouter = () => (
  <Navigator headerMode="none">
    <Screen name={Routes.PROFILE} component={ProfileScreen} />
    <Screen name={Routes.PROFILE_SETTINGS} component={ProfileSettingsScreen} />
    <Screen name={Routes.MY_CHALLENGES} component={MyChallengesScreen} />
    <Screen name={Routes.CREATE_CHALLENGE} component={CreateChallengeScreen} />
  </Navigator>
)

const PublicRouter = () => (
  <Navigator headerMode="none">
    <Screen name={Routes.HOME} component={HomeScreen} />
    <Screen name={Routes.LOGIN} component={LoginScreen} />
    <Screen name={Routes.REGISTER} component={RegisterScreen} />
    <Screen name={Routes.FORGOT_PASSWORD} component={ForgotPasswordScreen} />
  </Navigator>
)

export default function Router() {
  const { user } = useAuth()
  const isLoggedIn = !!user

  return (
    <NavigationContainer>
      {isLoggedIn ? <PrivateRouter /> : <PublicRouter />}
    </NavigationContainer>
  )
}
