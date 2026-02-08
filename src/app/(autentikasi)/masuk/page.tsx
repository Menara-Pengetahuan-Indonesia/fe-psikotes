import { Suspense } from 'react'
import type { Metadata } from 'next'

import { LoginForm } from '@/features/auth/components'

export const metadata: Metadata = {
  title: 'Masuk — BERMOELA',
  description:
    'Masuk ke akun Anda untuk mengakses layanan BERMOELA.',
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
