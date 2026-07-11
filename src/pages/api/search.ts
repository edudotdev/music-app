import type { NextApiRequest, NextApiResponse } from "next";
import { searchSong } from "@/services/search";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const { song } = req.query;

    if (!song || typeof song !== 'string') {
      return res.status(200).json({ songs: [] });
    }

    const data = await searchSong(song);

    return res.status(200).json(data);
    
  } catch (err) {
    console.error("❌ API Route Error [search]:", err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}