import Link from 'next/link'
import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'

export default function HomeButton() {
  return (
      <Link href='/home'>
        <div className='flex-row flex text-lg items-center cursor-pointer text-ral-1026'>
          <IoIosArrowBack size={20}/>
          Home
        </div>
      </Link>
  )
}
