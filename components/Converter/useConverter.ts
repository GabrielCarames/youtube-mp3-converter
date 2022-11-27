import React, { Dispatch, SetStateAction, useEffect } from "react"
import { conversionProps } from "../../interfaces"

export const useConverter = (
  conversions: conversionProps[],
  setConversions: Dispatch<SetStateAction<conversionProps[]>>
) => {
  useEffect(() => {
    if (conversions.length <= 0) return
    const timeOut = setTimeout(async () => {
      try {
        // const data = await getMp3(videoId)
        const data = fakeSecondResponse
        const currentConversions = Object.assign([], conversions) as conversionProps[]
        const foundConversionIndex = getConversionIndexByTitle(currentConversions, data)
        console.log(currentConversions[foundConversionIndex])
        if (currentConversions[foundConversionIndex].msg === "in process") {
          currentConversions[foundConversionIndex] = data
          setConversions([...currentConversions])
        }
      } catch (error) {
        console.log(error)
      }
    }, 4000)
    return () => clearTimeout(timeOut)
  }, [conversions, setConversions])

  const convertUrl = async (e: React.FormEvent) => {
    e.preventDefault()
    const inputValue = ((e.target as HTMLFormElement)[0] as HTMLInputElement).value
    const videoId = inputValue.split("v=")[1]
    console.log(videoId)
    if (!videoId) return
    try {
      // const data = await getMp3(videoId)
      const data = fakeFirstResponse
      setConversions((conversions: any) => [...conversions, data])
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

  return { convertUrl }
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
