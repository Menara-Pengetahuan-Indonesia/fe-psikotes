'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth.store'
import { authService } from '../services'
import type { LoginInput, RegisterInput } from '../types'

export function useLogin() {
  const router = useRouter()
  const setAuth = useAuthStore((s) => s.setAuth)

  return useMutation({
    mutationFn: (data: LoginInput) => authService.login(data),
    onSuccess: (res) => {
      setAuth(res.user, res.token)
      router.push(`/${res.user.role === 'user' ? 'pengguna' : res.user.role === 'company' ? 'perusahaan' : 'admin'}`)
    },
  })
}

export function useRegister() {
  const router = useRouter()
  const setAuth = useAuthStore((s) => s.setAuth)

  return useMutation({
    mutationFn: (data: RegisterInput) => authService.register(data),
    onSuccess: (res) => {
      setAuth(res.user, res.token)
      router.push('/pengguna')
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
      router.push('/masuk')
    },
  })
}
