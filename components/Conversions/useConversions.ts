export const useConversions = () => {
  const formatDuration = (duration: number) =>
    new Date(duration * 1000).toISOString().substring(14, 19)

  const getVideoThumbnail = (link: string) => {
    const videoId = link.match(/id=(.*?)&/) && [1]
    return videoId ? `https://img.youtube.com/vi/${videoId}/0.jpg` : ""
  }

  return { formatDuration, getVideoThumbnail }
}
