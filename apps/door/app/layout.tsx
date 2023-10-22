import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FWR Door',
  description: 'Administrative access to all FWR services',
}

type IProps = {
  children: React.ReactNode
}
export default function(props: IProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className='dark text-foreground bg-gray-950'>
          {props.children}
        </main>
      </body>
    </html>
  )
}
