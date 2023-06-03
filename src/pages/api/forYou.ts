
import { forYou } from '@/services/forYou'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await forYou('MX')

  res.status(200).json({songs:  data, code: 'MX'})
}