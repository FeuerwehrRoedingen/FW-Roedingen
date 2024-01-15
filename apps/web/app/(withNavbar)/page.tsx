import Link from 'next/link';
import React from 'react'
import { FaFacebook, FaInstagram } from 'react-icons/fa';


export default function () {

  return (
    <div className='page flex' >
      <div className='h-4/5'>
        <div className="w-full h-full bg-[#1d1d1d] bg-fixed bg-center bg-no-repeat bg-w-screen bg-home"></div>
      </div>
      <div className="h-1/5 min-h-[150px] absolute bottom-0 left-0 w-full border-t-4 border-ral-3000 flex flex-row items-center justify-between pl-6 bg-gray-950">
        <div className='h-full w-fit flex flex-col items-start justify-center'>
          <Link href="/impressum" className='hover:underline active:text-ral-3000'>
            Impressum
          </Link>
          <Link href="/impressum/datenschutz" className='hover:underline active:text-ral-3000'>
            Datenschutz
          </Link>
          <Link href="/impressum/kontakt" className='hover:underline active:text-ral-3000'>
            Kontakt
          </Link>
        </div>
        <div className='h-full w-[40%] max-w-[200px] flex flex-row items-center justify-end'>
          <a href="https://www.facebook.com/FreiwilligeFeuerwehrTitzLGRoedingen/" className='m-2'>
            <FaFacebook color='silver' size="100%"/>
          </a>
          <a href="https://www.instagram.com/feuerwehr_roedingen" className='m-2 mr-4'>
            <FaInstagram color='silver' size='100%'/>
          </a>
        </div>
      </div>
    </div>
  )
}
