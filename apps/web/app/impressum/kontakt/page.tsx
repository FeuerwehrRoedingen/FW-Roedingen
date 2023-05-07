import React, { Component } from 'react'
import KontaktFormular from '../../../components/Kontaktformular';

import './kontakt.css'

interface IProps {}

export default function(props: IProps){

  const to='info@feuerwehr-roedingen.de';
  const subject='Webseite'
  const body='\n\n\n Gesendet durch den Email Link der Webseite'

  return (
    <div className='kontakt_container'>
      <div style={{marginTop: '10px'}}>
        Sie können uns per Email erreichen unter {to}<br/>
      </div>
      <a 
        style={{color: '#ff0000', marginLeft: '10px '}}
        href={`mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`}
      >
        Email senden
      </a>
      <div>
        Oder das Kontakformular verwenden
      </div>
      <KontaktFormular />
    </div>
  )
}