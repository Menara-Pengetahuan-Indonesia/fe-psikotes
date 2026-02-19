'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { AuthLayout } from './auth-layout'
import { GoogleAuthButton } from './google-auth-button'
import { loginSchema, type LoginFormData } from '../schemas'
import { useLogin } from '../hooks'
import { cn } from '@/lib/utils'

const LABEL_CLS = 'text-sm font-semibold text-secondary-900/60'
const INPUT_CLS = cn(
  'h-12 rounded-xl border-secondary-100 bg-white/50',
  'px-4 placeholder:text-secondary-900/20 text-secondary-900',
  'focus:border-primary-500/50 focus:bg-white',
  'focus:ring-4 focus:ring-primary-500/5',
  'transition-all duration-200',
)
const INPUT_PW_CLS = cn(INPUT_CLS, 'pr-12')
const ERROR_CLS = 'text-xs text-red-500 mt-1.5 ml-1 font-medium'

interface LoginFormProps {
  onSuccess?: () => void
  className?: string
}

export function LoginForm({
  onSuccess,
  className,
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)

  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect')
  
  const registerHref = redirect
    ? `/daftar?redirect=${encodeURIComponent(redirect)}`
    : '/daftar'
  const loginHref = redirect
    ? `/masuk?redirect=${encodeURIComponent(redirect)}`
    : '/masuk'

  const loginMutation = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  })

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data, { onSuccess })
  }

  const isLoading = loginMutation.isPending

  return (
    <AuthLayout>
      <div className={cn('space-y-8', className)}>
        {/* Tab Toggle */}
        <div className="flex p-1 bg-primary-50/50 rounded-2xl border border-primary-100/50">
          <Link
            href={loginHref}
            className="flex-1 py-2.5 text-sm font-bold text-center rounded-xl bg-white text-primary-600 shadow-sm border border-primary-100/20"
          >
            Masuk
          </Link>
          <Link
            href={registerHref}
            className="flex-1 py-2.5 text-sm font-bold text-center rounded-xl text-secondary-900/30 hover:text-secondary-900/60 transition-colors"
          >
            Daftar
          </Link>
        </div>

        {/* Heading */}
        <div className="text-center space-y-1.5">
          <h2 className="text-2xl font-bold text-secondary-900 tracking-tight">
            Selamat Datang Kembali
          </h2>
          <p className="text-sm text-secondary-900/40">
            Silakan masuk untuk melanjutkan akses Anda.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className={LABEL_CLS}>
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="nama@email.com"
              className={INPUT_CLS}
              autoFocus
              tabIndex={1}
              {...register('email')}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className={ERROR_CLS}>
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="password"
                className={LABEL_CLS}
              >
                Password
              </Label>
              <Link
                href="/forgot-password"
                tabIndex={4}
                className="text-xs font-bold text-primary-600 hover:text-primary-700 transition-colors"
              >
                Lupa password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={
                  showPassword ? 'text' : 'password'
                }
                placeholder="Masukkan password"
                className={INPUT_PW_CLS}
                tabIndex={2}
                {...register('password')}
                aria-invalid={!!errors.password}
              />
              <button
                type="button"
                onClick={() => (
                  setShowPassword(!showPassword)
                )}
                className={cn(
                  'absolute inset-y-0 right-0',
                  'pr-4 flex items-center',
                  'text-secondary-900/20',
                  'hover:text-secondary-900/50',
                  'transition-colors',
                )}
                tabIndex={-1}
                aria-label="Toggle password visibility"
              >
                {showPassword
                  ? <EyeOff className="h-5 w-5" />
                  : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && (
              <p className={ERROR_CLS}>
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Error Message */}
          {loginMutation.isError && (
            <div className="bg-red-50 border border-red-100 rounded-xl p-3">
              <p className="text-xs text-red-500 text-center font-medium">
                {loginMutation.error.message}
              </p>
            </div>
          )}

          {/* Submit */}
          <Button
            type="submit"
            tabIndex={3}
            className={cn(
              'w-full h-12 rounded-xl mt-2',
              'bg-primary-600 text-white',
              'font-bold text-base',
              'hover:bg-primary-700 active:scale-[0.98]',
              'transition-all duration-200 shadow-lg shadow-primary-500/20',
            )}
            disabled={isLoading}
          >
            {isLoading ? 'Memproses...' : 'Masuk Sekarang'}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center gap-4 px-4">
          <div className="h-px flex-1 bg-secondary-900/5" />
          <span className="text-[10px] font-bold text-secondary-900/20 uppercase tracking-widest">Atau masuk dengan</span>
          <div className="h-px flex-1 bg-secondary-900/5" />
        </div>

        {/* Google */}
        <GoogleAuthButton
          label="Google"
          onClick={() => {}}
          tabIndex={5}
        />
      </div>
    </AuthLayout>
  )
}
