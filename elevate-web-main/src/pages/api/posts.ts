import type { NextApiRequest, NextApiResponse } from "next";
import { PayloadClient } from "~/_utils/payload";
import type { BlogPost } from "~/payload-types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { categoryId, page = "1", limit = "3" } = req.query;

  if (!categoryId || typeof categoryId !== "string") {
    return res.status(400).json({ message: "Category ID is required" });
  }

  try {
    const payload = new PayloadClient();
    
    const limitNum = parseInt(limit as string);
    const where: any = { _status: "published" };
    if (categoryId && categoryId !== "all") {
      where.category = categoryId;
    }

    const paginatedPosts = await payload.fetchPaginated<BlogPost>("blog-posts", {
      depth: 1,
      limit: limitNum,
      page: parseInt(page as string),
      where,
      sort: "-publishedDate",
    });

    return res.status(200).json({ 
      docs: paginatedPosts.docs, 
      hasNextPage: paginatedPosts.hasNextPage 
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
