import { Suspense } from 'react'
import type { Metadata } from 'next'

import { RegisterForm } from '@/features/auth/components'

export const metadata: Metadata = {
  title: 'Daftar — BERMOELA',
  description:
    'Buat akun baru dan mulai perjalanan pengembangan'
    + ' diri Anda bersama BERMOELA.',
}

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  )
}
