'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ArrowRight, Mail, Lock, Eye, EyeOff, Phone, Sparkles,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import { AuthBrandingPanel } from './auth-branding-panel'
import { GoogleAuthButton } from './google-auth-button'
import { loginSchema, type LoginFormData } from '../schemas'
import { cn } from '@/lib/utils'

const LABEL_CLS = cn(
  'text-[10px] font-black text-slate-500',
  'uppercase tracking-widest ml-1',
)
const ICON_CLS = cn(
  'h-4 w-4 text-slate-300',
  'group-focus-within:text-emerald-500 transition-colors',
)
const INPUT_CLS = cn(
  'pl-10 h-11 rounded-xl border-slate-200',
  'bg-white focus:bg-white transition-all font-medium',
)
const INPUT_PW_CLS = cn(
  'pl-10 pr-11 h-11 rounded-xl border-slate-200',
  'bg-white focus:bg-white transition-all font-medium',
)
const ERROR_CLS = cn(
  'text-[10px] font-bold text-red-500',
  'uppercase tracking-tight ml-1',
)
const PILL_BASE = cn(
  'flex-1 py-2.5 text-[10px] font-black uppercase',
  'tracking-widest rounded-xl transition-all',
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
  const [isLoading, setIsLoading] = useState(false)
  const [loginMethod, setLoginMethod] = useState<
    'email' | 'phone'
  >('email')

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    defaultValues: { method: 'email', identifier: '' },
  })

  const switchMethod = (method: 'email' | 'phone') => {
    setLoginMethod(method)
    setValue('method', method)
    setValue('identifier', '')
    clearErrors('identifier')
  }

  const onSubmit = async () => {
    setIsLoading(true)
    try {
      await new Promise((r) => setTimeout(r, 1000))
      onSuccess?.()
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth
  }

  const isEmail = loginMethod === 'email'

  return (
    <div className={cn(
      'grid lg:grid-cols-2 min-h-dvh',
      className,
    )}>
      {/* Left — Branding Panel */}
      <AuthBrandingPanel subtitle="Platform pengembangan diri #1 di Indonesia. Kenali potensimu, raih masa depan." />

      {/* Right — Form Panel */}
      <div className={cn(
        'flex flex-col items-center justify-center',
        'bg-stone-50 px-6 py-12 sm:px-12',
      )}>
        <div className="w-full max-w-md space-y-10">
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
                'text-2xl font-black',
                'text-slate-900 tracking-tighter',
              )}>
                BERMOELA
                <span className="text-emerald-500">.</span>
              </span>
            </Link>
          </div>

          {/* Heading */}
          <div className="space-y-1">
            <h2 className={cn(
              'text-xl font-black',
              'text-slate-900 tracking-tight',
            )}>
              Selamat Datang Kembali
            </h2>
            <p className={cn(
              'text-xs font-bold tracking-widest',
              'text-slate-400 uppercase',
            )}>
              Silakan masuk ke akun Anda
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Method Toggle */}
            <div className={cn(
              'flex gap-1 p-1 rounded-2xl',
              'bg-slate-100/80',
            )}>
              <button
                type="button"
                onClick={() => switchMethod('email')}
                className={cn(
                  PILL_BASE,
                  isEmail
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-400 hover:text-slate-600',
                )}
              >
                Email
              </button>
              <button
                type="button"
                onClick={() => switchMethod('phone')}
                className={cn(
                  PILL_BASE,
                  !isEmail
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-400 hover:text-slate-600',
                )}
              >
                No. HP
              </button>
            </div>

            {/* Identifier (Email / Phone) */}
            <div className="space-y-2.5">
              <Label
                htmlFor="identifier"
                className={LABEL_CLS}
              >
                {isEmail ? 'Email Address' : 'Nomor HP'}
              </Label>
              <div className="relative group">
                <div className={cn(
                  'absolute inset-y-0 left-0 pl-4',
                  'flex items-center pointer-events-none',
                )}>
                  {isEmail
                    ? <Mail className={ICON_CLS} />
                    : <Phone className={ICON_CLS} />}
                </div>
                <Input
                  id="identifier"
                  type={isEmail ? 'email' : 'tel'}
                  placeholder={
                    isEmail
                      ? 'nama@email.com'
                      : '08xxxxxxxxxx'
                  }
                  className={INPUT_CLS}
                  {...register('identifier')}
                  aria-invalid={!!errors.identifier}
                />
              </div>
              {errors.identifier && (
                <p className={ERROR_CLS}>
                  {errors.identifier.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2.5">
              <div className={cn(
                'flex items-center',
                'justify-between ml-1',
              )}>
                <Label htmlFor="password" className={cn(
                  'text-[10px] font-black text-slate-500',
                  'uppercase tracking-widest',
                )}>
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className={cn(
                    'text-[10px] font-bold',
                    'text-emerald-600',
                    'hover:text-emerald-700',
                    'transition-colors',
                    'uppercase tracking-widest',
                  )}
                >
                  Lupa password?
                </Link>
              </div>
              <div className="relative group">
                <div className={cn(
                  'absolute inset-y-0 left-0 pl-4',
                  'flex items-center pointer-events-none',
                )}>
                  <Lock className={ICON_CLS} />
                </div>
                <Input
                  id="password"
                  type={
                    showPassword ? 'text' : 'password'
                  }
                  placeholder="••••••••"
                  className={INPUT_PW_CLS}
                  {...register('password')}
                  aria-invalid={!!errors.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={cn(
                    'absolute inset-y-0 right-0 pr-4',
                    'flex items-center text-slate-300',
                    'hover:text-slate-500',
                    'transition-colors',
                  )}
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

            {/* Submit */}
            <Button
              type="submit"
              className={cn(
                'w-full h-12 rounded-xl',
                'bg-slate-950 text-white',
                'font-black text-xs uppercase',
                'tracking-widest',
                'hover:bg-emerald-600 transition-all',
                'shadow-xl shadow-slate-950/10',
                'hover:shadow-emerald-600/20 mt-4',
              )}
              disabled={isLoading}
            >
              {isLoading
                ? 'Memproses...'
                : 'Masuk Sekarang'}
              {!isLoading && (
                <ArrowRight className="ml-2 h-4 w-4" />
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <Separator className="flex-1 bg-slate-100" />
            <span className={cn(
              'text-[10px] text-slate-300',
              'font-black uppercase tracking-widest',
            )}>
              Atau
            </span>
            <Separator className="flex-1 bg-slate-100" />
          </div>

          {/* Google */}
          <GoogleAuthButton
            label="Masuk dengan Google"
            onClick={handleGoogleLogin}
          />

          {/* Register Link */}
          <div className="text-center">
            <p className={cn(
              'text-xs font-bold text-slate-400',
              'uppercase tracking-wide',
            )}>
              Belum punya akun?{' '}
              <Link
                href="/daftar"
                className={cn(
                  'text-emerald-600',
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
