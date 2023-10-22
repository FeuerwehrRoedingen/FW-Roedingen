import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Provider from './provider'

import './globals.css'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FWR Door',
  description: 'Administrative access to all FWR services',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <main className='dark text-foreground bg-background'>
            {children}    
          </main>
        </Provider>
      </body>
    </html>
  )
}
