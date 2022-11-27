import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { conversionProps } from "../../interfaces"
import { getMp3 } from "../../pages/api/converter"

export const useConverter = (
  conversions: conversionProps[],
  setConversions: Dispatch<SetStateAction<conversionProps[]>>
) => {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (conversions.length <= 0) return
    const timeOut = setTimeout(async () => {
      askForFinishedConversion()
    }, 4000)
    return () => clearTimeout(timeOut)
  }, [conversions])

  const askForFinishedConversion = () => {
    try {
      // const data = await getMp3(videoId)
      const data = fakeSecondResponse as conversionProps
      const currentConversions = Object.assign([], conversions) as conversionProps[]
      const foundConversionIndex = getConversionIndexByTitle(currentConversions, data)
      if (currentConversions[foundConversionIndex].msg === "in process") {
        currentConversions[foundConversionIndex] = data
        setConversions([...currentConversions])
      }
    } catch (error) {
      console.log(error)
    }
  }

  const convertUrl = async (e: React.FormEvent) => {
    e.preventDefault()
    const inputValue = ((e.target as HTMLFormElement)[0] as HTMLInputElement).value
    const videoId = getVideoIdFromUserUrl(inputValue)
    if (!videoId) return
    if (checkIfVideoIdIsInConversions(videoId)) return setShowModal(true)
    try {
      // const data = await getMp3(videoId)
      const data = fakeFirstResponse as conversionProps
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

  const getVideoIdFromUserUrl = (link: string) => link.split("v=")[1]
  const getVideoIdFromResponseLink = (link: string) => link.match(/id=(.*?)&/)![1]
  const checkIfVideoIdIsInConversions = (videoId: string) => {
    const repeatedConversion = conversions.find((item: conversionProps) => item.videoId === videoId)
    console.log(repeatedConversion)
    return repeatedConversion ? true : false
  }

  return { convertUrl, showModal, setShowModal }
}

const fakeFirstResponse = {
  link: "",
  title: "Supabase in 100 Seconds",
  progress: 0,
  duration: 156.456,
  status: "processing",
  msg: "in process"
}

const fakeSecondResponse = {
  link: "https://gamma.123tokyo.xyz/dl.php?id=zBZgdTb-dns&u=https%3A%2F%2Fmdelta.123tokyo.xyz%2Fget.php%2F7%2F0a%2FzBZgdTb-dns.mp3&cid=MmEwMTo0Zjg6YzAxMDo5ZmE2OjoxfE5BfERF&h=IwHNzQgSb2ecrxKn8YMfcg&s=1669479450&n=Supabase%20in%20100%20Seconds",
  title: "Supabase in 100 Seconds",
  progress: 0,
  duration: 156.456,
  status: "ok",
  msg: "success"
}
