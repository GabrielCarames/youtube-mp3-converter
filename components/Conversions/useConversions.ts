export const useConversions = () => {
  const formatDuration = (duration: number) =>
    new Date(duration * 1000).toISOString().substring(14, 19)

  const downloadAll = () => {
    const conversions = document.querySelectorAll(".conversion")
    conversions.forEach((conversion: any) => {
      conversion.click()
    })
  }

  return { formatDuration, downloadAll }
}
