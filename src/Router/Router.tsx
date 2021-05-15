import React from "react"

import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import { useAuth } from "../hooks/useAuth"
import CreateChallengeScreen from "../screens/CreateChallenge"
import DetailsScreen from "../screens/Details"
import ForgotPasswordScreen from "../screens/ForgotPassword"
import HomeScreen from "../screens/Home"
import LoginScreen from "../screens/Login"
import MyChallengesScreen from "../screens/MyChallenges"
import ProfileScreen from "../screens/Profile"
import ProfileSettingsScreen from "../screens/ProfileSettings"
import RegisterScreen from "../screens/Register"
import { RouteID } from "./Routes"

const { Navigator, Screen } = createStackNavigator()

export default function Router() {
  const { user } = useAuth()
  const isLoggedIn = !!user

  return (
    <NavigationContainer>
      <Navigator headerMode="none">
        <Screen name={RouteID.HOME} component={HomeScreen} />
        <Screen name={RouteID.DETAILS} component={DetailsScreen} />

        {isLoggedIn ? (
          <>
            <Screen name={RouteID.PROFILE} component={ProfileScreen} />
            <Screen
              name={RouteID.PROFILE_SETTINGS}
              component={ProfileSettingsScreen}
            />
            <Screen
              name={RouteID.MY_CHALLENGES}
              component={MyChallengesScreen}
            />
            <Screen
              name={RouteID.CREATE_CHALLENGE}
              component={CreateChallengeScreen}
            />
          </>
        ) : (
          <>
            <Screen name={RouteID.LOGIN} component={LoginScreen} />
            <Screen name={RouteID.REGISTER} component={RegisterScreen} />
            <Screen
              name={RouteID.FORGOT_PASSWORD}
              component={ForgotPasswordScreen}
            />
          </>
        )}
      </Navigator>
    </NavigationContainer>
  )
}
