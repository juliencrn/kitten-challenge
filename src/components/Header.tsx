import React from "react"

import { StyleService, Text, useStyleSheet } from "@ui-kitten/components"
import { View } from "react-native"

interface HeaderProps {
  title: string
  subtitle?: string
}

function Header({ title, subtitle }: HeaderProps) {
  const styles = useStyleSheet(themedStyles)
  return (
    <View style={styles.headerContainer}>
      <Text category="h1" status="control">
        {title}
      </Text>
      {subtitle && (
        <Text style={styles.subtitle} category="s1" status="control">
          {subtitle}
        </Text>
      )}
    </View>
  )
}

const themedStyles = StyleService.create({
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: 164,
    backgroundColor: "color-primary-default",
  },
  subtitle: {
    marginTop: 16,
  },
})

export default Header
