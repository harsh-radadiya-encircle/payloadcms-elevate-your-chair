import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getMedia } from "~/_utils/getMedia";
import { Button } from "~/components/ui/Button";

type Props = {
  layout: "image-left" | "image-right";
  preheading?: string | null;
  mainHeading: string;
  emailAddress?: string;
  socialLinks?: {
    icon: any;
    handle: string;
    url: string;
    id?: string;
  }[];
  buttons?: any[]; // Reusable button array
  image: any;
};

// Simple SVG Icons
const EnvelopeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6M22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ContactInformation: React.FC<Props> = ({
  layout,
  preHeading,
  mainHeading,
  emailAddress,
  socialLinks,
  buttons,
  image,
}) => {
  const isImageLeft = layout === "image-left";
  const imageUrl = getMedia(image);

  return (
    <section className="dynamic-section w-full bg-[#f8f8f8] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12 lg:gap-24">
        
        {/* Content Side */}
        <div 
          className={`flex-1 flex flex-col items-start order-last ${
            isImageLeft ? "md:order-2" : "md:order-1"
          }`}
        >
          {/* Vertical line and Text Container */}
          <div className="flex">
            {/* The vertical line matching SplitContent */}
            <div className="w-[3px] bg-[#1a1a1a] mr-4 md:mr-6 shrink-0 h-auto self-stretch mt-2"></div>
            
            <div className="flex flex-col py-2 min-w-0 w-full">
              {/* Headings */}
              <h2 className="uppercase mb-10 leading-tight text-[#1a1a1a]">
                {preHeading && (
                  <span className="text-sm md:text-xl block mb-2 break-words">{preHeading}</span>
                )}
                <span className="text-3xl md:text-6xl font-extrabold block break-words">{mainHeading}</span>
              </h2>

              {/* Email Address */}
              {emailAddress && (
                <div className="flex items-center gap-4 mb-6">
                  <EnvelopeIcon />
                  <a href={`mailto:${emailAddress}`} className="text-sm md:text-xl font-bold text-[#1a1a1a] hover:opacity-70 transition-opacity break-all">
                    {emailAddress}
                  </a>
                </div>
              )}

              {/* Social Links */}
              {socialLinks && socialLinks.length > 0 && (
                <div className="flex flex-col gap-4 mb-10">
                  {socialLinks.map((link, idx) => {
                    const iconUrl = getMedia(link.icon);
                    return (
                      <a key={link.id || idx} href={link.url} target="_blank" rel="noreferrer" className="flex items-center gap-4 text-[#1a1a1a] hover:opacity-70 transition-opacity">
                        {iconUrl && iconUrl !== "#" ? (
                          <div className="relative w-6 h-6 shrink-0">
                            <Image src={iconUrl} alt={link.handle} fill className="object-contain" unoptimized={iconUrl.includes('localhost') || iconUrl.includes('127.0.0.1')} />
                          </div>
                        ) : null}
                        <span className="text-sm md:text-xl font-bold break-all">
                          {link.handle}
                        </span>
                      </a>
                    );
                  })}
                </div>
              )}

              {/* App Buttons */}
              {buttons && buttons.length > 0 && (
                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                  {buttons.map((btn, idx) => (
                    <Button key={btn.id || idx} {...btn} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Image Side */}
        <div 
          className={`flex-1 w-full flex justify-center order-first ${
            isImageLeft ? "md:order-1" : "md:order-2"
          }`}
        >
          {imageUrl && imageUrl !== "#" ? (
            <div className="relative w-full aspect-[4/3] md:aspect-[3/2] lg:aspect-[16/11]">
              <Image
                src={imageUrl}
                alt={mainHeading || "Featured Image"}
                fill
                className="object-contain"
                unoptimized={imageUrl.includes('localhost') || imageUrl.includes('127.0.0.1')}
              />
            </div>
          ) : (
            <div className="w-full aspect-[4/3] bg-gray-200 animate-pulse rounded-lg flex items-center justify-center text-gray-400">
              No image uploaded
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default ContactInformation;
