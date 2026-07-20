"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getMedia } from "~/_utils/getMedia";
import type { BlogPost, BlogCategory } from "~/payload-types";

type Props = {
  preheading?: string | null;
  mainheading?: string | null;
  category: BlogCategory | string;
  theme?: 'light' | 'dark' | 'beige';
  backgroundImage?: any;
  imageOpacity?: number;
};

export const BlogCategoryGrid: React.FC<Props> = ({
  preHeading,
  mainHeading,
  category,
  theme = 'light',
  backgroundImage,
  imageOpacity = 30,
}) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loading, setLoading] = useState(true);

  const categoryId = typeof category === "string" ? category : category?.id;

  const fetchPosts = async (pageToFetch: number) => {
    if (!categoryId) return;
    try {
      setLoading(true);
      const res = await fetch(`/api/posts?categoryId=${categoryId}&page=${pageToFetch}&limit=3`);
      const data = await res.json();
      
      if (pageToFetch === 1) {
        setPosts(data.docs || []);
      } else {
        setPosts(prev => [...prev, ...(data.docs || [])]);
      }
      setHasNextPage(data.hasNextPage || false);
    } catch (error) {
      console.error("Error fetching category posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchPosts(1);
  }, [categoryId]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPosts(nextPage);
  };

  const isLightText = theme === 'dark';
  
  let bgColor = '#ffffff';
  let textColor = '#1a1a1a';
  if (theme === 'dark') {
    bgColor = '#1a1a1a';
    textColor = '#ffffff';
  } else if (theme === 'beige') {
    bgColor = '#e6dfd8';
    textColor = '#1a1a1a';
  }

  const bgImageUrl = getMedia(backgroundImage);

  return (
    <section className="dynamic-section relative w-full py-16 px-6 overflow-hidden" style={{ backgroundColor: bgColor, color: textColor }}>
      {bgImageUrl && bgImageUrl !== "#" && (
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImageUrl}
            alt="Background"
            fill
            className="object-cover object-center"
            style={{ opacity: imageOpacity / 100 }}
            unoptimized={bgImageUrl.includes('localhost') || bgImageUrl.includes('127.0.0.1')}
          />
        </div>
      )}
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl uppercase tracking-wider mb-4 leading-tight">
            {preHeading && <span className="font-light mr-3">{preHeading}</span>}
            <span className="font-bold">{mainHeading}</span>
          </h2>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {posts.map((post) => {
              const imageUrl = post.card?.cardImage ? getMedia(post.card.cardImage) : getMedia(post.featuredImage);
              
              return (
                <div key={post.id} className="flex flex-col">
                  {imageUrl && (
                    <Link href={`/blog/${post.slug}`} className="relative w-full aspect-[4/3] mb-6 overflow-hidden block">
                      <Image
                        src={imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform hover:scale-105 duration-300"
                        unoptimized={imageUrl.includes('localhost') || imageUrl.includes('127.0.0.1')}
                      />
                    </Link>
                  )}
                  <h3 className="text-sm font-bold uppercase tracking-widest mb-3 leading-snug">
                    <Link href={`/blog/${post.slug}`} className="hover:opacity-80">
                      {post.title}
                    </Link>
                  </h3>
                  <p className={`text-xs md:text-sm leading-relaxed mb-6 line-clamp-3 ${isLightText ? 'opacity-90' : 'text-gray-500'}`}>
                    {post.card?.excerpt}
                  </p>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className={`inline-flex items-center text-xs font-bold uppercase tracking-widest mt-auto hover:opacity-70 transition-opacity ${isLightText ? 'text-white' : 'text-[#1a1a1a]'}`}
                  >
                    READ MORE
                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          !loading && (
            <div className="text-center py-10 opacity-70">
              No posts found in this category.
            </div>
          )
        )}

        {hasNextPage && (
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMore}
              disabled={loading}
              className={`px-8 py-3 text-xs font-bold uppercase tracking-widest border-2 transition-colors ${
                isLightText 
                  ? 'border-white text-white hover:bg-white hover:text-black' 
                  : 'border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white'
              } disabled:opacity-50`}
            >
              {loading ? "LOADING..." : "LOAD MORE"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogCategoryGrid;
