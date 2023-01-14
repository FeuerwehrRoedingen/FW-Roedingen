import React from 'react'
import { renderToString } from 'react-dom/server'

import Login from './login.js'

export function renderLogin(
  _query : {
    client_id: string,
    redirect_uri: string,
    response_type: string
  }
): string {

  function Wrapper(){

    
    return (
      <html>
        <head>
          <link rel='stylesheet' href='/css/login.css'></link>
          <link rel='stylesheet' href='/css/ReactToastify.css'></link>
          <script defer src='/js/bundle.js'/>
        </head>
        <body>
          <div id='root'>
            <Login />
          </div>
        </body>
      </html>
    )
  }

  const markup = renderToString(<Wrapper />)

  return markup
}
