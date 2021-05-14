import React from "react"

import {
  Button,
  Divider,
  Layout,
  Text,
  TopNavigation,
} from "@ui-kitten/components"
import { SafeAreaView, View } from "react-native"

import BackArrow from "../components/BackArrow"
import { useThemeSwitch } from "../hooks/useThemeSwitch"

const DetailsScreen = () => {
  const { themeName, toggleTheme } = useThemeSwitch()

  return (
    <Layout style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <TopNavigation
          title="Details"
          alignment="center"
          accessoryLeft={BackArrow}
        />
        <Divider />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text category="h1" style={{ marginVertical: 8 }}>
            DETAILS
          </Text>
          <Button onPress={toggleTheme}>
            {`SWITCH TO ${themeName} THEME`}
          </Button>
        </View>
      </SafeAreaView>
    </Layout>
  )
}

export default DetailsScreen
