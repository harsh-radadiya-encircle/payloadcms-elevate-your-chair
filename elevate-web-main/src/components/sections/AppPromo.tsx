import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getMedia } from "~/_utils/getMedia";

type Props = {
  layout: "image-left" | "image-right";
  gradientColor?: string;
  image: any;
  preHeading?: string;
  mainHeading: string;
  description_html?: string;
  buttons?: any[];
};

export const AppPromo: React.FC<Props> = ({ 
  layout,
  gradientColor = "#cdbfae",
  image, 
  preHeading, 
  mainHeading, 
  description_html, 
  buttons 
}) => {
  const isImageLeft = layout === "image-left";
  const imageUrl = getMedia(image);

  return (
    <section className="w-full py-16 md:py-24 overflow-hidden relative bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12 lg:gap-24 relative z-10">
        
        {/* Content Side */}
        <div 
          className={`flex-1 flex flex-col items-start ${
            isImageLeft ? "md:order-2" : "md:order-1"
          }`}
        >
          <div className="flex flex-col py-2">
            {/* Headings */}
            <h2 className="text-3xl md:text-5xl uppercase mb-6 leading-tight text-white">
              {preHeading && (
                <span className="font-light block">{preHeading}</span>
              )}
              <span className="font-bold">{mainHeading}</span>
            </h2>

            {/* Rich Text Description */}
            {description_html && (
              <div 
                className="prose prose-sm md:prose-base max-w-none mb-8 space-y-4 prose-invert text-gray-300 app-promo-richtext"
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
                    textColor = btn.textColor || "#ffffff";
                    borderColor = btn.textColor || btn.backgroundColor || "#ffffff";
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
                        flex items-center justify-center gap-3
                        px-6 py-3 text-xs md:text-sm font-semibold tracking-widest uppercase transition-opacity hover:opacity-80 text-center
                        ${isSolid ? "border-none" : "border-2"}
                      `}
                    >
                      {btn.icon && getMedia(btn.icon) && getMedia(btn.icon) !== "#" && (
                        <div className="w-5 h-5 relative shrink-0">
                          <Image
                            src={getMedia(btn.icon)}
                            alt="icon"
                            fill
                            className="object-contain"
                            unoptimized={getMedia(btn.icon).includes('localhost') || getMedia(btn.icon).includes('127.0.0.1')}
                          />
                        </div>
                      )}
                      <span>{btn.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Image Side */}
        <div 
          className={`relative flex-1 w-full flex justify-center items-center ${
            isImageLeft ? "md:order-1" : "md:order-2"
          }`}
        >
          {/* Radial Gradient Glow */}
          {gradientColor && (
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] max-w-[800px] max-h-[800px] z-0 opacity-50 blur-[100px] rounded-full pointer-events-none"
              style={{
                background: `radial-gradient(circle closest-side, ${gradientColor} 0%, transparent 100%)`,
              }}
            ></div>
          )}

          {imageUrl && imageUrl !== "#" ? (
            <div className="relative w-full aspect-[3/4] md:aspect-square lg:aspect-[4/5] z-10">
              <Image
                src={imageUrl}
                alt={mainHeading || "App Promo Image"}
                fill
                className="object-contain"
                unoptimized={imageUrl.includes('localhost') || imageUrl.includes('127.0.0.1')}
              />
            </div>
          ) : (
            <div className="w-full aspect-[4/5] bg-gray-800 animate-pulse rounded-lg flex items-center justify-center text-gray-500 z-10">
              No image uploaded
            </div>
          )}
        </div>

      </div>
      
      {/* Custom Styles for Rich Text */}
      <style jsx global>{`
        .app-promo-richtext ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-top: 1rem;
          margin-bottom: 1rem;
        }
        .app-promo-richtext ul li {
          margin-bottom: 0.5rem;
          padding-left: 0.25rem;
        }
        .app-promo-richtext ul li::marker {
          color: #9ca3af;
        }
        .app-promo-richtext p {
          margin-bottom: 1rem;
        }
      `}</style>
    </section>
  );
};
