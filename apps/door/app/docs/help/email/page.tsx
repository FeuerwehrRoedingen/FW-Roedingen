import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGFM from 'remark-gfm'

import '../help.css'

async function getData() {
  const res = await fetch('http://localhost:3000/md/mail.md', );

  if(!res.ok){
    throw new Error('failed to fetch data');
  }

  return res.text();
}

type Props = {}
export default async function EmailHelp({}: Props) {

  const data = await getData()

  return (
    <div className='helpPage'>
      <div className='markdownContainer'>
        <ReactMarkdown remarkPlugins={[remarkGFM]}>
          {data}
        </ReactMarkdown>
      </div>
    </div>
  )
}
