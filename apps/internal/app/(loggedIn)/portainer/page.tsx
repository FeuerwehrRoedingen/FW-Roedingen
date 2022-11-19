"use client"

import React from 'react'

type Props = {}

function portainer(props: Props) {

  return (
    <div className='frameContainer'>
      <iframe className='screen' src='/port'/>
    </div>
  )
}

export default portainer;
