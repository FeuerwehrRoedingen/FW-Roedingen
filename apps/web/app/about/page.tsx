"use client"

import React, { useState } from 'react'
import { isBrowser } from 'react-device-detect'
import ReactTooltip from 'react-tooltip'

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

type PersonProps = {
  dienstgrad: string;
  funktion: string
  name: string;
  tooltip: string;
}
const Person: React.FC<PersonProps> = (props) => {
  const [tooltip, showTooltip] = useState(true);
  const id = React.useId();

  return (
    <tr className='w-fit my-4'>
      <td
        data-tip data-for={id}
        onMouseLeave={() => {
          showTooltip(false);
          setTimeout(() => showTooltip(true), 50);
        }}
      >
        <p className='w-fit pl-4 text-ral-1026 cursor-pointer'>
          {props.dienstgrad}
        </p>
      </td>
      <td className='w-fit whitespace-nowrap px-1'>
        {props.name}
      </td>
      <td className='w-fit whitespace-nowrap'>
        {props.funktion}
      </td>
      {tooltip && <ReactTooltip id={id} delayHide={1000} effect='solid' place='right'>
        <span>{props.tooltip}</span>
      </ReactTooltip>}
    </tr>
  )
}