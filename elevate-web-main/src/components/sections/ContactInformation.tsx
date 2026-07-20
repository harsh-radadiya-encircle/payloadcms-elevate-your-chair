import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getMedia } from "~/_utils/getMedia";

type Props = {
  layout: "image-left" | "image-right";
  preHeading?: string;
  mainHeading: string;
  emailAddress?: string;
  socialHandle?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
  youtubeUrl?: string;
  appStoreUrl?: string;
  googlePlayUrl?: string;
  image: any;
};

// Simple SVG Icons
const EnvelopeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6M22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2"/>
    <path d="M16 11.37C16.1234 12.2023 15.9812 13.0523 15.5937 13.7991C15.2062 14.5459 14.5931 15.1515 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4077 15.906C10.5771 15.7723 9.80971 15.3801 9.21479 14.7852C8.61987 14.1903 8.22768 13.4229 8.09401 12.5923C7.96034 11.7616 8.09206 10.9099 8.47028 10.1584C8.84849 9.40685 9.45413 8.79375 10.2009 8.40624C10.9477 8.01874 11.7977 7.87659 12.63 8C13.4789 8.12588 14.2648 8.52146 14.8716 9.12836C15.4785 9.73525 15.8741 10.5211 16 11.37Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17.5 6.5H17.51" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TiktokIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 12C9 13.6569 7.65685 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C6.31976 9 6.62779 9.05 6.915 9.143C6.97 9.049 7 8.94 7 8.828V3H11C11.5523 3 12 3.44772 12 4V4.5C14.7614 4.5 17 6.73858 17 9.5V10C17 10.5523 16.5523 11 16 11H14C13.4477 11 13 10.5523 13 10V9.5C13 8.39543 12.1046 7.5 11 7.5V17C11 19.7614 8.76142 22 6 22C3.23858 22 1 19.7614 1 17C1 14.2386 3.23858 12 6 12H9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.54 6.42C22.54 6.42 22.32 4.88 21.64 4.2C20.78 3.3 19.82 3.29 19.38 3.24C16.88 3.06 12 3.06 12 3.06H11.97C11.97 3.06 7.09 3.06 4.59 3.24C4.15 3.29 3.19 3.3 2.33 4.2C1.65 4.88 1.43 6.42 1.43 6.42C1.43 6.42 1.25 8.23 1.25 10.04V11.9C1.25 13.72 1.43 15.53 1.43 15.53C1.43 15.53 1.65 17.07 2.33 17.75C3.19 18.65 4.31 18.62 4.8 18.72C7.54 18.98 11.99 19.01 11.99 19.01C11.99 19.01 16.89 19 19.39 18.82C19.83 18.77 20.79 18.76 21.65 17.86C22.33 17.18 22.55 15.64 22.55 15.64C22.55 15.64 22.73 13.83 22.73 12.01V10.15C22.73 8.33 22.55 6.42 22.54 6.42ZM9.76 14.54V7.42L15.93 11L9.76 14.54Z" fill="currentColor"/>
  </svg>
);

const AppStoreIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.6393 2.50293C13.4357 1.4988 14.8693 0.812328 15.6881 0.771221C15.8286 2.05737 15.2285 3.51865 14.3989 4.54203C13.626 5.48316 12.1963 6.2299 11.2721 6.13601C11.1213 4.90806 11.7423 3.55403 12.6393 2.50293ZM16.3533 16.7329C15.8851 18.0664 13.5653 23.3644 10.9754 23.3644C9.52382 23.3644 9.1724 22.4241 7.42784 22.4241C5.64817 22.4241 5.21509 23.3283 3.84478 23.3283C1.21974 23.3283 -1.86241 16.9248 1.13702 11.7588C2.53123 9.35624 4.88701 8.01974 7.21764 8.01974C8.59976 8.01974 9.87652 8.87565 10.7431 8.87565C11.6672 8.87565 13.2355 7.85409 14.8857 7.85409C15.8222 7.85409 18.0583 8.3597 19.4632 10.4303C19.2407 10.5708 17.0733 11.8317 17.0733 14.4754C17.0733 17.6834 19.8614 18.7308 19.9551 18.7777C19.8966 18.9652 19.206 21.2849 17.4304 21.2849C17.0205 21.2849 16.6343 21.1325 16.3533 16.7329Z" fill="currentColor"/>
  </svg>
);

const PlayStoreIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.38531 1.25899C1.19231 1.45199 1.08545 1.74104 1.08545 2.11584V21.8841C1.08545 22.2589 1.19231 22.548 1.38531 22.741L1.47098 22.8267L12.3853 11.9123V11.741L1.47098 0.82666L1.38531 1.25899Z" fill="currentColor"/>
    <path d="M16.0354 15.5658L12.3855 11.9159V11.7446L16.0354 8.09473L16.164 8.16969L20.8033 10.8033C22.1312 11.5315 22.1312 12.7309 20.8033 13.4697L16.164 16.1033L16.0354 15.5658Z" fill="currentColor"/>
    <path d="M16.0356 15.5658L12.3857 11.9159L1.38574 22.9159C1.81409 23.3442 2.51016 23.3978 3.32402 22.9266L16.0356 15.5658Z" fill="currentColor"/>
    <path d="M16.0356 8.09475L3.32402 0.733973C2.51016 0.262791 1.81409 0.316335 1.38574 0.744686L12.3857 11.7447L16.0356 8.09475Z" fill="currentColor"/>
  </svg>
);

export const ContactInformation: React.FC<Props> = ({
  layout,
  preHeading,
  mainHeading,
  emailAddress,
  socialHandle,
  instagramUrl,
  tiktokUrl,
  youtubeUrl,
  appStoreUrl,
  googlePlayUrl,
  image,
}) => {
  const isImageLeft = layout === "image-left";
  const imageUrl = getMedia(image);

  return (
    <section className="w-full bg-[#f8f8f8] py-16 md:py-24">
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
            
            <div className="flex flex-col py-2">
              {/* Headings */}
              <h2 className="text-4xl md:text-6xl uppercase mb-10 leading-tight text-[#1a1a1a]">
                {preHeading && (
                  <span className="font-light block mb-2">{preHeading}</span>
                )}
                <span className="font-extrabold tracking-tight">{mainHeading}</span>
              </h2>

              {/* Email Address */}
              {emailAddress && (
                <div className="flex items-center gap-4 mb-6">
                  <EnvelopeIcon />
                  <a href={`mailto:${emailAddress}`} className="text-lg md:text-xl font-bold text-[#1a1a1a] hover:opacity-70 transition-opacity">
                    {emailAddress}
                  </a>
                </div>
              )}

              {/* Social Handle */}
              {socialHandle && (
                <div className="flex items-center gap-4 mb-10">
                  <div className="flex gap-3 text-[#1a1a1a]">
                    {instagramUrl && (
                      <a href={instagramUrl} target="_blank" rel="noreferrer" className="hover:opacity-70 transition-opacity">
                        <InstagramIcon />
                      </a>
                    )}
                    {tiktokUrl && (
                      <a href={tiktokUrl} target="_blank" rel="noreferrer" className="hover:opacity-70 transition-opacity">
                        <TiktokIcon />
                      </a>
                    )}
                    {youtubeUrl && (
                      <a href={youtubeUrl} target="_blank" rel="noreferrer" className="hover:opacity-70 transition-opacity">
                        <YoutubeIcon />
                      </a>
                    )}
                  </div>
                  <span className="text-lg md:text-xl font-bold text-[#1a1a1a]">
                    {socialHandle}
                  </span>
                </div>
              )}

              {/* App Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                {appStoreUrl && (
                  <a
                    href={appStoreUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-3 px-6 py-3 bg-[#cdbfae] text-[#1a1a1a] text-sm font-bold tracking-widest uppercase transition-opacity hover:opacity-80 rounded-sm"
                  >
                    <AppStoreIcon />
                    APP STORE
                  </a>
                )}
                {googlePlayUrl && (
                  <a
                    href={googlePlayUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-3 px-6 py-3 bg-[#cdbfae] text-[#1a1a1a] text-sm font-bold tracking-widest uppercase transition-opacity hover:opacity-80 rounded-sm"
                  >
                    <PlayStoreIcon />
                    GOOGLE PLAY
                  </a>
                )}
              </div>
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
