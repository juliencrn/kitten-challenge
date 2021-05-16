import { useState } from "react"
import { Alert } from "react-native"

import * as ImagePicker from "expo-image-picker"

import { StorageRef } from "~/firebase"

interface ImageSource {
  uri: string
}

type UseImagePickerReturn = [boolean, () => Promise<void>]

function useImagePicker(ref: StorageRef): UseImagePickerReturn {
  const [isUploading, setUploading] = useState<boolean>(false)

  const openImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!")
      return
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync()

    if (pickerResult.cancelled === true) return

    uploadImage(pickerResult)
  }

  const uploadImage = async ({ uri }: ImageSource) => {
    try {
      setUploading(true)
      const file = await fetch(uri).then(res => res.blob())

      const filename = uri.substring(uri.lastIndexOf("/") + 1)
      const uploadTask = ref.child(filename).put(file)

      await uploadTask

      setUploading(false)

      Alert.alert("Photo uploaded!", "Your photo has been uploaded.")
    } catch (error) {
      console.log(error)
      setUploading(false)
    }
  }

  return [isUploading, openImagePicker]
}

export default useImagePicker
