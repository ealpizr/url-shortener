import "@styles/reset.scss";
import type { AppProps } from "next/app";
import Head from "next/head";

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
