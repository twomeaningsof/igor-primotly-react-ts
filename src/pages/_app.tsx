import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Bakbak_One } from "next/font/google";
import Head from "next/head";

const bakbakOne = Bakbak_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bakbakOne",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="only light" />
      </Head>
      <main
        className={`${bakbakOne.variable} min-h-screen p-10 flex flex-col items-center bg-starry-night bg-center`}
      >
        <Component {...pageProps} />
      </main>
    </>
  );
}
