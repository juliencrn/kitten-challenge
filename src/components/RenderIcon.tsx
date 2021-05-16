import React from "react"
import { ImageProps } from "react-native"

import { Icon } from "@ui-kitten/components"
import { RenderProp } from "@ui-kitten/components/devsupport"

type RenderIcon = (name: string) => RenderProp<Partial<ImageProps>>

const renderIcon: RenderIcon = name => props => <Icon {...props} name={name} />

export default renderIcon
