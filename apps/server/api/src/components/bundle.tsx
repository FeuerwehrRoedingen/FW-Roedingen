import React from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import { createWriteStream } from 'fs'

import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

import browserify from 'browserify'
import tsify from 'tsify'

import { Login } from './login'
import { Response } from 'express'

let cwd = dirname(fileURLToPath(import.meta.url));
let jsFolder = join(cwd, '..', '..', 'public', 'js');

export const renderLogin = async (res: Response) => {
  let { pipe } = renderToPipeableStream(
    <Wrapper>
      <Login />
    </Wrapper>,
    {
      onShellReady(){
        pipe(res);
      },
      bootstrapScripts: ['/js/bundle_login.js'],
    }
  )
}
export const renderSignUp = async () => {
  //TODO
}

export const bundleLogin = () => {
  return new Promise<void>(async (resolve, reject) => {
    browserify({extensions: ['.ts', '.tsx']})
      .add(join(cwd, 'hydrateLogin.tsx'))
      .plugin(tsify, { p: 'tsconfig.build.json'})
      .on('error', reject)
      .bundle()
      .pipe(createWriteStream(join(jsFolder, 'bundle_login.js')))
      .on('finish', resolve);
  })
}
export const bundleSignUp = async () => {
  return new Promise<void>(async (resolve, reject) => {
    browserify()
      .add(join(cwd, 'hydrateSignUp.tsx'))
      .plugin(tsify, { p: 'tsconfig.build.json'})
      .on('error', reject)
      .bundle()
      .pipe(createWriteStream(join(jsFolder, 'bundle_signUp.js')))
      .on('finish', resolve);
  })
}

type Props = {
  children?: React.ReactNode
}
const Wrapper: React.FC<Props> = ({children}) => {
  return (
    <html>
      <head>
        <link rel='stylesheet' href='/css/login.css'></link>
        <link rel='stylesheet' href='/css/ReactToastify.css'></link>
      </head>
      <body>
        <div id='root'>
          {children}
        </div>
      </body>
    </html>
  )
}
