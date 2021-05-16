import React, { FC } from "react"
import { SafeAreaView, ScrollView, View } from "react-native"

import {
  Divider,
  StyleService,
  TopNavigation,
  useStyleSheet,
} from "@ui-kitten/components"

import Header, { HeaderProps } from "./Header"
import { BackArrow } from "./NavigationActions"

interface PropTypes {
  pageTitle: string
  headerProps?: HeaderProps
  disableTopNavigation?: boolean
  scroll?: boolean
}

const PageLayout: FC<PropTypes> = ({
  pageTitle,
  headerProps,
  scroll,
  disableTopNavigation,
  children,
}) => {
  const styles = useStyleSheet(themedStyles)

  const Content = (
    <>
      {headerProps?.title && <Header {...headerProps} />}
      {children}
    </>
  )

  return (
    <SafeAreaView style={styles.container}>
      {!disableTopNavigation && (
        <>
          <TopNavigation
            title={pageTitle}
            alignment="center"
            accessoryLeft={BackArrow}
          />
          <Divider />
        </>
      )}
      {scroll ? (
        <ScrollView style={styles.maximize}>{Content}</ScrollView>
      ) : (
        <View style={styles.maximize}>{Content}</View>
      )}
    </SafeAreaView>
  )
}

export default PageLayout

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: "background-basic-color-2",
  },
  maximize: {
    flex: 1,
  },
})
