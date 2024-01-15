import React from 'react'
import { isBrowser } from 'react-device-detect'
import Person from './person'

export default function () {

  return (
    <div className={`page p-4 ${isBrowser? 'text-xl': ''} overflow-scroll`}>
      <table>
        <tr className=''>
          <td colSpan={3}>
            <h1 className={`${isBrowser?'text-[40px]':'text-2xl'} border-b-4 border-ral-3000 ${isBrowser ? 'pb-4': 'pb-2'} w-full`}>
              Einheitsführung
            </h1>
          </td>
        </tr>
          <Person dienstgrad='HBM' funktion='Einheitsführer' name='Daniel Schnabel' tooltip='Hauptbrandmeister' />
          <Person dienstgrad='HBM' funktion={isBrowser? 'stellvertretender Einheitsführer': 'stv. Einheitsführer'} name='Markus Gärtner' tooltip='Hauptbrandmeister' />
        <tr>
          <td colSpan={3}>
            <h1 className={`${isBrowser?'text-[40px]':'text-2xl'} border-b-4 border-ral-3000 ${isBrowser ? 'pb-4': 'pb-2'} mt-10 w-full`}>
              Gerätewarte
            </h1>
          </td>
        </tr>
        <Person dienstgrad='UBM' funktion='1. Gerätewart' name='Dennis Braun' tooltip='Unterbrandmeister' />
        <Person dienstgrad='HBM' funktion='Gerätewart' name='Markus Weckauf' tooltip='Hauptbrandmeister' />
        <tr>
          <td colSpan={3}>
            <h1 className={`${isBrowser?'text-[40px]':'text-2xl'} border-b-4 border-ral-3000 ${isBrowser ? 'pb-4': 'pb-2'} mt-10 w-full`}>
              Jugendwarte und Betreuer
            </h1>
          </td>
        </tr>
        <Person dienstgrad='HFM' funktion='Jugendwart' name='Georg Lutz' tooltip='Hauptfeuerwehrmann' />
        <Person dienstgrad='FM' funktion='Betreuer' name='Thomas Düren' tooltip='Feuerwehrmann' />
        <tr>
          <td colSpan={3}>
            <h1 className={`${isBrowser?'text-[40px]':'text-2xl'} border-b-4 border-ral-3000 ${isBrowser ? 'pb-4': 'pb-2'} mt-10 w-full`}>
              IT / Social Media
            </h1>
          </td>
        </tr>
        <Person dienstgrad='FM' funktion='IT Admin' name='Thomas Düren' tooltip='Feuerwehrmann' />
        <Person dienstgrad='HBM' funktion='IT Admin' name='Daniel Schnabel' tooltip='Hauptbrandmeister' />
        <Person dienstgrad='OFM' funktion='IT Admin' name='Thomas Peredery' tooltip='Oberfeuerwehrmann' />
      </table>
    </div>
  )
}
