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
        'bg-background px-6 py-12 sm:px-12',
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
                'w-10 h-10 bg-primary rounded-xl',
                'flex items-center justify-center',
                'text-white shadow-lg',
                'group-hover:rotate-12',
                'transition-transform duration-300',
              )}>
                <Sparkles className="w-5 h-5 fill-white" />
              </div>
              <span className={cn(
                'text-2xl font-bold',
                'text-foreground tracking-tight',
              )}>
                Bermoela
                <span className="text-primary">.</span>
              </span>
            </Link>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h2 className={cn(
              'text-2xl font-bold',
              'text-foreground',
            )}>
              Buat Akun Baru
            </h2>
            <p className="text-sm text-muted-foreground">
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

            {/* Auth Error */}
            {registerMutation.isError && (
              <p className={cn(
                'text-sm text-destructive text-center',
                'bg-destructive/10 rounded-lg py-2.5 px-4',
              )}>
                {registerMutation.error.message}
              </p>
            )}

            {/* Submit */}
            <Button
              type="submit"
              className={cn(
                'w-full h-12 rounded-xl',
                'bg-primary text-primary-foreground',
                'font-semibold text-sm',
                'hover:bg-primary-700 transition-all',
                'shadow-lg shadow-primary/20',
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
            <Separator className="flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">
              atau
            </span>
            <Separator className="flex-1 bg-border" />
          </div>

          {/* Google */}
          <GoogleAuthButton
            label="Daftar dengan Google"
            onClick={handleGoogleSignup}
          />

          {/* Login Link */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Sudah punya akun?{' '}
              <Link
                href={loginHref}
                className={cn(
                  'font-semibold text-primary-600',
                  'hover:text-primary-700',
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
