import React, { FC } from "react"

import {
  Divider,
  StyleService,
  TopNavigation,
  useStyleSheet,
} from "@ui-kitten/components"
import { SafeAreaView, ScrollView, View } from "react-native"

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
      {!disableTopNavigation && (
        <TopNavigation
          title={pageTitle}
          alignment="center"
          accessoryLeft={BackArrow}
        />
      )}

      <Divider />
      <View style={styles.maximize}>
        {headerProps?.title && <Header {...headerProps} />}

        {children}
      </View>
    </>
  )

  if (scroll) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.maximize}>{Content}</ScrollView>
      </SafeAreaView>
    )
  }
  return <SafeAreaView style={styles.container}>{Content}</SafeAreaView>
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
