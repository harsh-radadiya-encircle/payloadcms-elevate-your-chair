import React from "react";
import Image from "next/image";
import { getMedia } from "~/_utils/getMedia";

type Props = {
  backgroundImage: any;
  preHeading?: string;
  mainHeading: string;
  content_html?: string;
  bgOpacity?: number;
};

export const StorySection: React.FC<Props> = ({
  backgroundImage,
  preHeading,
  mainHeading,
  content_html,
  bgOpacity = 10,
}) => {
  const bgImageUrl = getMedia(backgroundImage);
  return (
    <section className={`relative w-full py-16 md:py-24 px-4 md:px-8 flex items-center justify-center overflow-hidden min-h-[60vh] ${bgImageUrl && bgImageUrl !== "#" ? "bg-[#e6dfd8]" : ""}`}>
      {/* Full Width Background Image */}
      {bgImageUrl && bgImageUrl !== "#" && (
        <>
          <div className="absolute inset-0 z-0" style={{ opacity: bgOpacity / 100 }}>
            <Image
              src={bgImageUrl}
              alt="Background"
              fill
              className="object-cover"
              unoptimized={bgImageUrl.includes('localhost') || bgImageUrl.includes('127.0.0.1')}
            />
          </div>
        </>
      )}

      {/* Main White Container */}
      <div className="relative z-10 w-full max-w-5xl bg-white shadow-2xl px-6 py-12 md:px-16 md:py-20 text-center flex flex-col items-center">
        
        {/* Headings */}
        <h2 className="text-3xl md:text-5xl uppercase tracking-widest mb-10 leading-tight text-[#1a1a1a]">
          {preHeading && (
            <span className="font-light mr-3">{preHeading}</span>
          )}
          <span className="font-bold">{mainHeading}</span>
        </h2>

        {/* Rich Text Content */}
        {content_html && (
          <div 
            className="prose prose-sm md:prose-base max-w-none text-[#666666] leading-loose space-y-6 text-center"
            dangerouslySetInnerHTML={{ __html: content_html }}
          />
        )}
        
        {/* Scoped CSS for the rich text within this specific block to ensure it remains centered and gray */}
        <style jsx>{`
          .prose :global(p) {
            margin-bottom: 1.5em;
            text-align: center;
          }
          .prose :global(a) {
            color: #1a1a1a;
            font-weight: 600;
          }
          .prose :global(a:hover) {
            opacity: 0.8;
          }
        `}</style>
      </div>
    </section>
  );
};
