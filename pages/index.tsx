import DragAndDrop from "../components/Converter/Converter"
import PageLayout from "../components/PageLayout/PageLayout"

export default function Home() {
  return (
    <PageLayout>
      <div className="w-auto h-full px-5 box-border flex flex-col justify-center items-center">
        <div className="w-full flex flex-col gap-10 items-center">
          <div className="w-full h-auto flex flex-col items-center">
            <h1 className="text-[32px] font-bold">Youtube MP3 Converter</h1>
            <p>Convierte y descarga cualquier video de Youtube a formato MP3</p>
          </div>
          <DragAndDrop />
        </div>
      </div>
    </PageLayout>
  )
}
