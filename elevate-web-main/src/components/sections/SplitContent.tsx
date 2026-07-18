import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getMedia } from "~/_utils/getMedia";

type Props = {
  layout: "image-left" | "image-right";
  image: any;
  preHeading?: string;
  mainHeading: string;
  description_html?: string;
  buttons?: any[];
};

export const SplitContent: React.FC<Props> = ({ 
  layout, 
  image, 
  preHeading, 
  mainHeading, 
  description_html, 
  buttons 
}) => {
  const isImageLeft = layout === "image-left";
  const imageUrl = getMedia(image);

  return (
    <section className="w-full bg-[#f8f8f8] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12 lg:gap-24">
        
        {/* Content Side */}
        <div 
          className={`flex-1 flex flex-col items-start ${
            isImageLeft ? "md:order-2" : "md:order-1"
          }`}
        >
          {/* Vertical line and Text Container */}
          <div className="flex">
            {/* The vertical line (increased thickness) */}
            <div className="w-[3px] bg-gray-300 mr-6 hidden md:block shrink-0"></div>
            
            <div className="flex flex-col py-2">
              {/* Headings */}
              <h2 className="text-3xl md:text-5xl uppercase mb-6 leading-tight text-[#1a1a1a]">
                {preHeading && (
                  <span className="font-light block">{preHeading}</span>
                )}
                <span className="font-bold">{mainHeading}</span>
              </h2>

              {/* Rich Text Description */}
              {description_html && (
                <div 
                  className="prose prose-sm md:prose-base prose-gray max-w-none mb-8 text-gray-600 space-y-4"
                  dangerouslySetInnerHTML={{ __html: description_html }}
                />
              )}

              {/* Buttons */}
              {buttons && buttons.length > 0 && (
                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                  {buttons.map((btn: any, btnIdx: number) => {
                    const isSolid = btn.style === "solid";
                    
                    let bgColor, textColor, borderColor;

                    if (isSolid) {
                      bgColor = btn.backgroundColor || "#cdbfae";
                      textColor = btn.textColor || "#000000";
                      borderColor = bgColor;
                    } else {
                      bgColor = "transparent";
                      textColor = btn.textColor || "#1a1a1a";
                      borderColor = btn.textColor || btn.backgroundColor || "#1a1a1a";
                    }

                    return (
                      <Link
                        key={btnIdx}
                        href={btn.url || "#"}
                        target={btn.newTab ? "_blank" : "_self"}
                        style={{
                          backgroundColor: bgColor,
                          color: textColor,
                          borderColor: borderColor,
                        }}
                        className={`
                          px-8 py-3 text-xs md:text-sm font-semibold tracking-widest uppercase transition-opacity hover:opacity-80 text-center
                          ${isSolid ? "border-none" : "border-2"}
                        `}
                      >
                        {btn.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Image Side */}
        <div 
          className={`flex-1 w-full flex justify-center ${
            isImageLeft ? "md:order-1" : "md:order-2"
          }`}
        >
          {imageUrl && imageUrl !== "#" ? (
            <div className="relative w-full aspect-[3/4] md:aspect-square lg:aspect-[4/5]">
              <Image
                src={imageUrl}
                alt={mainHeading || "Split Section Image"}
                fill
                className="object-contain"
                unoptimized={imageUrl.includes('localhost') || imageUrl.includes('127.0.0.1')}
              />
            </div>
          ) : (
            <div className="w-full aspect-[4/5] bg-gray-200 animate-pulse rounded-lg flex items-center justify-center text-gray-400">
              No image uploaded
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
