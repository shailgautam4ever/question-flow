// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import connectDb from '../../lib/mongodb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req
  const data = await getToken({ req })
  if (!data) {
    return res.status(400).json({ error: true, message: 'Unauthorised' })
  }
  const db = (await connectDb).db()
  const user = await db.collection('users').findOne({ email: query.email })
  if (!user) {
    return res.status(404).json({ error: true, message: 'user not found' })
  }
  return res.json({
    points: user.points ?? 0,
    questions: user.questions ?? 0,
    votes: user.votes ?? 0
  })
}
