import type { NextApiRequest, NextApiResponse } from "next";
import { PayloadClient } from "~/_utils/payload";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const payload = new PayloadClient();
    
    // We are creating a record in the 'campaign-leads' collection
    const result = await payload.createCollection("campaign-leads", req.body);
    
    return res.status(200).json(result);
  } catch (error: any) {
    console.error("Error submitting form:", error);
    return res.status(500).json({ message: error.message || "Internal server error" });
  }
}
