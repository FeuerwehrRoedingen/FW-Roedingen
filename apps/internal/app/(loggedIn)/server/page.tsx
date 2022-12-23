import Link from 'next/link'
import React from 'react'
import { API } from '../../../src/api';

import './server.css'

async function getData(): Promise<string[]> {
  //@ts-ignore
  try{
    const res = await fetch(API+'/servers');
    return res.json();
  } catch(error){
    console.error(error);
    return []
  }
}

type Props = {}
async function page(props: Props) {

  const servers = await getData();

  const links = servers.map(element => {
    return (
      <Link href={`/server/${element}`} key={element+'link'}>
        <div className='entry' key={element}>
          <a className='name'>{element}</a>
          <img src='/terminal.svg' height={140} width={160}/>
        </div>
      </Link>
    )
  })

  return (
    <div className='page'>
      {links}
    </div>
  )
}

export default page
