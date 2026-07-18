import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { PayloadClient } from "~/_utils/payload";
const payload = new PayloadClient();

import type { SiteConfig, SiteHeader, SiteFooter } from "~/payload-types";

import PageHeader from "~/components/layout/PageHeader";
import PageFooter from "~/components/layout/PageFooter";

interface ErrorPage500Props {
  siteConfig: SiteConfig;
  siteHeader: SiteHeader;
  siteFooter: SiteFooter;
}

const ErrorPage500: NextPage<ErrorPage500Props> = ({
  siteConfig,
  siteHeader,
  siteFooter,
}) => {
  return (
    <>
      <Head>
        <title>500 Internal Server Error</title>
        <meta name="description" content="500 Internal Server Error" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageHeader siteHeader={siteHeader} />

      <section className="flex h-screen w-screen flex-col items-center justify-center space-y-6 px-8 text-center">
        <h1 className="text-8xl">{siteConfig.error500?.heading}</h1>

        <p className="max-w-[475px] text-lg font-light">
          {siteConfig.error500?.message}
        </p>

        {siteConfig.error500?.ctaLabel && (
          <Link className="btn btn-primary mt-8" href="/">
            {siteConfig.error500?.ctaLabel}
          </Link>
        )}
      </section>

      <PageFooter siteFooter={siteFooter} />
    </>
  );
};

export default ErrorPage500;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const [siteConfig, siteHeader, siteFooter] = await Promise.all([
      payload.fetchGlobal<SiteConfig>("site-config"),
      payload.fetchGlobal<SiteHeader>("site-header"),
      payload.fetchGlobal<SiteFooter>("site-footer"),
    ]);

    if (!siteConfig || !siteHeader || !siteFooter) {
      throw new Error("Missing one or more required globals.");
    }

    return {
      props: { siteConfig, siteHeader, siteFooter },
      revalidate: 120,
    };
  } catch (err) {
    console.error("Error fetching 500 page:", err);
    return { notFound: true };
  }
};
