import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { getMedia } from "~/_utils/getMedia";
import { FadeIn } from "~/components/animations/FadeIn";
import { StaggerContainer } from "~/components/animations/StaggerContainer";
import { Button } from "~/components/ui/Button";

type PlanProps = {
  badge?: string | null;
  title: string;
  monthlyOriginalPrice?: string | null;
  monthlyPrice?: string | null;
  yearlyOriginalPrice?: string | null;
  yearlyPrice?: string | null;
  description: string;
  isFeatured?: boolean | null;
  cardBackground?: string | null;
  cardBorder?: string | null;
  id?: string | null;
};

type Props = {
  backgroundImage?: any;
  preHeading?: string | null;
  mainHeading: string;
  description?: any | null; // Lexical object
  description_html?: string | null;
  plans?: PlanProps[] | null;
  buttons?: any[] | null;
  bgOpacity?: number | null;
};

export const PricingSection: React.FC<Props> = ({
  backgroundImage,
  preHeading,
  mainHeading,
  description,
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
          <h2 className="mb-8 text-center text-[#1a1a1a]">
            {preHeading && (
              <span className="text-h3 block md:inline-block mr-3 mb-2 md:mb-0">{preHeading}</span>
            )}
            <span className="text-h2-bold block md:inline-block">{mainHeading}</span>
          </h2>

          {/* Optional Rich Text Description */}
          {description_html && (
            <div
              className="text-body max-w-[1000px] mx-auto mb-8 text-[#666666] text-center"
              dangerouslySetInnerHTML={{ __html: description_html }}
            />
          )}

          {/* Toggle Switch */}
          <div className="flex items-center justify-center space-x-6 text-h5-bold tracking-widest uppercase">
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
                      <h3 className="text-h3-bold text-[#1a1a1a] mb-4 mt-2">
                        {plan.title}
                      </h3>

                      {/* Price */}
                      <div className="text-gray-700 text-body mb-6 min-h-[1.5rem] flex items-center justify-center gap-2">
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
                      <p className="text-body text-gray-500 mt-auto max-w-[250px]">
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
            {buttons.map((btn: any, btnIdx: number) => (
              <Button
                key={btnIdx}
                {...btn}
                defaultSolidBgColor="#1a1a1a"
                defaultSolidTextColor="#ffffff"
                defaultOutlineTextColor="#1a1a1a"
                defaultOutlineBorderColor="#1a1a1a"
                defaultHoverTextColor="#ffffff"
              />
            ))}
          </FadeIn>
        )}

      </div>
    </section>
  );
};
