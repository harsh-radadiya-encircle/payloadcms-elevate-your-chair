import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getMedia } from "~/_utils/getMedia";

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
};

export const PricingSection: React.FC<Props> = ({
  backgroundImage,
  preHeading,
  mainHeading,
  description_html,
  plans,
  buttons
}) => {
  const [isYearly, setIsYearly] = useState(false);
  const bgImageUrl = getMedia(backgroundImage);

  return (
    <section className="relative w-full py-20 px-6 overflow-hidden">
      {/* Background Image & Overlay */}
      {bgImageUrl && bgImageUrl !== "#" && (
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImageUrl}
            alt="Background"
            fill
            className="object-cover object-top opacity-50"
            unoptimized={bgImageUrl.includes('localhost') || bgImageUrl.includes('127.0.0.1')}
          />
        </div>
      )}

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header Section */}
        <div className="text-center mb-12 flex flex-col items-center">
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
        </div>

        {/* Pricing Cards */}
        {plans && plans.length > 0 && (
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 items-stretch mb-12 justify-center mx-auto ${plans.length === 3 ? 'lg:grid-cols-3 max-w-5xl' : 'lg:grid-cols-4'}`}>
            {plans.map((plan, idx) => {
              // Extract values from Payload, with defaults matching the Figma design
              const borderStyle = plan.cardBorder || "#1a1a1a";
              const bgStyle = plan.cardBackground || "linear-gradient(to bottom, #f3f4f6, #d1d5db)";

              return (
                <div
                  key={idx}
                  className={`relative w-full transition-transform hover:-translate-y-1 ${plan.isFeatured ? "shadow-xl z-10" : "shadow-md"
                    }`}
                  style={
                    plan.isFeatured
                      ? {
                        background: borderStyle,
                        padding: "3px", // Border thickness all around
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

                    {/* Overlapping Badge */}
                    {plan.badge && (
                      <div className="absolute top-0 left-[-4px] -translate-y-1/2 bg-[#cdbfae] text-[#1a1a1a] text-[9px] md:text-[10px] font-bold tracking-widest uppercase px-3 py-1 whitespace-nowrap z-20">
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
          </div>
        )}

        {/* Buttons */}
        {buttons && buttons.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
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
          </div>
        )}

      </div>
    </section>
  );
};