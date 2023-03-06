"use client";
import React, { createRef } from 'react'
import { useSession } from 'next-auth/react'

import { API } from 'fw-roedingen-shared/dist/src/api'

type Props = {}

export default function(props: Props) {

  const { data, status} = useSession()

  const submit =  () => {
    fetch(API + '/users/sendMessage', {
      method: 'POST',
      body: JSON.stringify({
        userID: data?.user.id,
        data: {
          'title': 'test',
          'body': ref.current?.value
        }
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(
      response => console.log(response),
      reason   => console.error(reason)
      )
  }

  const ref = createRef<HTMLInputElement>();

  return (
    <div>
      <input type='text' ref={ref}/>
      <button onClick={submit}>
        send
      </button>
    </div>
  )
}
