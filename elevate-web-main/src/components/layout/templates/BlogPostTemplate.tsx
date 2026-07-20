import type { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaLinkedin } from "react-icons/fa6";
import { motion } from "framer-motion";

import PageHeader from "~/components/layout/PageHeader";
import PageFooter from "~/components/layout/PageFooter";
import LexicalRenderer from "~/components/base/LexicalRenderer";
import { getMedia } from "~/_utils/getMedia";

import type { SiteHeader, SiteFooter, BlogPost } from "~/payload-types";

interface Props {
  siteHeader: SiteHeader;
  siteFooter: SiteFooter;
  blogPost: BlogPost;
  relatedBlogPosts: BlogPost[];
  previousPost?: BlogPost | null;
  nextPost?: BlogPost | null;
}

const BlogPostTemplate: FC<Props> = ({
  blogPost,
  siteHeader,
  siteFooter,
  relatedBlogPosts,
  previousPost,
  nextPost,
}) => {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <>
      <PageHeader siteHeader={siteHeader} forceDarkBg={true} />

      <header className="w-full mt-28 lg:mt-40 mb-12">
        {blogPost.featuredImage && (
          <div className="w-full max-w-7xl mx-auto px-6 mb-12">
            <div className="relative w-full aspect-[21/9]">
              <Image
                src={getMedia(blogPost.featuredImage)}
                alt={blogPost.title}
                fill
                className="object-cover rounded-md"
                priority
                unoptimized={getMedia(blogPost.featuredImage).includes('localhost') || getMedia(blogPost.featuredImage).includes('127.0.0.1')}
              />
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 font-bold text-3xl md:text-5xl uppercase tracking-widest text-[#1a1a1a]"
          >
            {blogPost.title}
          </motion.h1>

          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-[#1a1a1a]">
            {blogPost.author && (
              <>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  {blogPost.author}
                </span>
                <span className="text-gray-300">|</span>
              </>
            )}
            {blogPost.publishedDate && (
              <span className="text-gray-500">
                {new Date(blogPost.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            )}
            {blogPost.category && typeof blogPost.category !== 'string' && (
              <>
                <span className="text-gray-300">|</span>
                <span className="text-gray-500">{blogPost.category.title}</span>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="prose prose-sm md:prose-base mx-auto mb-16 max-w-7xl px-6 leading-relaxed text-[#666666] text-center">
        {blogPost.content && <LexicalRenderer content={blogPost.content} />}

        <div className="mt-12 flex space-x-6">
          <span className="font-medium">Share:</span>
          <Link
            target="_blank"
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              shareUrl,
            )}`}
            aria-label="Share on Facebook"
          >
            <FaFacebook size={24} />
          </Link>
          <Link
            target="_blank"
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
              shareUrl,
            )}&title=${encodeURIComponent(blogPost.title)}`}
            aria-label="Share on LinkedIn"
          >
            <FaLinkedin size={24} />
          </Link>
        </div>

        {/* Previous / Next Navigation */}
        <div className="mt-20 pt-8 border-t border-gray-200 flex justify-between items-center">
          {previousPost ? (
            <Link
              href={`/blog/${previousPost.slug}`}
              className="px-6 py-2 border-2 border-[#1a1a1a] text-xs font-bold uppercase tracking-widest text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-colors"
            >
              PREVIOUS
            </Link>
          ) : <div></div>}

          {nextPost ? (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="px-8 py-2 bg-[#cdbfae] text-[#1a1a1a] border-2 border-[#cdbfae] text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity"
            >
              NEXT
            </Link>
          ) : <div></div>}
        </div>
      </main>

      <section className="mx-auto mb-32 max-w-6xl px-6 hidden">
        <h2 className="mb-8 text-2xl font-semibold">More Articles</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {relatedBlogPosts
            .filter((r) => r.id !== blogPost.id)
            .slice(0, 3)
            .map((r) => (
              <Link key={r.id} href={`/blog/${r.slug}`}>
                <article className="group">
                  {r.card?.cardImage && (
                    <Image
                      src={getMedia(r.card.cardImage)}
                      alt={r.title}
                      width={400}
                      height={220}
                      className="mb-4 h-44 w-full rounded object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  )}
                  <h3 className="mb-2 text-lg font-semibold">{r.title}</h3>
                  <p className="line-clamp-3 text-sm text-neutral-600">
                    {r.card?.excerpt}
                  </p>
                </article>
              </Link>
            ))}
        </div>
      </section>

      <PageFooter siteFooter={siteFooter} />
    </>
  );
};

export default BlogPostTemplate;
