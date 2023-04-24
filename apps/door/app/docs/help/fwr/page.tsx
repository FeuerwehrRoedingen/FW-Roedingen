import React from 'react'
import ReactMarkdown from 'react-markdown'
import RemarkGFM from 'remark-gfm'
 
import '../help.css'

async function getData() {
  const res = await fetch('http://localhost:3000/md/fwr.md', );

  if(!res.ok){
    throw new Error('failed to fetch data');
  }

  return res.text();
}

type Props = {}
export default async function FWRHelp({}: Props) {

  const data = await getData()

  return (
    <div>
      <div>
        <ReactMarkdown remarkPlugins={[RemarkGFM]}>
          {data}
        </ReactMarkdown>
      </div>
    </div>
  )
}