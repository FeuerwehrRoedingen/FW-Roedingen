import Link from 'next/link'
import React from 'react'

import './server.css'

async function getData(): Promise<string[]> {
  //@ts-ignore
  const res = await fetch('http://localhost:3025/servers');
  return res.json();
}

type Props = {}
async function page(props: Props) {

  const pis = await getData();

  const links = pis.map(element => {
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
