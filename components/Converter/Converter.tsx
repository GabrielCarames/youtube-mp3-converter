import React, { Dispatch, SetStateAction, useRef } from "react"
import Modal from "../Modal/Modal"
import { conversionProps } from "../../interfaces"
import { useConverter } from "./useConverter"

export default function Converter({
  conversions,
  setConversions,
  setLoader
}: {
  conversions: conversionProps[]
  setConversions: Dispatch<SetStateAction<conversionProps[]>>
  setLoader: Dispatch<SetStateAction<boolean>>
}) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { convertUrl, showModal, setShowModal } = useConverter(
    conversions,
    setConversions,
    inputRef,
    setLoader
  )

  return (
    <div className="w-full max-w-[1000px] h-[300px] bg-[#494949] p-10 box-border rounded-3xl border-dashed border-[#7C7A7A] border-4 flex flex-col gap-2 justify-center items-center shadow-2xl relative">
      <p className="text-center text-[#EEF1FF] font-bold text-[18px]">
        Inserta la URL del video que deseas convertir
      </p>
      <form
        className="w-full flex flex-col justify-start items-center"
        onSubmit={(e: React.FormEvent) => {
          convertUrl(e)
          setLoader(true)
        }}
      >
        <input
          className=" w-full h-14 p-8 rounded-xl outline-none"
          type="text"
          placeholder="Ejemplo: https://www.youtube.com/watch?v=zBZgdTb-dns"
          required
          ref={inputRef as React.MutableRefObject<HTMLInputElement>}
        />
        <button
          type="submit"
          className="flex justify-center items-center text-white h-1 p-10 uppercase font-bold text-[18px] mt-5 bg-[#FF5D73] rounded-xl"
        >
          Convertir
        </button>
      </form>
      {showModal ? <Modal setShowModal={setShowModal} /> : null}
    </div>
  )
}
