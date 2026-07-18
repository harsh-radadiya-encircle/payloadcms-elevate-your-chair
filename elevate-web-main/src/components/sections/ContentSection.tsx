import type { FC } from "react";
import type { ExtractBlock } from "~/types";
import LexicalRenderer from "~/components/base/LexicalRenderer";

const ContentSection: FC<ExtractBlock<"content-section">> = ({ content }) => {
  return (
    <section className="content-formatting w-full px-34 py-5">
      <LexicalRenderer content={content} />
    </section>
  );
};

export default ContentSection;
