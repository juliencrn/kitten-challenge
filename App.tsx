import "react-native-gesture-handler"

import React from "react"

import * as eva from "@eva-design/eva"
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components"
import { EvaIconsPack } from "@ui-kitten/eva-icons"

import { AuthProvider } from "./src/hooks/useAuth"
import { ThemeContext, useThemeProvider } from "./src/hooks/useThemeSwitch"
import Router from "./src/router/Router"

function App() {
  const themeContext = useThemeProvider()

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ThemeContext.Provider value={themeContext}>
        <AuthProvider>
          <ApplicationProvider {...eva} theme={eva[themeContext.themeName]}>
            <Router />
          </ApplicationProvider>
        </AuthProvider>
      </ThemeContext.Provider>
    </>
  )
}

export default App
