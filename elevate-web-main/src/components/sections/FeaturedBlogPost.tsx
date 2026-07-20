import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getMedia } from "~/_utils/getMedia";
import type { BlogPost } from "~/payload-types";

type Props = {
  preheading?: string | null;
  mainHeading: string;
  post: BlogPost | string;
};

export const FeaturedBlogPost: React.FC<Props> = ({
  preHeading,
  mainHeading,
  post,
}) => {
  if (!post || typeof post === "string") return null;

  const imageUrl = post.card?.cardImage ? getMedia(post.card.cardImage) : getMedia(post.featuredImage);

  return (
    <section className="dynamic-section w-full bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl uppercase tracking-wider mb-4 leading-tight text-[#1a1a1a]">
            {preHeading && <span className="font-light mr-3">{preHeading}</span>}
            <span className="font-bold">{mainHeading}</span>
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="w-full md:w-1/2">
            {imageUrl && (
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover rounded-md"
                  unoptimized={imageUrl.includes('localhost') || imageUrl.includes('127.0.0.1')}
                />
              </div>
            )}
          </div>

          <div className="w-full md:w-1/2 flex flex-col items-start text-left">
            <h3 className="text-2xl font-bold uppercase tracking-widest text-[#1a1a1a] mb-6">
              {post.title}
            </h3>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-8">
              {post.card?.excerpt}
            </p>
            <Link 
              href={`/blog/${post.slug}`}
              className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-[#1a1a1a] hover:opacity-70 transition-opacity"
            >
              READ MORE
              <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlogPost;
