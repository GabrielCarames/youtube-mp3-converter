import React, { Dispatch, SetStateAction, useState } from "react"
import { conversionProps, modalDataProps } from "../../interfaces"
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
  const [showModal, setShowModal] = useState<modalDataProps>({
    title: "",
    description: "",
    state: false
  })

  const askForFinishedConversion = (currentConversions: conversionProps[], videoId: string) => {
    const interval = setInterval(async () => {
      try {
        const data = await getMp3(videoId)
        if (data.msg === "success") {
          data.videoId = videoId
          const foundConversionIndex = getConversionIndexByTitle(currentConversions, data)
          currentConversions[foundConversionIndex] = data
          setConversions([...currentConversions])
          clearInterval(interval)
          return
        }
      } catch (error) {
        console.log(error)
        clearInterval(interval)
        return setShowModal({
          title: "Error con la conversión",
          description:
            "La conversión ha sufrido un error inesperado. Por favor intenta de nuevo más tarde.",
          state: true
        })
      }
    }, 4000)
  }

  const convertUrl = async (e: React.FormEvent) => {
    e.preventDefault()
    const videoId = getVideoIdFromInput()
    if (!videoId) return
    if (checkIfVideoIdIsInConversions(videoId)) {
      setLoader(false)
      return setShowModal({
        title: "Video repetido",
        description:
          "La URL del video que has insertado ya se encuentra en la lista de conversiones.",
        state: true
      })
    }
    setLoader(true)
    loadingConversion.videoId = videoId
    setConversions([...conversions, loadingConversion])
    try {
      const data = await getMp3(videoId)
      data.videoId = videoId
      deleteLoadingConversion()
      setConversions([...conversions, data])
      setLoader(false)
      askForFinishedConversion([...conversions, data], videoId)
    } catch (error) {
      setLoader(false)
      console.log(error)
      return setShowModal({
        title: "Error con la conversión",
        description:
          "La conversión ha sufrido un error inesperado. Por favor intenta de nuevo más tarde.",
        state: true
      })
    }
  }

  const getVideoIdFromInput = () => {
    const inputValue = inputRef.current?.value!
    const videoId = inputValue.split("v=")[1]
    return videoId
  }

  const getConversionIndexByTitle = (
    currentConversions: conversionProps[],
    conversionToFind: conversionProps
  ) =>
    currentConversions.findIndex(
      (item: conversionProps) => item.title.toLowerCase() === conversionToFind.title.toLowerCase()
    )

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
