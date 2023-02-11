// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { searchSong } from '@/services/search'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const data = await searchSong(req.query.song as string)

  res.status(200).json(data || [])
}
