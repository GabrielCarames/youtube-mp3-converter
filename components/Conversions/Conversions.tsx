import Image from "next/image"
import { conversionProps } from "../../interfaces"
import { useConversions } from "./useConversions"
import { Oval } from "react-loader-spinner"
import downloadIcon from "../../public/download-icon.svg"
import downloadAllIcon from "../../public/download-all-icon.svg"

export default function Conversions({ conversions }: { conversions: conversionProps[] }) {
  const { formatDuration, getVideoThumbnail, downloadAll } = useConversions()

  return (
    <div className="w-full max-w-[1200px] flex flex-col items-center ">
      <div className="w-full bg-[#7C7A7A] flex flex-col items-center gap-4 px-4 py-4 box-border rounded-3xl">
        <h1 className="text-[22px] text-white leading-[50px]">Conversiones</h1>
        <ul className="w-full flex flex-wrap xl:justify-center justify-between items-center gap-4">
          {conversions.map((conversion, index) => {
            return (
              <li
                className="w-full max-w-[570px] flex flex-wrap justify-center gap-8 bg-[#494949] p-5 px-2 box-border text-white rounded-3xl border-dashed border-[#7C7A7A] border-4"
                key={index}
              >
                <header className="flex justify-centera items-center gap-5 pr-4 box-border">
                  {getVideoThumbnail(conversion.link) ? (
                    <Image
                      className=""
                      src={getVideoThumbnail(conversion.link)}
                      alt="Miniatura"
                      width={60}
                      height={60}
                    />
                  ) : (
                    <Oval
                      height={40}
                      width={40}
                      color="#FF5D73"
                      wrapperStyle={{}}
                      wrapperClass="oval-loader"
                      visible={true}
                      ariaLabel="oval-loading"
                      secondaryColor="#7C7A7A"
                      strokeWidth={2}
                      strokeWidthSecondary={2}
                    />
                  )}
                  <div>
                    <h2 className="font-bold">{conversion.title}</h2>
                    <p>Duración: {formatDuration(conversion.duration)}</p>
                  </div>
                </header>
                <a
                  className="w-full max-w-[200px] p-5 box-border rounded-lg bg-[#FF5D73] font-bold flex items-center gap-4 conversion"
                  href=""
                  download={conversion.link}
                >
                  Descargar MP3
                  <Image
                    src={downloadIcon}
                    alt="Descargar MP3"
                    width={20}
                    height={20}
                    style={{
                      filter:
                        " invert(99%) sepia(1%) saturate(0%) hue-rotate(32deg) brightness(114%) contrast(100%)"
                    }}
                  />
                </a>
              </li>
            )
          })}
        </ul>
        {conversions.length >= 4 ? (
          <button
            className="w-full max-w-[200px] p-5 box-border rounded-lg bg-[#FF5D73] font-bold flex items-center gap-4 text-white"
            onClick={() => downloadAll()}
          >
            Descargar todo
            <Image
              src={downloadAllIcon}
              alt="Descargar todos los archivos"
              width={20}
              height={20}
              style={{
                filter:
                  " invert(99%) sepia(1%) saturate(0%) hue-rotate(32deg) brightness(114%) contrast(100%)"
              }}
            />
          </button>
        ) : null}
      </div>
    </div>
  )
}
