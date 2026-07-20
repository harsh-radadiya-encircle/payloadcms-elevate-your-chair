import React from "react";
import Image from "next/image";
import { getMedia } from "~/_utils/getMedia";

type GridImage = {
  image: any;
  title?: string | null;
};

type Props = {
  preheading?: string | null;
  mainHeading: string;
  subheading?: string | null;
  description_html?: string | null;
  images?: GridImage[];
};

export const ImageGridSection: React.FC<Props> = ({
  preHeading,
  mainHeading,
  subHeading,
  description_html,
  images
}) => {
  return (
    <section className="dynamic-section w-full bg-white text-[#1a1a1a] py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl uppercase tracking-wider mb-4 leading-tight">
            {preHeading && (
              <span className="font-light mr-3">{preHeading}</span>
            )}
            <span className="font-bold">{mainHeading}</span>
          </h2>
          {subHeading && (
            <p className="text-lg md:text-xl text-[#1a1a1a] mb-6">
              {subHeading}
            </p>
          )}
          {description_html && (
            <div 
              className="prose prose-sm md:prose-base prose-gray max-w-4xl mx-auto text-[#666666] leading-relaxed text-center"
              dangerouslySetInnerHTML={{ __html: description_html }}
            />
          )}
        </div>

        {images && images.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
            {images.map((img, idx) => {
              const imageUrl = getMedia(img.image);
              return (
                <div key={idx} className="flex flex-col text-center items-center">
                  {imageUrl && imageUrl !== "#" ? (
                    <div className="relative w-full aspect-square mb-6">
                      <Image
                        src={imageUrl}
                        alt={img.title || "Grid Image"}
                        fill
                        className="object-cover" 
                        unoptimized={imageUrl.includes('localhost') || imageUrl.includes('127.0.0.1')}
                      />
                    </div>
                  ) : (
                    <div className="relative w-full aspect-square mb-6 bg-gray-200 flex items-center justify-center">
                      No Image
                    </div>
                  )}
                  {img.title && (
                    <h3 className="text-xs md:text-sm font-bold uppercase tracking-widest text-[#1a1a1a] leading-relaxed">
                      {img.title}
                    </h3>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ImageGridSection;
