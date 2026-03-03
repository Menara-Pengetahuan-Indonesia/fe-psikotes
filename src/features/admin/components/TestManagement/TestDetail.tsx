'use client'

import { TestWizard } from './TestWizard'

interface TestDetailProps {
  testId: string
}

export function TestDetail({ testId }: TestDetailProps) {
  return <TestWizard testId={testId} />
}
