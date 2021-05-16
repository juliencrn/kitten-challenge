import React from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"

import { Divider, Icon, Layout, LayoutProps, Text } from "@ui-kitten/components"

export interface ProfileSettingProps extends LayoutProps {
  hint?: string
  value: string
}

const SettingLine = (props: ProfileSettingProps) => {
  const { style, hint, value, ...layoutProps } = props

  const handleClick = () => console.log("clicked")

  return (
    <TouchableOpacity style={{ flex: 1 }} onPress={handleClick}>
      <Layout level="1" {...layoutProps} style={[styles.container, style]}>
        {hint && (
          <Text appearance="hint" category="s1">
            {hint}
          </Text>
        )}
        <View style={{ flexDirection: "row" }}>
          <Text category="s1">{value}</Text>
          <Icon name="arrow-ios-forward-outline" />
        </View>
      </Layout>
      <Divider />
    </TouchableOpacity>
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
