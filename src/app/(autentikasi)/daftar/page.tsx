import type { Metadata } from 'next'

import { RegisterForm } from '@/features/auth/components'

export const metadata: Metadata = {
  title: 'Daftar — BERMOELA',
  description: 'Buat akun baru dan mulai perjalanan pengembangan diri Anda bersama BERMOELA.',
}

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <RegisterForm />
    </main>
  )
}
