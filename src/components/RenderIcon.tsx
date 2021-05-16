import React from "react"

import { Icon } from "@ui-kitten/components"
import { RenderProp } from "@ui-kitten/components/devsupport"
import { ImageProps } from "react-native"

type RenderIcon = (name: string) => RenderProp<Partial<ImageProps>>

const renderIcon: RenderIcon = name => props => <Icon {...props} name={name} />

export default renderIcon
