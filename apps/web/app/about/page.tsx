"use client"

import React, { useState } from 'react'
import ReactTooltip from 'react-tooltip'

export default function () {

  return (
    <div className='page p-4 text-xl'>
      <table>
        <tr className='w-fit'>
          <td colSpan={3}>
            <h1 className='text-[40px] border-b-4 border-ral-3000 pb-4 w-[70vw]'>
              Einheitsführung
            </h1>
          </td>
        </tr>
          <Person dienstgrad='HBM' funktion='Einheitsführer' name='Daniel Schnabel' tooltip='Hauptbrandmeister' />
          <Person dienstgrad='HBM' funktion='Stellvertretender Einheitsführer' name='Markus Gärtner' tooltip='Hauptbrandmeister' />
        <tr>
          <td colSpan={3}>
            <h1 className='text-[40px] border-b-4 border-ral-3000 pb-4 mt-10 w-[70vw]'>
              Gerätewarte
            </h1>
          </td>
        </tr>
        <Person dienstgrad='UBM' funktion='1. Gerätewart' name='Dennis Braun' tooltip='Unterbrandmeister' />
        <Person dienstgrad='HBM' funktion='Gerätewart' name='Markus Weckauf' tooltip='Hauptbrandmeister' />
        <tr>
          <td colSpan={3}>
            <h1 className='text-[40px] border-b-4 border-ral-3000 pb-4 mt-10 w-[70vw]'>
              Jugendwarte und Betreuer
            </h1>
          </td>
        </tr>
        <Person dienstgrad='HFM' funktion='Jugendwart' name='Georg Lutz' tooltip='Hauptfeuerwehrmann' />
        <Person dienstgrad='FM' funktion='Betreuer' name='Thomas Düren' tooltip='Feuerwehrmann' />
        <tr>
          <td colSpan={3}>
            <h1 className='text-[40px] border-b-4 border-ral-3000 pb-4 mt-10 w-[70vw]'>
              IT/Social-Media
            </h1>
          </td>
        </tr>
        <Person dienstgrad='FM' funktion='IT Admin/ Social Media Verantworlicher' name='Thomas Düren' tooltip='Feuerwehrmann' />
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
      <td className=''>
        {props.name}
      </td>
      <td className=''>
        {props.funktion}
      </td>
      {tooltip && <ReactTooltip id={id} delayHide={1000} effect='solid' place='right'>
        <span>{props.tooltip}</span>
      </ReactTooltip>}
    </tr>
  )
}