import Image from "next/image"
import PageLayout from "../components/PageLayout"
import uploadIcon from "../public/upload-icon.svg"

export default function Home() {
  return (
    <PageLayout>
      <div className="w-auto h-full px-5 box-border flex flex-col justify-center items-center">
        <div className="w-full flex flex-col gap-10 items-center">
          <div className="w-full h-auto flex flex-col items-center">
            <h1 className="text-[32px] font-bold">Free File Converter</h1>
            <p>Convierte cualquier archivo a otro formato</p>
          </div>
          <div className="w-full max-w-[1000px] h-[500px] bg-[#b9e0ff] rounded-3xl border-dashed border-[#8D72E1] border-4 flex flex-col gap-2 justify-center items-center">
            <Image
              src={uploadIcon}
              alt="Subir archivos"
              width={70}
              height={70}
              style={{
                filter:
                  "invert(31%) sepia(14%) saturate(3812%) hue-rotate(224deg) brightness(101%) contrast(92%)"
              }}
            />
            <p className="text-center">Sube un archivo desde tu computadora o arrastralo</p>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
