'use client'

import { useCallback, useEffect, useState } from 'react'
import { api } from '@/lib/axios'
import { TestConfig, ExamState, TestResult, ActivityLogEntry } from '../types/exam.types'

export function useExamState(testId: string) {
  const [config, setConfig] = useState<TestConfig | null>(null)
  const [state, setState] = useState<ExamState>({
    currentQuestionIndex: 0,
    answers: {},
    timeLeft: 0,
    isFinished: false,
  })
  const [result, setResult] = useState<TestResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activityLog, setActivityLog] = useState<ActivityLogEntry[]>([])

  // Fetch test config
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await api.get(`/tests/${testId}/config`)
        setConfig(response.data)
        setState(prev => ({
          ...prev,
          timeLeft: response.data.test.duration * 60, // convert to seconds
        }))
        addActivityLog('Test dimulai', 0)
      } catch (err) {
        setError('Failed to load test')
      } finally {
        setLoading(false)
      }
    }

    fetchConfig()
  }, [testId])

  // Timer
  useEffect(() => {
    if (!state.isFinished && state.timeLeft > 0) {
      const timer = setInterval(() => {
        setState(prev => ({
          ...prev,
          timeLeft: prev.timeLeft - 1,
        }))
      }, 1000)
      return () => clearInterval(timer)
    } else if (state.timeLeft === 0 && !state.isFinished && config) {
      // Auto-submit when time runs out
      handleSubmit()
    }
  }, [state.isFinished, state.timeLeft, config])

  const addActivityLog = useCallback((action: string, questionIndex: number, details?: string) => {
    setActivityLog(prev => [
      ...prev,
      {
        timestamp: new Date(),
        action,
        questionIndex,
        details,
      },
    ])
  }, [])

  const handleAnswer = useCallback((optionId: string) => {
    if (!config) return
    const currentQuestion = getAllQuestions(config)[state.currentQuestionIndex]
    setState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [currentQuestion.id]: optionId,
      },
    }))
    addActivityLog('Jawab soal', state.currentQuestionIndex, `Pilih: ${optionId}`)
  }, [config, state.currentQuestionIndex, addActivityLog])

  const handleNext = useCallback(() => {
    if (!config) return
    const allQuestions = getAllQuestions(config)
    if (state.currentQuestionIndex < allQuestions.length - 1) {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
      }))
      addActivityLog('Lanjut ke soal berikutnya', state.currentQuestionIndex + 1)
    }
  }, [config, state.currentQuestionIndex, addActivityLog])

  const handlePrev = useCallback(() => {
    if (state.currentQuestionIndex > 0) {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1,
      }))
      addActivityLog('Kembali ke soal sebelumnya', state.currentQuestionIndex - 1)
    }
  }, [state.currentQuestionIndex, addActivityLog])

  const handleJumpToQuestion = useCallback((index: number) => {
    if (!config) return
    const allQuestions = getAllQuestions(config)
    if (index >= 0 && index < allQuestions.length) {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: index,
      }))
      addActivityLog('Lompat ke soal', index)
    }
  }, [config, addActivityLog])

  const handleSubmit = useCallback(async () => {
    try {
      const response = await api.post(`/tests/${testId}/submit`, {
        answers: state.answers,
      })
      setResult(response.data)
      setState(prev => ({
        ...prev,
        isFinished: true,
      }))
      addActivityLog('Test selesai', state.currentQuestionIndex)
    } catch (err) {
      setError('Failed to submit test')
      addActivityLog('Error saat submit', state.currentQuestionIndex, String(err))
    }
  }, [testId, state.answers, state.currentQuestionIndex, addActivityLog])

  return {
    config,
    state,
    result,
    loading,
    error,
    activityLog,
    handleAnswer,
    handleNext,
    handlePrev,
    handleJumpToQuestion,
    handleSubmit,
  }
}

function getAllQuestions(config: TestConfig) {
  const questions = [...config.questions]
  config.sections.forEach(section => {
    questions.push(...section.questions)
  })
  return questions.sort((a, b) => a.order - b.order)
}
