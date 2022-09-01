import type { AppProps } from 'next/app'
import Header from '../components/Header'

import '../index.css'
import 'react-calendar/dist/Calendar.css';

function MyApp({ Component, pageProps, ...appProps }: AppProps) {
  if(appProps.router.pathname.startsWith('/admin')){
    return <><Component {...pageProps}/></>
  }
  return (
    <>
      <Header/>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
