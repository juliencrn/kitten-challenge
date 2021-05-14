import React from "react"

import { useNavigation } from "@react-navigation/native"
import { Icon, TopNavigationAction } from "@ui-kitten/components"

function BackArrow() {
  const navigation = useNavigation()

  const navigateBack = () => navigation.goBack()

  return (
    <TopNavigationAction
      icon={props => <Icon {...props} name="arrow-back" />}
      onPress={navigateBack}
    />
  )
}

export default BackArrow
