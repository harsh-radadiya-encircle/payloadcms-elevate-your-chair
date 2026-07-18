import type { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { PageRenderer } from "~/components/PageRenderer";

import { PayloadClient } from "~/_utils/payload";
const payload = new PayloadClient();

import type { SiteConfig, SiteHeader, SiteFooter, Page } from "~/payload-types";

type PageParams = { slug?: string[] };

export default function Page({
  siteConfig,
  siteHeader,
  siteFooter,
  page,
}: {
  siteConfig: SiteConfig;
  siteHeader: SiteHeader;
  siteFooter: SiteFooter;
  page: Page;
}) {
  const { isFallback } = useRouter();
  if (isFallback) return <div>Loading…</div>;

  return (
    <PageRenderer
      siteConfig={siteConfig}
      siteHeader={siteHeader}
      siteFooter={siteFooter}
      page={page}
    />
  );
}

export const getStaticPaths: GetStaticPaths<PageParams> = async () => {
  try {
    const pages = await payload.fetchCollection<Page>("pages", {
      depth: 0,
      draft: false,
      limit: 1000,
    });

    const paths = pages.map((p) => ({
      params: {
        slug: (p.slug === "home" || p.slug === "/") ? [] : p.slug.replace(/^\//, '').split("/"),
      },
    }));

    return { paths, fallback: "blocking" };
  } catch (err) {
    console.error("Failed to generate pages:", err);
    return { paths: [], fallback: "blocking" };
  }
};

export const getStaticProps: GetStaticProps<
  {
    siteConfig: SiteConfig;
    siteHeader: SiteHeader;
    siteFooter: SiteFooter;
    page: Page;
  },
  PageParams
> = async ({ params }) => {
  const slugParams = Array.isArray(params?.slug) ? params.slug.join("/") : (params?.slug || "");
  const targetSlug = slugParams || "/";

  try {
    const pageArr = await payload.fetchCollection<Page>("pages", {
      depth: 3,
      slug: targetSlug,
      limit: 1,
    });
    const page = pageArr[0];
    if (!page) return { notFound: true };

    const [siteConfig, siteHeader, siteFooter] = await Promise.all([
      payload.fetchGlobal<SiteConfig>("site-config"),
      payload.fetchGlobal<SiteHeader>("site-header"),
      payload.fetchGlobal<SiteFooter>("site-footer"),
    ]);

    if (!siteConfig || !siteHeader || !siteFooter) {
      throw new Error("Missing one or more required globals.");
    }

    return {
      props: { siteConfig, siteHeader, siteFooter, page },
      revalidate: 120,
    };
  } catch (err) {
    console.error("ISR regeneration failed:", err);
    throw err;
  }
};
