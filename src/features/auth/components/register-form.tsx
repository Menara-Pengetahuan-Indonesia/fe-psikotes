'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

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
  const registerHref = redirect
    ? `/daftar?redirect=${encodeURIComponent(redirect)}`
    : '/daftar'

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

  return (
    <AuthLayout>
      <div className={cn('space-y-8', className)}>
        {/* Tab Toggle */}
        <div className="flex p-1 bg-primary-50/50 rounded-2xl border border-primary-100/50">
          <Link
            href={loginHref}
            className="flex-1 py-2.5 text-sm font-bold text-center rounded-xl text-secondary-900/30 hover:text-secondary-900/60 transition-colors"
          >
            Masuk
          </Link>
          <Link
            href={registerHref}
            className="flex-1 py-2.5 text-sm font-bold text-center rounded-xl bg-white text-primary-600 shadow-sm border border-primary-100/20"
          >
            Daftar
          </Link>
        </div>

        {/* Heading */}
        <div className="text-center space-y-1.5">
          <h2 className="text-2xl font-bold text-secondary-900 tracking-tight">
            Buat Akun Baru
          </h2>
          <p className="text-sm text-secondary-900/40">
            Bergabunglah dan mulai perjalananmu hari ini.
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

          {/* Error Message */}
          {registerMutation.isError && (
            <div className="bg-red-50 border border-red-100 rounded-xl p-3">
              <p className="text-xs text-red-500 text-center font-medium">
                {registerMutation.error.message}
              </p>
            </div>
          )}

          {/* Submit */}
          <Button
            type="submit"
            tabIndex={7}
            className={cn(
              'w-full h-12 rounded-xl mt-2',
              'bg-primary-600 text-white',
              'font-bold text-base',
              'hover:bg-primary-700 active:scale-[0.98]',
              'transition-all duration-200 shadow-lg shadow-primary-500/20',
            )}
            disabled={isLoading}
          >
            {isLoading
              ? 'Mendaftarkan...'
              : 'Daftar Sekarang'}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center gap-4 px-4">
          <div className="h-px flex-1 bg-secondary-900/5" />
          <span className="text-[10px] font-bold text-secondary-900/20 uppercase tracking-widest">Atau daftar dengan</span>
          <div className="h-px flex-1 bg-secondary-900/5" />
        </div>

        {/* Google */}
        <GoogleAuthButton
          label="Google"
          onClick={() => {}}
          tabIndex={8}
        />
      </div>
    </AuthLayout>
  )
}
