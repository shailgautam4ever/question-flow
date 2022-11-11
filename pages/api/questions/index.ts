// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import connectDb from '../../../lib/mongodb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req
  const data = await getToken({ req })
  if (!data) {
    return res.status(400).json({ error: true, message: 'Unauthorised' })
  }
  const db = (await connectDb).db()

  const questions = await db.collection('questions').aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'creator',
        foreignField: '_id',
        as: 'creator'
      }
    },
    {
      $unwind: '$creator'
    },
    {
      $sort: {
        _id: -1
      }
    }
  ]).toArray()
  console.log('questions', questions)
  return res.json(questions)
}
