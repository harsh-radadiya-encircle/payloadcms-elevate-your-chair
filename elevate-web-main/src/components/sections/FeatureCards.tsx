import React, { useRef } from "react";
import Image from "next/image";
import { getMedia } from "~/_utils/getMedia";

type CardProps = {
  icon: any;
  title: string;
  description: string;
  id?: string | null;
};

type Props = {
  preHeading?: string | null;
  mainHeading: string;
  subHeading?: string | null;
  cardBorderGradient?: string | null;
  cards?: CardProps[] | null;
};

export const FeatureCards: React.FC<Props> = ({
  preHeading,
  mainHeading,
  subHeading,
  cardBorderGradient,
  cards
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth / 2 : clientWidth / 2;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="dynamic-section w-full bg-[#151515] text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="text-center mb-16 flex flex-col items-center">
          <h2 className="uppercase tracking-wider mb-4 leading-tight">
            {preHeading && (
              <span className="text-h2 block md:inline-block mr-3 mb-2 md:mb-0">{preHeading}</span>
            )}
            <span className="text-h2-bold block md:inline-block">{mainHeading}</span>
          </h2>
          {subHeading && (
            <p className="text-gray-400 text-body max-w-2xl mx-auto">
              {subHeading}
            </p>
          )}
        </div>

        {/* Cards Grid */}
        {cards && cards.length > 0 && (
          <div className="relative">
            <div
              ref={scrollContainerRef}
              className={`flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-4 lg:gap-6 items-stretch scroll-smooth hide-scrollbar pb-6 ${cards.length <= 5 ? "lg:justify-center" : "justify-start"}`}
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {cards.map((card, idx) => {
                const iconUrl = getMedia(card.icon);
                const baseColor = cardBorderGradient || "#CDBEA5";
                const borderGradient = baseColor.startsWith("linear-gradient")
                  ? baseColor
                  : `linear-gradient(180deg, ${baseColor} 0%, ${baseColor}66 45%, transparent 100%)`;

                return (
                  <div
                    key={idx}
                    className={`snap-center w-[85vw] sm:w-[280px] min-w-[200px] max-w-[300px] bg-gradient-to-b from-[#222222] to-[#151515] px-4 md:px-6 py-10 md:py-12 flex flex-col items-center text-center transition-transform hover:-translate-y-1 ${cards.length <= 5 ? "shrink-0 lg:shrink lg:flex-1 lg:w-auto" : "shrink-0"}`}
                    style={{
                      border: "2px solid transparent",
                      borderImage: `${borderGradient} 1`,
                    }}
                  >
                    {/* Icon */}
                    {iconUrl && iconUrl !== "#" && (
                      <div className="relative w-20 h-20 md:w-24 md:h-24 mb-8 mx-auto shrink-0">
                        <Image
                          src={iconUrl}
                          alt={card.title}
                          fill
                          className="object-contain"
                          unoptimized={iconUrl.includes('localhost') || iconUrl.includes('127.0.0.1')}
                        />
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="text-body uppercase font-bold tracking-widest mb-4 leading-snug">
                      {card.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 text-h5 leading-relaxed mt-auto">
                      {card.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Scroll Buttons */}
            {cards.length > 1 && (
              <div className={`flex justify-center items-center space-x-6 mt-8 ${cards.length <= 5 ? "lg:hidden" : ""}`}>
                <button
                  onClick={() => scroll('left')}
                  className="w-12 h-12 flex items-center justify-center border border-gray-600 rounded-sm hover:border-[#cdbfae] transition-colors"
                  aria-label="Scroll left"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 12H5M5 12L12 5M5 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  onClick={() => scroll('right')}
                  className="w-12 h-12 flex items-center justify-center border border-gray-600 rounded-sm hover:border-[#cdbfae] transition-colors"
                  aria-label="Scroll right"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            )}

            <style jsx>{`
              .hide-scrollbar::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </div>
        )}

      </div>
    </section>
  );
};
