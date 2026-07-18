import { type AppType } from "next/app";
import { Montserrat } from "next/font/google";
import Head from "next/head";
import "~/styles/globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const App: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <style>{`
          :root {
            --font-sans: 'Termina', ${montserrat.style.fontFamily}, sans-serif;
          }
          body {
            font-family: var(--font-sans);
          }
        `}</style>
      </Head>
      <main className={`${montserrat.variable} font-sans`}>
        <Component {...pageProps} />
      </main>
    </>
  );
};

export default App;
