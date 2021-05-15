import React from "react"

import { useNavigation } from "@react-navigation/native"
import { Icon, TopNavigationAction } from "@ui-kitten/components"

export function BackArrow() {
  const navigation = useNavigation()

  const navigateBack = () => navigation.goBack()

  return (
    <TopNavigationAction
      icon={props => <Icon {...props} name="arrow-back" />}
      onPress={navigateBack}
    />
  )
}

export function SettingsLink() {
  const navigation = useNavigation()

  const navigateBack = () => navigation.navigate("ProfileSettings")

  return (
    <TopNavigationAction
      icon={props => <Icon {...props} name="settings-outline" />}
      onPress={navigateBack}
    />
  )
}
