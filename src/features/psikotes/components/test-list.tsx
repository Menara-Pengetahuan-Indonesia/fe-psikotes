'use client'

import { useTests } from '../hooks'
import { TestCard } from './test-card'

export function TestList() {
  const { data, isLoading, error } = useTests()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading tests</div>
  if (!data?.data.length) return <div>Tidak ada tes tersedia</div>

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data.data.map((test) => (
        <TestCard key={test.id} test={test} />
      ))}
    </div>
  )
}
