import React from "react"

import { useNavigation } from "@react-navigation/native"
import { Avatar, Button, Icon, Layout, Text } from "@ui-kitten/components"
import { ImageSourcePropType, StyleSheet, View } from "react-native"

import kittenAvatar from "../assets/kittenAvatar.jpeg"
import PageLayout from "../components/PageLayout"
import SettingLine from "../components/SettingLine"
import { useAuth } from "../hooks/useAuth"

export enum Gender {
  MALE = "Male",
  FEMALE = "Female",
}
const profile = {
  firstName: "Jennifer",
  lastName: "Green",
  photo: kittenAvatar as ImageSourcePropType | null,
  gender: Gender.FEMALE,
  description:
    "Hi! My name is Jennifer. I’m 25 and I live in Berlin. I’m interested in computer science, music, sport and fantasy literature.",
  age: 25,
  weight: 48,
  height: 174,
  email: "jen.green@gmail.com",
  tel: "+375 44 846 97 68",
}

const ProfileSettingsScreen = () => {
  const navigation = useNavigation()
  const { logout } = useAuth()

  const goBack = () => navigation.goBack()

  return (
    <PageLayout pageTitle="Settings" scroll>
      <Layout style={styles.photoSection} level="1">
        <View style={styles.photo}>
          {profile.photo && (
            <Avatar style={styles.avatar} source={profile.photo} />
          )}

          <Button
            style={styles.photoButton}
            size="small"
            status="basic"
            accessoryLeft={props => <Icon {...props} name="camera" />}
          />
        </View>
        <View style={styles.nameSection}>
          <SettingLine value={profile.firstName} />
          <SettingLine value={profile.lastName} />
        </View>
      </Layout>

      <Layout level="1">
        <Text style={styles.description} appearance="hint">
          {profile.description}
        </Text>
      </Layout>

      <SettingLine
        style={styles.emailSetting}
        hint="Email"
        value={profile.email}
      />
      <SettingLine hint="Gender" value={profile.gender} />
      <SettingLine hint="Age" value={`${profile.age}`} />
      <SettingLine hint="Weight" value={`${profile.weight} kg`} />
      <SettingLine hint="Height" value={`${profile.height} cm`} />

      <Button style={styles.doneButton} onPress={goBack}>
        DONE
      </Button>
      <Button style={{ margin: 24 }} status="danger" onPress={logout}>
        LOGOUT
      </Button>
    </PageLayout>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 24,
  },
  photoSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  photo: {
    aspectRatio: 1.0,
    height: 76,
  },
  photoButton: {
    aspectRatio: 1.0,
    height: 32,
    borderRadius: 16,
    position: "absolute",
    alignSelf: "flex-end",
    bottom: 0,
  },
  avatar: {
    alignSelf: "center",
    aspectRatio: 1.0,
    height: 76,
  },
  description: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  nameSection: {
    flex: 1,
    marginHorizontal: 8,
  },
  doneButton: {
    marginHorizontal: 24,
    marginTop: 24,
  },
  emailSetting: {
    marginTop: 24,
  },
})

export default ProfileSettingsScreen
