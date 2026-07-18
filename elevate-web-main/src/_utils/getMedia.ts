import type { Media } from "~/payload-types";

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL ?? "http://localhost:3000";

export const getMedia = (media?: Media | string | null): string => {
  if (!media) return "#";

  if (typeof media === "string") {
    return media.startsWith("http") ? media : `${CMS_URL}${media}`;
  }

  if ("url" in media && typeof media.url === "string") {
    return media.url.startsWith("http") ? media.url : `${CMS_URL}${media.url}`;
  }

  return "#";
};
