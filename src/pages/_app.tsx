import type { AppProps } from "next/app";
import Head from "next/head";
import "styles/reset.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>URL Shortener</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
