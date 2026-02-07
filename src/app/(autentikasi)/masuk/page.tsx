import type { Metadata } from 'next'

import { LoginForm } from '@/features/auth/components'

export const metadata: Metadata = {
  title: 'Masuk — BERMOELA',
  description: 'Masuk ke akun Anda untuk mengakses layanan BERMOELA.',
}

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <LoginForm />
    </main>
  )
}
