import Image from "next/image"
import uploadIcon from "../public/upload-icon.svg"

export default function DragAndDrop() {
  return (
    <div className="w-full max-w-[1000px] h-[500px] bg-[#8D9EFF] rounded-3xl border-dashed border-[#8D72E1] border-4 flex flex-col gap-2 justify-center items-center shadow-2xl">
      <div className="relative">
        <Image
          className="z-10 relative"
          src={uploadIcon}
          alt="Subir archivos"
          width={70}
          height={70}
          style={{
            filter:
              "invert(27%) sepia(99%) saturate(1091%) hue-rotate(237deg) brightness(87%) contrast(81%)"
          }}
        />
        <div className="w-[40px] h-[30px] bg-[#EEF1FF] absolute left-[20%] top-[25%]"></div>
      </div>
      <p className="text-center text-[#EEF1FF] font-bold text-[18px]">
        Sube un archivo desde tu computadora o arrastralo
      </p>
    </div>
  )
}
