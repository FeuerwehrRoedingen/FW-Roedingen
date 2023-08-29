import React from 'react'


type Props = {}
export default function page({}: Props) {

  const doorLink = process.env.NODE_ENV === 'production' ? 'https://door.feuerwehr-roedingen.de': 'http://localhost:3003'; 
  const internalLink = process.env.NODE_ENV === 'production' ? 'https://internal.feuerwehr-roedingen.de/api/auth/login': 'http://localhost:3002/api/auth/login'; 
  const managementLink = process.env.NODE_ENV === 'production' ? 'https://management.feuerwehr-roedingen.de/api/auth/login': 'http://localhost:3001/api/auth/login'; 

  return (
    <div className='page flex items-center justify-center'>
      <div className='h-fit w-fit flex flex-col items-start justify-evenly text-2xl'>
        <a href={doorLink}>Door</a>
        <a href={internalLink}>Intern</a>
        <a href={managementLink}>Management</a>
      </div>
    </div>
  )
}
