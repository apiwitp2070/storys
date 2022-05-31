import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import React from 'react'
import { AppProvider } from '../providers/AppProvider'
import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  )
}

export default MyApp
