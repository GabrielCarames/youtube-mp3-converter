export const useConversions = () => {
  const formatDuration = (duration: number) =>
    new Date(duration * 1000).toISOString().substring(14, 19)

  const getVideoThumbnail = (link: string) => {
    if (link) {
      const videoId = link.match(/id=(.*?)&/)![1]
      return `https://img.youtube.com/vi/${videoId}/0.jpg`
    } else return ""
  }

  return { formatDuration, getVideoThumbnail }
}
