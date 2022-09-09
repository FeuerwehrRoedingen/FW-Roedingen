import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'

import Header from '../components/Header'

import '../index.css'
import 'react-calendar/dist/Calendar.css'
import 'react-toastify/dist/ReactToastify.css'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps, ...appProps }: AppProps) {
  let showHeader = true;
  if(appProps.router.pathname.startsWith('/admin')){
    showHeader = false;
  }
  if(appProps.router.pathname.startsWith('/impressum')){
    showHeader = false;
  }
  return (
    <>
      <SessionProvider>
        {showHeader && <Header/>}
        <Component {...pageProps} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          pauseOnFocusLoss
          pauseOnHover
          theme='dark'
        />
      </SessionProvider>
    </>
  )
}

export default MyApp
