"use client"
import { UserProvider } from '@auth0/nextjs-auth0/client'
import { Poppins } from 'next/font/google'

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
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  )
}
