'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Mail, Lock, Eye, EyeOff, User, Sparkles } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import { registerSchema, type RegisterFormData } from '../schemas'
import { cn } from '@/lib/utils'

interface RegisterFormProps {
  onSuccess?: () => void
  className?: string
}

export function RegisterForm({ onSuccess, className }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur'
  })

  const onSubmit = async () => {
    setIsLoading(true)
    try {
      // TODO: Implement actual register logic
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
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

  return (
    <div
      className={cn(
        'w-full max-w-md bg-white border border-slate-100 rounded-[2.5rem] p-10 md:p-12 shadow-2xl shadow-indigo-900/5 relative overflow-hidden',
        className
      )}
    >
      {/* Decorative Ornaments */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl opacity-50" />

      {/* Header */}
      <div className="text-center mb-12 space-y-4 relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 group">
           <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform duration-300">
              <Sparkles className="w-5 h-5 fill-white" />
           </div>
           <span className="text-2xl font-black text-slate-900 tracking-tighter">
            BERMOELA<span className="text-emerald-500">.</span>
          </span>
        </Link>
        <div className="space-y-1">
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Buat Akun Baru</h2>
          <p className="text-xs font-bold tracking-[0.1em] text-slate-400 uppercase">
            Mulai perjalanan Anda hari ini
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 relative z-10">
        {/* Name Input */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
            Nama Lengkap
          </Label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
            </div>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              className="pl-11 h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all font-medium"
              {...register('name')}
              aria-invalid={errors.name ? 'true' : 'false'}
            />
          </div>
          {errors.name && (
            <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight ml-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email Input */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
            Email Address
          </Label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
            </div>
            <Input
              id="email"
              type="email"
              placeholder="nama@email.com"
              className="pl-11 h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all font-medium"
              {...register('email')}
              aria-invalid={errors.email ? 'true' : 'false'}
            />
          </div>
          {errors.email && (
            <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight ml-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
            Password
          </Label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
            </div>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className="pl-11 pr-12 h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all font-medium"
              {...register('password')}
              aria-invalid={errors.password ? 'true' : 'false'}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-300 hover:text-slate-500 transition-colors"
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight ml-1">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password Input */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
            Konfirmasi Password
          </Label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
            </div>
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className="pl-11 pr-12 h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all font-medium"
              {...register('confirmPassword')}
              aria-invalid={errors.confirmPassword ? 'true' : 'false'}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-300 hover:text-slate-500 transition-colors"
              aria-label="Toggle confirmation visibility"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight ml-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-14 rounded-2xl bg-slate-950 text-white font-black text-xs uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl shadow-slate-950/10 hover:shadow-emerald-600/20 mt-4"
          disabled={isLoading}
        >
          {isLoading ? 'Mendaftarkan...' : 'Daftar Sekarang'}
          {!isLoading && <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />}
        </Button>
      </form>

      {/* Divider */}
      <div className="my-8 flex items-center gap-4 relative z-10">
        <Separator className="flex-1 bg-slate-100" />
        <span className="text-[10px] text-slate-300 font-black uppercase tracking-widest">Atau</span>
        <Separator className="flex-1 bg-slate-100" />
      </div>

      {/* Social Signup */}
      <button
        type="button"
        className="w-full h-14 flex items-center justify-center gap-3 border-2 border-slate-100 rounded-2xl hover:bg-slate-50 transition-all text-xs font-black uppercase tracking-widest text-slate-600 relative z-10"
        onClick={handleGoogleSignup}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Daftar dengan Google
      </button>

      {/* Login Link */}
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