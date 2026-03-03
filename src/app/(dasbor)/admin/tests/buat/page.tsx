'use client'

import { TestForm } from '@/features/admin/components/TestManagement/TestForm'

export default function CreateTestPage() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold">Buat Tes Baru</h1>
      </div>
      <TestForm />
    </div>
  )
}
