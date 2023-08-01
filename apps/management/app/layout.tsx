"use client"
import { Inter } from 'next/font/google'
import type  { Session } from 'next-auth'

import {Providers} from "./providers";
import './globals.css'
import 'react-toastify/dist/ReactToastify.css'

const inter = Inter({ subsets: ['latin'] })

type IProps = {
  children: React.ReactNode;  //type 'import().ReactNode' is not assignable to type 'React.ReactNode'
  session: Session|null|undefined;
}

export default function RootLayout({children, session }: IProps) {

  return (
    <html lang="en" className='dark'>
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <title>FWR Management</title>
      </head>
      <body className={inter.className}>
        <Providers session={session}>
          {children}
        </Providers>
      </body>
    </html>
  )
}
