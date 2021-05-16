import React from "react"

import { Button } from "@ui-kitten/components"

import { imageStorageRef } from "../firebase"
import useImagePicker from "../hooks/useImagePicker"
import renderIcon from "./RenderIcon"

function ImagePickerButton() {
  const [isUploading, openImagePicker] = useImagePicker(imageStorageRef)

  return (
    <Button
      onPress={openImagePicker}
      disabled={isUploading}
      accessoryLeft={renderIcon("camera-outline")}
    >
      {isUploading ? `UPLOADING...` : `PICK A PHOTO`}
    </Button>
  )
}

export default ImagePickerButton
