'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useLogin } from '../hooks'
import { loginSchema, type LoginInput } from '../types'
import Link from 'next/link'

export function LoginForm() {
  const { mutate, isPending, error } = useLogin()
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit((data) => mutate(data))} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register('email')} />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register('password')} />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>
          {error && <p className="text-sm text-red-500">Login gagal. Periksa email dan password.</p>}
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'Loading...' : 'Login'}
          </Button>
          <p className="text-center text-sm">
            Belum punya akun? <Link href="/register" className="text-blue-600 hover:underline">Daftar</Link>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
