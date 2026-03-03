'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStoreHydrated } from '@/store/auth.store'

export default function AdminPage() {
  const router = useRouter()
  const { _hasHydrated } = useAuthStoreHydrated()

  useEffect(() => {
    if (_hasHydrated) {
      router.push('/dashboard')
    }
  }, [_hasHydrated, router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-primary-600 rounded-full animate-spin mx-auto" />
        <p className="text-slate-600 font-medium">Redirecting...</p>
      </div>
    </div>
  )
}
