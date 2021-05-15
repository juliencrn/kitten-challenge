import React from "react"

import { createStackNavigator } from "@react-navigation/stack"

import CreateChallengeScreen from "../screens/CreateChallenge"
import DetailsScreen from "../screens/Details"
import HomeScreen from "../screens/Home"
import MyChallengesScreen from "../screens/MyChallenges"
import ProfileScreen from "../screens/Profile"
import ProfileSettingsScreen from "../screens/ProfileSettings"

const { Navigator, Screen } = createStackNavigator()

export default function LoggedInStack() {
  return (
    <Navigator headerMode="none">
      <Screen name="Home" component={HomeScreen} />
      <Screen name="Details" component={DetailsScreen} />
      <Screen name="Profile" component={ProfileScreen} />
      <Screen name="ProfileSettings" component={ProfileSettingsScreen} />
      <Screen name="MyChallenges" component={MyChallengesScreen} />
      <Screen name="CreateChallenge" component={CreateChallengeScreen} />
    </Navigator>
  )
}
