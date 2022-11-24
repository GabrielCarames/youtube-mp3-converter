import Image from "next/image"
import logo from "../public/logo.webp"
import githubIcon from "../public/github-icon.png"

export default function Header() {
  return (
    <div className="w-full px-4 absolute top-0 left-0">
      <div className="relative flex h-16 items-center justify-center pt-5">
        <div className="w-full max-w-[1200px] flex flex-1 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex justify-center items-center bg-[#8D72E1] rounded-lg w-10">
              <Image className="h-8 w-auto" src={logo} alt="Logo de Free File Converter" />
            </div>
            <h3>Free File Converter</h3>
          </div>
          <div className="flex items-center gap-2">
            <Image
              className=""
              src={githubIcon}
              alt="Logo de Github"
              width={30}
              height={30}
              style={{
                filter:
                  "invert(31%) sepia(14%) saturate(3812%) hue-rotate(224deg) brightness(101%) contrast(92%)"
              }}
            />
            <a
              href="https://github.com/GabrielCarames/free-file-converter"
              target="_blank"
              rel="noreferrer"
            >
              Repositiorio
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
