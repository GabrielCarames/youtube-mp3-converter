import React, { Dispatch, SetStateAction, useState } from "react"
import { conversionProps } from "../../interfaces"
import { getMp3 } from "../../pages/api/converter"

export const useConverter = (
  conversions: conversionProps[],
  setConversions: Dispatch<SetStateAction<conversionProps[]>>,
  inputRef: React.MutableRefObject<HTMLInputElement | null>
) => {
  const [showModal, setShowModal] = useState(false)

  const askForFinishedConversion = async (
    videoId: string,
    currentConversions: conversionProps[]
  ) => {
    try {
      const data = await getMp3(videoId)
      const foundConversionIndex = getConversionIndexByTitle(currentConversions, data)
      if (currentConversions[foundConversionIndex].msg === "in process") {
        data.videoId = videoId
        currentConversions[foundConversionIndex] = data
        setConversions([...currentConversions])
      }
    } catch (error) {
      console.log(error)
      //handle error with modal
    }
  }

  const convertUrl = async (e: React.FormEvent) => {
    e.preventDefault()
    const videoId = getVideoIdFromInput()
    if (!videoId) return
    if (checkIfVideoIdIsInConversions(videoId)) return setShowModal(true)
    try {
      const data = await getMp3(videoId)
      data.videoId = videoId
      const currentConversions = [...conversions, data]
      setConversions(currentConversions)
      setTimeout(() => {
        askForFinishedConversion(videoId, currentConversions)
      }, 4000)
    } catch (error) {
      console.log(error)
    }
  }

  const getConversionIndexByTitle = (
    currentConversions: conversionProps[],
    conversionToFind: conversionProps
  ) =>
    currentConversions.findIndex(
      (item: conversionProps) => item.title.toLowerCase() === conversionToFind.title.toLowerCase()
    )

  const getVideoIdFromInput = () => {
    const inputValue = inputRef.current?.value!
    const videoId = inputValue.split("v=")[1]
    return videoId
  }

  const checkIfVideoIdIsInConversions = (videoId: string) => {
    const repeatedConversion = conversions.find((item: conversionProps) => item.videoId === videoId)
    return repeatedConversion ? true : false
  }

  return { convertUrl, showModal, setShowModal }
}
