import type { Metadata } from 'next'

import { RegisterForm } from '@/features/auth/components'

export const metadata: Metadata = {
  title: 'Daftar — TITIK MULA',
  description: 'Buat akun baru dan mulai perjalanan pengembangan diri Anda bersama TITIK MULA.',
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <RegisterForm />
    </div>
  )
}
