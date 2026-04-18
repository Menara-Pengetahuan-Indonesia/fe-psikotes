'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ArrowLeft,
  CheckCircle,
  KeyRound,
  Mail,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { AuthLayout } from './auth-layout'
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from '../schemas'
import { cn } from '@/lib/utils'

const INPUT_CLS = cn(
  'h-12 rounded-xl bg-slate-50/80',
  'border-slate-200/60 pl-11 pr-4',
  'text-slate-800 text-sm',
  'placeholder:text-slate-400',
  'focus:bg-white focus:border-sky-300',
  'focus:ring-4 focus:ring-sky-100/50',
  'transition-colors duration-200',
)

export function ForgotPasswordForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onSubmit',
    defaultValues: { email: '' },
  })

  const onSubmit = async () => {
    setIsLoading(true)
    try {
      await new Promise((r) => setTimeout(r, 1000))
      setIsSubmitted(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout>
      <div className="space-y-6">
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
      {/* Icon */}
      <div className="flex justify-center">
        <div className={cn(
          'w-14 h-14 rounded-2xl',
          'bg-white border border-slate-200/80',
          'flex items-center justify-center',
          'shadow-sm',
        )}>
          <KeyRound
            className="w-6 h-6 text-slate-700"
          />
        </div>
      </div>

      {/* Heading */}
      <div className="text-center space-y-1.5">
        <h2 className={cn(
          'text-xl font-bold text-slate-800',
          'tracking-tight',
        )}>
          Lupa Password?
        </h2>
        <p className={cn(
          'text-sm text-slate-400',
          'leading-relaxed',
        )}>
          Masukkan email untuk menerima link reset.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-3.5"
      >
        <div className="space-y-1.5">
          <div className="relative">
            <Mail className={cn(
              'absolute left-3.5 top-1/2',
              '-translate-y-1/2 w-4 h-4',
              'text-slate-400',
            )} />
            <Input
              id="email"
              type="email"
              placeholder="Email"
              className={INPUT_CLS}
              {...register('email')}
              aria-invalid={!!errors.email}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-red-500 ml-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className={cn(
            'w-full h-12 rounded-xl',
            'bg-slate-900 text-white',
            'font-semibold text-sm',
            'hover:bg-slate-800',
            'active:scale-[0.98]',
            'transition-colors duration-200',
            'shadow-lg shadow-slate-900/20',
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
      <div className={cn(
        'flex flex-col items-center',
        'text-center space-y-5',
      )}>
        <div className={cn(
          'w-14 h-14 rounded-2xl',
          'bg-emerald-50 border border-emerald-100',
          'flex items-center justify-center',
        )}>
          <CheckCircle
            className="w-7 h-7 text-emerald-600"
          />
        </div>
        <div className="space-y-2">
          <h2 className={cn(
            'text-xl font-bold text-slate-800',
            'tracking-tight',
          )}>
            Cek Email Kamu
          </h2>
          <p className={cn(
            'text-sm text-slate-400',
            'leading-relaxed max-w-[280px]',
          )}>
            Kami telah mengirimkan link untuk
            mengatur ulang password ke email kamu.
          </p>
        </div>
      </div>

      <div className="pt-2">
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
        className={cn(
          'inline-flex items-center gap-2',
          'text-sm font-semibold text-slate-700',
          'hover:text-slate-900',
          'transition-colors',
        )}
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke Halaman Masuk
      </Link>
    </div>
  )
}
