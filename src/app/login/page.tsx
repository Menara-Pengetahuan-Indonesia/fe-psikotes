import type { Metadata } from 'next'

import { LoginForm } from '@/features/auth/components'

export const metadata: Metadata = {
  title: 'Masuk — BERMOELA',
  description: 'Masuk ke akun Anda untuk mengakses layanan BERMOELA.',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <LoginForm />
    </div>
  )
}
