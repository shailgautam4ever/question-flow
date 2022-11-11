import { atom } from 'recoil'
import { AnswerT } from '../types'

export const answersState = atom<AnswerT[]>({
  key: 'current-questions',
  default: []
})
