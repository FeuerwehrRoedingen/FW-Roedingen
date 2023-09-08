import Link from 'next/link';
import React from 'react'

import { Indicator } from 'components/indicator';

export default function(){

  return (
    <>
      <div className="page">
        <div className='middle'>
          <Indicator top="50px" left="50px"/>
          <div className="image-container"></div>
        </div>
        <div className="h-[15vh] w-screen sticky border-t-4 border-ral-3000 flex flex-row pl-6">
          <div className='h-full w-fit flex flex-col items-start justify-center'>
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
          <div className='h-full w-full flex flex-row justify-end'>
            <div className='h-full w-[15%] self-end flex flex-row items-center'>
              <a 
                href="https://www.facebook.com/FreiwilligeFeuerwehrTitzLGRoedingen/" 
                className='h-[60%] w-full'
                target="_blank"
              >
                <img src="/img/facebook.webp" alt="Facebook" className='h-full'/>
              </a>
              <a 
                href="https://www.instagram.com/feuerwehr_roedingen" 
                className='h-[60%] w-full'
                target="_blank"
              >
                <img src="/img/instagram.png" alt="Instagram" className='h-full'/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
