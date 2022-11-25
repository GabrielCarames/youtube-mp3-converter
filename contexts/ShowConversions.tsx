import { useContext } from "react"
import { createContext, useState } from "react"

interface ShowConversionsContext {
  showConversions: boolean
  setShowConversions?: (value: boolean) => void
}

const ShowConversionsContext = createContext<ShowConversionsContext>({
  showConversions: true
})

const ShowConversionsProvider = ({ children }: { children: React.ReactNode }) => {
  const [showConversions, setShowConversions] = useState(true)
  return (
    <ShowConversionsContext.Provider value={{ showConversions, setShowConversions }}>
      {children}
    </ShowConversionsContext.Provider>
  )
}

const useShowConversionsContext = () => useContext(ShowConversionsContext)

export { ShowConversionsProvider, useShowConversionsContext }
