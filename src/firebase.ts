// Firebase must be the first import
// eslint-disable-next-line simple-import-sort/imports
import firebase from "firebase/app"
// Optionally import the services that you want to use
import "firebase/auth"
import "firebase/storage"
import "firebase/firestore"
// import "firebase/database"
// import "firebase/functions"

import {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_MEASUREMENT_ID,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
} from "../env.json"
import { Challenge } from "./models/Challenge"
import { User } from "./models/User"

// Initialize Firebase
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()

type Snap = firebase.firestore.QueryDocumentSnapshot

const converter = <T>() => ({
  toFirestore: (data: Partial<T>) => data,
  fromFirestore: (snap: Snap) => snap.data() as T,
})

// This helper function exposes a 'typed' version of firestore().collection(collectionPath)
const dataPoint = <T>(collectionPath: string) =>
  firestore.collection(collectionPath).withConverter(converter<T>())

export const db = {
  users: dataPoint<User>("users"),
  challenges: dataPoint<Challenge>("challenges"),
}

export default firebase

export const toTimestamp = (date: Date): Timestamp => {
  return firebase.firestore.Timestamp.fromDate(date)
}

// Types
export type FirebaseUserInfo = firebase.UserInfo
export type FirebaseUser = firebase.User
export type Timestamp = firebase.firestore.Timestamp

// Methods
export const addChallenge = (
  challenge: Omit<Challenge, "uid">
): Promise<boolean> => {
  return db.challenges
    .doc()
    .set(challenge, {})
    .then(() => {
      console.log("Document créé")
      return true
    })
    .catch(error => {
      console.log("error adding doc", error)
      return false
    })
}

export const getChallenges = async (): Promise<Challenge[]> => {
  const challenges: Challenge[] = []
  try {
    const snapshot = await db.challenges.get()

    snapshot.forEach(doc => {
      challenges.push(doc.data())
    })
  } catch (error) {
    console.error("Unable to fetch challenges", error)
  }

  return challenges
}
