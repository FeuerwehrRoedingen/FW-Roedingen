import Link from 'next/link';
import React from 'react'
import { isBrowser } from 'react-device-detect';


export default function(){
  return (
    <>
      <div className="page">
        <div className="image-container">
        </div>
        <div className="footer">
          {isBrowser && <h1>Herzlich Willkommen auf der offiziellen Website der FF-Rödingen</h1>}
          <div className='links'>
            <Link href="/impressum">
              Impressum
            </Link>
            <Link href="/impressum/datenschutz">
              Datenschutz
            </Link>
            <Link href="/impressum/kontakt">
              Kontakt
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
