import type { FC } from "react";
import type { Page } from "~/payload-types";
import { getSectionStyle } from "~/_utils/getSectionStyle";

import ContentSection from "~/components/sections/ContentSection";
import HeroSlider from "~/components/sections/HeroSlider";
import { SplitContent } from "~/components/sections/SplitContent";
import { AppPromo } from "~/components/sections/AppPromo";
import { TestimonialsSlider } from "~/components/sections/TestimonialsSlider";
import { StagesSection } from "~/components/sections/StagesSection";
import { FeatureCards } from "~/components/sections/FeatureCards";
import { PricingSection } from "~/components/sections/PricingSection";
import PageBanner from "~/components/sections/PageBanner";
import { ImageCardsSection } from "~/components/sections/ImageCardsSection";
import { StorySection } from "~/components/sections/StorySection";
import FaqSection from "~/components/sections/FaqSection";
import ComparisonTable from "~/components/sections/ComparisonTable";
import ImageGridSection from "~/components/sections/ImageGridSection";
import CenteredTextSection from "~/components/sections/CenteredTextSection";
import FeaturedBlogPost from "~/components/sections/FeaturedBlogPost";
import BlogCategoryGrid from "~/components/sections/BlogCategoryGrid";
import BlogFilterGrid from "~/components/sections/BlogFilterGrid";
import CampaignFormEmbed from "~/components/sections/CampaignFormEmbed";
import ContactInformation from "~/components/sections/ContactInformation";

type Block = NonNullable<Page["layout"]>[number];

interface Props {
  content: Block;
  index: number;
}

const SectionRenderer: FC<Props> = ({ content, index }) => {
  const renderedComponent = (() => {
    switch (content.blockType) {
      case "campaign-form-embed":
        return <CampaignFormEmbed key={index} {...content} />;
      case "content-section":
        return <ContentSection {...content} />;
      case "hero-slider":
        return <HeroSlider {...content} />;
      case "split-content":
        return <SplitContent {...content} />;
      case "app-promo":
        return <AppPromo {...content} />;
      case "testimonials-slider":
        return <TestimonialsSlider {...content} />;
      case "stages-section":
        return <StagesSection {...content} />;
      case "feature-cards":
        return <FeatureCards {...content} />;
      case "pricing-section":
        return <PricingSection {...content} />;
      case "page-banner":
        return <PageBanner {...content} />;
      case "image-cards-section":
        return <ImageCardsSection {...content} />;
      case "story-section":
        return <StorySection {...content} />;
      case "faq-section":
        return <FaqSection key={index} {...content} />;
      case "comparison-table":
        return <ComparisonTable key={index} {...content} />;
      case "image-grid-section":
        return <ImageGridSection key={index} {...content} />;
      case "centered-text-section":
        return <CenteredTextSection key={index} {...content} />;
      case "featured-blog-post":
        return <FeaturedBlogPost key={index} {...content} />;
      case "blog-category-grid":
        return <BlogCategoryGrid key={index} {...content} />;
      case "blog-filter-grid":
        return <BlogFilterGrid key={index} {...content} />;
      case "contact-information":
        return <ContactInformation key={index} {...content} />;
      default:
        return null;
    }
  })();

  if (!renderedComponent) return null;

  return (
    <div style={getSectionStyle(content)}>
      {renderedComponent}
    </div>
  );
};

export default SectionRenderer;
