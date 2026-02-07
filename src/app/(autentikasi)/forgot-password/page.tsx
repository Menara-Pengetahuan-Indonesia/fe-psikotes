import type { Metadata } from 'next'

import { ForgotPasswordForm } from '@/features/auth/components'

export const metadata: Metadata = {
  title: 'Lupa Password — BERMOELA',
  description:
    'Reset password akun BERMOELA Anda.',
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />
}
