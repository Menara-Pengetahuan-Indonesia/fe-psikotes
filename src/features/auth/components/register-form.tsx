'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useRegister } from '../hooks'
import { registerSchema, type RegisterInput } from '../types'
import Link from 'next/link'

export function RegisterForm() {
  const { mutate, isPending, error } = useRegister()
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  })

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Daftar</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit((data) => mutate(data))} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama</Label>
            <Input id="name" {...register('name')} />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register('email')} />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Kata Sandi</Label>
            <Input id="password" type="password" {...register('password')} />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Konfirmasi Kata Sandi</Label>
            <Input id="confirmPassword" type="password" {...register('confirmPassword')} />
            {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
          </div>
          {error && <p className="text-sm text-red-500">Registrasi gagal. Coba lagi.</p>}
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'Memproses...' : 'Daftar'}
          </Button>
          <p className="text-center text-sm">
            Sudah punya akun? <Link href="/masuk" className="text-blue-600 hover:underline">Masuk</Link>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
