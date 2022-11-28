import { useState } from "react"
import Conversions from "../components/Conversions/Conversions"
import PageLayout from "../components/PageLayout/PageLayout"
import Converter from "../components/Converter/Converter"
import { conversionProps } from "../interfaces"
import { Oval } from "react-loader-spinner"

export default function Home() {
  const [conversions, setConversions] = useState<conversionProps[]>([])
  const [loader, setLoader] = useState(false)

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
            setLoader={setLoader}
          />
        </div>
        {conversions.length >= 1 ? (
          <Conversions conversions={conversions} />
        ) : loader ? (
          <Oval
            height={100}
            width={100}
            color="#FF5D73"
            wrapperStyle={{}}
            wrapperClass="mt-10"
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#7C7A7A"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        ) : null}
      </div>
    </PageLayout>
  )
}
