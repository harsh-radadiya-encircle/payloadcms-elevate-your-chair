import type { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { env } from "~/env";

import { PayloadClient } from "~/_utils/payload";
import { getMedia } from "~/_utils/getMedia";
import PageHeader from "~/components/layout/PageHeader";
import PageFooter from "~/components/layout/PageFooter";
import SectionRenderer from "~/components/SectionRenderer";
import { Button } from "~/components/ui/Button";

import type { SiteConfig, SiteHeader, SiteFooter, Search as SearchType, BlogPost, Page } from "~/payload-types";

const payload = new PayloadClient();

type SearchPageProps = {
  siteConfig: SiteConfig;
  siteHeader: SiteHeader;
  siteFooter: SiteFooter;
  query: string;
  results: SearchType[];
  recentPosts: BlogPost[];
  page: Page | null;
};

export default function SearchPage({
  siteConfig,
  siteHeader,
  siteFooter,
  query,
  results,
  recentPosts,
  page,
}: SearchPageProps) {
  const router = useRouter();
  const [localQuery, setLocalQuery] = useState(query);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (localQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(localQuery.trim())}`);
    }
  };

  return (
    <>
      <Head>
        <title>{page?.meta?.title || "Search Results | Elevate Your Chair"}</title>
        <meta name="description" content={page?.meta?.description || "Search results for Elevate Your Chair"} />
        <link rel="icon" href={getMedia(siteConfig.favicon) ?? "/favicon.ico"} />
      </Head>

      {(!page || page.showHeader) && <PageHeader siteHeader={siteHeader} forceDarkBg={!page} />}

      <main className="min-h-screen bg-white">
        {/* Render CMS Sections if the user created a Search page in Payload */}
        {page?.layout?.map((block, index) => (
          <SectionRenderer key={block.id ?? index} content={block} index={index} />
        ))}
        
        {/* If no CMS page is found, render a fallback Hero */}
        {!page && (
          <div className="relative h-[400px] w-full flex items-center justify-center bg-[#1a1a1a] pt-20">
            <div className="absolute inset-0 bg-black/40 z-10" />
            <div className="relative z-20 text-center px-6 w-full max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-widest uppercase mb-8">
                SEARCH RESULTS
              </h1>
              <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  value={localQuery}
                  onChange={(e) => setLocalQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full py-4 pl-6 pr-4 bg-white border-none rounded-sm focus:outline-none focus:ring-2 focus:ring-black text-gray-800 text-lg shadow-lg"
                />
              </form>
            </div>
          </div>
        )}

        {/* Results Section */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          {results.length === 0 ? (
            <div className="py-20 text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">No results found for "{query}"</h2>
              <p className="text-gray-500 mb-16">Try adjusting your search terms and searching again, or check out our latest articles below!</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-left">
                {recentPosts.map((post) => (
                  <div key={post.id} className="flex flex-col group">
                    <div className="relative aspect-[4/3] w-full mb-6 overflow-hidden bg-gray-100">
                      {post.featuredImage && (
                        <Image
                          src={getMedia(post.featuredImage)}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          unoptimized={getMedia(post.featuredImage).includes('localhost') || getMedia(post.featuredImage).includes('127.0.0.1')}
                        />
                      )}
                    </div>
                    <h3 className="text-xl font-bold uppercase tracking-wide text-gray-900 mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3 mb-6 flex-grow leading-relaxed">
                      {post.card?.excerpt || post.meta?.description}
                    </p>
                    <div className="mt-auto">
                      <Button 
                        url={`/blog/${post.slug}`}
                        label="READ ARTICLE"
                        style="solid"
                        solidAnimation="circle-fill"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {results.map((result) => {
                const doc = result.doc.value as any;
                const linkUrl = result.doc.relationTo === "blog-posts" 
                  ? `/blog/${doc?.slug}` 
                  : `/${doc?.slug === "home" ? "" : doc?.slug}`;
                
                // Try to get image from meta.image or featuredImage or anything
                let imageUrl = "/placeholder.jpg"; // Placeholder if no image found
                if (doc?.meta?.image) {
                  imageUrl = getMedia(doc.meta.image);
                } else if (doc?.featuredImage) { 
                  imageUrl = getMedia(doc.featuredImage);
                } else if (doc?.hero?.image) { // Fallback to hero image for pages
                  imageUrl = getMedia(doc.hero.image);
                }

                return (
                  <div key={result.id} className="flex flex-col group">
                    <Link href={linkUrl} className="block cursor-pointer">
                      <div className="relative aspect-[4/3] w-full mb-6 overflow-hidden bg-gray-100">
                        {imageUrl !== "/placeholder.jpg" ? (
                          <Image
                            src={imageUrl}
                            alt={result.title || "Search result"}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            unoptimized={imageUrl.includes('localhost') || imageUrl.includes('127.0.0.1')}
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400">No image</span>
                          </div>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-bold uppercase tracking-wide text-gray-900 mb-3 line-clamp-2 hover:text-[#CDBEA5] transition-colors">
                        {result.title || "TITLE GOES HERE"}
                      </h3>
                    </Link>
                    
                    <p className="text-sm text-gray-600 line-clamp-3 mb-6 flex-grow leading-relaxed">
                      {doc?.card?.excerpt || doc?.meta?.description || "Lorem ipsum dolor sit amet consectetur. Risus sit viverra dictumst malesuada tristique mattis enim sapien hac. Aliquet viverra mauris tincidunt blandit."}
                    </p>
                    
                    <div className="mt-auto">
                      <Button 
                        url={linkUrl}
                        label={result.doc.relationTo === "blog-posts" ? "READ ARTICLE" : "VIEW PAGE"}
                        style="outline"
                        outlineAnimation="border-trace"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {(!page || page.showFooter) && <PageFooter siteFooter={siteFooter} />}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const searchQuery = typeof query.q === "string" ? query.q : "";
  
  try {
    const [siteConfig, siteHeader, siteFooter, recentPostsData, searchPageData] = await Promise.all([
      payload.fetchGlobal<SiteConfig>("site-config"),
      payload.fetchGlobal<SiteHeader>("site-header"),
      payload.fetchGlobal<SiteFooter>("site-footer"),
      payload.fetchCollection<BlogPost>("blog-posts", {
        limit: 3,
        depth: 1,
        sort: "-publishedDate",
        where: { _status: "published" },
      }),
      payload.fetchCollection<Page>("pages", {
        limit: 1,
        depth: 3,
        slug: "search",
      }),
    ]);

    const page = searchPageData?.[0] || null;

    let results: SearchType[] = [];
    
    if (searchQuery) {
      // Fetch from Payload search collection with depth 2 to populate featured images
      const res = await fetch(
        `${env.NEXT_PUBLIC_CMS_URL}/api/search?where[title][like]=${encodeURIComponent(searchQuery)}&depth=1&limit=50`
      );
      if (res.ok) {
        const data = await res.json();
        const searchDocs = data.docs?.filter((item: any) => item.doc?.relationTo === "blog-posts") || [];
        
        // Manually populate full documents so nested images are guaranteed to resolve
        results = await Promise.all(searchDocs.map(async (item: any) => {
           try {
             const docId = typeof item.doc.value === 'object' ? item.doc.value.id : item.doc.value;
             if (item.doc?.relationTo === "blog-posts") {
                 // docId could be the actual mongodb ID instead of the slug, so we fetch by ID using fetchCollection
                 const postRes = await payload.fetchCollection<BlogPost>("blog-posts", { where: { id: docId }, depth: 1, limit: 1 });
                 if (postRes && postRes.length > 0) item.doc.value = postRes[0];
             } else if (item.doc?.relationTo === "pages") {
                 const pageRes = await payload.fetchCollection<Page>("pages", { where: { id: docId }, depth: 1, limit: 1 });
                 if (pageRes && pageRes.length > 0) item.doc.value = pageRes[0];
             }
           } catch(e) {
               console.error("Failed to populate item", e);
           }
           return item;
        }));
      }
    }

    return {
      props: {
        siteConfig,
        siteHeader,
        siteFooter,
        query: searchQuery,
        results,
        recentPosts: recentPostsData || [],
        page,
      },
    };
  } catch (error) {
    console.error("Failed to load search page:", error);
    return { notFound: true };
  }
};
