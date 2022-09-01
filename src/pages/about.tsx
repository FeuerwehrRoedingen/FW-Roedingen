import React, { Component, useState } from 'react'
import ReactTooltip from 'react-tooltip'

type Props = {}
type State = {}

export default class about extends Component<Props, State> {
  state = {}

  render() {
    return (
      <>
        <div className='page pt-[17vh] flex flex-col justify-between'>
          <div>
            <div className='text-silver'>
              <h1 className='heading my-4'>
                Einheitsführung
              </h1>
              <Person dienstgrad='BI' funktion='Einheitsführer' name='Thomas Lessenich' tooltip='Brandinspektor'/>
              <Person dienstgrad='BOI' funktion='Stellvertretender Einheitsführer' name='Frank Swoboda' tooltip='Brandoberinspektor'/>
            </div>
            <div className='text-silver'>
              <h1 className='heading my-4'>
                Gerätewarte
              </h1>
              <Person dienstgrad='UBM' funktion='Gerätewart' name='Dennis Braun' tooltip='Unterbrandmeister' id='UBM1'/>
              <Person dienstgrad='HBM' funktion='Gerätewart' name='Markus Gärtner' tooltip='Hauptbrandmeister'/>
            </div>
            <div className='text-silver'>
              <h1 className='heading my-4'>
                Jugendwarte und Betreuer
              </h1>
              <Person dienstgrad='HFM' funktion='Jugendwart' name='Georg Lutz' tooltip='Hauptfeuerwehrmann'/>
              <Person dienstgrad='FM' funktion='Betreuer' name='Thomas Düren' tooltip='Feuerwehrmann'/>
              <Person dienstgrad='UBM' funktion='Betreuer' name='Dominik Jung' tooltip='Unterbrandmeister' id='UBM2'/>
            </div>
          </div>
          <div className='h-fit min-h-[20vh]'>
            <h1 className='heading'>Kontakt </h1>
            <a></a>
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
    <div className='px-10 pt-2 text-xl flex flex-row'>
      <a 
      data-tip data-for={props.id || props.dienstgrad} 
      className='text-ral-1026 pr-2 cursor-pointer w-14 block'
      onMouseLeave={() => {
        showTooltip(false);
        setTimeout(() => showTooltip(true), 50);
      }}
      >
        {props.dienstgrad}
      </a>
      <a className='block w-48'>
       {props.name}
      </a> - {props.funktion}
      {tooltip && <ReactTooltip id={props.id || props.dienstgrad} delayHide={1000} effect='solid'>
        <span>{props.tooltip}</span>
      </ReactTooltip>}
    </div>
  )
}