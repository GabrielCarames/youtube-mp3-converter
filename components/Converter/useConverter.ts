import React from "react"
import { getMp3 } from "../../pages/api/converter"

export const useConverter = () => {
  const convertUrl = async (e: React.FormEvent) => {
    e.preventDefault()
    const inputValue = ((e.target as HTMLFormElement)[0] as HTMLInputElement).value
    const videoId = inputValue.split("v=")[1]
    console.log(videoId)
    if (!videoId) return
    try {
      getMp3(videoId)
      setTimeout(() => {
        try {
          const mp3Link = getMp3(videoId)
          console.log(mp3Link)
        } catch (error) {
          console.log(error)
        }
      }, 4000)
    } catch (error) {
      console.log(error)
    }
  }

  return { convertUrl }
}
