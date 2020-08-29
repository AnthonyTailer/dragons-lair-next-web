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
        <div style={{ display: 'none' }}>
          Icons made by
          <a
            href="https://www.flaticon.com/authors/kiranshastry"
            title="Kiranshastry"
          >
            Kiranshastry
          </a>
          <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
            Freepik
          </a>
          <a
            href="https://www.flaticon.com/authors/darius-dan"
            title="Darius Dan"
          >
            Darius Dan
          </a>
          from
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </div>
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
