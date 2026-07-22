import type { FC } from "react";
import type { ExtractBlock } from "~/types";
import LexicalRenderer from "~/components/base/LexicalRenderer";

const ContentSection: FC<ExtractBlock<"content-section">> = ({ content }) => {
  return (
    <section className="dynamic-section content-formatting w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-5 overflow-hidden">
      <LexicalRenderer content={content} />
    </section>
  );
};

export default ContentSection;

