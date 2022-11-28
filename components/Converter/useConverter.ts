import React, { Dispatch, SetStateAction, useState } from "react"
import { conversionProps } from "../../interfaces"
import { getMp3 } from "../../pages/api/converter"

const loadingConversion = {
  link: "",
  title: "",
  progress: 0,
  duration: 0,
  status: "",
  msg: "",
  videoId: "",
  loading: true
}

export const useConverter = (
  conversions: conversionProps[],
  setConversions: Dispatch<SetStateAction<conversionProps[]>>,
  inputRef: React.MutableRefObject<HTMLInputElement | null>,
  setLoader: Dispatch<SetStateAction<boolean>>
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
    setLoader(true)
    const videoId = getVideoIdFromInput()
    loadingConversion.videoId = videoId
    setConversions([...conversions, loadingConversion])
    if (!videoId) return
    if (checkIfVideoIdIsInConversions(videoId)) return setShowModal(true)
    try {
      const data = await getMp3(videoId)
      data.videoId = videoId
      deleteLoadingConversion()
      setConversions([...conversions, data])
      setLoader(false)
    } catch (error) {
      setLoader(false)
      console.log(error)
      //hande error with modal
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

  const deleteLoadingConversion = () => {
    const currentConversions = [...conversions]
    currentConversions.splice(currentConversions.length - 1, 1)
    setConversions([...currentConversions])
  }

  return { convertUrl, showModal, setShowModal }
}
