'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserPlus } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { AuthLayout } from './auth-layout'
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
    mode: 'onSubmit',
  })

  const onSubmit = (data: RegisterFormData) => {
    registerMutation.mutate(data, { onSuccess })
  }

  const isLoading = registerMutation.isPending

  return (
    <AuthLayout>
      <div className={cn('space-y-8', className)}>
        {/* Header Section */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 mb-2">
            <UserPlus className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Buat akun baru
          </h2>
          <p className="text-sm text-slate-500 font-medium max-w-[280px] mx-auto leading-relaxed">
            Bergabunglah dan mulai perjalanan pengembangan diri Anda hari ini.
          </p>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
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

          {/* Error Message */}
          {registerMutation.isError && (
            <div className="bg-red-50 border border-red-100 rounded-xl p-3 animate-in fade-in slide-in-from-top-1">
              <p className="text-xs text-red-500 text-center font-medium">
                {registerMutation.error.message}
              </p>
            </div>
          )}

          {/* Submit */}
          <Button
            type="submit"
            className={cn(
              'w-full h-12 rounded-xl mt-2',
              'bg-slate-900 text-white',
              'font-bold text-sm',
              'hover:bg-slate-800 active:scale-[0.98]',
              'transition-colors duration-200 shadow-xl shadow-slate-900/20',
            )}
            disabled={isLoading}
          >
            {isLoading
              ? 'Mendaftarkan...'
              : 'Daftar sekarang'}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center gap-4 px-2">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-[10px] font-medium text-slate-400">
            atau daftar dengan
          </span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        {/* Social buttons */}
        <div className="px-1">
          <GoogleAuthButton
            label="Daftar dengan Google"
            onClick={() => {}}
            className="h-12 rounded-xl border-slate-200 shadow-none hover:bg-slate-50 text-xs"
          />
        </div>

        {/* Login link */}
        <p className="text-center text-xs font-medium text-slate-400">
          Sudah punya akun?{' '}
          <Link
            href={loginHref}
            className="text-primary-600 hover:text-primary-700 transition-colors underline underline-offset-4 decoration-primary-500/30 font-bold"
          >
            Masuk sekarang
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}
