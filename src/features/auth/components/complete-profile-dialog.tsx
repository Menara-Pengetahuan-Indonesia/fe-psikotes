'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import {
  completeProfileSchema,
  type CompleteProfileFormData,
} from '../schemas'
import { useAuthStore } from '@/store/auth.store'
import { cn } from '@/lib/utils'

const LABEL_CLS = cn(
  'text-[10px] font-black text-slate-500',
  'uppercase tracking-widest ml-1',
)
const ERROR_CLS = cn(
  'text-[10px] font-bold text-red-500',
  'uppercase tracking-tight ml-1',
)

interface CompleteProfileDialogProps {
  open: boolean
}

export function CompleteProfileDialog({
  open,
}: CompleteProfileDialogProps) {
  const updateProfile = useAuthStore(
    (s) => s.updateProfile,
  )

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CompleteProfileFormData>({
    resolver: zodResolver(completeProfileSchema),
    mode: 'onBlur',
  })

  const onSubmit = (data: CompleteProfileFormData) => {
    updateProfile(data)
  }

  return (
    <Dialog open={open}>
      <DialogContent
        showCloseButton={false}
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className={cn(
            'text-lg font-black text-slate-900',
            'tracking-tight',
          )}>
            Lengkapi Profil Kamu
          </DialogTitle>
          <DialogDescription className={cn(
            'text-xs text-slate-400 font-bold',
            'uppercase tracking-widest',
          )}>
            Isi data berikut untuk melanjutkan
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 pt-2"
        >
          {/* Age */}
          <div className="space-y-2">
            <Label htmlFor="age" className={LABEL_CLS}>
              Umur
            </Label>
            <Input
              id="age"
              type="number"
              placeholder="Contoh: 25"
              className={cn(
                'h-11 rounded-xl border-slate-200',
                'bg-white font-medium',
              )}
              {...register('age', { valueAsNumber: true })}
              aria-invalid={!!errors.age}
            />
            {errors.age && (
              <p className={ERROR_CLS}>
                {errors.age.message}
              </p>
            )}
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <Label className={LABEL_CLS}>
              Jenis Kelamin
            </Label>
            <Controller
              control={control}
              name="gender"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger
                    className={cn(
                      'w-full h-11 rounded-xl',
                      'border-slate-200 bg-white',
                      'font-medium',
                    )}
                  >
                    <SelectValue placeholder="Pilih jenis kelamin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">
                      Laki-laki
                    </SelectItem>
                    <SelectItem value="female">
                      Perempuan
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.gender && (
              <p className={ERROR_CLS}>
                {errors.gender.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address" className={LABEL_CLS}>
              Alamat
            </Label>
            <textarea
              id="address"
              rows={3}
              placeholder="Masukkan alamat lengkap"
              className={cn(
                'w-full rounded-xl border border-slate-200',
                'bg-white px-3 py-2 text-sm font-medium',
                'placeholder:text-muted-foreground',
                'focus-visible:outline-none',
                'focus-visible:ring-[3px]',
                'focus-visible:ring-ring/50',
                'focus-visible:border-ring',
                'resize-none',
              )}
              {...register('address')}
              aria-invalid={!!errors.address}
            />
            {errors.address && (
              <p className={ERROR_CLS}>
                {errors.address.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className={cn(
              'w-full h-12 rounded-xl',
              'bg-slate-950 text-white',
              'font-black text-xs uppercase',
              'tracking-widest',
              'hover:bg-emerald-600 transition-all',
              'shadow-xl shadow-slate-950/10',
              'hover:shadow-emerald-600/20',
            )}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Menyimpan...' : 'Simpan Profil'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
