export type QuestionBody = {
  title: string,
  body: string
}

export type SummaryParams = {
  email: string
}

export type QuestionT = {
  _id: string,
  answersCount: number,
  body: string,
  createdAt: string
  creator: {_id: string, name: string, image: string, }
  slug: string,
  title: string,
  updatedAt: string
  votesCount: number
  correctAns: string
}

export type AnswerT = {
  _id: string
  content: string
  votes: number
  answersCount: number
  slug: string
  creator: {
    name: string
    image: string
  }
  createdAt: string
  updatedAt: string
  upVotes: []
  downVotes: []
}

export interface AnswerItemP extends AnswerT {
  correctAns: boolean
}

export interface AnswerProps {
  questionId: string
  correctAns: string
  fetchAnswers: () => Promise<void>
}