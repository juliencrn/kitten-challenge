import React, { forwardRef, ReactElement, useState } from "react"
import { StyleSheet } from "react-native"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"

import { yupResolver } from "@hookform/resolvers/yup"
import { Icon, Input, InputProps, Text } from "@ui-kitten/components"
import * as yup from "yup"

import renderIcon from "./RenderIcon"

export const TextError = (props: { message?: string }) =>
  props?.message ? (
    <Text status="danger" style={{ marginTop: 4 }}>
      {props.message}
    </Text>
  ) : null

export const formStyles = StyleSheet.create({
  formContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  input: {
    marginTop: 16,
  },
})

export const PasswordInput = forwardRef<Input, InputProps>(
  function PasswordInput(props, ref) {
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false)

    const onPasswordIconPress = () => setPasswordVisible(!passwordVisible)

    return (
      <Input
        ref={ref}
        placeholder="Password"
        accessoryRight={(p: any): ReactElement => (
          <TouchableWithoutFeedback onPress={onPasswordIconPress}>
            <Icon {...p} name={passwordVisible ? "eye-off" : "eye"} />
          </TouchableWithoutFeedback>
        )}
        secureTextEntry={!passwordVisible}
        autoCapitalize="none"
        autoCompleteType="password"
        textContentType="password"
        {...props}
      />
    )
  }
)

export const EmailInput = forwardRef<Input, InputProps>(function EmailInput(
  props,
  ref
) {
  return (
    <Input
      ref={ref}
      placeholder="Email"
      accessoryRight={renderIcon("email-outline")}
      autoCapitalize="none"
      autoCompleteType="email"
      textContentType="emailAddress"
      keyboardType="email-address"
      {...props}
    />
  )
})

export const getFormValidators = () => {
  return {
    date: yup.date().required(),
    number: yup.number().required(),
    requiredString: yup.string().required(),
    email: yup.string().email().required(),
    password: yup
      .string()
      .min(8)
      .matches(/.*[a-z]/, "Password requires a lowercase character")
      .matches(/.*[A-Z]/, "Password requires a uppercase character")
      .matches(/.*[0-9]/, "Password requires a number")
      .matches(/.*[-+_!@#$%^&*., ?]/, "Password requires a special character")
      .required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null])
      .required(),
  }
}

export { yup, yupResolver }
