'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import { GoogleAuthButton } from './google-auth-button'
import { loginSchema, type LoginFormData } from '../schemas'
import { cn } from '@/lib/utils'

interface LoginFormProps {
  onSuccess?: () => void
  className?: string
}

export function LoginForm({ onSuccess, className }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur'
  })

  const onSubmit = async () => {
    setIsLoading(true)
    try {
      // TODO: Implement actual login logic
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
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
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Selamat Datang Kembali</h2>
          <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">
            Silakan masuk ke akun Anda
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
        {/* Email Input */}
        <div className="space-y-2.5">
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
        <div className="space-y-2.5">
          <div className="flex items-center justify-between ml-1">
            <Label htmlFor="password" className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              Password
            </Label>
            <Link
              href="/forgot-password"
              className="text-[10px] font-bold text-emerald-600 hover:text-emerald-700 transition-colors uppercase tracking-widest"
            >
              Lupa password?
            </Link>
          </div>
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

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-14 rounded-2xl bg-slate-950 text-white font-black text-xs uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl shadow-slate-950/10 hover:shadow-emerald-600/20 mt-4"
          disabled={isLoading}
        >
          {isLoading ? 'Memproses...' : 'Masuk Sekarang'}
          {!isLoading && <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />}
        </Button>
      </form>

      {/* Divider */}
      <div className="my-10 flex items-center gap-4 relative z-10">
        <Separator className="flex-1 bg-slate-100" />
        <span className="text-[10px] text-slate-300 font-black uppercase tracking-widest">Atau</span>
        <Separator className="flex-1 bg-slate-100" />
      </div>

      {/* Social Login */}
      <GoogleAuthButton
        label="Masuk dengan Google"
        onClick={handleGoogleLogin}
      />

      {/* Register Link */}
      <div className="mt-10 text-center relative z-10">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">
          Belum punya akun?{' '}
          <Link href="/daftar" className="text-emerald-600 hover:text-emerald-700 transition-colors">
            Daftar Sekarang
          </Link>
        </p>
      </div>
    </div>
  )
}