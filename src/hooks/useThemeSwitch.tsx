import { createContext, useContext, useEffect, useState } from "react"

import { Appearance, useColorScheme } from "react-native"

type ColorScheme = Appearance.AppearancePreferences["colorScheme"]

const defaultTheme = Appearance.getColorScheme() || "dark"

export const ThemeContext = createContext({
  themeName: defaultTheme,
  setTheme: (_theme: ColorScheme) => {},
  toggleTheme: () => {},
})

export const useThemeSwitch = () => {
  return useContext(ThemeContext)
}

export function useThemeProvider() {
  const colorScheme = useColorScheme()
  const [themeName, setThemeName] = useState<"light" | "dark">(defaultTheme)

  const setTheme = (colorScheme: ColorScheme) => {
    setThemeName(colorScheme === "dark" ? "dark" : "light")
  }

  const toggleTheme = () => {
    setThemeName(prevTheme => (prevTheme === "light" ? "dark" : "light"))
  }

  useEffect(() => {
    if (themeName !== colorScheme) setTheme(colorScheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorScheme])

  return { themeName, setTheme, toggleTheme }
}
