import type { NextApiRequest, NextApiResponse } from "next";
import { PayloadClient } from "~/_utils/payload";
import type { BlogCategory } from "~/payload-types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const payload = new PayloadClient();
    const categories = await payload.fetchCollection<BlogCategory>("blog-categories", {
      depth: 0,
      limit: 100,
    });
    
    return res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
