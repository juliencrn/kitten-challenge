import React from "react"

import { Button, Text } from "@ui-kitten/components"
import { View } from "react-native"

import PageLayout from "../components/PageLayout"
import { useThemeSwitch } from "../hooks/useThemeSwitch"

const DetailsScreen = () => {
  const { themeName, toggleTheme } = useThemeSwitch()

  return (
    <PageLayout pageTitle="Details">
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text category="h1" style={{ marginVertical: 8 }}>
          DETAILS
        </Text>
        <Button onPress={toggleTheme}>{`SWITCH TO ${themeName} THEME`}</Button>
      </View>
    </PageLayout>
  )
}

export default DetailsScreen
