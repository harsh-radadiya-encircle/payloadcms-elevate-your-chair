import React from "react";
import Image from "next/image";
import { getMedia } from "~/_utils/getMedia";

type Props = {
  backgroundColor?: string;
  textColor?: string;
  backgroundImage?: any;
  preHeading?: string;
  mainHeading?: string;
  subHeading?: string;
  description_html?: string;
};

export const CenteredTextSection: React.FC<Props> = ({
  backgroundColor = "#f9f9f9",
  textColor = "#1a1a1a",
  backgroundImage,
  preHeading,
  mainHeading,
  subHeading,
  description_html,
}) => {
  const bgImageUrl = getMedia(backgroundImage);
  
  // A heuristic to determine if we should use dark text prose or light text prose
  const isLightText = textColor.toLowerCase() === "#ffffff" || textColor.toLowerCase() === "#fff" || textColor.toLowerCase() === "white";

  return (
    <section 
      className="relative w-full py-24 px-6 overflow-hidden flex justify-center items-center"
      style={{ backgroundColor, color: textColor }}
    >
      {/* Background Image & Overlay */}
      {bgImageUrl && bgImageUrl !== "#" && (
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImageUrl}
            alt="Background"
            fill
            className="object-cover object-center opacity-40"
            unoptimized={bgImageUrl.includes('localhost') || bgImageUrl.includes('127.0.0.1')}
          />
        </div>
      )}

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Heading */}
        {(preHeading || mainHeading) && (
          <h2 className="text-3xl md:text-5xl uppercase tracking-wider mb-6 leading-tight">
            {preHeading && (
              <span className="font-light mr-3">{preHeading}</span>
            )}
            {mainHeading && (
              <span className="font-bold">{mainHeading}</span>
            )}
          </h2>
        )}

        {/* Subheading */}
        {subHeading && (
          <p className="text-lg md:text-xl mb-8 opacity-90">
            {subHeading}
          </p>
        )}

        {/* Description */}
        {description_html && (
          <div 
            className={`prose prose-sm md:prose-base max-w-3xl mx-auto leading-relaxed text-center ${isLightText ? 'prose-invert opacity-90' : 'text-[#666666]'}`}
            dangerouslySetInnerHTML={{ __html: description_html }}
          />
        )}
      </div>
    </section>
  );
};

export default CenteredTextSection;
