import React from 'react'
import { renderToString } from 'react-dom/server'

export function SignUp(){

  return (
    <div>

    </div>
  )
}

export function renderSignUp(
  query: {
    redirect: string
  }
): string {

  function Wrapper() {

    return (
      <html>
        <head>
          <link rel='stylesheet' href='/css/signup.css'></link>
          <link rel='stylesheet' href='/css/ReactToastify.css'></link>
          <script defer src='/js/bundle_signup.js' />
          <script>a</script>
        </head>
        <body>
          <div id='root'>
            <SignUp />
          </div>
        </body>
      </html>
    )
  }

  const html = renderToString(<Wrapper />)
  const withScript = html.replace('<script>a</script>',`<script>window.redirect = "${query.redirect}";" </script>`)
  return withScript
}
