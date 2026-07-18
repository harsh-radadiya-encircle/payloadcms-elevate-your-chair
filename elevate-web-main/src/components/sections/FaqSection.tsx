import React, { useState } from "react";
import Image from "next/image";
import { FaChevronDown } from "react-icons/fa";
import { getMedia } from "~/_utils/getMedia";

type FaqProps = {
  question: string;
  answer: string;
};

type Props = {
  backgroundImage?: any;
  heading: string;
  faqs?: FaqProps[];
};

const FaqItem: React.FC<FaqProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#1a1a1a] text-white p-4 md:p-5 flex justify-between items-center text-left transition-colors hover:bg-black"
      >
        <span className="font-bold tracking-widest uppercase text-xs md:text-sm pr-4">
          {question}
        </span>
        <FaChevronDown className={`shrink-0 transition-transform duration-300 ease-in-out ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
      >
        <div className="overflow-hidden">
          <div className="bg-white border-x border-b border-[#1a1a1a] p-4 md:p-5 text-[#666666] text-xs md:text-sm leading-relaxed">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
};

export const FaqSection: React.FC<Props> = ({ backgroundImage, heading, faqs }) => {
  const bgImageUrl = getMedia(backgroundImage);

  return (
    <section className="relative w-full py-20 px-6 min-h-[60vh] flex flex-col items-center justify-center">
      {/* Background Image & Overlay */}
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
          <div className="absolute inset-0 bg-[#e6e2de]/80 backdrop-blur-sm z-0"></div>
        </>
      )}

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">

        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-widest mb-12 text-[#1a1a1a] text-center">
          {heading}
        </h2>

        {/* FAQs List */}
        {faqs && faqs.length > 0 && (
          <div className="w-full flex flex-col gap-4">
            {faqs.map((faq, idx) => (
              <FaqItem key={idx} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default FaqSection;
