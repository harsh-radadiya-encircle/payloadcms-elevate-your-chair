import type { GetServerSideProps } from "next";
import { PreviewRenderer } from "~/components/PreviewRenderer";
import { PayloadClient } from "~/_utils/payload";
import type { SiteConfig, SiteHeader, SiteFooter, Page } from "~/payload-types";

const payload = new PayloadClient();

type Props = {
  siteConfig: SiteConfig;
  siteHeader: SiteHeader;
  siteFooter: SiteFooter;
  initialData: Page;
};

export default function PreviewPage({
  siteConfig,
  siteHeader,
  siteFooter,
  initialData,
}: Props) {
  return (
    <PreviewRenderer
      siteConfig={siteConfig}
      siteHeader={siteHeader}
      siteFooter={siteFooter}
      initialData={initialData}
    />
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  const slugArr = Array.isArray(params?.slug) ? params.slug : [];
  const targetSlug = slugArr.join("/") || "home";

  try {
    const pageArr = await payload.fetchCollection<Page>("pages", {
      depth: 3,
      slug: targetSlug,
      draft: true,
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
      return { notFound: true };
    }

    return {
      props: { siteConfig, siteHeader, siteFooter, initialData: page },
    };
  } catch {
    return { notFound: true };
  }
};
