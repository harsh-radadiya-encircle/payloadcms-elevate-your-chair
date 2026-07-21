import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getMedia } from "~/_utils/getMedia";

type ButtonProps = {
  label: string;
  url?: string | null;
  style?: "solid" | "outline" | "link" | null;
  solidAnimation?: "none" | "circle-fill" | null;
  outlineAnimation?: "none" | "border-trace" | null;
  backgroundColor?: string | null;
  textColor?: string | null;
  hoverBackgroundColor?: string | null;
  hoverTextColor?: string | null;
  icon?: any;
  newTab?: boolean | null;
  className?: string;
  linkType?: "custom" | "internal" | null;
  internalLink?: {
    relationTo: string;
    value: any;
  } | null;

  // Context defaults (so we don't have to rewrite logic in every section)
  defaultSolidBgColor?: string;
  defaultSolidTextColor?: string;
  defaultOutlineTextColor?: string;
  defaultOutlineBorderColor?: string;

  // Custom Hover Defaults
  defaultHoverBackgroundColor?: string;
  defaultHoverTextColor?: string;
};

export const Button: React.FC<ButtonProps> = ({
  label,
  url,
  style = "outline",
  solidAnimation = "none",
  outlineAnimation = "none",
  backgroundColor,
  textColor,
  hoverBackgroundColor,
  hoverTextColor,
  icon,
  newTab,
  className = "",
  linkType,
  internalLink,
  defaultSolidBgColor = "#cdbfae",
  defaultSolidTextColor = "#000000",
  defaultOutlineTextColor = "#ffffff",
  defaultOutlineBorderColor = "#ffffff",
  defaultHoverBackgroundColor = "#ffffff",
  defaultHoverTextColor = "#000000",
}) => {
  const isSolid = style === "solid";

  let finalUrl = url || "#";
  if (linkType === "internal" && internalLink && typeof internalLink.value === 'object') {
    if (internalLink.relationTo === 'pages') {
      finalUrl = `/${internalLink.value.slug === 'home' ? '' : internalLink.value.slug}`;
    } else if (internalLink.relationTo === 'blog-posts') {
      finalUrl = `/blog/${internalLink.value.slug}`;
    }
  }

  let bgColor = "transparent";
  let txtColor = "#ffffff";
  let borderColor = "transparent";

  if (isSolid) {
    bgColor = backgroundColor || defaultSolidBgColor;
    txtColor = textColor || defaultSolidTextColor;
    borderColor = bgColor;
  } else if (style === "outline") {
    bgColor = "transparent";
    txtColor = textColor || defaultOutlineTextColor;
    borderColor = textColor || backgroundColor || defaultOutlineBorderColor;
  } else {
    // link
    bgColor = "transparent";
    txtColor = textColor || defaultOutlineTextColor;
    borderColor = "transparent";
  }

  const iconUrl = icon ? getMedia(icon) : null;


  // We no longer have outline-fill and label-swipe-bottom.
  // Using outlineAnimation and solidAnimation explicitly.
  const isCircleFill = isSolid && solidAnimation === "circle-fill";
  const isBorderTrace = style === "outline" && outlineAnimation === "border-trace";

  // Calculate final hover colors (fallback to context defaults or calculated inversions)
  const finalHoverBgColor = hoverBackgroundColor || defaultHoverBackgroundColor || txtColor;
  const finalHoverTxtColor = hoverTextColor || defaultHoverTextColor || bgColor;

  // When circle-fill is active, the background is handled by a background span
  // so the button itself must be transparent.
  const actualBgColor = isCircleFill ? "transparent" : bgColor;

  return (
    <Link
      href={finalUrl || "#"}
      target={newTab ? "_blank" : "_self"}
      style={{
        "--btn-bg": actualBgColor,
        "--btn-text": txtColor,
        "--btn-border-color": borderColor,
        "--btn-hover-bg": finalHoverBgColor,
        "--btn-hover-text": finalHoverTxtColor,
      } as React.CSSProperties}
      className={`
        group relative inline-flex items-center justify-center gap-2 overflow-hidden
        px-8 py-3 text-xs md:text-sm font-semibold tracking-widest uppercase transition-all duration-500 ease-out
        bg-[var(--btn-bg)] text-[var(--btn-text)]
        ${isSolid ? "border-none" : (isBorderTrace ? "border-none" : "border-2 border-[var(--btn-border-color)]")}
        ${!isBorderTrace && !isCircleFill ? "hover:opacity-80" : ""}
        ${isCircleFill ? "solid-circle-btn z-10" : (isBorderTrace ? "z-10" : "")}
        ${className}
      `}
    >
      {isCircleFill && (
        <>
          <span className="absolute inset-0 z-[-2]" style={{ backgroundColor: bgColor }}></span>
          <span className="btn-circle-fill-span" style={{ "--delay-74": 1 } as React.CSSProperties}></span>
          <span className="btn-circle-fill-span" style={{ "--delay-74": 2 } as React.CSSProperties}></span>
          <span className="btn-circle-fill-span" style={{ "--delay-74": 3 } as React.CSSProperties}></span>
          <span className="btn-circle-fill-span" style={{ "--delay-74": 4 } as React.CSSProperties}></span>
        </>
      )}
      {isBorderTrace && (
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="calc(100% - 4px)" height="calc(100% - 4px)" fill="none" className="border-trace-rect" pathLength="100" />
        </svg>
      )}
      {iconUrl && iconUrl !== "#" && (
        <span
          className="relative w-4 h-4 shrink-0 transition-transform duration-500 group-hover:scale-110 z-10"
          style={{
            backgroundColor: "currentColor",
            maskImage: `url(${iconUrl})`,
            WebkitMaskImage: `url(${iconUrl})`,
            maskSize: "contain",
            WebkitMaskSize: "contain",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
          }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </Link>
  );
};
