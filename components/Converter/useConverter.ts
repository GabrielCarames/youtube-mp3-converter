import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { conversionProps } from "../../interfaces"
import { getMp3 } from "../../pages/api/converter"

export const useConverter = (
  conversions: conversionProps[],
  setConversions: Dispatch<SetStateAction<conversionProps[]>>,
  inputRef: React.MutableRefObject<HTMLInputElement | null>
) => {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (conversions.length <= 0) return
    const timeOut = setTimeout(async () => {
      askForFinishedConversion()
    }, 4000)
    return () => clearTimeout(timeOut)
  }, [conversions])

  const askForFinishedConversion = async () => {
    try {
      const videoId = getVideoIdFromInput()
      const data = await getMp3(videoId)
      const currentConversions = Object.assign([], conversions) as conversionProps[]
      const foundConversionIndex = getConversionIndexByTitle(currentConversions, data)
      console.log(data)
      if (currentConversions[foundConversionIndex].msg === "in process") {
        const videoId = getVideoIdFromResponseLink(data.link)
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
      setConversions((conversions: conversionProps[]) => [...conversions, data])
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
  const getVideoIdFromResponseLink = (link: string) => link.match(/id=(.*?)&/)![1]
  const checkIfVideoIdIsInConversions = (videoId: string) => {
    const repeatedConversion = conversions.find((item: conversionProps) => item.videoId === videoId)
    return repeatedConversion ? true : false
  }

  return { convertUrl, showModal, setShowModal, inputRef }
}
