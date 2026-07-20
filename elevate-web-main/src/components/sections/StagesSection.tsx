import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getMedia } from "~/_utils/getMedia";
import { Button } from "~/components/ui/Button";

type Stage = {
  image: any;
  label: string;
  id?: string | null;
};

type Props = {
  backgroundImage: any;
  preHeading?: string | null;
  mainHeading: string;
  subHeading?: string | null;
  stages?: Stage[] | null;
  bottomText?: string | null;
  buttons?: any[] | null;
};

export const StagesSection: React.FC<Props> = ({
  backgroundImage,
  preHeading,
  mainHeading,
  subHeading,
  stages,
  bottomText,
  buttons,
}) => {
  const bgImageUrl = getMedia(backgroundImage);

  return (
    <section className="dynamic-section relative w-full py-16 md:py-24 px-4 flex items-center justify-center overflow-hidden">
      {/* Full Width Background Image */}
      {bgImageUrl && bgImageUrl !== "#" && (
        <>
          <div className="absolute inset-0 z-0">
            <Image
              src={bgImageUrl}
              alt="Background"
              fill
              className="object-cover"
              unoptimized={bgImageUrl.includes('localhost') || bgImageUrl.includes('127.0.0.1')}
            />
          </div>
          {/* Light overlay over the background image */}
          <div className="absolute inset-0 bg-white/40 backdrop-blur-sm z-0"></div>
        </>
      )}

      {/* Main White Container */}
      <div className="relative z-10 w-full max-w-6xl bg-white/95 shadow-2xl px-6 py-12 md:px-12 md:py-16 text-center">
        
        {/* Headings */}
        <h2 className="text-3xl md:text-5xl uppercase tracking-widest mb-10 leading-tight text-[#1a1a1a]">
          {preHeading && (
            <span className="font-light block mb-2">{preHeading}</span>
          )}
          <span className="font-bold block">{mainHeading}</span>
        </h2>

        {subHeading && (
          <p className="text-sm md:text-base font-bold text-[#1a1a1a] mb-10">
            {subHeading}
          </p>
        )}

        {/* Stages Grid */}
        {stages && stages.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-10">
            {stages.map((stage, idx) => {
              const stageImageUrl = getMedia(stage.image);
              return (
                <div key={idx} className="flex flex-col items-center text-center">
                  {stageImageUrl && stageImageUrl !== "#" ? (
                    <div className="relative w-full aspect-[4/3] mb-4">
                      <Image
                        src={stageImageUrl}
                        alt={stage.label || "Stage Image"}
                        fill
                        className="object-cover shadow-md"
                        unoptimized={stageImageUrl.includes('localhost') || stageImageUrl.includes('127.0.0.1')}
                      />
                    </div>
                  ) : (
                    <div className="w-full aspect-[4/3] bg-gray-200 animate-pulse mb-4 flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                  <p className="text-xs md:text-sm font-bold text-[#1a1a1a] leading-relaxed max-w-[200px]">
                    {stage.label}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Text */}
        {bottomText && (
          <p className="text-sm md:text-base font-bold text-[#1a1a1a] mb-8">
            {bottomText}
          </p>
        )}

        {/* Buttons */}
        {buttons && buttons.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {buttons.map((btn: any, btnIdx: number) => (
              <Button
                key={btnIdx}
                {...btn}
                defaultSolidBgColor="#cdbfae"
                defaultSolidTextColor="#000000"
                defaultOutlineTextColor="#1a1a1a"
                defaultOutlineBorderColor="#1a1a1a"
                defaultHoverTextColor="#ffffff"
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
