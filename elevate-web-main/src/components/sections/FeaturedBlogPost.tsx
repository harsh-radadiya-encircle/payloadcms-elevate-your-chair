"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getMedia } from "~/_utils/getMedia";
import type { BlogPost } from "~/payload-types";

type Props = {
  preHeading?: string | null;
  mainHeading: string;
  posts?: (BlogPost | string)[] | null;
};

export const FeaturedBlogPost: React.FC<Props> = ({
  preHeading,
  mainHeading,
  posts,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!posts || posts.length === 0) return null;

  // Filter out unpopulated strings
  const validPosts = posts.filter(
    (p): p is BlogPost => typeof p !== "string"
  );

  if (validPosts.length === 0) return null;

  // Extract unique categories from validPosts
  const categoriesMap = new Map<string, { id: string; title: string }>();
  validPosts.forEach((p) => {
    if (p.category && typeof p.category !== "string") {
      categoriesMap.set(p.category.id, { id: p.category.id, title: p.category.title });
    }
  });
  const categories = Array.from(categoriesMap.values());

  // Filter posts based on selected category
  const filteredPosts = validPosts.filter((p) => {
    if (selectedCategory === "all") return true;
    if (!p.category || typeof p.category === "string") return false;
    return p.category.id === selectedCategory;
  });

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -scrollRef.current.clientWidth : scrollRef.current.clientWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Reset scroll when filter changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [selectedCategory]);

  return (
    <section className="dynamic-section w-full bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-h2-bold uppercase tracking-wider mb-4 leading-tight text-[#1a1a1a]">
            {preHeading && <span className="font-light mr-3">{preHeading}</span>}
            <span className="font-bold">{mainHeading}</span>
          </h2>
        </div>

        {/* Filter Dropdown */}
        {categories.length > 0 && (
          <div className="mb-12 flex justify-start">
            <div className="relative inline-flex items-center">
              <div className="flex items-center border border-gray-300 bg-transparent px-4 py-2">
                <svg className="w-4 h-4 mr-2 text-[#cdbfae]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                </svg>
                <span className="text-body font-medium mr-2 text-[#1a1a1a]">Filter By</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-transparent text-h5-bold uppercase focus:outline-none cursor-pointer appearance-none text-[#1a1a1a]"
                  style={{ paddingRight: '20px' }}
                >
                  <option value="all" className="text-black">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id} className="text-black">
                      {cat.title}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 pointer-events-none">
                  <svg className="w-4 h-4 text-[#1a1a1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
          </div>
        )}

        {filteredPosts.length === 0 ? (
          <div className="text-center py-10 opacity-70">
            No posts found for this category.
          </div>
        ) : (
          <div className="relative">
            <div 
              ref={scrollRef}
              className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden w-full"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {filteredPosts.map((p) => {
                const imageUrl = p.card?.cardImage ? getMedia(p.card.cardImage) : getMedia(p.featuredImage);
                return (
                  <div key={p.id} className="w-full shrink-0 snap-center">
                    <div className="flex flex-col md:flex-row items-center gap-10">
                      <div className="w-full md:w-1/2">
                        {imageUrl && (
                          <div className="relative w-full aspect-[4/3]">
                            <Image
                              src={imageUrl}
                              alt={p.title}
                              fill
                              className="object-cover rounded-md"
                              unoptimized={imageUrl.includes('localhost') || imageUrl.includes('127.0.0.1')}
                            />
                          </div>
                        )}
                      </div>

                      <div className="w-full md:w-1/2 flex flex-col items-start text-left">
                        <h3 className="text-h3-bold uppercase tracking-widest text-[#1a1a1a] mb-6">
                          {p.title}
                        </h3>
                        <p className="text-gray-500 text-body leading-relaxed mb-8">
                          {p.card?.excerpt}
                        </p>
                        <Link 
                          href={`/blog/${p.slug}`}
                          className="inline-flex items-center text-h5-bold uppercase tracking-widest text-[#1a1a1a] hover:opacity-70 transition-opacity"
                        >
                          READ MORE
                          <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Custom Arrows if multiple posts */}
            {filteredPosts.length > 1 && (
              <div className="flex justify-center items-center gap-6 mt-12">
                <button
                  onClick={() => scroll('left')}
                  className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-black transition-colors"
                  aria-label="Previous slide"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => scroll('right')}
                  className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-black transition-colors"
                  aria-label="Next slide"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedBlogPost;
