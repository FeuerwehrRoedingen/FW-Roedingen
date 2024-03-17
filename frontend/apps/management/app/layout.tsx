import { Inter } from 'next/font/google'

import {Providers} from "./providers";
import './globals.css'
import 'react-toastify/dist/ReactToastify.css'

const inter = Inter({ subsets: ['latin'] })

type IProps = {
  children: React.ReactNode;  //type 'import().ReactNode' is not assignable to type 'React.ReactNode'
}

export default function RootLayout({children}: IProps) {
  return (
    <html lang="en" className='dark'>
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <title>FWR Management</title>
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
