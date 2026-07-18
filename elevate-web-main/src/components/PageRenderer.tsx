import type { FC } from "react";
import Head from "next/head";
import { getMedia } from "~/_utils/getMedia";

import type { SiteConfig, SiteHeader, SiteFooter, Page } from "~/payload-types";

import PageHeader from "~/components/layout/PageHeader";
import PageFooter from "~/components/layout/PageFooter";
import SectionRenderer from "~/components/SectionRenderer";

interface PageRendererProps {
  siteConfig: SiteConfig;
  siteHeader: SiteHeader;
  siteFooter: SiteFooter;
  page: Page;
}

export const PageRenderer: FC<PageRendererProps> = ({
  siteConfig,
  siteHeader,
  siteFooter,
  page,
}) => {
  const { meta, layout, showHeader, showFooter } = page;

  const pageTitle = meta?.title;
  const pageDescription = meta?.description;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription ?? ""} />
        <link
          rel="icon"
          href={getMedia(siteConfig.favicon) ?? "/favicon.ico"}
        />
      </Head>

      {showHeader && <PageHeader siteHeader={siteHeader} />}

      {layout?.map((block, index) => (
        <SectionRenderer key={block.id ?? index} content={block} />
      ))}

      {showFooter && <PageFooter siteFooter={siteFooter} />}
    </>
  );
};
