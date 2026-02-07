'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ArrowRight, Mail, Lock, Eye, EyeOff, User, Sparkles,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import { GoogleAuthButton } from './google-auth-button'
import { registerSchema, type RegisterFormData } from '../schemas'
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
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
  })

  const onSubmit = async () => {
    setIsLoading(true)
    try {
      // TODO: Implement actual register logic
      await new Promise((r) => setTimeout(r, 1000))
      onSuccess?.()
    } catch (error) {
      console.error('Register error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignup = () => {
    // TODO: Implement Google OAuth
  }

  const labelCls = cn(
    'text-[10px] font-black text-slate-500',
    'uppercase tracking-widest ml-1'
  )
  const iconCls = cn(
    'h-5 w-5 text-slate-300',
    'group-focus-within:text-emerald-500 transition-colors'
  )
  const inputCls = cn(
    'pl-11 h-14 rounded-2xl border-slate-100',
    'bg-slate-50/50 focus:bg-white transition-all font-medium'
  )
  const inputPwCls = cn(
    'pl-11 pr-12 h-14 rounded-2xl border-slate-100',
    'bg-slate-50/50 focus:bg-white transition-all font-medium'
  )
  const toggleCls = cn(
    'absolute inset-y-0 right-0 pr-4 flex items-center',
    'text-slate-300 hover:text-slate-500 transition-colors'
  )
  const errorCls = cn(
    'text-[10px] font-bold text-red-500',
    'uppercase tracking-tight ml-1'
  )

  return (
    <div className={cn(
      'w-full max-w-md bg-white border border-slate-100',
      'rounded-[2.5rem] p-10 md:p-12 shadow-2xl',
      'shadow-indigo-900/5 relative overflow-hidden',
      className
    )}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl opacity-50" />

      <div className="text-center mb-12 space-y-4 relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 group">
          <div className={cn(
            'w-10 h-10 bg-emerald-500 rounded-xl',
            'flex items-center justify-center text-white shadow-lg',
            'group-hover:rotate-12 transition-transform duration-300'
          )}>
            <Sparkles className="w-5 h-5 fill-white" />
          </div>
          <span className="text-2xl font-black text-slate-900 tracking-tighter">
            BERMOELA<span className="text-emerald-500">.</span>
          </span>
        </Link>
        <div className="space-y-1">
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Buat Akun Baru
          </h2>
          <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">
            Mulai perjalanan Anda hari ini
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 relative z-10">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className={labelCls}>Nama Lengkap</Label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className={iconCls} />
            </div>
            <Input id="name" type="text" placeholder="John Doe" className={inputCls} {...register('name')} aria-invalid={!!errors.name} />
          </div>
          {errors.name && <p className={errorCls}>{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className={labelCls}>Email Address</Label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className={iconCls} />
            </div>
            <Input id="email" type="email" placeholder="nama@email.com" className={inputCls} {...register('email')} aria-invalid={!!errors.email} />
          </div>
          {errors.email && <p className={errorCls}>{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password" className={labelCls}>Password</Label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className={iconCls} />
            </div>
            <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" className={inputPwCls} {...register('password')} aria-invalid={!!errors.password} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className={toggleCls} aria-label="Toggle password visibility">
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.password && <p className={errorCls}>{errors.password.message}</p>}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className={labelCls}>Konfirmasi Password</Label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className={iconCls} />
            </div>
            <Input id="confirmPassword" type={showConfirm ? 'text' : 'password'} placeholder="••••••••" className={inputPwCls} {...register('confirmPassword')} aria-invalid={!!errors.confirmPassword} />
            <button type="button" onClick={() => setShowConfirm(!showConfirm)} className={toggleCls} aria-label="Toggle confirmation visibility">
              {showConfirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.confirmPassword && <p className={errorCls}>{errors.confirmPassword.message}</p>}
        </div>

        <Button
          type="submit"
          className={cn(
            'w-full h-14 rounded-2xl bg-slate-950 text-white',
            'font-black text-xs uppercase tracking-widest',
            'hover:bg-emerald-600 transition-all shadow-xl',
            'shadow-slate-950/10 hover:shadow-emerald-600/20 mt-4'
          )}
          disabled={isLoading}
        >
          {isLoading ? 'Mendaftarkan...' : 'Daftar Sekarang'}
          {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </form>

      <div className="my-8 flex items-center gap-4 relative z-10">
        <Separator className="flex-1 bg-slate-100" />
        <span className="text-[10px] text-slate-300 font-black uppercase tracking-widest">Atau</span>
        <Separator className="flex-1 bg-slate-100" />
      </div>

      <GoogleAuthButton label="Daftar dengan Google" onClick={handleGoogleSignup} />

      <div className="mt-10 text-center relative z-10">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">
          Sudah punya akun?{' '}
          <Link href="/masuk" className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors">
            Masuk Sekarang
          </Link>
        </p>
      </div>
    </div>
  )
}
