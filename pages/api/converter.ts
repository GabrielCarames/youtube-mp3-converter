export const getMp3 = async (videoId: string) => {
  const url = `https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}}`
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.API_KEY!,
      "X-RapidAPI-Host": "youtube-mp36.p.rapidapi.com"
    }
  }
  const response = await fetch(url, options)
  return response.json()
}
