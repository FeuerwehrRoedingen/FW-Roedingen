import './global.css'

import { Header } from '../components/Header'

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
      <body>
        <main>
          <Header></Header>
          {children}
        </main>
      </body>
    </html>
  )
}
