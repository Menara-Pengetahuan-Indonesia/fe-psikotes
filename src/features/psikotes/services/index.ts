import { api } from '@/lib/axios'
import type { Test, TestSession, TestResult } from '../types'
import type { PaginatedResponse } from '@/shared/types'

export const psikotesService = {
  getTests: async (page = 1, limit = 10): Promise<PaginatedResponse<Test>> => {
    const res = await api.get<PaginatedResponse<Test>>('/psikotes/tests', { params: { page, limit } })
    return res.data
  },

  getTest: async (id: string): Promise<Test> => {
    const res = await api.get<Test>(`/psikotes/tests/${id}`)
    return res.data
  },

  startSession: async (testId: string): Promise<TestSession> => {
    const res = await api.post<TestSession>(`/psikotes/tests/${testId}/start`)
    return res.data
  },

  submitAnswer: async (sessionId: string, questionId: string, value: string | number): Promise<void> => {
    await api.post(`/psikotes/sessions/${sessionId}/answer`, { questionId, value })
  },

  completeSession: async (sessionId: string): Promise<TestResult> => {
    const res = await api.post<TestResult>(`/psikotes/sessions/${sessionId}/complete`)
    return res.data
  },

  getResults: async (userId: string): Promise<TestResult[]> => {
    const res = await api.get<TestResult[]>(`/psikotes/results`, { params: { userId } })
    return res.data
  },
}
