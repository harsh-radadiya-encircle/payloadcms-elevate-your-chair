import React from "react";
import Image from "next/image";

type LexicalNode = {
  type: string;
  tag?: string;
  text?: string;
  format?: number;
  url?: string;
  value?: {
    url?: string;
    filename?: string;
    width?: number;
    height?: number;
  };
  fields?: {
    url?: string;
    [key: string]: unknown;
  };
  children?: LexicalNode[];
};

type Props = {
  content: { root: { children: LexicalNode[] } };
  mediaBaseUrl?: string;
};

export default function LexicalRenderer({ content, mediaBaseUrl = "" }: Props) {
  if (!content?.root?.children?.length) return null;

  return (
    <div className="prose max-w-none">
      {renderNodes(content.root.children, mediaBaseUrl)}
    </div>
  );
}

function renderNodes(
  nodes: LexicalNode[],
  mediaBaseUrl: string,
): React.ReactNode {
  return nodes.map((node, i) => {
    switch (node.type) {
      case "paragraph":
        return <p key={i}>{renderNodes(node.children ?? [], mediaBaseUrl)}</p>;

      case "heading": {
        const Tag = node.tag ?? "h2";
        const HeadingTag = ["h1", "h2", "h3", "h4", "h5", "h6"].includes(Tag)
          ? Tag
          : "h2";
        return React.createElement(
          HeadingTag,
          { key: i },
          renderNodes(node.children ?? [], mediaBaseUrl),
        );
      }

      case "text": {
        const text = node.text ?? "";
        let styledText: React.ReactNode = text;

        if (node.format) {
          if (node.format & 1) styledText = <strong>{styledText}</strong>;
          if (node.format & 2) styledText = <em>{styledText}</em>;
          if (node.format & 4) styledText = <u>{styledText}</u>;
        }

        return <React.Fragment key={i}>{styledText}</React.Fragment>;
      }

      case "link":
      case "autolink": {
        const href = node.fields?.url ?? node.url ?? "#";
        return (
          <a key={i} href={href} target="_blank" rel="noopener noreferrer">
            {renderNodes(node.children ?? [], mediaBaseUrl)}
          </a>
        );
      }

      case "list":
      case "ul":
        return (
          <ul key={i}>{renderNodes(node.children ?? [], mediaBaseUrl)}</ul>
        );

      case "ordered-list":
      case "ol":
        return (
          <ol key={i}>{renderNodes(node.children ?? [], mediaBaseUrl)}</ol>
        );

      case "listitem":
        return (
          <li key={i}>{renderNodes(node.children ?? [], mediaBaseUrl)}</li>
        );

      case "upload": {
        const url = node.value?.url
          ? node.value.url.startsWith("http")
            ? node.value.url
            : `${mediaBaseUrl}${node.value.url}`
          : null;

        if (!url) return null;

        return (
          <div key={i} className="my-6">
            <Image
              src={url}
              alt={node.value?.filename ?? "Image"}
              width={node.value?.width ?? 800}
              height={node.value?.height ?? 600}
              className="h-auto w-full object-contain"
            />
          </div>
        );
      }

      default:
        return null;
    }
  });
}
