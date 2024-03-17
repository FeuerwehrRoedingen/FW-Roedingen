"use client"
import React from "react";
import { Avatar } from "@nextui-org/react";
import { FaClockRotateLeft } from "react-icons/fa6";
import { BsCheck2, BsCheck2All } from "react-icons/bs";

type ISystemMessageProps = {
  content: string;
}
export function SystemMessage(props: ISystemMessageProps){

  return (
    <div className='w-full h-fit flex flex-row items-center justify-center py-2'>
      <div className='w-fit h-fit rounded-lg bg-opacity-50 bg-slate-700 flex items-center justify-center py-2 px-4'>
        <p>{props.content}</p>
      </div>
    </div>
  )
}

type IMyMessageProps = {
  content: string;
  date: string;
}
export function MyMessage(props: IMyMessageProps){
 
  const [state, setState] = React.useState<'sending'|'sent'|'delivered'|'read'>('sending');

  let icon;
  if(state === 'sending'){
    icon = <FaClockRotateLeft className='text-zinc-500'/>
  }
  else if(state === 'sent'){
    icon = <BsCheck2 className='text-zinc-500'/>
  }
  else if(state === 'delivered'){
    icon = <BsCheck2All className='text-zinc-500'/>
  }
  else if(state === 'read'){
    icon = <BsCheck2All className=' text-blue-500'/>
  }

  return (
    <div className='w-full h-fit flex flex-row items-center justify-end py-2'>
      <div className='w-fit h-fit rounded-lg bg-green-800 flex-col items-center justify-end p-2 pt-3 min-w-[120px] max-w-[800px]'>
        <p className='mb-[-10px]'>{props.content}</p>
        <div className='w-full h-fit flex flex-row items-center justify-end'>
          <p className='text-xs text-zinc-400 mr-2'>{props.date}</p>
          {icon}
        </div>
      </div>
    </div>
  )
}

type IOtherMessageProps = {
  content: string;
  date: string;
  name: string;
}
export function OtherMessage(props: IOtherMessageProps){

  return (
    <div className='w-full h-fit py-2 flex flex-row justify-start'>
      <Avatar size='md' />
      <div className='w-fit h-fit rounded-lg bg-gray-800 flex flex-col items-start justify-center p-2 ml-2 max-w-[800px]'>
        <div className='mb-2'>
          <a className='text-ral-3000 text-base cursor-pointer hover:underline'>{props.name}</a>
        </div>
        <p>{props.content}</p>
        <div className='w-full h-fit flex flex-row items-center justify-end'>
          <p className='text-xs text-zinc-400'>{props.date}</p>
        </div>
      </div>
    </div>
  )
}
