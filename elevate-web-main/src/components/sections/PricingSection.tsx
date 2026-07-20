import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { getMedia } from "~/_utils/getMedia";
import { FadeIn } from "~/components/animations/FadeIn";
import { StaggerContainer } from "~/components/animations/StaggerContainer";

type PlanProps = {
  badge?: string;
  title: string;
  monthlyOriginalPrice?: string;
  monthlyPrice: string;
  yearlyOriginalPrice?: string;
  yearlyPrice: string;
  description: string;
  isFeatured?: boolean;
  cardBackground?: string;
  cardBorder?: string;
};

type Props = {
  backgroundImage?: any;
  preHeading?: string;
  mainHeading: string;
  description_html?: string;
  plans?: PlanProps[];
  buttons?: any[];
  bgOpacity?: number;
};

export const PricingSection: React.FC<Props> = ({
  backgroundImage,
  preHeading,
  mainHeading,
  description_html,
  plans,
  buttons,
  bgOpacity = 10,
}) => {
  const [isYearly, setIsYearly] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const bgImageUrl = getMedia(backgroundImage);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth / 2 : clientWidth / 2;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className={`dynamic-section relative w-full py-20 px-6 overflow-hidden ${bgImageUrl && bgImageUrl !== "#" ? "bg-[#e6dfd8]" : ""}`}>
      {/* Background Image & Overlay */}
      {bgImageUrl && bgImageUrl !== "#" && (
        <div className="absolute inset-0 z-0" style={{ opacity: bgOpacity / 100 }}>
          <Image
            src={bgImageUrl}
            alt="Background"
            fill
            className="object-cover object-top"
            unoptimized={bgImageUrl.includes('localhost') || bgImageUrl.includes('127.0.0.1')}
          />
        </div>
      )}

      <div className="relative z-10 max-w-6xl mx-auto">
        <FadeIn direction="up" className="text-center mb-12 flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl uppercase tracking-wider mb-8 leading-tight text-[#1a1a1a]">
            {preHeading && (
              <span className="font-light mr-3">{preHeading}</span>
            )}
            <span className="font-bold">{mainHeading}</span>
          </h2>

          {/* Optional Rich Text Description */}
          {description_html && (
            <div
              className="prose prose-sm md:prose-base prose-gray max-w-[1000px] mx-auto mb-8 text-[#666666] leading-relaxed text-center"
              dangerouslySetInnerHTML={{ __html: description_html }}
            />
          )}

          {/* Toggle Switch */}
          <div className="flex items-center justify-center space-x-6 text-sm md:text-base font-bold tracking-widest uppercase">
            <button
              onClick={() => setIsYearly(false)}
              className={`transition-colors ${!isYearly ? "text-[#1a1a1a] border-b-2 border-[#1a1a1a] pb-1" : "text-gray-400 hover:text-gray-600"}`}
            >
              Monthly
            </button>
            <div className="w-[1px] h-4 bg-gray-300"></div>
            <button
              onClick={() => setIsYearly(true)}
              className={`transition-colors ${isYearly ? "text-[#1a1a1a] border-b-2 border-[#1a1a1a] pb-1" : "text-gray-400 hover:text-gray-600"}`}
            >
              Yearly
            </button>
          </div>
        </FadeIn>

        {/* Pricing Cards */}
        {plans && plans.length > 0 && (
          <div className="relative">
            <StaggerContainer
              ref={scrollContainerRef}
              className={`flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-4 lg:gap-6 items-stretch mb-12 scroll-smooth hide-scrollbar pt-6 pb-6 ${plans.length <= 5 ? "lg:justify-center" : "justify-start"}`}
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {plans.map((plan, idx) => {
                // Extract values from Payload, with defaults matching the Figma design
                const baseBorderColor = plan.cardBorder || "#1a1a1a";
                const borderGradient = baseBorderColor.startsWith("linear-gradient")
                  ? baseBorderColor
                  : `linear-gradient(180deg, ${baseBorderColor} 0%, ${baseBorderColor}66 45%, transparent 100%)`;
                const bgStyle = plan.cardBackground || "linear-gradient(to bottom, #f3f4f6, #d1d5db)";

                return (
                  <div
                    key={idx}
                    className={`snap-center w-[280px] lg:min-w-[240px] max-w-[320px] relative transition-transform hover:-translate-y-1 min-h-[280px] ${plan.isFeatured ? "shadow-xl z-10" : "shadow-md"} ${plans.length <= 5 ? "shrink-0 lg:shrink lg:flex-1 lg:w-auto" : "shrink-0"}`}
                    style={
                      plan.isFeatured
                        ? {
                          border: "4px solid transparent",
                          borderImage: `${borderGradient} 1`,
                        }
                        : {}
                    }
                  >
                    {/* Inner Content Area */}
                    <div
                      className={`relative h-full w-full px-6 py-10 flex flex-col items-center text-center ${!plan.isFeatured ? "bg-white/95 border border-white/60" : ""
                        }`}
                      style={
                        plan.isFeatured
                          ? { background: bgStyle }
                          : {}
                      }
                    >
                      {/* Badge (Inside Top-Left) */}
                      {plan.badge && (
                        <div className="absolute top-1 left-0 bg-[#cdbfae] text-[#1a1a1a] text-[9px] md:text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 whitespace-nowrap z-20">
                          {plan.badge}
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="text-lg md:text-xl uppercase font-bold tracking-widest mb-4 mt-2 leading-snug text-[#1a1a1a]">
                        {plan.title}
                      </h3>

                      {/* Price */}
                      <div className="text-gray-700 text-sm md:text-base mb-6 min-h-[1.5rem] flex items-center justify-center gap-2">
                        {isYearly ? (
                          <>
                            {plan.yearlyOriginalPrice && (
                              <span className="line-through text-gray-400 decoration-gray-400 font-normal">
                                ${plan.yearlyOriginalPrice}
                              </span>
                            )}
                            <span className="font-bold">${plan.yearlyPrice}</span>
                          </>
                        ) : (
                          <>
                            {plan.monthlyOriginalPrice && (
                              <span className="line-through text-gray-400 decoration-gray-400 font-normal">
                                ${plan.monthlyOriginalPrice}
                              </span>
                            )}
                            <span className="font-bold">${plan.monthlyPrice}</span>
                          </>
                        )}
                        <span>| {isYearly ? 'Year' : 'Month'}</span>
                      </div>

                      {/* Description */}
                      <p className="text-gray-500 text-xs md:text-sm leading-relaxed mt-auto max-w-[250px]">
                        {plan.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </StaggerContainer>

            {/* Scroll Buttons */}
            {plans.length > 1 && (
              <div className={`flex justify-center items-center space-x-6 mt-2 ${plans.length <= 5 ? "lg:hidden" : ""}`}>
                <button
                  onClick={() => scroll('left')}
                  className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-sm hover:border-[#1a1a1a] hover:text-[#1a1a1a] text-gray-500 transition-colors"
                  aria-label="Scroll left"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 12H5M5 12L12 5M5 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  onClick={() => scroll('right')}
                  className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-sm hover:border-[#1a1a1a] hover:text-[#1a1a1a] text-gray-500 transition-colors"
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

        {/* Buttons */}
        {buttons && buttons.length > 0 && (
          <FadeIn direction="up" delay={0.4} className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            {buttons.map((btn: any, btnIdx: number) => {
              const isSolid = btn.style === "solid";

              let bgColor, textColor, borderColor;

              if (isSolid) {
                bgColor = btn.backgroundColor || "#1a1a1a";
                textColor = btn.textColor || "#ffffff";
                borderColor = bgColor;
              } else {
                bgColor = "transparent";
                textColor = btn.textColor || "#1a1a1a";
                borderColor = btn.textColor || btn.backgroundColor || "#1a1a1a";
              }

              return (
                <Link
                  key={btnIdx}
                  href={btn.url || "#"}
                  target={btn.newTab ? "_blank" : "_self"}
                  style={{
                    backgroundColor: bgColor,
                    color: textColor,
                    borderColor: borderColor,
                  }}
                  className={`
                    px-8 py-3 text-xs md:text-sm font-semibold tracking-widest uppercase transition-opacity hover:opacity-80 text-center
                    ${isSolid ? "border-none" : "border-2"}
                  `}
                >
                  {btn.label}
                </Link>
              );
            })}
          </FadeIn>
        )}

      </div>
    </section>
  );
};