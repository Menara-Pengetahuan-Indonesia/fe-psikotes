import type {
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form'
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Phone,
  Lock,
} from 'lucide-react'

import { Input } from '@/components/ui/input'

import type { RegisterFormData } from '../schemas'
import { cn } from '@/lib/utils'

const INPUT_CLS = cn(
  'h-12 rounded-xl bg-slate-50/50 border-slate-200/60',
  'pl-11 pr-4 text-slate-900 text-sm font-medium',
  'placeholder:text-slate-400 placeholder:font-normal',
  'focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10',
  'transition-all duration-200',
)
const INPUT_PW_CLS = cn(INPUT_CLS, 'pr-12')
const ERROR_CLS = 'text-[11px] text-red-500 ml-3 font-medium flex items-center gap-1'

interface RegisterFieldsProps {
  register: UseFormRegister<RegisterFormData>
  errors: FieldErrors<RegisterFormData>
  showPassword: boolean
  showConfirm: boolean
  onTogglePassword: () => void
  onToggleConfirm: () => void
}

export function RegisterFields({
  register: reg,
  errors,
  showPassword,
  showConfirm,
  onTogglePassword,
  onToggleConfirm,
}: RegisterFieldsProps) {
  return (
    <div className="space-y-4">
      {/* Name Row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5 group">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
              <User className="w-4 h-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
            </div>
            <Input
              id="firstName"
              type="text"
              placeholder="Nama depan"
              className={INPUT_CLS}
              {...reg('firstName')}
              aria-invalid={!!errors.firstName}
            />
          </div>
          {errors.firstName && (
            <p className={ERROR_CLS}>
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5 group">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
              <User className="w-4 h-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
            </div>
            <Input
              id="lastName"
              type="text"
              placeholder="Nama belakang"
              className={INPUT_CLS}
              {...reg('lastName')}
              aria-invalid={!!errors.lastName}
            />
          </div>
          {errors.lastName && (
            <p className={ERROR_CLS}>
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="space-y-1.5 group">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
            <Mail className="w-4 h-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
          </div>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            className={INPUT_CLS}
            {...reg('email')}
            aria-invalid={!!errors.email}
          />
        </div>
        {errors.email && (
          <p className={ERROR_CLS}>
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-1.5 group">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
            <Phone className="w-4 h-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
          </div>
          <Input
            id="telp"
            type="tel"
            placeholder="Nomor hp"
            className={INPUT_CLS}
            {...reg('telp')}
            aria-invalid={!!errors.telp}
          />
        </div>
        {errors.telp && (
          <p className={ERROR_CLS}>
            {errors.telp.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-1.5 group">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
            <Lock className="w-4 h-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
          </div>
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className={INPUT_PW_CLS}
            {...reg('password')}
            aria-invalid={!!errors.password}
          />
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary-600 transition-colors p-1"
            tabIndex={-1}
            aria-label="Tampilkan sandi"
          >
            {showPassword
              ? <EyeOff className="w-4 h-4" />
              : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.password && (
          <p className={ERROR_CLS}>
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="space-y-1.5 group">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
            <Lock className="w-4 h-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
          </div>
          <Input
            id="confirmPassword"
            type={showConfirm ? 'text' : 'password'}
            placeholder="Konfirmasi password"
            className={INPUT_PW_CLS}
            {...reg('confirmPassword')}
            aria-invalid={!!errors.confirmPassword}
          />
          <button
            type="button"
            onClick={onToggleConfirm}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary-600 transition-colors p-1"
            tabIndex={-1}
            aria-label="Tampilkan konfirmasi sandi"
          >
            {showConfirm
              ? <EyeOff className="w-4 h-4" />
              : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className={ERROR_CLS}>
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
    </div>
  )
}
