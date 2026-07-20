import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { getMedia } from "~/_utils/getMedia";

import BlogPostTemplate from "~/components/layout/templates/BlogPostTemplate";
import type {
  SiteConfig,
  SiteHeader,
  SiteFooter,
  BlogPost,
} from "~/payload-types";

type Params = { slug: string };

interface Props {
  siteConfig: SiteConfig;
  siteHeader: SiteHeader;
  siteFooter: SiteFooter;
  blogPost: BlogPost;
  relatedBlogPosts: BlogPost[];
  previousPost?: BlogPost | null;
  nextPost?: BlogPost | null;
}

import { PayloadClient } from "~/_utils/payload";
const payload = new PayloadClient();

const BlogArticlePage: NextPage<Props> = ({
  siteConfig,
  siteHeader,
  siteFooter,
  blogPost,
  relatedBlogPosts,
  previousPost,
  nextPost,
}) => {
  const { isFallback } = useRouter();
  if (isFallback) return <div>Loading…</div>;

  return (
    <>
      <Head>
        <title>
          {blogPost.title} | {siteConfig.siteName}
        </title>
        <meta name="description" content={blogPost.card.excerpt ?? ""} />
        <link
          rel="icon"
          href={getMedia(siteConfig.favicon) ?? "/favicon.ico"}
        />
      </Head>

      <BlogPostTemplate
        siteHeader={siteHeader}
        siteFooter={siteFooter}
        blogPost={blogPost}
        relatedBlogPosts={relatedBlogPosts}
        previousPost={previousPost}
        nextPost={nextPost}
      />
    </>
  );
};

export default BlogArticlePage;

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  try {
    const articles = await payload.fetchCollection<BlogPost>("blog-posts", {
      depth: 0,
      limit: 1000,
      where: { _status: "published" },
    });

    const paths = articles.map((a) => ({
      params: { slug: a.slug },
    }));

    return { paths, fallback: "blocking" };
  } catch (err) {
    console.error("Failed to generate blog posts:", err);
    return { paths: [], fallback: "blocking" };
  }
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const slug = params?.slug;

  if (!slug) return { notFound: true };

  try {
    const allBlogPosts = await payload.fetchCollection<BlogPost>("blog-posts", {
      depth: 2,
      limit: 1,
      slug,
    });
    const blogPost = allBlogPosts[0];
    if (!blogPost) return { notFound: true };

    const [siteConfig, siteHeader, siteFooter, relatedBlogPosts, allPublishedPosts] =
      await Promise.all([
        payload.fetchGlobal<SiteConfig>("site-config"),
        payload.fetchGlobal<SiteHeader>("site-header"),
        payload.fetchGlobal<SiteFooter>("site-footer"),
        payload.fetchCollection<BlogPost>("blog-posts", {
          depth: 1,
          limit: 3,
          where: { _status: "published" },
        }),
        payload.fetchCollection<BlogPost>("blog-posts", {
          depth: 0,
          limit: 1000,
          sort: "-publishedDate",
          where: { _status: "published" },
        }),
      ]);

    if (!siteConfig || !siteHeader || !siteFooter)
      throw new Error("Missing required globals");

    const currentIndex = allPublishedPosts.findIndex((p) => p.slug === slug);
    let previousPost = null;
    let nextPost = null;

    if (currentIndex !== -1) {
      if (currentIndex < allPublishedPosts.length - 1) {
        previousPost = allPublishedPosts[currentIndex + 1] || null; // Older
      }
      if (currentIndex > 0) {
        nextPost = allPublishedPosts[currentIndex - 1] || null; // Newer
      }
    }

    return {
      props: {
        siteConfig,
        siteHeader,
        siteFooter,
        blogPost,
        relatedBlogPosts,
        previousPost,
        nextPost,
      },
      revalidate: 120,
    };
  } catch (err) {
    console.error("ISR regeneration failed:", err);
    throw err;
  }
};
