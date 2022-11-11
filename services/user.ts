import axios from 'axios'
import { SummaryParams } from '../types'

export const getUserSummary = (params: SummaryParams) => {
  return axios.get(`/api/stats?email=${params.email}`)
}
