import React, { useState } from "react"
import { SafeAreaView, StyleSheet, View } from "react-native"

import { useNavigation } from "@react-navigation/native"
import { Button, Layout, Text } from "@ui-kitten/components"

import { useThemeSwitch } from "~/hooks/useThemeSwitch"
import { Routes } from "~/router/routes"

const heartIcons = ["😻", "💖", "😍", "🥰", "😍", "💝", "😘", "💓", "💕", "🐱"]

const HomeScreen = () => {
  const [icon, setIcon] = useState(heartIcons[0])
  const navigation = useNavigation()
  const { themeName, toggleTheme } = useThemeSwitch()

  const changeIcon = () => {
    const index = Math.floor(Math.random() * heartIcons.length)
    setIcon(heartIcons[index])
  }

  const goToLogin = () => navigation.navigate(Routes.LOGIN)
  const goToRegister = () => navigation.navigate(Routes.REGISTER)

  return (
    <Layout style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.text} category="h1">
            {`Welcome to UI Kitten ${icon}`}
          </Text>
          <Text style={styles.text} category="s1">
            It works great in the browser and as a native app!
          </Text>
          <Text style={styles.text} appearance="hint">
            Click some buttons to see it working.
          </Text>
          <Button
            accessibilityRole="button"
            accessibilityLabel="Change Icon"
            style={styles.button}
            onPress={changeIcon}
          >
            CHANGE ICON
          </Button>
          <Button
            onPress={toggleTheme}
          >{`SWITCH TO ${themeName} THEME`}</Button>

          <View style={{ display: "flex", flexDirection: "row" }}>
            <Button onPress={goToLogin} style={styles.button}>
              LOGIN
            </Button>
            <Text>{` `}</Text>
            <Button onPress={goToRegister} style={styles.button}>
              REGISTER
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  text: {
    textAlign: "center",
  },
  button: {
    marginVertical: 8,
  },
})

export default HomeScreen
