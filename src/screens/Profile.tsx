import React from "react"

import { useNavigation } from "@react-navigation/native"
import {
  Button,
  StyleService,
  Text,
  TopNavigation,
  useStyleSheet,
} from "@ui-kitten/components"
import { View } from "react-native"

import { BackArrow, SettingsLink } from "../components/NavigationActions"
import PageLayout from "../components/PageLayout"
import renderIcon from "../components/RenderIcon"
import { useAuth } from "../hooks/useAuth"
import { RouteID } from "../Router/Routes"

const ProfileScreen = () => {
  const { user } = useAuth()
  const navigation = useNavigation()
  const styles = useStyleSheet(themedStyles)

  const goToCreateChallenge = () =>
    navigation.navigate(RouteID.CREATE_CHALLENGE)
  const goToSettings = () => navigation.navigate(RouteID.PROFILE_SETTINGS)
  const goToMyChallenges = () => navigation.navigate(RouteID.MY_CHALLENGES)

  return (
    <PageLayout pageTitle="Profile" disableTopNavigation>
      <TopNavigation
        title="Profile"
        alignment="center"
        accessoryLeft={BackArrow}
        accessoryRight={SettingsLink}
      />
      <View style={styles.container}>
        <Text
          style={styles.text}
          category="h1"
        >{`Hi ${user?.displayName} 👋`}</Text>
        <Text style={styles.text}>
          Your amazing app starts here. Open you favourite code editor and start
          editing this project.
        </Text>
        <Button
          style={styles.button}
          onPress={goToCreateChallenge}
          accessoryLeft={renderIcon("plus-outline")}
        >
          CREATE CHALLENGE
        </Button>

        <Button style={styles.button} onPress={goToMyChallenges}>
          MY CHALLENGE
        </Button>

        <Button style={styles.button} onPress={goToSettings}>
          SETTINGS
        </Button>
      </View>
    </PageLayout>
  )
}

const themedStyles = StyleService.create({
  view: {
    flex: 1,
    backgroundColor: "background-basic-color-2",
  },
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
