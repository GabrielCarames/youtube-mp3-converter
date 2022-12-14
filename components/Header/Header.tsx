import Image from "next/image"
import githubIcon from "../../public/github-icon.png"
import logo from "../../public/logo.png"

export default function Header() {
  return (
    <header className="w-full px-4 h-[64px]">
      <div className="relative flex h-16 items-center justify-center pt-5">
        <div className="w-full max-w-[1200px] flex flex-1 items-center justify-between">
          <div className="flex items-center gap-2">
            <Image className="h-10 w-auto" src={logo} alt="Logo de Free File Converter" />
            <h3>Youtube MP3 Converter</h3>
          </div>
          <a
            className="flex items-center gap-2"
            href="https://github.com/GabrielCarames/youtube-mp3-converter"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              className=""
              src={githubIcon}
              alt="Logo de Github"
              width={30}
              height={30}
              style={{
                filter:
                  " invert(54%) sepia(49%) saturate(3953%) hue-rotate(319deg) brightness(105%) contrast(101%)"
              }}
            />
            <span className="sm:hidden">Repositorio</span>
          </a>
        </div>
      </div>
    </header>
  )
}
