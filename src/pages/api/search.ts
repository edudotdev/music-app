import type { NextApiRequest, NextApiResponse } from "next";
import { searchSong } from "@/services/search";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 1. Validar que el método HTTP sea estrictamente GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const { song } = req.query;

    // 2. Si no viene el parámetro del término de búsqueda, devolvemos el formato esperado
    if (!song || typeof song !== 'string') {
      return res.status(200).json({ songs: [] });
    }

    // 3. Consumir el servicio adaptado que maneja caché (Upstash) y fetch (Shazam)
    const data = await searchSong(song);

    // 4. Responder con los datos estructurados
    return res.status(200).json(data);
    
  } catch (err) {
    console.error("❌ API Route Error [search]:", err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}