import Image from "next/image"
import logo from "../public/logo.webp"
import githubIcon from "../public/github-icon.png"

export default function Header() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4">
        <div className="relative flex h-16 items-center justify-between pt-5">
          <div className="flex flex-1 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex justify-center items-center bg-[#07A0C3] rounded-lg w-10">
                <div>
                  <Image className="h-8 w-auto" src={logo} alt="Logo de Free File Converter" />
                </div>
              </div>
              <h3>Free File Converter</h3>
            </div>
            <div className="flex items-center gap-2">
              <Image className="" src={githubIcon} alt="Logo de Github" width={30} height={30} />
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
    </>
  )
}
