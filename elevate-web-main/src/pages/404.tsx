import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { PayloadClient } from "~/_utils/payload";
const payload = new PayloadClient();

import type { SiteConfig, SiteHeader, SiteFooter } from "~/payload-types";

import PageHeader from "~/components/layout/PageHeader";
import PageFooter from "~/components/layout/PageFooter";
import { getMedia } from "~/_utils/getMedia";

interface ErrorPage404Props {
  siteConfig: SiteConfig;
  siteHeader: SiteHeader;
  siteFooter: SiteFooter;
}

const ErrorPage404: NextPage<ErrorPage404Props> = ({
  siteConfig,
  siteHeader,
  siteFooter,
}) => {
  return (
    <>
      <Head>
        <title>{siteConfig.error404?.heading || "404 Error"}</title>
        <meta name="description" content={siteConfig.error404?.message || "Page Not Found"} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageHeader siteHeader={siteHeader} />

      <section className="mx-auto flex min-h-[75vh] max-w-7xl flex-col-reverse items-center justify-center gap-12 px-8 py-16 md:flex-row md:justify-between">
        <div className="flex flex-col items-center justify-center text-center md:w-1/2 md:items-start md:text-left">
          <div className="flex flex-col uppercase leading-tight tracking-wide">
            <h1 className="text-5xl font-black text-gray-900 md:text-7xl">
              {siteConfig.error404?.heading || "404 ERROR"}
            </h1>
            <p className="mt-2 text-3xl font-light text-gray-600 md:text-5xl">
              {siteConfig.error404?.message || "PAGE NOT FOUND"}
            </p>
          </div>

          {siteConfig.error404?.ctaLabel && (
            <Link className="btn btn-primary mt-12 rounded-full px-8 py-3 font-semibold uppercase tracking-wider" href="/">
              {siteConfig.error404?.ctaLabel}
            </Link>
          )}
        </div>

        {siteConfig.error404?.backgroundImage && (
          <div className="flex w-full justify-center md:w-1/2 md:justify-end">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getMedia(siteConfig.error404.backgroundImage)}
              alt="404 Illustration"
              className="max-h-[500px] w-auto object-contain drop-shadow-sm"
            />
          </div>
        )}
      </section>

      <PageFooter siteFooter={siteFooter} />
    </>
  );
};

export default ErrorPage404;

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
    console.error("Error fetching 404 page:", err);
    return { notFound: true };
  }
};
