import { AppProps } from 'next/app'
import Head from 'next/head'
import GlobalStyles from 'styles/global'
import { AuthProvider } from '../contexts/auth'

function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Head>
        <title>Dragons Lair</title>
        <link rel="shortcut icon" href="/img/icon-512.png" />
        <link rel="apple-touch-icon" href="/img/icon-512.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta
          name="description"
          content="Plataforma de gerenciamento de dragões utilizando Typescript, React, NextJS e Styled Components!"
        />
      </Head>
      <GlobalStyles />
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default App
