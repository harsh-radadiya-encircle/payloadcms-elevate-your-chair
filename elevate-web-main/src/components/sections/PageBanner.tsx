import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getMedia } from "~/_utils/getMedia";

type Props = {
  title: string;
  mediaType: "image" | "video" | "slider";
  image?: any;
  video?: any;
  slides?: { image: any, id?: string | null }[] | null;
};

const PageBanner: React.FC<Props> = ({ title, mediaType, image, video, slides }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
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

  // Render the central text overlay
  const renderContent = () => (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 mt-16 md:mt-24">
      <h1 className="text-h1 text-white text-center">
        {title}
      </h1>
    </div>
  );

  if (mediaType === "video" && video) {
    const videoUrl = getMedia(video);
    return (
      <section className="dynamic-section relative w-full h-[80vh] min-h-[600px] overflow-hidden bg-black outline-none">
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
        {renderContent()}
      </section>
    );
  }

  if (mediaType === "slider" && slides && slides.length > 0) {
    return (
      <section className="relative w-full h-[80vh] min-h-[600px] overflow-hidden bg-black">
        <style>{activeDotStyle}</style>
        <Slider {...settings} className="h-full absolute inset-0 z-0">
          {slides.map((slide, index) => {
            const imageUrl = getMedia(slide.image);
            return (
              <div key={index} className="relative w-full h-[80vh] min-h-[600px] outline-none">
                {imageUrl !== "#" && (
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={imageUrl}
                      alt={title || "Banner Background"}
                      fill
                      className="object-cover"
                      priority={index === 0}
                      unoptimized={imageUrl.includes('localhost') || imageUrl.includes('127.0.0.1')}
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                  </div>
                )}
              </div>
            );
          })}
        </Slider>
        {renderContent()}
      </section>
    );
  }

  // Fallback to single image
  const imgUrl = getMedia(image);
  return (
    <section className="relative w-full h-[80vh] min-h-[600px] overflow-hidden bg-black">
      {imgUrl !== "#" && (
        <div className="absolute inset-0 z-0">
          <Image
            src={imgUrl}
            alt={title || "Banner Background"}
            fill
            className="object-cover"
            priority
            unoptimized={imgUrl.includes('localhost') || imgUrl.includes('127.0.0.1')}
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      )}
      {renderContent()}
    </section>
  );
};

export default PageBanner;
