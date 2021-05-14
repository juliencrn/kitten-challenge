import React, { useEffect } from "react"

import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigation } from "@react-navigation/native"
import {
  Button,
  Divider,
  Icon,
  Input,
  Layout,
  TopNavigation,
} from "@ui-kitten/components"
import { Controller, ErrorOption, useForm } from "react-hook-form"
import { SafeAreaView, StyleSheet, View } from "react-native"
import * as yup from "yup"

import BackArrow from "../components/BackArrow"
import {
  EmailInput,
  formStyles,
  getFormValidators,
  PasswordInput,
  TextError,
} from "../components/FormUtils"
import Header from "../components/Header"
import { useAuth } from "../hooks/useAuth"

interface RegisterProps {
  name: string
  email: string
  password: string
  confirmPassword?: string
}

const defaultValues: RegisterProps = {
  name: "Julien",
  email: "juliencaron@protonmail.com",
  password: "Te$t1234",
}

const { email, password, requiredString, confirmPassword } = getFormValidators()
const validationSchema = yup.object().shape({
  name: requiredString,
  email,
  password,
  confirmPassword,
})

function formatError(error: any): [keyof RegisterProps, ErrorOption] | null {
  if (!error?.message || !error?.code) return null

  switch (error.code) {
    case "auth/invalid-email":
    case "auth/email-already-in-use":
    case "auth/credential-already-in-use":
    case "auth/account-exists-with-different-credential":
      return ["email", { message: error.message }]
    default:
      return null
  }
}

const RegisterScreen = () => {
  const { register, user } = useAuth()
  const navigation = useNavigation()
  const { control, handleSubmit, setError, formState } = useForm<RegisterProps>(
    {
      resolver: yupResolver(validationSchema),
      defaultValues,
    }
  )

  const onSubmit = handleSubmit(async (data: RegisterProps) => {
    const { email, password } = data

    register(email, password).catch((res: any) => {
      const error = formatError(res)
      if (error) setError(...error)
    })
  })

  const goToLogin = () => navigation.navigate("Login")

  useEffect(() => {
    if (user) navigation.navigate("Profile")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const { errors } = formState

  return (
    <Layout style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <TopNavigation
          title="Register"
          alignment="center"
          accessoryLeft={BackArrow}
        />
        <Divider />
        <View style={{ flex: 1 }}>
          <Header title="Welcome!" subtitle="Create an account" />

          <Layout style={formStyles.formContainer} level="1">
            <Controller
              control={control}
              name="name"
              defaultValue="Julien"
              render={({ field: { onChange, ...inputProps } }) => (
                <Input
                  {...inputProps}
                  placeholder="Public Name"
                  accessoryRight={props => <Icon {...props} name="person" />}
                  onChangeText={value => onChange(value)}
                  status={errors.name ? "danger" : undefined}
                />
              )}
            />

            <TextError message={errors.name?.message} />

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
              name="password"
              render={({ field: { onChange, ...inputProps } }) => (
                <PasswordInput
                  {...inputProps}
                  style={formStyles.input}
                  onChangeText={value => onChange(value)}
                  status={errors.password ? "danger" : undefined}
                />
              )}
            />

            <TextError message={errors.password?.message} />

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, ...inputProps } }) => (
                <PasswordInput
                  {...inputProps}
                  style={formStyles.input}
                  onChangeText={value => onChange(value)}
                  status={errors.confirmPassword ? "danger" : undefined}
                />
              )}
            />

            <TextError message={errors.confirmPassword?.message} />
          </Layout>

          <Button onPress={onSubmit} style={styles.signUpButton} size="giant">
            SIGN UP
          </Button>
          <Button
            style={styles.signInButton}
            appearance="ghost"
            status="basic"
            onPress={goToLogin}
          >
            Already have an account? Login
          </Button>
        </View>
      </SafeAreaView>
    </Layout>
  )
}

const styles = StyleSheet.create({
  signUpButton: {
    marginHorizontal: 16,
  },
  signInButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  input: {
    marginTop: 16,
  },
})

export default RegisterScreen
