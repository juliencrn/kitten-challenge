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

interface LoginProps {
  email: string
  password: string
}

const defaultValues: LoginProps = {
  email: "juliencaron@protonmail.com",
  password: "Harry@113",
}

const { email, password } = getFormValidators()
const validationSchema = yup.object().shape({
  email,
  password,
})

function formatError(error: any): [keyof LoginProps, ErrorOption] | null {
  if (!error?.message || !error?.code) return null

  switch (error.code) {
    case "auth/invalid-email":
    case "auth/user-disabled":
    case "auth/user-not-found":
      return ["email", { message: error.message }]
    case "auth/wrong-password":
      return ["password", { message: error.message }]
    default:
      return null
  }
}

const LoginScreen = () => {
  const { login, user } = useAuth()
  const navigation = useNavigation()
  const { control, handleSubmit, setError, formState } = useForm<LoginProps>({
    resolver: yupResolver(validationSchema),
    defaultValues,
  })

  const onSubmit = handleSubmit(async (data: LoginProps) => {
    const { email, password } = data

    login(email, password).catch((res: any) => {
      const error = formatError(res)
      if (error) setError(...error)
    })
  })

  const goToRegister = () => navigation.navigate("Register")
  const goToForgotPassword = () => navigation.navigate("ForgotPassword")

  useEffect(() => {
    if (user) navigation.navigate("Profile")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const { errors } = formState

  return (
    <Layout style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <TopNavigation
          title="Login"
          alignment="center"
          accessoryLeft={BackArrow}
        />
        <Divider />
        <View style={{ flex: 1 }}>
          <Header
            title="You're come back!"
            subtitle="Sign in to your account"
          />

          <Layout style={formStyles.formContainer} level="1">
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, ...inputProps } }) => (
                <EmailInput
                  {...inputProps}
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
            <View style={styles.forgotPasswordContainer}>
              <Button
                style={styles.forgotPasswordButton}
                appearance="ghost"
                status="basic"
                onPress={goToForgotPassword}
              >
                Forgot your password?
              </Button>
            </View>
          </Layout>

          <Button onPress={onSubmit} style={styles.signInButton} size="giant">
            SIGN IN
          </Button>
          <Button
            style={styles.signUpButton}
            appearance="ghost"
            status="basic"
            onPress={goToRegister}
          >
            Don't have an account? Create
          </Button>
        </View>
      </SafeAreaView>
    </Layout>
  )
}

const styles = StyleSheet.create({
  signInLabel: {
    marginTop: 16,
  },
  signInButton: {
    marginHorizontal: 16,
  },
  signUpButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  forgotPasswordContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
})

export default LoginScreen
