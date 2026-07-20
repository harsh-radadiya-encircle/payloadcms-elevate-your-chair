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

import type { SiteConfig, SiteHeader, SiteFooter, Search as SearchType } from "~/payload-types";

const payload = new PayloadClient();

type SearchPageProps = {
  siteConfig: SiteConfig;
  siteHeader: SiteHeader;
  siteFooter: SiteFooter;
  query: string;
  results: SearchType[];
};

export default function SearchPage({
  siteConfig,
  siteHeader,
  siteFooter,
  query,
  results,
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
        <title>Search Results | Elevate Your Chair</title>
        <link rel="icon" href={getMedia(siteConfig.favicon) ?? "/favicon.ico"} />
      </Head>

      <PageHeader siteHeader={siteHeader} forceDarkBg={true} />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative h-[400px] w-full flex items-center justify-center bg-[#1a1a1a] pt-20">
          {/* We use a solid dark background as placeholder since no specific image was provided yet */}
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

        {/* Results Section */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          {results.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">No results found for "{query}"</h2>
              <p className="text-gray-500">Try adjusting your search terms and searching again.</p>
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
                } else if (doc?.hero?.image) { // Fallback to hero image for pages
                  imageUrl = getMedia(doc.hero.image);
                }

                return (
                  <div key={result.id} className="flex flex-col group">
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
                    
                    <h3 className="text-xl font-bold uppercase tracking-wide text-gray-900 mb-3 line-clamp-2">
                      {result.title || "TITLE GOES HERE"}
                    </h3>
                    
                    <p className="text-sm text-gray-600 line-clamp-3 mb-6 flex-grow leading-relaxed">
                      {doc?.meta?.description || "Lorem ipsum dolor sit amet consectetur. Risus sit viverra dictumst malesuada tristique mattis enim sapien hac. Aliquet viverra mauris tincidunt blandit."}
                    </p>
                    
                    <Link 
                      href={linkUrl}
                      className="text-xs font-bold tracking-widest uppercase text-black flex items-center hover:opacity-70 transition-opacity mt-auto"
                    >
                      READ MORE <span className="ml-2">→</span>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <PageFooter siteFooter={siteFooter} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const searchQuery = typeof query.q === "string" ? query.q : "";
  
  try {
    const [siteConfig, siteHeader, siteFooter] = await Promise.all([
      payload.fetchGlobal<SiteConfig>("site-config"),
      payload.fetchGlobal<SiteHeader>("site-header"),
      payload.fetchGlobal<SiteFooter>("site-footer"),
    ]);

    let results: SearchType[] = [];
    
    if (searchQuery) {
      // Fetch from Payload search collection
      const res = await fetch(
        `${env.NEXT_PUBLIC_CMS_URL}/api/search?where[title][like]=${encodeURIComponent(searchQuery)}&depth=1&limit=50`
      );
      if (res.ok) {
        const data = await res.json();
        results = data.docs || [];
      }
    }

    return {
      props: {
        siteConfig,
        siteHeader,
        siteFooter,
        query: searchQuery,
        results,
      },
    };
  } catch (error) {
    console.error("Failed to load search page:", error);
    return { notFound: true };
  }
};
