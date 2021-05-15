import { Timestamp } from "../firebase"

export interface Challenge {
  uid: string
  title: string
  deadline: Timestamp
  price: number
  accessMode: "public" | "private"
  createdBy: string // used.uid
}
