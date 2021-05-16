import React from "react"

import { yupResolver } from "@hookform/resolvers/yup"
import {
  Button,
  Datepicker,
  IndexPath,
  Input,
  Select,
  SelectItem,
  Toggle,
} from "@ui-kitten/components"
import { Controller, useForm } from "react-hook-form"
import { StyleSheet, View } from "react-native"
import * as yup from "yup"

import {
  formStyles,
  getFormValidators,
  TextError,
} from "../components/FormUtils"
import PageLayout from "../components/PageLayout"
import renderIcon from "../components/RenderIcon"
import { addChallenge, toTimestamp } from "../firebase"
import { useAuth } from "../hooks/useAuth"
import { Challenge } from "../models/Challenge"

interface ChallengeProps
  extends Omit<Challenge, "uid" | "accessMode" | "price"> {
  deadlineDate: Date
  priceIndex: number
  isPublic: boolean
}

const PRICES = [25, 50, 100, 250, 1000]

const defaultValues: Partial<ChallengeProps> = {
  title: "Make this app working",
  isPublic: true,
}

const { requiredString, number, date } = getFormValidators()
const validationSchema = yup.object().shape({
  title: requiredString,
  deadlineDate: date,
  priceIndex: number,
})

const CreateChallengeScreen = () => {
  const { user } = useAuth()
  const { control, handleSubmit, formState } = useForm<ChallengeProps>({
    resolver: yupResolver(validationSchema),
    defaultValues,
  })

  const onSubmit = handleSubmit((data: ChallengeProps) => {
    const { priceIndex, isPublic, title, deadlineDate } = data

    const body: Omit<Challenge, "uid"> = {
      title,
      deadline: toTimestamp(new Date(deadlineDate)),
      price: PRICES[priceIndex],
      accessMode: isPublic ? "public" : "private",
      createdBy: user!.uid,
    }

    addChallenge(body)
  })

  const { errors } = formState

  return (
    <PageLayout
      pageTitle="Create a challenge"
      headerProps={{
        title: "Create a challenge!",
        subtitle: "Improve yourself, be smart, stay determined",
      }}
    >
      <View style={formStyles.formContainer}>
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, ...inputProps } }) => (
            <Input
              {...inputProps}
              placeholder="What is your goal ?"
              onChangeText={value => onChange(value)}
              status={errors.title ? "danger" : undefined}
              accessoryRight={renderIcon("checkmark-circle-2-outline")}
            />
          )}
        />
        <TextError message={errors.title?.message} />

        <Controller
          control={control}
          name="deadlineDate"
          render={({ field: { onChange, value, ...inputProps } }) => (
            <Datepicker
              {...inputProps}
              date={value}
              placeholder="Set a deadline"
              min={new Date()}
              style={{ marginTop: 16 }}
              onSelect={nextDate => onChange(nextDate)}
              status={errors.deadline ? "danger" : undefined}
              accessoryRight={renderIcon("calendar")}
            />
          )}
        />
        <TextError message={errors.deadlineDate?.message} />

        <Controller
          control={control}
          name="priceIndex"
          render={({ field: { onChange, value, ...inputProps } }) => (
            <Select
              {...inputProps}
              placeholder="Set a price"
              selectedIndex={value ? new IndexPath(value) : undefined}
              value={value ? `${PRICES[value]} €` : ""}
              style={{ marginTop: 16 }}
              onSelect={indexPath => {
                if (Array.isArray(indexPath)) {
                  onChange(indexPath[0].row)
                } else {
                  onChange(indexPath.row)
                }
              }}
              status={errors.priceIndex ? "danger" : undefined}
            >
              {PRICES.map(price => (
                <SelectItem key={price} title={`${price} €`} />
              ))}
            </Select>
          )}
        />
        <TextError message={errors.priceIndex?.message} />

        <Controller
          control={control}
          name="isPublic"
          render={({ field: { value, ...inputProps } }) => (
            <Toggle
              {...inputProps}
              style={{
                justifyContent: "flex-start",
                marginTop: 16,
              }}
              checked={value}
            >
              I accept to share my challenge with the community.
            </Toggle>
          )}
        />
      </View>

      <Button onPress={onSubmit} style={styles.submitButton} size="giant">
        CREATE
      </Button>
    </PageLayout>
  )
}

const styles = StyleSheet.create({
  submitButton: {
    marginHorizontal: 16,
    marginVertical: 16,
  },
})

export default CreateChallengeScreen
