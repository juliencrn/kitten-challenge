import { Timestamp } from "~/firebase"

export enum Gender {
  MALE = "Male",
  FEMALE = "Female",
  OTHER = "Other",
}

// Used to iterate and select by index in forms
export const genders = [Gender.MALE, Gender.FEMALE, Gender.OTHER]

export interface User {
  uid: string
  email: string
  firstName: string
  lastName: string
  dateOfBirth: Timestamp
  gender: Gender
}
