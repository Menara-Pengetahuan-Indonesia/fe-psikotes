'use client'

import { Button } from '@/components/ui/button'
import { TestConfig, TestResult } from '../types/exam.types'
import { useRouter } from 'next/navigation'

interface ResultDisplayProps {
  result: TestResult
  config: TestConfig
}

export function ResultDisplay({ result, config }: ResultDisplayProps) {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Tes Selesai!</h1>
          <p className="text-lg text-slate-600">{config.test.name}</p>
        </div>

        {/* Results Card */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Hasil Anda</h2>

          <div className="space-y-6">
            {config.indicators.map((indicator) => {
              const score = result.indicatorScores[indicator.id] || 0
              const resultType = result.resultTypes[indicator.id] || 'N/A'
              const maxScore = 100 // Adjust based on your scoring system

              return (
                <div
                  key={indicator.id}
                  className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {indicator.name}
                      </h3>
                      {indicator.description && (
                        <p className="text-sm text-slate-600 mt-1">
                          {indicator.description}
                        </p>
                      )}
                    </div>
                    <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                      {resultType}
                    </span>
                  </div>

                  {/* Score Bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-600">
                        Skor
                      </span>
                      <span className="text-lg font-bold text-slate-900">
                        {score} / {maxScore}
                      </span>
                    </div>
                    <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-linear-to-r from-blue-500 to-blue-600 transition-all duration-500"
                        style={{ width: `${(score / maxScore) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Test Info */}
          <div className="mt-8 pt-8 border-t border-slate-200">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-600">Waktu Selesai</p>
                <p className="font-semibold text-slate-900">
                  {new Date(result.testResult.completedAt).toLocaleString('id-ID')}
                </p>
              </div>
              <div>
                <p className="text-slate-600">ID Hasil</p>
                <p className="font-mono text-xs text-slate-900 break-all">
                  {result.testResult.id}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="flex-1"
          >
            Kembali
          </Button>
          <Button
            onClick={() => router.push('/mahasiswa')}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            Ke Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}
