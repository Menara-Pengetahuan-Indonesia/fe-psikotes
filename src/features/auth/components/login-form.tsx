'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  LogIn,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { AuthLayout } from './auth-layout'
import { GoogleAuthButton } from './google-auth-button'
import { loginSchema, type LoginFormData } from '../schemas'
import { useLogin } from '../hooks'
import { cn } from '@/lib/utils'

const INPUT_CLS = cn(
  'h-12 rounded-xl bg-slate-50/50 border-slate-200/60',
  'pl-11 pr-4 text-slate-900 text-sm font-medium',
  'placeholder:text-slate-400 placeholder:font-normal',
  'focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10',
  'transition-all duration-200',
)

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

  const loginMutation = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
  })

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data, { onSuccess })
  }

  const isLoading = loginMutation.isPending

  return (
    <AuthLayout>
      <div className={cn('space-y-8', className)}>
        {/* Header Section */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 mb-2">
            <LogIn className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Selamat datang
          </h2>
          <p className="text-sm text-slate-500 font-medium max-w-[280px] mx-auto leading-relaxed">
            Silakan masuk untuk melanjutkan akses ke semua layanan kami.
          </p>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* Email */}
          <div className="space-y-1.5 group">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                <Mail className="w-4.5 h-4.5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
              </div>
              <Input
                id="email"
                type="email"
                placeholder="Alamat email"
                className={INPUT_CLS}
                {...register('email')}
                aria-invalid={!!errors.email}
              />
            </div>
            {errors.email && (
              <p className="text-[11px] text-red-500 ml-3 font-medium flex items-center gap-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1.5 group">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                <Lock className="w-4.5 h-4.5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
              </div>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Kata sandi"
                className={cn(INPUT_CLS, 'pr-12')}
                {...register('password')}
                aria-invalid={!!errors.password}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary-600 transition-colors p-1"
                tabIndex={-1}
                aria-label="Tampilkan sandi"
              >
                {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-[11px] text-red-500 ml-3 font-medium flex items-center gap-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Forgot password */}
          <div className="flex justify-end px-1">
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-primary-600 hover:text-primary-700 transition-colors"
            >
              Lupa password?
            </Link>
          </div>

          {/* Error Message */}
          {loginMutation.isError && (
            <div className="bg-red-50 border border-red-100 rounded-xl p-3 animate-in fade-in slide-in-from-top-1">
              <p className="text-xs text-red-500 text-center font-medium">
                {loginMutation.error.message}
              </p>
            </div>
          )}

          {/* Submit */}
          <Button
            type="submit"
            className={cn(
              'w-full h-12 rounded-xl mt-4',
              'bg-slate-900 text-white',
              'font-bold text-sm',
              'hover:bg-slate-800 active:scale-[0.98]',
              'transition-all duration-200 shadow-xl shadow-slate-900/20',
            )}
            disabled={isLoading}
          >
            {isLoading ? 'Memproses...' : 'Masuk sekarang'}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center gap-4 px-2">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-[10px] font-medium text-slate-400">
            atau
          </span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        {/* Social buttons */}
        <div className="px-1">
          <GoogleAuthButton
            label="Lanjutkan dengan Google"
            onClick={() => {}}
            className="h-12 rounded-xl border-slate-200 shadow-none hover:bg-slate-50 text-xs"
          />
        </div>

        {/* Register link */}
        <p className="text-center text-xs font-medium text-slate-400">
          Belum punya akun?{' '}
          <Link
            href={registerHref}
            className="text-primary-600 hover:text-primary-700 transition-colors underline underline-offset-4 decoration-primary-500/30 font-bold"
          >
            Daftar sekarang
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}
