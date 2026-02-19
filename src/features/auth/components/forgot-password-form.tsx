'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, CheckCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { AuthLayout } from './auth-layout'
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from '../schemas'
import { cn } from '@/lib/utils'

const LABEL_CLS = 'text-sm font-semibold text-secondary-900/60'
const INPUT_CLS = cn(
  'h-12 rounded-xl border-secondary-100 bg-white/50',
  'px-4 placeholder:text-secondary-900/20 text-secondary-900',
  'focus:border-primary-500/50 focus:bg-white',
  'focus:ring-4 focus:ring-primary-500/5',
  'transition-all duration-200',
)
const ERROR_CLS = 'text-xs text-red-500 mt-1.5 ml-1 font-medium'

export function ForgotPasswordForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onBlur',
    defaultValues: { email: '' },
  })

  const onSubmit = async () => {
    setIsLoading(true)
    try {
      await new Promise((r) => setTimeout(r, 1000))
      setIsSubmitted(true)
    } catch (error) {
      console.error('Forgot password error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout>
      <div className="space-y-8">
        {isSubmitted
          ? <SuccessView />
          : (
            <FormView
              register={register}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              errors={errors}
              isLoading={isLoading}
            />
          )}
      </div>
    </AuthLayout>
  )
}

/* -------------------------------------------------- */
/*  Form View                                         */
/* -------------------------------------------------- */

interface FormViewProps {
  register: ReturnType<
    typeof useForm<ForgotPasswordFormData>
  >['register']
  handleSubmit: ReturnType<
    typeof useForm<ForgotPasswordFormData>
  >['handleSubmit']
  onSubmit: () => Promise<void>
  errors: ReturnType<
    typeof useForm<ForgotPasswordFormData>
  >['formState']['errors']
  isLoading: boolean
}

function FormView({
  register,
  handleSubmit,
  onSubmit,
  errors,
  isLoading,
}: FormViewProps) {
  return (
    <>
      <div className="text-center space-y-1.5">
        <h2 className="text-2xl font-bold text-secondary-900 tracking-tight">
          Lupa Password?
        </h2>
        <p className="text-sm text-secondary-900/40">
          Masukkan email untuk menerima link reset.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
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

        <Button
          type="submit"
          tabIndex={2}
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
            ? 'Memproses...'
            : 'Kirim Link Reset'}
        </Button>
      </form>

      <BackToLogin />
    </>
  )
}

/* -------------------------------------------------- */
/*  Success View                                      */
/* -------------------------------------------------- */

function SuccessView() {
  return (
    <>
      <div
        className={cn(
          'flex flex-col items-center',
          'text-center space-y-5',
        )}
      >
        <div
          className={cn(
            'w-16 h-16 rounded-2xl',
            'bg-primary-50 border border-primary-100',
            'flex items-center justify-center',
          )}
        >
          <CheckCircle className="w-8 h-8 text-primary-600" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-secondary-900 tracking-tight">
            Cek Email Kamu
          </h2>
          <p className="text-sm text-secondary-900/40 leading-relaxed max-w-[280px]">
            Kami telah mengirimkan link untuk
            mengatur ulang password ke email kamu.
          </p>
        </div>
      </div>

      <div className="pt-4">
        <BackToLogin />
      </div>
    </>
  )
}

/* -------------------------------------------------- */
/*  Back to Login Link                                */
/* -------------------------------------------------- */

function BackToLogin() {
  return (
    <div className="text-center">
      <Link
        href="/masuk"
        tabIndex={3}
        className={cn(
          'inline-flex items-center gap-2',
          'text-sm font-bold text-primary-600',
          'hover:text-primary-700',
          'transition-colors',
        )}
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke Halaman Masuk
      </Link>
    </div>
  )
}
