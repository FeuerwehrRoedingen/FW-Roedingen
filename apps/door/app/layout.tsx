"use client"
import { UserProvider } from '@auth0/nextjs-auth0/client'
import { Poppins } from 'next/font/google'
import Link from 'next/link'
import { ToastContainer } from 'react-toastify'

import './globals.css'

const font = Poppins({
  weight: ["700"],
  subsets: ['devanagari'],
  variable: '--font-poppins'
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en" className={font.variable}>
      <head>
        <title>FWR-Door</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="description" content="Door to FWR Servers" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <div className="page">
          <div className="bg-[#1f1f1f] w-[80%] h-[80%] mt-[5%] border-t-4 border-red-600 flex items-center justify-center">
            <UserProvider>
              {children}
            </UserProvider>
          </div>
          <div className='flex flex-row h-[15vh] w-full'>
            <div className='h-full w-1/3 flex flex-col items-center'>
              <div className='flex flex-col h-full justify-center'>
                <Link href="/docs/impressum">  Impressum  </Link>
                <Link href="/docs/datenschutz">Datenschutz</Link>
              </div>
            </div>
            <div className='h-full w-1/3 flex flex-col items-center justify-center'>
              <a href="https://feuerwehr-roedingen.de">Feuerwehr Roedingen</a>
            </div>
            <div className='h-full w-1/3 flex flex-col items-center'>
              <div className='flex flex-col h-full justify-center'>
                <Link href="/signup">account erstellen</Link>
                <a href='mailto:support@feuerwehr-roedingen.de'>support</a>
              </div>
            </div>
          </div>
          <ToastContainer theme='dark' position='top-right' autoClose={3000} hideProgressBar={false} />
        </div>
      </body>
    </html>
  )
}
