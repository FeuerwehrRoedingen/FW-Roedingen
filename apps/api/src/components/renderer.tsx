import React from 'react'
import { renderToString } from 'react-dom/server'

import Login from './login.js'

export function renderLogin(
  query: {
    client_id: string,
    redirect_uri: string,
    response_type: string,
    scope: string,
    state: string
  }
): string {

  function Wrapper() {

    return (
      <html>
        <head>
          <link rel='stylesheet' href='/css/login.css'></link>
          <link rel='stylesheet' href='/css/ReactToastify.css'></link>
          <script defer src='/js/bundle.js' />
          <script>a</script>
        </head>
        <body>
          <div id='root'>
            <Login />
          </div>
        </body>
      </html>
    )
  }

  const html = renderToString(<Wrapper />)
  const withScript = html.replace('<script>a</script>',`<script>window.redirect_uri = "${query.redirect_uri}"; window.state = "${query.state}" </script>`)
  return withScript
}
