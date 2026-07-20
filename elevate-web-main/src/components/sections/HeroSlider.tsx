import React from "react";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { Page } from "~/payload-types";
import { getMedia } from "~/_utils/getMedia";
import { Button } from "~/components/ui/Button";

// Extract the HeroSliderBlock type from the layout array union
type LayoutBlocks = NonNullable<Page["layout"]>;
type HeroSliderProps = Extract<LayoutBlocks[number], { blockType: "hero-slider" }>;

// Reusable component for rendering the text & buttons overlay
const HeroContent = ({ data }: { data: any }) => {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 max-w-4xl mx-auto">
      {data.title && (
        <h2 className="text-h2 font-light text-white mb-2 tracking-widest uppercase">
          {data.title}
        </h2>
      )}

      {data.highlightedTitle && (
        <h1 className="text-h1-bold text-white mb-6 text-center">
          {data.highlightedTitle}
        </h1>
      )}

      {data.description && (
        <p className="text-h5 text-white/90 mb-10 max-w-2xl font-light tracking-[0.2em] uppercase leading-relaxed">
          {data.description}
        </p>
      )}

      {data.buttons && data.buttons.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          {data.buttons.map((btn: any, btnIdx: number) => (
            <Button
              key={btnIdx}
              {...btn}
              defaultSolidBgColor="#cdbfae"
              defaultSolidTextColor="#000000"
              defaultOutlineTextColor="#ffffff"
              defaultOutlineBorderColor="#ffffff"
              defaultHoverTextColor="#000000"
            />
          ))}
        </div>
      )}
    </div>
  );
};

const HeroSlider: React.FC<HeroSliderProps> = ({ heroType, singleVideo, slides }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
    customPaging: (i: number) => (
      <div className="w-8 h-1 bg-white/50 mt-4 rounded-full transition-colors duration-300 hover:bg-white"></div>
    ),
    appendDots: (dots: React.ReactNode) => (
      <div style={{ bottom: "40px" }}>
        <ul className="flex justify-center gap-2 m-0 p-0"> {dots} </ul>
      </div>
    ),
  };

  const activeDotStyle = `
    .slick-dots li.slick-active div {
      background-color: white;
    }
  `;

  if (heroType === 'video' && singleVideo) {
    const videoUrl = getMedia(singleVideo.video);
    return (
      <section className="dynamic-section relative w-full h-screen min-h-[600px] overflow-hidden bg-black outline-none">
        {videoUrl !== "#" && (
          <div className="absolute inset-0 z-0">
            <video
              src={videoUrl}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        )}
        <HeroContent data={singleVideo} />
      </section>
    );
  }

  if (heroType === 'slider' && slides && slides.length > 0) {
    return (
      <section className="dynamic-section relative w-full h-screen min-h-[600px] overflow-hidden bg-black">
        <style>{activeDotStyle}</style>
        <Slider {...settings} className="h-full">
          {slides.map((slide, index) => {
            const imageUrl = getMedia(slide.image);
            return (
              <div key={index} className="relative w-full h-screen min-h-[600px] outline-none">
                {imageUrl !== "#" && (
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={imageUrl}
                      alt={slide.title || "Hero Background"}
                      fill
                      className="object-cover"
                      priority={index === 0}
                      unoptimized={imageUrl.includes('localhost') || imageUrl.includes('127.0.0.1')}
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                  </div>
                )}
                <HeroContent data={slide} />
              </div>
            );
          })}
        </Slider>
      </section>
    );
  }

  return null;
};

export default HeroSlider;
