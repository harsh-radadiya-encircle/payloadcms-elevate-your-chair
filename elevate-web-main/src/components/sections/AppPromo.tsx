import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getMedia } from "~/_utils/getMedia";
import { FadeIn } from "~/components/animations/FadeIn";

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
    <section
      className="dynamic-section w-full overflow-hidden relative text-white"
      style={{
        background: `radial-gradient(circle at ${isImageLeft ? "left center" : "right center"}, ${gradientColor} 0%, #0c0e12 70%)`
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12 lg:gap-24 relative z-10">

        {/* Content Side */}
        <FadeIn
          direction={isImageLeft ? "right" : "left"}
          className={`flex-1 flex flex-col items-start order-last ${isImageLeft ? "md:order-2" : "md:order-1"
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
        </FadeIn>

        {/* Image Side */}
        <FadeIn
          direction={isImageLeft ? "left" : "right"}
          className={`relative flex-1 w-full flex justify-center items-center order-first ${isImageLeft ? "md:order-1" : "md:order-2"
            }`}
        >

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
        </FadeIn>

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
