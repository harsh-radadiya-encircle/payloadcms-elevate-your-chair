import React from "react";
import Image from "next/image";
import { getMedia } from "~/_utils/getMedia";

type CardProps = {
  image: any;
  title: string;
  description: string;
};

type Props = {
  preHeading?: string;
  mainHeading: string;
  subHeading?: string;
  cards?: CardProps[];
};

export const ImageCardsSection: React.FC<Props> = ({ 
  preHeading, 
  mainHeading, 
  subHeading, 
  cards 
}) => {
  return (
    <section className="dynamic-section w-full bg-[#1a1a1a] text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl uppercase tracking-widest mb-6 leading-tight">
            {preHeading && (
              <span className="font-light mr-3">{preHeading}</span>
            )}
            <span className="font-bold">{mainHeading}</span>
          </h2>
          {subHeading && (
            <p className="text-gray-300 text-xs md:text-sm max-w-4xl mx-auto leading-relaxed">
              {subHeading}
            </p>
          )}
        </div>

        {/* Cards Grid */}
        {cards && cards.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10">
            {cards.map((card, idx) => {
              const imageUrl = getMedia(card.image);
              
              return (
                <div 
                  key={idx}
                  className="bg-white text-black p-4 flex flex-col items-center text-center w-full max-w-md mx-auto md:max-w-none"
                >
                  {/* Image */}
                  {imageUrl && imageUrl !== "#" ? (
                    <div className="relative w-full aspect-[4/3] mb-8">
                      <Image
                        src={imageUrl}
                        alt={card.title}
                        fill
                        className="object-cover" 
                        unoptimized={imageUrl.includes('localhost') || imageUrl.includes('127.0.0.1')}
                      />
                    </div>
                  ) : (
                    <div className="relative w-full aspect-[4/3] mb-8 bg-gray-200 animate-pulse flex items-center justify-center text-gray-400 text-sm">
                      No Image
                    </div>
                  )}
                  
                  {/* Title */}
                  <h3 className="text-sm md:text-base uppercase font-bold tracking-widest mb-4">
                    {card.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-[#666666] text-xs md:text-sm leading-relaxed mb-4">
                    {/* Render newlines if any, or use a rich text renderer if they decide to change it later. For now, simple text. */}
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
        )}
        
      </div>
    </section>
  );
};
