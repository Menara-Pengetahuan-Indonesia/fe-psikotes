'use client'

import { useParams } from 'next/navigation'
import { TestDetail } from '@/features/admin/components/TestManagement/TestDetail'

export default function TestDetailPage() {
  const params = useParams()
  const testId = params.testId as string

  return <TestDetail testId={testId} />
}
