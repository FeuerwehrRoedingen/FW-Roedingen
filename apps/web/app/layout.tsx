import { Poppins } from 'next/font/google'

import { Provider } from './provider';
import { Header } from './header'
import './globals.css'

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
          <main className='w-full h-full dark text-foreground bg-background'>
            <Header />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}
