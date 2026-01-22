'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { psikotesService } from '../services'

export function useTests(page = 1, limit = 10) {
  return useQuery({
    queryKey: ['psikotes', 'tests', page, limit],
    queryFn: () => psikotesService.getTests(page, limit),
  })
}

export function useTest(id: string) {
  return useQuery({
    queryKey: ['psikotes', 'test', id],
    queryFn: () => psikotesService.getTest(id),
    enabled: !!id,
  })
}

export function useStartSession() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (testId: string) => psikotesService.startSession(testId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['psikotes'] }),
  })
}

export function useSubmitAnswer(sessionId: string) {
  return useMutation({
    mutationFn: ({ questionId, value }: { questionId: string; value: string | number }) =>
      psikotesService.submitAnswer(sessionId, questionId, value),
  })
}

export function useCompleteSession() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (sessionId: string) => psikotesService.completeSession(sessionId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['psikotes'] }),
  })
}

export function useTestResults(userId: string) {
  return useQuery({
    queryKey: ['psikotes', 'results', userId],
    queryFn: () => psikotesService.getResults(userId),
    enabled: !!userId,
  })
}
