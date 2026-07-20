import React, { useRef } from "react";
import Image from "next/image";
import { getMedia } from "~/_utils/getMedia";

type CardProps = {
  icon: any;
  title: string;
  description: string;
};

type Props = {
  preHeading?: string;
  mainHeading: string;
  subHeading?: string;
  cardBorderGradient?: string;
  cards?: CardProps[];
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
    <section className="w-full bg-[#151515] text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="text-center mb-16 flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl uppercase tracking-wider mb-4 leading-tight">
            {preHeading && (
              <span className="font-light mr-3">{preHeading}</span>
            )}
            <span className="font-bold">{mainHeading}</span>
          </h2>
          {subHeading && (
            <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
              {subHeading}
            </p>
          )}
        </div>

        {/* Cards Grid */}
        {cards && cards.length > 0 && (
          <div className="relative">
            <div 
              ref={scrollContainerRef}
              className="flex flex-nowrap md:flex-wrap overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none justify-start md:justify-center gap-4 lg:gap-6 items-stretch scroll-smooth hide-scrollbar pb-6 md:pb-0" 
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
                    className="snap-center shrink-0 w-[85vw] sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-auto lg:flex-1 min-w-[260px] max-w-[300px] bg-gradient-to-b from-[#222222] to-[#151515] px-6 py-12 flex flex-col items-center text-center transition-transform hover:-translate-y-1"
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
                    <h3 className="text-sm md:text-base uppercase font-bold tracking-widest mb-4 leading-snug">
                      {card.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed mt-auto">
                      {card.description}
                    </p>
                  </div>
                );
              })}
            </div>
            
            {/* Scroll Buttons (visible on md and smaller, or when horizontal scrolling is active) */}
            <div className="flex justify-center items-center space-x-6 mt-8 md:hidden">
              <button 
                onClick={() => scroll('left')}
                className="w-12 h-12 flex items-center justify-center border border-gray-600 rounded-sm hover:border-[#cdbfae] transition-colors"
                aria-label="Scroll left"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 12H5M5 12L12 5M5 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button 
                onClick={() => scroll('right')}
                className="w-12 h-12 flex items-center justify-center border border-gray-600 rounded-sm hover:border-[#cdbfae] transition-colors"
                aria-label="Scroll right"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

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
