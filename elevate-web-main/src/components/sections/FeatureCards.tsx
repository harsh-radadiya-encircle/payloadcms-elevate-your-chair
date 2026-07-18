import React from "react";
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
  cards?: CardProps[];
};

export const FeatureCards: React.FC<Props> = ({ 
  preHeading, 
  mainHeading, 
  subHeading, 
  cards 
}) => {
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
            <div className="flex flex-nowrap md:flex-wrap overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none justify-start md:justify-center gap-4 lg:gap-6 items-stretch scroll-smooth hide-scrollbar pb-6 md:pb-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {cards.map((card, idx) => {
                const iconUrl = getMedia(card.icon);
                
                return (
                  <div 
                    key={idx}
                    className="snap-center shrink-0 w-[85vw] sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-auto lg:flex-1 min-w-[260px] max-w-[300px] border border-[#cdbfae]/50 bg-gradient-to-b from-[#222222] to-[#151515] px-6 py-12 flex flex-col items-center text-center transition-transform hover:-translate-y-1"
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
            {/* Mobile swipe hint / arrows spacing (Optional, visually represents the scroll area) */}
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
