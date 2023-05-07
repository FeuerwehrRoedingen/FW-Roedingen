import React, { Component } from 'react'
import HomeButton from '../../components/HomeButton';

type Props = {}

export default function (props: Props) {

  const to = 'info@feuerwehr-roedingen.de';
  const subject = 'Webseite'
  const body = '\n\n\n Gesendet durch den Email Link der Webseite'

  return (
    <div className='bg-gray-900 h-screen px-4 py-4 text-silver'>
      <HomeButton />
      <div className='mt-10'>
        Sie können uns per Email erreichen unter {to}<br />
      </div>
      <a
        className='text-ral-3020 ml-2'
        href={`mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`}
      >
        Email senden
      </a>
    </div>
  )
}
