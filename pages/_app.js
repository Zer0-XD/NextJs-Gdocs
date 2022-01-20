import "@material-tailwind/react/tailwind.css";
import '../styles/globals.css'
import Head from 'next/head';
import { Provider } from "next-auth/client"
import NextNProgress from "nextjs-progressbar";
import '../styles.css'


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* material ui icons */}
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#4285f4" />
      </Head>

      <Provider session={pageProps.session}>
        <NextNProgress color="#0288d1"
          startPosition={0.3}
          stopDelayMs={200}
          height={6}
          options={{ showSpinner: false }}
        />
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default MyApp
