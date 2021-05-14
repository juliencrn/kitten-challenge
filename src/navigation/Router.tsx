import React from "react"

import { NavigationContainer } from "@react-navigation/native"

import { useAuth } from "../hooks/useAuth"
import LoggedInStack from "./LoggedInStack"
import LoggedOutStack from "./LoggedOutStack"

export default function Router() {
  const { user } = useAuth()

  return (
    <NavigationContainer>
      {user ? <LoggedInStack /> : <LoggedOutStack />}
    </NavigationContainer>
  )
}
