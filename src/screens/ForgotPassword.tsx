import React, { useEffect, useState } from "react"

import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigation } from "@react-navigation/native"
import { Button } from "@ui-kitten/components"
import { Controller, useForm } from "react-hook-form"
import { StyleSheet, View } from "react-native"
import * as yup from "yup"

import {
  EmailInput,
  formStyles,
  getFormValidators,
  TextError,
} from "../components/FormUtils"
import PageLayout from "../components/PageLayout"
import { useAuth } from "../hooks/useAuth"

interface ForgotPasswordProps {
  email: string
}

const defaultValues: ForgotPasswordProps = {
  email: "juliencaron@protonmail.com",
}

const { email } = getFormValidators()
const validationSchema = yup.object().shape({
  email,
})

const ForgotPasswordScreen = () => {
  const [mailSent, setMailSent] = useState<boolean>(false)
  const { sendPasswordResetEmail, user } = useAuth()
  const navigation = useNavigation()
  const { control, handleSubmit, setError, formState } =
    useForm<ForgotPasswordProps>({
      resolver: yupResolver(validationSchema),
      defaultValues,
    })

  const onSubmit = handleSubmit(async (data: ForgotPasswordProps) => {
    const { email } = data

    sendPasswordResetEmail(email)
      .then(_ => setMailSent(true))
      .catch(error => {
        const errorMessage = error.message

        setError("email", { message: errorMessage })
      })
  })

  const goToLogin = () => navigation.navigate("Login")

  useEffect(() => {
    if (user) navigation.navigate("Profile")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const { errors } = formState

  return (
    <PageLayout
      pageTitle="Restore passwor"
      headerProps={
        mailSent
          ? {
              title: "Mail sent",
              subtitle: "Check your email and come back to login.",
            }
          : { title: "Restore Password" }
      }
    >
      {!mailSent && (
        <>
          <View style={formStyles.formContainer}>
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
          </View>

          <Button onPress={onSubmit} style={styles.submitButton} size="giant">
            SEND RESET INSTRUCTIONS
          </Button>
        </>
      )}

      <Button
        style={styles.backToLoginButton}
        appearance="ghost"
        status="basic"
        onPress={goToLogin}
      >
        BACK TO LOGIN
      </Button>
    </PageLayout>
  )
}

const styles = StyleSheet.create({
  submitButton: {
    marginHorizontal: 16,
  },
  backToLoginButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
})

export default ForgotPasswordScreen
