'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Sparkles } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

import { AuthBrandingPanel } from './auth-branding-panel'
import { GoogleAuthButton } from './google-auth-button'
import { RegisterFields } from './register-fields'
import {
  registerSchema,
  type RegisterFormData,
} from '../schemas'
import { useRegister } from '../hooks'
import { cn } from '@/lib/utils'

interface RegisterFormProps {
  onSuccess?: () => void
  className?: string
}

export function RegisterForm({
  onSuccess,
  className,
}: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect')
  const loginHref = redirect
    ? `/masuk?redirect=${encodeURIComponent(redirect)}`
    : '/masuk'

  const registerMutation = useRegister()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
  })

  const onSubmit = (data: RegisterFormData) => {
    registerMutation.mutate(data, { onSuccess })
  }

  const isLoading = registerMutation.isPending

  const handleGoogleSignup = () => {
    // TODO: Implement Google OAuth
  }

  return (
    <div className={cn(
      'grid lg:grid-cols-2 min-h-dvh',
      className,
    )}>
      {/* Left — Branding Panel */}
      <AuthBrandingPanel subtitle="Mulai perjalanan pengembangan dirimu. Temukan potensi terbaikmu bersama kami." />

      {/* Right — Form Panel */}
      <div className={cn(
        'flex flex-col items-center justify-center',
        'bg-stone-50 px-6 py-12 sm:px-12',
      )}>
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center">
            <Link
              href="/"
              className={cn(
                'inline-flex items-center',
                'gap-2 group',
              )}
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
              Buat Akun Baru
            </h2>
            <p className={cn(
              'text-xs font-bold tracking-widest',
              'text-slate-400 uppercase',
            )}>
              Mulai perjalanan Anda hari ini
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <RegisterFields
              register={register}
              errors={errors}
              showPassword={showPassword}
              showConfirm={showConfirm}
              onTogglePassword={() => (
                setShowPassword((p) => !p)
              )}
              onToggleConfirm={() => (
                setShowConfirm((p) => !p)
              )}
            />

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
                ? 'Mendaftarkan...'
                : 'Daftar Sekarang'}
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
            label="Daftar dengan Google"
            onClick={handleGoogleSignup}
          />

          {/* Login Link */}
          <div className="text-center">
            <p className={cn(
              'text-xs font-bold text-slate-400',
              'uppercase tracking-wide',
            )}>
              Sudah punya akun?{' '}
              <Link
                href={loginHref}
                className={cn(
                  'text-emerald-600',
                  'hover:text-emerald-700',
                  'transition-colors',
                )}
              >
                Masuk Sekarang
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
