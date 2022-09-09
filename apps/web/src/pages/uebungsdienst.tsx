import React, { Component } from 'react'
import { isBrowser } from 'react-device-detect'
import PDF from '../../public/doc/Beitrittsformular_JF.pdf'
type Props = {}
type State = {}

export default class uebungsdienst extends Component<Props, State> {
  state = {}

  render() {
    return (
      <>
        <div className={isBrowser? 'page':'page h-full'}>
          <h1 className={`heading w-screen ${!isBrowser && 'text-xl'}`}>
            Übungsdienst der Aktiven
          </h1>
          <div className='flex flex-row justify-between items-center'>
            <div className={`text-silver ${isBrowser? 'max-w-[65vw] text-xl px-4 py-4':'px-2 py-2'}`}>
              Die aktiven Mitglieder der Löschgruppe Rödingen üben in geraden Kalenderwochen 
              <a className='underline underline-offset-4 decoration-ral-3020'> mittwochs von 19:00 bis 22:00 Uhr </a>
              am Feuerwehr Gerätehaus in Rödingen.
              Jeder der gerne etwas gutes für die Gemeinde tun und Menschen in Not helfen möchte ist herzlich eingeladen
              der Freiwilligen Feuerwehr Titz beizutreten.
              Wer sich erst einmal ein Bild der Feuerwehr machen möchte ist ebenfalls herzlich zum Übungsabend eingeladen.
              Wärend des Übungsdienstes werden Themen wie Fahrzeuggerätekunde, Brandbekämpfung, Technische-Hilfeleistung,
              Erste-Hilfe, Waldbrände und Brandlehre behandelt um für jeden Fall gut vorbereitet zu sein.
            </div>
          </div>
          <h1 className={`heading w-screen ${!isBrowser && 'text-xl'}`}>
            Übungsdienst der Jugenfeuerwehr
          </h1>
          <div className={`text-silver ${isBrowser? 'max-w-[65vw] text-xl  px-4 py-4':'px-2 py-2'}`}>
            Die Jugendfeuerwehr der Löschgruppe Rödingen übt jede Woche Donnerstag von 18:00 bis 20:00 Uhr<br/>
            Ausgenommen sind Schulferien.<br/>
            <a 
              href='/doc/Beitrittsformular_JF.pdf' 
              target='_blank'
              className='text-ral-1026 mt-10 block'
            >
              Aufnahmeformular JF
            </a>
          </div>
        </div>
      </>
    )
  }
}