import React, { useEffect } from "react"

import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigation } from "@react-navigation/native"
import { Button, Input } from "@ui-kitten/components"
import { Controller, ErrorOption, useForm } from "react-hook-form"
import { StyleSheet, View } from "react-native"
import * as yup from "yup"

import {
  EmailInput,
  formStyles,
  getFormValidators,
  PasswordInput,
  TextError,
} from "../components/FormUtils"
import PageLayout from "../components/PageLayout"
import renderIcon from "../components/RenderIcon"
import { useAuth } from "../hooks/useAuth"
import { RouteID } from "../Router/Routes"

interface RegisterProps {
  displayName: string
  email: string
  password: string
  confirmPassword?: string
}

const defaultValues: RegisterProps = {
  displayName: "Julien",
  email: "juliencaron@protonmail.com",
  password: "Te$t1234",
  confirmPassword: "Te$t1234",
}

const { email, password, requiredString, confirmPassword } = getFormValidators()
const validationSchema = yup.object().shape({
  displayName: requiredString,
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

  const onSubmit = handleSubmit((data: RegisterProps) => {
    const { email, password, displayName } = data

    register({ email, password, displayName }).catch((res: any) => {
      const error = formatError(res)
      if (error) setError(...error)
    })
  })

  const goToLogin = () => navigation.navigate(RouteID.LOGIN)

  useEffect(() => {
    if (user) navigation.navigate(RouteID.PROFILE)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const { errors } = formState

  return (
    <PageLayout
      pageTitle="Register"
      headerProps={{
        title: "Welcome!",
        subtitle: "Create an account",
      }}
    >
      <View style={formStyles.formContainer}>
        <Controller
          control={control}
          name="displayName"
          defaultValue="Julien"
          render={({ field: { onChange, ...inputProps } }) => (
            <Input
              {...inputProps}
              placeholder="Public Name"
              accessoryRight={renderIcon("person")}
              onChangeText={value => onChange(value)}
              status={errors.displayName ? "danger" : undefined}
            />
          )}
        />

        <TextError message={errors.displayName?.message} />

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
      </View>

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
    </PageLayout>
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
