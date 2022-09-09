import React, { Component, useState } from 'react'
import { isBrowser } from 'react-device-detect'
import ReactTooltip from 'react-tooltip'

type Props = {}
type State = {}

export default class about extends Component<Props, State> {
  state = {}

  render() {
    return (
      <>
        <div className='page pt-[17vh] pb-4 flex flex-col justify-between min-h-fit'>
          <div>
            <div className='text-silver'>
              <h1 className={`heading my-4 ${!isBrowser&&'text-2xl'}`}>
                Einheitsführung
              </h1>
              <Person dienstgrad='BI' funktion='Einheitsführer' name='Thomas Lessenich' tooltip='Brandinspektor'/>
              <Person dienstgrad='BOI' funktion='Stellvertretender Einheitsführer' name='Frank Swoboda' tooltip='Brandoberinspektor'/>
            </div>
            <div className='text-silver'>
              <h1 className={`heading my-4 ${!isBrowser&&'text-2xl'}`}>
                Gerätewarte
              </h1>
              <Person dienstgrad='UBM' funktion='Gerätewart' name='Dennis Braun' tooltip='Unterbrandmeister' id='UBM1'/>
              <Person dienstgrad='HBM' funktion='Gerätewart' name='Markus Gärtner' tooltip='Hauptbrandmeister'/>
              <Person dienstgrad='BM' funktion='Gerätewart' name='Markus Weckauf' tooltip='Brandmeister'/>
            </div>
            <div className='text-silver'>
              <h1 className={`heading my-4 ${!isBrowser&&'text-2xl'}`}>
                Jugendwarte und Betreuer
              </h1>
              <Person dienstgrad='HFM' funktion='Jugendwart' name='Georg Lutz' tooltip='Hauptfeuerwehrmann'/>
              <Person dienstgrad='FM' funktion='Betreuer' name='Thomas Düren' tooltip='Feuerwehrmann'/>
              <Person dienstgrad='UBM' funktion='Betreuer' name='Dominik Jung' tooltip='Unterbrandmeister' id='UBM2'/>
            </div>
          </div>
        </div>
      </>
    )
  }
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
    <div className='px-4 pt-2 text-xl flex flex-row items-center w-screen'>
      <div 
      data-tip data-for={props.id || props.dienstgrad} 
      className='text-ral-1026 cursor-pointer w-14'
      onMouseLeave={() => {
        showTooltip(false);
        setTimeout(() => showTooltip(true), 50);
      }}
      >
        {props.dienstgrad}
      </div>
      <div className={isBrowser? 'flex flex-row': 'flex-flex-col pl-2 text-lg w-full'}>
        <div className={isBrowser?'w-52':'w-fit mt-1'}>
          {props.name}
        </div>
        <div className='w-fit mb-1'>
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