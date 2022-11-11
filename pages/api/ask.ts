// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import connectDb from '../../lib/mongodb'
type Data = {
  body: {
    title: string,
    body: string
  }
}

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
  const { title, body: questionBody } = body.question
  const slug = title.toLowerCase().split(' ').join('-')
  const isAny = await db.collection('questions').countDocuments({ slug })
  if (isAny !== 0) {
    return res.status(400).json({ error: true, message: 'Question already exists! Choose different title' })
  }
  const user = await db.collection('users').findOne({ email: data.email })
  if (!user) {
    return res.status(404).json({ error: true, message: 'User not found!' })
  }

  const newQuestion = {
    title,
    body: questionBody,
    slug,
    createdAt: new Date(),
    updatedAt: new Date(),
    creator: user._id,
    votesCount: 0,
    answersCount: 0
  }
  await db.collection('questions').insertOne(newQuestion)
  await db.collection('users').updateOne({ _id: user._id }, {
    $inc: {
      questions: 1,
      points: 2
    }
  })
  console.log('slug', slug, 'data', data)
  return res.json({ body, })
}
