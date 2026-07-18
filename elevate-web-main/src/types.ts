import type { Page } from "~/payload-types";

export type Block = NonNullable<Page["layout"]>[number];
export type ExtractBlock<T extends Block["blockType"]> = Extract<
  Block,
  { blockType: T }
>;
