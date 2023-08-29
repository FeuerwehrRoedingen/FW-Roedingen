import { Poppins } from 'next/font/google'

import { Header } from '../components/Header'
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
      <body className={font.className}>
        <main>
          <Header></Header>
          {children}
        </main>
      </body>
    </html>
  )
}
