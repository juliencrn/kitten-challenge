import React from "react"
import { StyleSheet } from "react-native"

import { Divider, Layout, LayoutProps, Text } from "@ui-kitten/components"

export interface ProfileSettingProps extends LayoutProps {
  hint?: string
  value: string
}

const SettingLine = (props: ProfileSettingProps) => {
  const { style, hint, value, ...layoutProps } = props

  return (
    <>
      <Layout level="1" {...layoutProps} style={[styles.container, style]}>
        {hint && (
          <Text appearance="hint" category="s1">
            {hint}
          </Text>
        )}
        <Text category="s1">{value}</Text>
      </Layout>
      <Divider />
    </>
  )
}

export default SettingLine

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
})
