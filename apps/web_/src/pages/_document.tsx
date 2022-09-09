/**
 * @file used to provide Files to the DOM using NEXT
 */

//Libraries
import Document, { Html, Head, Main, NextScript } from 'next/document'

//class
export default class Doc extends Document {
  render() {
    return (
      <Html>
        <Head >
          <link href="https://fonts.googleapis.com/css?family=Poppins" rel='stylesheet' />
          <link rel="icon" type="image/x-icon" href="/favicon.ico"></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}