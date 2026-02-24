'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { useAuthStore } from '@/store/auth.store'
import {
  authService,
  extractErrorMessage,
} from '../services'
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
      setAuth(
        res.user,
        res.accessToken,
        res.refreshToken,
      )
      toast.success('Berhasil masuk!')

      // Get redirect from URL params
      const redirect = searchParams.get('redirect')

      // If redirect exists and is valid, use it; otherwise use role default
      if (redirect && redirect.startsWith('/')) {
        router.push(redirect)
      } else {
        router.push(getRoleDefaultPath(res.user.role))
      }
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error))
    },
  })
}

export function useRegister() {
  const router = useRouter()

  return useMutation({
    mutationFn: (data: RegisterFormData) =>
      authService.register(data),
    onSuccess: () => {
      toast.success(
        'Registrasi berhasil! Silakan masuk.',
      )
      router.push('/masuk')
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error))
    },
  })
}

export function useLogout() {
  const router = useRouter()
  const logout = useAuthStore((s) => s.logout)

  return useMutation({
    mutationFn: () => authService.logout(),
    onSettled: () => {
      logout()
      toast.success('Berhasil keluar dari akun.')
      router.push('/psikotes')
    },
  })
}
