'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ArrowRight, Mail, Lock, Eye, EyeOff, Sparkles,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import { AuthBrandingPanel } from './auth-branding-panel'
import { GoogleAuthButton } from './google-auth-button'
import { loginSchema, type LoginFormData } from '../schemas'
import { useLogin } from '../hooks'
import { cn } from '@/lib/utils'

const LABEL_CLS = cn(
  'text-sm font-semibold text-slate-700',
)
const ICON_CLS = cn(
  'h-4 w-4 text-slate-400',
  'group-focus-within:text-emerald-500 transition-colors',
)
const INPUT_CLS = cn(
  'pl-10 h-11 rounded-xl border-slate-200',
  'bg-white focus:bg-white transition-all',
)
const INPUT_PW_CLS = cn(
  'pl-10 pr-11 h-11 rounded-xl border-slate-200',
  'bg-white focus:bg-white transition-all',
)
const ERROR_CLS = 'text-xs text-red-500 mt-1'

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
    mode: 'onBlur',
  })

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data, { onSuccess })
  }

  const isLoading = loginMutation.isPending

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth
  }

  return (
    <div className={cn(
      'grid lg:grid-cols-2 min-h-dvh',
      className,
    )}>
      <AuthBrandingPanel subtitle="Platform pengembangan diri #1 di Indonesia. Kenali potensimu, raih masa depan." />

      <div className={cn(
        'flex flex-col items-center justify-center',
        'bg-stone-50 px-6 py-12 sm:px-12',
      )}>
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 group"
            >
              <div className={cn(
                'w-10 h-10 bg-emerald-500 rounded-xl',
                'flex items-center justify-center',
                'text-white shadow-lg',
                'group-hover:rotate-12',
                'transition-transform duration-300',
              )}>
                <Sparkles className="w-5 h-5 fill-white" />
              </div>
              <span className={cn(
                'text-2xl font-bold',
                'text-slate-900 tracking-tight',
              )}>
                Bermoela
                <span className="text-emerald-500">.</span>
              </span>
            </Link>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h2 className={cn(
              'text-2xl font-bold',
              'text-slate-900',
            )}>
              Selamat Datang Kembali
            </h2>
            <p className="text-sm text-slate-500">
              Silakan masuk ke akun Anda
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            {/* Email */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className={LABEL_CLS}
              >
                Alamat Email
              </Label>
              <div className="relative group">
                <div className={cn(
                  'absolute inset-y-0 left-0 pl-3.5',
                  'flex items-center pointer-events-none',
                )}>
                  <Mail className={ICON_CLS} />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="nama@email.com"
                  className={INPUT_CLS}
                  {...register('email')}
                  aria-invalid={!!errors.email}
                />
              </div>
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
                  className={cn(
                    'text-sm font-medium',
                    'text-emerald-600',
                    'hover:text-emerald-700',
                    'transition-colors',
                  )}
                >
                  Lupa password?
                </Link>
              </div>
              <div className="relative group">
                <div className={cn(
                  'absolute inset-y-0 left-0 pl-3.5',
                  'flex items-center pointer-events-none',
                )}>
                  <Lock className={ICON_CLS} />
                </div>
                <Input
                  id="password"
                  type={
                    showPassword ? 'text' : 'password'
                  }
                  placeholder="Masukkan password"
                  className={INPUT_PW_CLS}
                  {...register('password')}
                  aria-invalid={!!errors.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={cn(
                    'absolute inset-y-0 right-0 pr-3.5',
                    'flex items-center text-slate-400',
                    'hover:text-slate-600',
                    'transition-colors',
                  )}
                  aria-label="Toggle password visibility"
                >
                  {showPassword
                    ? <EyeOff className="h-4 w-4" />
                    : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className={ERROR_CLS}>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Auth Error */}
            {loginMutation.isError && (
              <p className={cn(
                'text-sm text-red-500 text-center',
                'bg-red-50 rounded-lg py-2.5 px-4',
              )}>
                {loginMutation.error.message}
              </p>
            )}

            {/* Submit */}
            <Button
              type="submit"
              className={cn(
                'w-full h-12 rounded-xl',
                'bg-emerald-600 text-white',
                'font-semibold text-sm',
                'hover:bg-emerald-700 transition-all',
                'shadow-lg shadow-emerald-600/20',
              )}
              disabled={isLoading}
            >
              {isLoading
                ? 'Memproses...'
                : 'Masuk'}
              {!isLoading && (
                <ArrowRight className="ml-2 h-4 w-4" />
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <Separator className="flex-1 bg-slate-200" />
            <span className="text-xs text-slate-400">
              atau
            </span>
            <Separator className="flex-1 bg-slate-200" />
          </div>

          {/* Google */}
          <GoogleAuthButton
            label="Masuk dengan Google"
            onClick={handleGoogleLogin}
          />

          {/* Register Link */}
          <div className="text-center">
            <p className="text-sm text-slate-500">
              Belum punya akun?{' '}
              <Link
                href={registerHref}
                className={cn(
                  'font-semibold text-emerald-600',
                  'hover:text-emerald-700',
                  'transition-colors',
                )}
              >
                Daftar Sekarang
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
