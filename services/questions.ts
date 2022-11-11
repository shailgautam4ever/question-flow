import axios from 'axios'
import { QuestionBody } from '../types'

export const submitNewQuestion = (question: QuestionBody) => {
  return axios.post('/api/ask', { question })
}

export const getQuestions = () => {
  return axios.get('/api/questions')
}

export const getQuestionBySlug = (slug: string) => {
  return axios.get(`/api/questions/${slug}`)
}

export const getAnswersByQuestionId = (questionId: string) => {
  return axios.get(`/api/answers?questionId=${questionId}`)
}
export const postAnswerByQuestionId = (questionId: string, answer: string) => {
  return axios.post(`/api/answers?questionId=${questionId}`, { answer })
}
