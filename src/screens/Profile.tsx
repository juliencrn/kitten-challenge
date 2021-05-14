import React from "react"

import { useNavigation } from "@react-navigation/native"
// import DBList from '../components/DBList'
import {
  Button,
  Divider,
  Layout,
  Text,
  TopNavigation,
} from "@ui-kitten/components"
import { SafeAreaView, StyleSheet, View } from "react-native"

import BackArrow from "../components/BackArrow"
import ChallengeList from "../components/ChallengeList"
import { useAuth } from "../hooks/useAuth"

const ProfileScreen = () => {
  const { user, logout } = useAuth()
  const navigation = useNavigation()

  const goToCreateChallenge = () => navigation.navigate("CreateChallenge")

  // Hacky, we haven't name yet
  const name = user ? user.email?.slice(0, 6) : "Anonym"

  return (
    <Layout style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <TopNavigation
          title="Profile"
          alignment="center"
          accessoryLeft={BackArrow}
        />
        <Divider />

        <View style={styles.container}>
          <Text style={styles.text} category="h1">{`Hi ${name} 👋`}</Text>
          <Text style={styles.text}>
            Your amazing app starts here. Open you favourite code editor and
            start editing this project.
          </Text>
          <Button style={styles.button} onPress={goToCreateChallenge}>
            CREATE CHALLENGE
          </Button>
          <Button style={styles.button} onPress={logout}>
            LOGOUT
          </Button>

          <Text category="h3" style={styles.subtitle}>
            Current challenge(s)
          </Text>
          <ChallengeList />
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
    marginVertical: 8,
    textAlign: "center",
  },
  subtitle: {
    marginVertical: 16,
    textAlign: "left",
    width: "100%",
  },
  button: {
    marginVertical: 8,
  },
})

export default ProfileScreen
