import React from "react"
import { Poppins } from 'next/font/google'
import { ToastContainer } from 'react-toastify'

import { Provider } from "./provider"

import './globals.css'
import './flicker.css'
import 'react-toastify/dist/ReactToastify.css'

const font = Poppins({
  weight: '400',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <head>
        <title>Feuerwehr Rödingen</title>
        <meta name="description" content="Webseite der Löschgruppe Rödingen der Freiwilligen Feuerwehr Titz" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`w-screen h-[100svh] overflow-hidden ${font.className}`}>
        <Provider>
          <main className='w-screen h-[100svh] dark text-foreground bg-background'>
            {children}
          </main>
        </Provider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="dark"
          toastClassName="top-[10vh]"
        />
      </body>
    </html>
  )
}
