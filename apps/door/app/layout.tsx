"use client"
import { UserProvider } from '@auth0/nextjs-auth0/client'
import { Poppins } from 'next/font/google'

import './globals.css'

const font = Poppins({
  weight: '400',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en">
      <head/>
      <body>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  )
}
