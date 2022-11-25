import React from "react"
import { useConverter } from "./useConverter"

export default function Converter() {
  const { convertUrl } = useConverter()

  return (
    <div className="w-full max-w-[1000px] h-[300px] bg-[#494949] p-10 box-border rounded-3xl border-dashed border-[#7C7A7A] border-4 flex flex-col gap-2 justify-center items-center shadow-2xl relative">
      <p className="text-center text-[#EEF1FF] font-bold text-[18px]">
        Sube un archivo desde tu computadora o arrastralo
      </p>
      <form
        className="w-full flex flex-col justify-start items-center"
        onSubmit={(e: React.FormEvent) => convertUrl(e)}
      >
        <input className=" w-full h-14 p-8 rounded-xl outline-none" type="text" />
        <button
          type="submit"
          className="flex justify-center items-center text-white h-1 p-10 uppercase font-bold text-[18px] mt-5 bg-[#FF5D73] rounded-xl"
        >
          Convertir
        </button>
      </form>
    </div>
  )
}
