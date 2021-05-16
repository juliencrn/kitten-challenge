import React from "react"

import { useNavigation } from "@react-navigation/native"
import { TopNavigationAction } from "@ui-kitten/components"

import { RouteID } from "../Router/Routes"
import renderIcon from "./RenderIcon"

export function BackArrow() {
  const navigation = useNavigation()

  const navigateBack = () => navigation.goBack()

  return (
    <TopNavigationAction
      icon={renderIcon("arrow-back")}
      onPress={navigateBack}
    />
  )
}

export function SettingsLink() {
  const navigation = useNavigation()

  const goToSettings = () => navigation.navigate(RouteID.PROFILE_SETTINGS)

  return (
    <TopNavigationAction
      icon={renderIcon("settings-outline")}
      onPress={goToSettings}
    />
  )
}
