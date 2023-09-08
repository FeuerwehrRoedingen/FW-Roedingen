import React from 'react'
import Input from '@mui/material/Input'

type Props = {}

export default function page({}: Props) {
  return (
    <div className='h-full w-full flex items-center justify-center'>
      <form className='h-[90%] w-[95%] border-[2px] border-silver rounded-2xl flex flex-col items-center'>
        <h1 className='mt-[-28px] text-silver text-5xl bg-[#1f1f1f]'>Signup</h1>
        <div className='flex flex-col h-full w-full justify-evenly items-center'>
          <Input placeholder='Vorname'/>
          <Input placeholder='Nachname'/>
          <Input placeholder='Email'/>
          <Input placeholder='Passwort'/>
          <Input placeholder='Passwort wiederholen'/>

        </div>
      </form>
    </div>
  )
}