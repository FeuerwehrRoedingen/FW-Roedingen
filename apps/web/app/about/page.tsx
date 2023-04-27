"use client"

import React, { useState } from 'react'
import { isBrowser } from 'react-device-detect'
import ReactTooltip from 'react-tooltip'

import './about.css'

export default function() {

  return (
    <>
      <div className='aboutContainer'>
        <div className='group'>
          <h1 className={isBrowser?'groupHeading':'groupHeadingMobile'}>
            Einheitsführung
          </h1>
          <Person dienstgrad='BI' funktion='Einheitsführer' name='Thomas Lessenich' tooltip='Brandinspektor'/>
          <Person dienstgrad='BOI' funktion='Stellvertretender Einheitsführer' name='Frank Swoboda' tooltip='Brandoberinspektor'/>
        </div>
        <div>
          <h1 className={isBrowser?'groupHeading':'groupHeadingMobile'}>
            Gerätewarte
          </h1>
          <Person dienstgrad='UBM' funktion='Gerätewart' name='Dennis Braun' tooltip='Unterbrandmeister' id='UBM1'/>
          <Person dienstgrad='HBM' funktion='Gerätewart' name='Markus Gärtner' tooltip='Hauptbrandmeister' id='HBM1'/>
          <Person dienstgrad='HFM' funktion='Gerätewart' name='Alexander Holzportz' tooltip='Hauptfeuerwehrmann' id='HFM1'/>
          <Person dienstgrad='HBM' funktion='Gerätewart' name='Markus Weckauf' tooltip='Brandmeister' id='HBM2'/>
        </div>
        <div>
          <h1 className={isBrowser?'groupHeading':'groupHeadingMobile'}>
            Jugendwarte und Betreuer
          </h1>
          <Person dienstgrad='HFM' funktion='Jugendwart' name='Georg Lutz' tooltip='Hauptfeuerwehrmann' id='HFM2'/>
          <Person dienstgrad='FM' funktion='Betreuer' name='Thomas Düren' tooltip='Feuerwehrmann'/>
          <Person dienstgrad='UBM' funktion='Betreuer' name='Dominik Jung' tooltip='Unterbrandmeister' id='UBM2'/>
        </div>
      </div>
    </>
  )
}

type PersonProps = {
  dienstgrad: string;
  funktion: string
  id?: string;
  name: string;
  tooltip: string;
}
const Person: React.FC<PersonProps> = (props) => {
  const [tooltip, showTooltip] = useState(true);

  return (
    <div className='person'>
      <div 
      data-tip data-for={props.id || props.dienstgrad} 
      className='rank'
      onMouseLeave={() => {
        showTooltip(false);
        setTimeout(() => showTooltip(true), 50);
      }}
      >
        {props.dienstgrad}
      </div>
      <div className={isBrowser? 'data': 'dataMobile'}>
        <div className={isBrowser?'name':'nameMobile'}>
          {props.name}
        </div>
        <div className='function'>
          {isBrowser && '-'}
          {props.funktion}
        </div>
      </div>
      {tooltip && <ReactTooltip id={props.id || props.dienstgrad} delayHide={1000} effect='solid'>
        <span>{props.tooltip}</span>
      </ReactTooltip>}
    </div>
  )
}