import { conversionProps } from "../../interfaces"

export default function Conversions({ conversions }: { conversions: conversionProps[] }) {
  return (
    <div>
      <h1>Conversions</h1>
      <ul>
        {conversions.map((conversion, index) => {
          return (
            <li key={index}>
              <h2>{conversion.title}</h2>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
