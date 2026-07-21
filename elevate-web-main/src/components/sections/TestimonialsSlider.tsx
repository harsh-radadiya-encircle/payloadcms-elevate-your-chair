"use client";

import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getMedia } from "~/_utils/getMedia";
import Image from "next/image";
import { FadeIn } from "~/components/animations/FadeIn";

type Testimonial = {
  mediaType?: "image" | "video" | "none" | null;
  image?: any;
  videoUrl?: string | null;
  quote: string;
  name: string;
  id?: string | null;
};

type Props = {
  backgroundImage?: any;
  preHeading?: string | null;
  mainHeading: string;
  cardBorderColor?: string | null;
  testimonials?: Testimonial[] | null;
  bgOpacity?: number | null;
};

export const TestimonialsSlider: React.FC<Props> = ({
  backgroundImage,
  preHeading,
  mainHeading,
  cardBorderColor,
  testimonials,
  bgOpacity = 10,
}) => {
  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false, // We use custom arrows
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const next = () => {
    sliderRef.current?.slickNext();
  };

  const previous = () => {
    sliderRef.current?.slickPrev();
  };

  const bgImageUrl = getMedia(backgroundImage);
  const baseColor = cardBorderColor || "#CDBEA5";
  const borderGradient = baseColor.startsWith("linear-gradient")
    ? baseColor
    : `linear-gradient(180deg, ${baseColor} 0%, ${baseColor}66 45%, transparent 100%)`;

  return (
    <section className={`dynamic-section relative w-full py-20 px-6 overflow-hidden ${bgImageUrl && bgImageUrl !== "#" ? "bg-[#e6dfd8]" : "bg-[#fafafa]"}`}>
      {/* Background Image & Overlay */}
      {bgImageUrl && bgImageUrl !== "#" && (
        <div className="absolute inset-0 z-0" style={{ opacity: bgOpacity / 100 }}>
          <Image
            src={bgImageUrl}
            alt="Background"
            fill
            className="object-cover object-center"
            unoptimized={bgImageUrl.includes('localhost') || bgImageUrl.includes('127.0.0.1')}
          />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <FadeIn direction="up" className="text-center mb-16 flex flex-col items-center">
          <h2 className="uppercase tracking-wider mb-4 leading-tight text-[#1a1a1a]">
            {preHeading && (
              <span className="text-h2 block md:inline-block mr-3 mb-2 md:mb-0">{preHeading}</span>
            )}
            <span className="text-h2-bold block md:inline-block">{mainHeading}</span>
          </h2>
        </FadeIn>

        {/* Slider Container */}
        {testimonials && testimonials.length > 0 && (
          <FadeIn direction="up" delay={0.2} className="relative">
            <Slider ref={sliderRef} {...settings} className="mx-[-10px]">
              {testimonials.map((testimonial, idx) => {
                const hasMedia = testimonial.mediaType === 'image' || testimonial.mediaType === 'video';
                const imageUrl = hasMedia ? getMedia(testimonial.image) : null;
                const isVideo = testimonial.mediaType === 'video';

                return (
                  <div key={idx} className="px-[10px] py-4 h-full">
                    <div
                      className="bg-white p-6 flex flex-col items-center text-center relative h-full shadow-lg"
                      style={{
                        border: "3px solid transparent",
                        borderImage: `${borderGradient} 1`,
                      }}
                    >

                      {/* Media Area */}
                      {hasMedia && imageUrl && imageUrl !== "#" && (
                        <div className="relative w-full aspect-[4/3] mb-8">
                          <Image
                            src={imageUrl}
                            alt={testimonial.name}
                            fill
                            className="object-cover border-4 border-white shadow-sm"
                            unoptimized={imageUrl.includes('localhost') || imageUrl.includes('127.0.0.1')}
                          />
                          {/* Play Button Overlay */}
                          {isVideo && (
                            <a
                              href={testimonial.videoUrl || "#"}
                              target={testimonial.videoUrl ? "_blank" : "_self"}
                              rel="noopener noreferrer"
                              className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
                            >
                              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center pl-1 shadow-md">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="#1a1a1a">
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            </a>
                          )}
                        </div>
                      )}

                      {/* Left Quote */}
                      {!hasMedia && (
                        <div className="absolute top-6 left-6 text-4xl text-gray-400 font-serif leading-none">
                          &ldquo;
                        </div>
                      )}

                      {/* Quote Text */}
                      <p className="text-gray-500 text-body leading-relaxed mt-2 mb-8 px-4 flex-grow flex items-center justify-center relative">
                        {hasMedia && <span className="font-serif text-xl absolute top-0 left-0 -mt-2 text-gray-400">&ldquo;</span>}
                        {testimonial.quote}
                        {hasMedia && <span className="font-serif text-xl absolute bottom-0 right-0 -mb-2 text-gray-400">&rdquo;</span>}
                      </p>

                      {/* Right Quote */}
                      {!hasMedia && (
                        <div className="absolute top-6 right-6 text-4xl text-gray-400 font-serif leading-none">
                          &rdquo;
                        </div>
                      )}

                      {/* Name */}
                      <h4 className="text-h5-bold uppercase tracking-widest text-[#1a1a1a] mt-auto">
                        {testimonial.name}
                      </h4>
                    </div>
                  </div>
                );
              })}
            </Slider>

            {/* Custom Arrows */}
            <div className="flex justify-center items-center gap-6 mt-12">
              <button
                onClick={previous}
                className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-black transition-colors"
                aria-label="Previous slide"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={next}
                className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-black transition-colors"
                aria-label="Next slide"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
};
