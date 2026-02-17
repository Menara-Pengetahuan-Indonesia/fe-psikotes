'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ArrowRight, ArrowLeft, Mail, CheckCircle, Sparkles,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { AuthBrandingPanel } from './auth-branding-panel'
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from '../schemas'
import { cn } from '@/lib/utils'

const LABEL_CLS = cn(
  'text-sm font-semibold text-foreground',
)
const ICON_CLS = cn(
  'h-4 w-4 text-muted-foreground',
  'group-focus-within:text-primary transition-colors',
)
const INPUT_CLS = cn(
  'pl-10 h-11 rounded-xl border-input',
  'bg-card focus:bg-card transition-all',
)
const ERROR_CLS = 'text-xs text-destructive mt-1'

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
    <div className="grid lg:grid-cols-2 min-h-dvh">
      {/* Left — Branding Panel */}
      <AuthBrandingPanel
        subtitle="Jangan khawatir, kami akan bantu kamu mengatur ulang password."
      />

      {/* Right — Form Panel */}
      <div className={cn(
        'flex flex-col items-center justify-center',
        'bg-background px-6 py-12 sm:px-12',
      )}>
        <div className="w-full max-w-md space-y-10">
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
      </div>
    </div>
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
      {/* Heading */}
      <div className="space-y-1">
        <h2 className={cn(
          'text-2xl font-bold',
          'text-foreground',
        )}>
          Lupa Password?
        </h2>
        <p className={cn(
          'text-sm text-muted-foreground',
        )}>
          Masukkan email untuk reset password
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {/* Email */}
        <div className="space-y-2.5">
          <Label htmlFor="email" className={LABEL_CLS}>
            Email Address
          </Label>
          <div className="relative group">
            <div className={cn(
              'absolute inset-y-0 left-0 pl-4',
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
            ? 'Memproses...'
            : 'Kirim Link Reset'}
          {!isLoading && (
            <ArrowRight className="ml-2 h-4 w-4" />
          )}
        </Button>
      </form>

      {/* Back to Login */}
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
        'text-center space-y-4',
      )}>
        <div className={cn(
          'w-16 h-16 rounded-full',
          'bg-primary-100',
          'flex items-center justify-center',
        )}>
          <CheckCircle className={cn(
            'w-8 h-8 text-primary-600',
          )} />
        </div>
        <div className="space-y-1">
          <h2 className={cn(
            'text-2xl font-bold',
            'text-foreground',
          )}>
            Cek Email Kamu
          </h2>
          <p className={cn(
            'text-sm',
            'text-muted-foreground max-w-xs mx-auto',
          )}>
            Kami telah mengirimkan link untuk mengatur
            ulang password ke email kamu.
          </p>
        </div>
      </div>

      {/* Back to Login */}
      <BackToLogin />
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
          'inline-flex items-center gap-1.5',
          'text-sm font-semibold text-primary-600',
          'hover:text-primary-700 transition-colors',
        )}
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Kembali ke Halaman Masuk
      </Link>
    </div>
  )
}
