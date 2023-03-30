
import { forYou } from '@/services/forYou'
import { getCountryCode } from '@/services/getCountryCode'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const code = await getCountryCode()
  const data = await forYou(code)

  res.status(200).json({songs:  data, code: code} || [])
}