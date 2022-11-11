import { ObjectId } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import connectDb from '../../../lib/mongodb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  ) {

  const data = await getToken({ req })

  if (!data) {
    return res.status(400).json({ error: true, message: 'Unauthorised' })
  }

  const db = (await connectDb).db()
  const user = await db.collection('users').findOne({ email: data.email })

  if (!user) {
    return res.status(404).json({ error: true, message: 'User not found!' })
  }

  if (req.method === 'POST') {
    const { body, query } = req

    const question = await db.collection('questions').findOne({ _id: new ObjectId(query.questionId as string) })
    console.log('question', question, new ObjectId(body.questionId) )
    if (!question) {
      return res.status(400).json({ error: true, message: 'Question not found!' })
    }

    const newAnser = {
      content: body.answer,
      createdAt: new Date(),
      updatedAt: new Date(),
      creator: user._id,
      questionId: new ObjectId(query.questionId as string),
      votes: 0,
      downVotes: [],
      upVotes: []
    }
    await db.collection('answers').insertOne(newAnser)
    await db.collection('users').updateOne({ _id: user._id }, {
      $inc: {
        points: 2
      }
    })
    return res.json({ sucess: true })
  }
  
  if (req.method === 'GET') {
    const { questionId } = req.query
    const answers = await db.collection('answers').aggregate([
      {
        $match: { questionId: new ObjectId(questionId as string)  }
      },
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
      }
    ]).toArray()
    res.json(answers)
  }
}
