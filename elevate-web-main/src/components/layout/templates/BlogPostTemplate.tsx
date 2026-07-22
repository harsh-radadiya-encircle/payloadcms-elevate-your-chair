import type { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaLinkedin } from "react-icons/fa6";
import { motion } from "framer-motion";

import PageHeader from "~/components/layout/PageHeader";
import PageFooter from "~/components/layout/PageFooter";
import LexicalRenderer from "~/components/base/LexicalRenderer";
import { getMedia } from "~/_utils/getMedia";
import { getSectionStyle } from "~/_utils/getSectionStyle";

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

      <div className="dynamic-section" style={getSectionStyle(blogPost)}>
        <header className="w-full mt-16 lg:mt-24 mb-8 md:mb-12">
          {blogPost.featuredImage && (
            <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 mb-8 md:mb-12">
              <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden rounded-md">
                <Image
                  src={getMedia(blogPost.featuredImage)}
                  alt={blogPost.title}
                  fill
                  className="object-cover"
                  priority
                  unoptimized={getMedia(blogPost.featuredImage).includes('localhost') || getMedia(blogPost.featuredImage).includes('127.0.0.1')}
                />
              </div>
            </div>
          )}

          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 text-h1-bold text-[#1a1a1a] uppercase text-center"
            >
              {blogPost.title}
            </motion.h1>

            <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-2 text-xs md:text-sm font-bold uppercase tracking-widest text-[#1a1a1a]">
              {blogPost.author && (
                <>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
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

        <main className="content-formatting w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-12 mb-16 overflow-hidden">
          {blogPost.content && <LexicalRenderer content={blogPost.content} />}

          <div className="mt-12 flex items-center justify-center space-x-6">
            <span className="font-bold uppercase tracking-widest text-xs md:text-sm text-[#1a1a1a]">Share:</span>
            <Link
              target="_blank"
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                shareUrl,
              )}`}
              aria-label="Share on Facebook"
              className="hover:opacity-70 transition-opacity"
            >
              <FaFacebook size={22} />
            </Link>
            <Link
              target="_blank"
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                shareUrl,
              )}&title=${encodeURIComponent(blogPost.title)}`}
              aria-label="Share on LinkedIn"
              className="hover:opacity-70 transition-opacity"
            >
              <FaLinkedin size={22} />
            </Link>
          </div>

          {/* Previous / Next Navigation */}
          <div className="mt-16 pt-8 border-t border-gray-200 flex flex-row justify-between items-center gap-4">
            {previousPost ? (
              <Link
                href={`/blog/${previousPost.slug}`}
                className="px-4 sm:px-6 py-2.5 border-2 border-[#1a1a1a] text-xs font-bold uppercase tracking-widest text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-colors"
              >
                PREVIOUS
              </Link>
            ) : <div></div>}

            {nextPost ? (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="px-6 sm:px-8 py-2.5 bg-[#cdbfae] text-[#1a1a1a] border-2 border-[#cdbfae] text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity"
              >
                NEXT
              </Link>
            ) : <div></div>}
          </div>
        </main>
      </div>

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
