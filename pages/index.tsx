import { useRef, useState } from "react"
import Conversions from "../components/Conversions/Conversions"
import Converter from "../components/Converter/Converter"
import PageLayout from "../components/PageLayout/PageLayout"
import { conversionProps } from "../interfaces"

export default function Home() {
  const [conversions, setConversions] = useState<conversionProps[]>([])
  const inputRef = useRef<HTMLInputElement | null>(null)

  return (
    <PageLayout>
      <div className="w-auto h-full px-5 box-border flex flex-col justify-center items-center gap-10">
        <div className="w-full flex flex-col gap-10 items-center">
          <div className="w-full h-auto flex flex-col items-center">
            <h1 className="text-[32px] font-bold text-center mt-[50px] ">Youtube MP3 Converter</h1>
            <p className="text-center">
              Convierte y descarga cualquier video de Youtube a formato MP3
            </p>
          </div>
          <Converter
            conversions={conversions}
            setConversions={setConversions}
            inputRef={inputRef}
          />
        </div>
        {conversions.length >= 1 ? (
          <Conversions conversions={conversions} inputRef={inputRef} />
        ) : null}
      </div>
    </PageLayout>
  )
}
