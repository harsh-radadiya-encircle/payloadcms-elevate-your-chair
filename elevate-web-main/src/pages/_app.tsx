import { type AppType } from "next/app";
import localFont from "next/font/local";
import Head from "next/head";
import { SmoothScroll } from "~/components/layout/SmoothScroll";
import "~/styles/globals.css";

const termina = localFont({
  src: [
    {
      path: "../../public/fonts/TerminaTest-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/TerminaTest-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-termina",
});

const avenir = localFont({
  src: [
    {
      path: "../../public/fonts/AvenirLTProRoman.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/AvenirLTProBlack.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-avenir",
});

const App: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <style>{`
          :root {
            --font-sans: ${avenir.style.fontFamily}, sans-serif;
            --font-heading: ${termina.style.fontFamily}, sans-serif;
          }
          body {
            font-family: var(--font-sans);
          }
          h1, h2, h3, h4, h5, h6 {
            font-family: var(--font-heading) !important;
          }
        `}</style>
      </Head>
      <main className={`${avenir.variable} ${termina.variable} font-sans`}>
        <SmoothScroll>
          <Component {...pageProps} />
        </SmoothScroll>
      </main>
    </>
  );
};

export default App;
