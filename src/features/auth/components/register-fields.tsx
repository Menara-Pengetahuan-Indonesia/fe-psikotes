import type {
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form'
import { Eye, EyeOff } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import type { RegisterFormData } from '../schemas'
import { cn } from '@/lib/utils'

const LABEL_CLS = 'text-sm font-semibold text-secondary-900/60'
const INPUT_CLS = cn(
  'h-12 rounded-xl border-secondary-100 bg-white/50',
  'px-4 placeholder:text-secondary-900/20 text-secondary-900',
  'focus:border-primary-500/50 focus:bg-white',
  'focus:ring-4 focus:ring-primary-500/5',
  'transition-all duration-200',
)
const INPUT_PW_CLS = cn(INPUT_CLS, 'pr-12')
const TOGGLE_CLS = cn(
  'absolute inset-y-0 right-0 pr-4',
  'flex items-center',
  'text-secondary-900/20 hover:text-secondary-900/50',
  'transition-colors',
)
const ERROR_CLS = 'text-xs text-red-500 mt-1.5 ml-1 font-medium'

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
    <>
      {/* Name Row */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label
            htmlFor="firstName"
            className={LABEL_CLS}
          >
            Nama Depan
          </Label>
          <Input
            id="firstName"
            type="text"
            placeholder="John"
            className={INPUT_CLS}
            autoFocus
            tabIndex={1}
            {...reg('firstName')}
            aria-invalid={!!errors.firstName}
          />
          {errors.firstName && (
            <p className={ERROR_CLS}>
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor="lastName"
            className={LABEL_CLS}
          >
            Nama Belakang
          </Label>
          <Input
            id="lastName"
            type="text"
            placeholder="Doe"
            className={INPUT_CLS}
            tabIndex={2}
            {...reg('lastName')}
            aria-invalid={!!errors.lastName}
          />
          {errors.lastName && (
            <p className={ERROR_CLS}>
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <Label htmlFor="email" className={LABEL_CLS}>
          Alamat Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="nama@email.com"
          className={INPUT_CLS}
          tabIndex={3}
          {...reg('email')}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p className={ERROR_CLS}>
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-1.5">
        <Label htmlFor="telp" className={LABEL_CLS}>
          Nomor HP
        </Label>
        <Input
          id="telp"
          type="tel"
          placeholder="08xxxxxxxxxx"
          className={INPUT_CLS}
          tabIndex={4}
          {...reg('telp')}
          aria-invalid={!!errors.telp}
        />
        {errors.telp && (
          <p className={ERROR_CLS}>
            {errors.telp.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <Label htmlFor="password" className={LABEL_CLS}>
          Password
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Masukkan password"
            className={INPUT_PW_CLS}
            tabIndex={5}
            {...reg('password')}
            aria-invalid={!!errors.password}
          />
          <button
            type="button"
            onClick={onTogglePassword}
            className={TOGGLE_CLS}
            tabIndex={-1}
            aria-label="Toggle password visibility"
          >
            {showPassword
              ? <EyeOff className="h-4 w-4" />
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
      <div className="space-y-1.5">
        <Label
          htmlFor="confirmPassword"
          className={LABEL_CLS}
        >
          Konfirmasi Password
        </Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirm ? 'text' : 'password'}
            placeholder="Ulangi password"
            className={INPUT_PW_CLS}
            tabIndex={6}
            {...reg('confirmPassword')}
            aria-invalid={!!errors.confirmPassword}
          />
          <button
            type="button"
            onClick={onToggleConfirm}
            className={TOGGLE_CLS}
            tabIndex={-1}
            aria-label="Toggle confirmation visibility"
          >
            {showConfirm
              ? <EyeOff className="h-4 w-4" />
              : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className={ERROR_CLS}>
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
    </>
  )
}
