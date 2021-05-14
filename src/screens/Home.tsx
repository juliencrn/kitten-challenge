import React, { useState } from "react"

import { useNavigation } from "@react-navigation/native"
import { Button, Layout, Text } from "@ui-kitten/components"
import { SafeAreaView, StyleSheet, View } from "react-native"

import { useAuth } from "../hooks/useAuth"

const heartIcons = ["😻", "💖", "😍", "🥰", "😍", "💝", "😘", "💓", "💕", "🐱"]

const HomeScreen = () => {
  const [icon, setIcon] = useState(heartIcons[0])
  const { user, logout } = useAuth()
  const navigation = useNavigation()

  const changeIcon = () => {
    const index = Math.floor(Math.random() * heartIcons.length)
    setIcon(heartIcons[index])
  }

  const goToDetails = () => navigation.navigate("Details")
  const goToLogin = () => navigation.navigate("Login")
  const goToRegister = () => navigation.navigate("Register")
  const goToProfile = () => navigation.navigate("Profile")

  return (
    <Layout style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.text} category="h1">
            {user
              ? `Welcome ${user.email?.slice(0, 6)} ${icon}`
              : `Welcome to UI Kitten ${icon}`}
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
          <Button onPress={goToDetails} style={styles.button}>
            OPEN DETAILS
          </Button>

          <View style={{ display: "flex", flexDirection: "row" }}>
            {!user ? (
              <>
                <Button onPress={goToLogin} style={styles.button}>
                  LOGIN
                </Button>
                <Text>{` `}</Text>
                <Button onPress={goToRegister} style={styles.button}>
                  REGISTER
                </Button>
              </>
            ) : (
              <>
                <Button onPress={logout} style={styles.button}>
                  LOGOUT
                </Button>
                <Text>{` `}</Text>
                <Button onPress={goToProfile} style={styles.button}>
                  PROFILE
                </Button>
              </>
            )}
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
