import Document, { Head, Html, Main, NextScript } from "next/document";

const GTM_ID = "GTM-XXXXXXX"; // replace with your actual GTM ID

export default class MyDocument extends Document {
  render() {
    const loadGtm = process.env.NODE_ENV === "production";
    return (
      <Html lang="en">
        <Head>
          {loadGtm && (
            <>
              <script
                dangerouslySetInnerHTML={{
                  __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('consent', 'default', {ad_storage:'denied',analytics_storage:'denied',functionality_storage:'denied',personalization_storage:'denied',security_storage:'granted',ad_user_data:'denied',ad_personalization:'denied'});`,
                }}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
                }}
              />
            </>
          )}
        </Head>
        <body>
          {loadGtm && (
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                height={0}
                width={0}
                style={{ display: "none", visibility: "hidden" }}
                title="Google Tag Manager"
              />
            </noscript>
          )}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
