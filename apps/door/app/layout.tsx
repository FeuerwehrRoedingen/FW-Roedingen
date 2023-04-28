"use client"
import './globals.css'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { SessionProvider } from 'next-auth/react'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en">
      <head/>
      <body>
          <SessionProvider>
            {children}
          </SessionProvider>
      </body>
    </html>
  )
}