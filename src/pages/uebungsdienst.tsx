import React, { Component } from 'react'
import { Calendar } from 'react-calendar';

type Props = {}

type State = {}

export default class uebungsdienst extends Component<Props, State> {
  state = {}

  render() {
    return (
      <>
        <div className="page pt-[17vh]">
          <h1 className='heading'>
            Übungsdienst der Aktiven
          </h1>
          <div className='flex flex-row justify-between items-center'>
            <div className='text-silver pl-4 pt-4 text-xl max-w-[65vw]'>
              Die aktiven Mitglieder der Löschgruppe Rödingen üben in geraden Kalenderwochen <a className='underline underline-offset-4 decoration-ral-3020'>mittwochs von 19:00 bis 22:00 Uhr.</a>
              Jeder der gerne etwas gutes für die Gemeinde tun und Menschen in Not helfen möchte ist herzlich eingeladen
              der Freiwilligen Feuerwehr Titz beizutreten.
              Wer sich erst einmal ein Bild der Feuerwehr machen möchte ist ebenfalls herzlich zum Übungsabend eingeladen.
              Wärend des Übungsdienstes werden Themen wie Fahrzeuggerätekunde, Brandbekämpfung, Technische-Hilfeleistung,
              Erste-Hilfe, Waldbrände und Brandlehre behandelt um für jeden Fall gut vorbereitet zu sein.
            </div>
            <Calendar className='mr-4 my-4'/>
          </div>
          <h1 className='heading'>
            Übungsdienst der Jugenfeuerwehr
          </h1>
          <div className='text-silver pl-4 pt-4 text-xl'>
            Die Jugendfeuerwehr der Löschgruppe Rödingen übt jede Woche Donnerstag von 18:00 bis 20:00 Uhr<br/>
            Ausgenommen sind Schulferien.<br/>

            <a 
              href='/doc/Beitrittsformular_JF.pdf' 
              download='Aufnahmeantrag JF 2021'
              className='text-ral-1026 mt-20 block'
            >
              Aufnahmeformular
            </a>
          </div>
        </div>
      </>
    )
  }
}