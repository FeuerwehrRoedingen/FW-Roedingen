"use client"

import React from 'react'
import { useSession } from 'next-auth/react'

import './index.css'

type Props = {}
export default function page(props: Props) {
  
  const { data, status } = useSession();

  if(status === 'authenticated'){

  }

  return (
    <div className='page'>
      <div className='container'>

      </div>
      <div className='footer'>
        <div className='item'>
          <div className='align'>
            <a>Impressum</a>
            <a>Dtaenschutz</a>
          </div>
        </div>
        <div className='item'>
          <a>Feuerwehr Roedingen</a>
        </div>
        <div className='item'>
          <div className='align'>
            <a>account erstellen</a>
            <a href='mailto:support@feuerwehr-roedingen.de'>support</a>
          </div>
        </div>
      </div>
    </div>
  )
}
