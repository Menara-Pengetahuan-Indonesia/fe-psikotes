'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { useAuthStore } from '@/store/auth.store'
import { authService } from '../services'
import type {
  LoginFormData,
  RegisterFormData,
} from '../schemas'

function getRoleDefaultPath(
  role: 'user' | 'company' | 'admin',
) {
  if (role === 'company') return '/perusahaan'
  if (role === 'admin') return '/admin'
  return '/pengguna'
}

export function useLogin() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const setAuth = useAuthStore((s) => s.setAuth)

  return useMutation({
    mutationFn: (data: LoginFormData) =>
      authService.login(data),
    onSuccess: (res) => {
      setAuth(res.user, res.token)
      const redirect = searchParams.get('redirect')
      router.push(
        redirect || getRoleDefaultPath(res.user.role),
      )
    },
  })
}

export function useRegister() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const setAuth = useAuthStore((s) => s.setAuth)

  return useMutation({
    mutationFn: (data: RegisterFormData) =>
      authService.register(data),
    onSuccess: (res) => {
      setAuth(res.user, res.token)
      const redirect = searchParams.get('redirect')
      router.push(redirect || '/pengguna')
    },
  })
}

export function useLogout() {
  const router = useRouter()
  const logout = useAuthStore((s) => s.logout)

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      logout()
      toast.success('Berhasil keluar dari akun.')
      router.push('/psikotes')
    },
  })
}
