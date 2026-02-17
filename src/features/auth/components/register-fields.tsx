import type {
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form'
import {
  User, Mail, Phone, Lock, Eye, EyeOff,
} from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import type { RegisterFormData } from '../schemas'
import { cn } from '@/lib/utils'

const LABEL_CLS = 'text-sm font-semibold text-foreground'
const ICON_CLS = cn(
  'h-4 w-4 text-muted-foreground',
  'group-focus-within:text-primary transition-colors',
)
const INPUT_CLS = cn(
  'pl-10 h-11 rounded-xl border-input',
  'bg-card focus:bg-card transition-all',
)
const INPUT_PW_CLS = cn(
  'pl-10 pr-11 h-11 rounded-xl border-input',
  'bg-card focus:bg-card transition-all',
)
const TOGGLE_CLS = cn(
  'absolute inset-y-0 right-0 pr-3.5',
  'flex items-center',
  'text-muted-foreground hover:text-foreground transition-colors',
)
const ERROR_CLS = 'text-xs text-destructive mt-1'

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
        {/* First Name */}
        <div className="space-y-2">
          <Label htmlFor="firstName" className={LABEL_CLS}>
            Nama Depan
          </Label>
          <div className="relative group">
            <div className={cn(
              'absolute inset-y-0 left-0 pl-3.5',
              'flex items-center pointer-events-none',
            )}>
              <User className={ICON_CLS} />
            </div>
            <Input
              id="firstName"
              type="text"
              placeholder="John"
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

        {/* Last Name */}
        <div className="space-y-2">
          <Label htmlFor="lastName" className={LABEL_CLS}>
            Nama Belakang
          </Label>
          <div className="relative group">
            <div className={cn(
              'absolute inset-y-0 left-0 pl-3.5',
              'flex items-center pointer-events-none',
            )}>
              <User className={ICON_CLS} />
            </div>
            <Input
              id="lastName"
              type="text"
              placeholder="Doe"
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
      <div className="space-y-2">
        <Label htmlFor="email" className={LABEL_CLS}>
          Alamat Email
        </Label>
        <div className="relative group">
          <div className={cn(
            'absolute inset-y-0 left-0 pl-3.5',
            'flex items-center pointer-events-none',
          )}>
            <Mail className={ICON_CLS} />
          </div>
          <Input
            id="email"
            type="email"
            placeholder="nama@email.com"
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
      <div className="space-y-2">
        <Label htmlFor="telp" className={LABEL_CLS}>
          Nomor HP
        </Label>
        <div className="relative group">
          <div className={cn(
            'absolute inset-y-0 left-0 pl-3.5',
            'flex items-center pointer-events-none',
          )}>
            <Phone className={ICON_CLS} />
          </div>
          <Input
            id="telp"
            type="tel"
            placeholder="08xxxxxxxxxx"
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
      <div className="space-y-2">
        <Label htmlFor="password" className={LABEL_CLS}>
          Password
        </Label>
        <div className="relative group">
          <div className={cn(
            'absolute inset-y-0 left-0 pl-3.5',
            'flex items-center pointer-events-none',
          )}>
            <Lock className={ICON_CLS} />
          </div>
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Masukkan password"
            className={INPUT_PW_CLS}
            {...reg('password')}
            aria-invalid={!!errors.password}
          />
          <button
            type="button"
            onClick={onTogglePassword}
            className={TOGGLE_CLS}
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
      <div className="space-y-2">
        <Label
          htmlFor="confirmPassword"
          className={LABEL_CLS}
        >
          Konfirmasi Password
        </Label>
        <div className="relative group">
          <div className={cn(
            'absolute inset-y-0 left-0 pl-3.5',
            'flex items-center pointer-events-none',
          )}>
            <Lock className={ICON_CLS} />
          </div>
          <Input
            id="confirmPassword"
            type={showConfirm ? 'text' : 'password'}
            placeholder="Ulangi password"
            className={INPUT_PW_CLS}
            {...reg('confirmPassword')}
            aria-invalid={!!errors.confirmPassword}
          />
          <button
            type="button"
            onClick={onToggleConfirm}
            className={TOGGLE_CLS}
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
