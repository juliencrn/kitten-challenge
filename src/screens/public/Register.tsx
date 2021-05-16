import React, { useEffect } from "react"
import { Controller, ErrorOption, useForm } from "react-hook-form"
import { StyleSheet } from "react-native"

import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigation } from "@react-navigation/native"
import {
  Button,
  CalendarViewModes,
  Datepicker,
  IndexPath,
  Input,
  Layout,
  Select,
  SelectItem,
} from "@ui-kitten/components"
import * as yup from "yup"

import {
  EmailInput,
  formStyles,
  getFormValidators,
  PasswordInput,
  TextError,
} from "~/components/FormUtils"
import PageLayout from "~/components/PageLayout"
import renderIcon from "~/components/RenderIcon"
import { toTimestamp } from "~/firebase"
import { RegisterProps, useAuth } from "~/hooks/useAuth"
import { genders, User } from "~/models/User"
import { Routes } from "~/router/routes"

interface RegisterFormProps
  extends Omit<User, "uid" | "displayName" | "dateOfBirth" | "gender"> {
  email: string
  password: string
  confirmPassword?: string
  dateOfBirth: Date
  gender: number
}

const defaultValues: Partial<RegisterFormProps> = {
  firstName: "Julien",
  lastName: "Caron",
  email: "juliencaron@protonmail.com",
  password: "Te$t1234",
  confirmPassword: "Te$t1234",
}

const { email, password, requiredString, confirmPassword, date } =
  getFormValidators()
const validationSchema = yup.object().shape({
  firstName: requiredString,
  lastName: yup.string(),
  email,
  password,
  confirmPassword,
  dateOfBirth: date,
})

function formatError(
  error: any
): [keyof RegisterFormProps, ErrorOption] | null {
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
  const { control, handleSubmit, setError, formState } =
    useForm<RegisterFormProps>({
      resolver: yupResolver(validationSchema),
      defaultValues,
    })

  const onSubmit = handleSubmit((data: RegisterFormProps) => {
    const { email, password, firstName, lastName, dateOfBirth, gender } = data

    const newUser: RegisterProps = {
      firstName,
      lastName,
      email,
      dateOfBirth: toTimestamp(new Date(dateOfBirth)),
      gender: genders[gender],
      password,
    }

    register(newUser).catch((res: any) => {
      const error = formatError(res)
      if (error) setError(...error)
    })
  })

  const goToLogin = () => navigation.navigate(Routes.LOGIN)

  useEffect(() => {
    if (user) navigation.navigate(Routes.PROFILE)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const { errors } = formState

  return (
    <PageLayout
      scroll
      pageTitle="Register"
      headerProps={{
        title: "Welcome!",
        subtitle: "Create an account",
      }}
    >
      <Layout style={formStyles.formContainer} level="1">
        <Controller
          control={control}
          name="firstName"
          defaultValue="Julien"
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
          defaultValue="Julien"
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

        <Button onPress={onSubmit} style={styles.signUpButton} size="giant">
          SIGN UP
        </Button>
        <Button appearance="ghost" status="basic" onPress={goToLogin}>
          Already have an account? Login
        </Button>
      </Layout>
    </PageLayout>
  )
}

const styles = StyleSheet.create({
  signUpButton: {
    marginVertical: 16,
    marginTop: 24,
  },
  input: {
    marginTop: 16,
  },
})

export default RegisterScreen
