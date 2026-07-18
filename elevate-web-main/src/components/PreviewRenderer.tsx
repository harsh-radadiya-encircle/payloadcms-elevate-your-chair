import type { FC } from "react";
import { useLivePreview } from "@payloadcms/live-preview-react";
import { PageRenderer } from "~/components/PageRenderer";
import { env } from "~/env";
import type { SiteConfig, SiteHeader, SiteFooter, Page } from "~/payload-types";

interface PreviewRendererProps {
  siteConfig: SiteConfig;
  siteHeader: SiteHeader;
  siteFooter: SiteFooter;
  initialData: Page;
}

export const PreviewRenderer: FC<PreviewRendererProps> = ({
  siteConfig,
  siteHeader,
  siteFooter,
  initialData,
}) => {
  const { data } = useLivePreview<Page>({
    serverURL: env.NEXT_PUBLIC_CMS_URL,
    depth: 3,
    initialData,
  });

  return (
    <PageRenderer
      siteConfig={siteConfig}
      siteHeader={siteHeader}
      siteFooter={siteFooter}
      page={data}
    />
  );
};
