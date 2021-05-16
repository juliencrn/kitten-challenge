import React from "react"
import { Controller, useForm } from "react-hook-form"
import { Alert, StyleSheet, View } from "react-native"

import { useNavigation } from "@react-navigation/native"
import {
  Avatar,
  Button,
  CalendarViewModes,
  Datepicker,
  IndexPath,
  Input,
  Layout,
  Select,
  SelectItem,
  Text,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components"

import kittenAvatar from "~/assets/kittenAvatar.jpeg"
import {
  EmailInput,
  formStyles,
  getFormValidators,
  TextError,
  yup,
  yupResolver,
} from "~/components/FormUtils"
import PageLayout from "~/components/PageLayout"
import renderIcon from "~/components/RenderIcon"
import { imageStorageRef, toTimestamp } from "~/firebase"
import { useAuth } from "~/hooks/useAuth"
import useImagePicker from "~/hooks/useImagePicker"
import { genders, User } from "~/models/User"

interface UpdateFormProps
  extends Omit<User, "uid" | "displayName" | "dateOfBirth" | "gender"> {
  email: string
  dateOfBirth: Date
  gender: number
}

const { email, requiredString, date } = getFormValidators()
const validationSchema = yup.object().shape({
  firstName: requiredString,
  lastName: yup.string(),
  email,
  dateOfBirth: date,
})

const ProfileSettingsScreen = () => {
  const navigation = useNavigation()
  const { logout, user } = useAuth()

  const defaultValues: Partial<UpdateFormProps> = {
    firstName: "Julien",
    lastName: "Caron",
    email: "juliencaron@protonmail.com",
    dateOfBirth: user?.dateOfBirth ? user.dateOfBirth.toDate() : undefined,
    gender: genders.indexOf(user!.gender),
  }

  const userImagesRef = imageStorageRef.child(user?.uid || "anonymous")
  const [isUploading, openImagePicker] = useImagePicker(userImagesRef)
  const form = useForm<UpdateFormProps>({
    resolver: yupResolver(validationSchema),
    defaultValues,
  })
  const { control, handleSubmit, formState } = form
  const { errors } = formState

  // It's hacky, temporaire, on doit pouvoir le reverse pour quitter la page,
  // il faudrait donc pouvoir reset, un prompt boolean pourrait etre cool.
  // Egalement, c'est pas le onTouch qui devrait bloquer, mais si la value d'un champ change
  // TODO: Fix it
  const isTouched = !!Object.keys(formState.touchedFields).length

  const navigateBack = () => {
    if (isTouched) {
      Alert.alert("Unsaved changes", "Please save before leaving")
    } else {
      navigation.goBack()
    }
  }

  const onSubmit = handleSubmit((data: UpdateFormProps) => {
    const { email, firstName, lastName, dateOfBirth, gender } = data

    const updatedUser = {
      firstName,
      lastName,
      email,
      dateOfBirth: toTimestamp(new Date(dateOfBirth)),
      gender: genders[gender],
    }

    console.log({ data, updatedUser })
  })

  return (
    <PageLayout pageTitle="Settings" scroll disableTopNavigation>
      <TopNavigation
        title="Settings"
        alignment="center"
        accessoryLeft={props => (
          <TopNavigationAction
            {...props}
            icon={renderIcon("arrow-back")}
            onPress={navigateBack}
          />
        )}
      />
      <Layout style={styles.photoSection} level="1">
        <View style={styles.photo}>
          <Avatar style={styles.photo} source={kittenAvatar} />

          <Button
            style={styles.photoButton}
            size="small"
            status="basic"
            accessoryLeft={renderIcon("camera")}
            onPress={openImagePicker}
            disabled={isUploading}
          />
        </View>
      </Layout>

      <Layout level="1" style={{ marginTop: 16 }}>
        <Text style={styles.description} appearance="hint">
          {`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`}
        </Text>
      </Layout>

      <Layout style={[formStyles.formContainer, { marginTop: 16 }]} level="1">
        <Controller
          control={control}
          name="firstName"
          render={({ field: { onChange, ...inputProps } }) => (
            <Input
              {...inputProps}
              style={formStyles.input}
              placeholder="First name"
              accessoryRight={renderIcon("person")}
              onChangeText={value => onChange(value)}
              status={errors.firstName ? "danger" : undefined}
            />
          )}
        />

        <TextError message={errors.firstName?.message} />

        <Controller
          control={control}
          name="lastName"
          render={({ field: { onChange, ...inputProps } }) => (
            <Input
              {...inputProps}
              style={formStyles.input}
              placeholder="Last name"
              accessoryRight={renderIcon("person")}
              onChangeText={value => onChange(value)}
              status={errors.lastName ? "danger" : undefined}
            />
          )}
        />

        <TextError message={errors.lastName?.message} />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, ...inputProps } }) => (
            <EmailInput
              {...inputProps}
              style={formStyles.input}
              onChangeText={value => onChange(value)}
              status={errors.email ? "danger" : undefined}
            />
          )}
        />

        <TextError message={errors.email?.message} />

        <Controller
          control={control}
          name="dateOfBirth"
          render={({ field: { onChange, value, ...inputProps } }) => (
            <Datepicker
              {...inputProps}
              date={value}
              placeholder="Date of birth"
              style={formStyles.input}
              onSelect={nextDate => onChange(nextDate)}
              status={errors.dateOfBirth ? "danger" : undefined}
              accessoryRight={renderIcon("calendar")}
              min={new Date("1/1/1900")}
              startView={CalendarViewModes.YEAR}
            />
          )}
        />

        <TextError message={errors.dateOfBirth?.message} />

        <Controller
          control={control}
          name="gender"
          render={({ field: { onChange, value, ...inputProps } }) => (
            <Select
              {...inputProps}
              style={formStyles.input}
              placeholder="Gender"
              selectedIndex={value ? new IndexPath(value) : undefined}
              value={`${genders[value]}`}
              onSelect={indexPath => {
                if (Array.isArray(indexPath)) {
                  onChange(indexPath[0].row)
                } else {
                  onChange(indexPath.row)
                }
              }}
              status={errors.gender ? "danger" : undefined}
            >
              {genders.map(gender => (
                <SelectItem key={gender} title={gender} />
              ))}
            </Select>
          )}
        />

        <TextError message={errors.gender?.message} />

        <Button
          onPress={onSubmit}
          disabled={!isTouched}
          style={styles.submitButton}
          size="giant"
        >
          UPDATE
        </Button>
        <Button appearance="ghost" status="basic" onPress={logout}>
          LOGOUT
        </Button>
      </Layout>
    </PageLayout>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 16,
  },
  photoSection: {
    alignItems: "center",
    paddingVertical: 16,
  },
  photo: {
    aspectRatio: 1.0,
    height: 96,
    alignSelf: "center",
  },
  photoButton: {
    aspectRatio: 1.0,
    height: 32,
    borderRadius: 16,
    position: "absolute",
    alignSelf: "flex-end",
    bottom: 0,
  },
  description: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  nameSection: {
    flex: 1,
    marginHorizontal: 8,
  },
  submitButton: {
    marginHorizontal: 24,
    marginTop: 24,
  },
  emailSetting: {
    marginTop: 24,
  },
})

export default ProfileSettingsScreen
