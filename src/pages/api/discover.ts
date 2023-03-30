
import { discover } from '@/services/discover'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const data = await discover()

  res.status(200).json(data || [])
}