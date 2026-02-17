'use client'

import {
  User,
  Mail,
  Shield,
  Crown,
} from 'lucide-react'

import {
  Avatar,
  AvatarFallback,
} from '@/components/ui/avatar'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useAuthStore } from '@/store/auth.store'
import { cn } from '@/lib/utils'

const ROLE_LABELS: Record<string, string> = {
  user: 'Pengguna',
  company: 'Perusahaan',
  admin: 'Administrator',
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function UserProfile() {
  const user = useAuthStore((s) => s.user)

  const infoItems = [
    {
      icon: User,
      label: 'Nama Lengkap',
      value: user?.name || '-',
    },
    {
      icon: Mail,
      label: 'Email',
      value: user?.email || '-',
    },
    {
      icon: Shield,
      label: 'Role',
      value: user?.role
        ? ROLE_LABELS[user.role] || user.role
        : '-',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Profil Saya
        </h1>
        <p className="text-slate-500 mt-1">
          Informasi akun dan membership Anda.
        </p>
      </div>

      {/* Avatar section */}
      <div className="flex items-center gap-4">
        <Avatar className="size-16">
          <AvatarFallback className="bg-blue-600 text-white text-xl font-bold">
            {user?.name
              ? getInitials(user.name)
              : 'U'}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            {user?.name || 'Pengguna'}
          </h2>
          <p className="text-sm text-slate-500">
            {user?.email || '-'}
          </p>
        </div>
      </div>

      {/* Profile info */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="text-slate-800">
            Informasi Akun
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-gray-100">
            {infoItems.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-4 py-4"
                >
                  <div
                    className={cn(
                      'flex size-10 items-center',
                      'justify-center rounded-lg',
                      'bg-slate-100',
                    )}
                  >
                    <Icon className="size-5 text-slate-500" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">
                      {item.label}
                    </p>
                    <p className="text-sm font-medium text-slate-700">
                      {item.value}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Membership */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="text-slate-800">
            Status Membership
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={cn(
              'rounded-lg bg-gradient-to-r',
              'from-violet-50 to-blue-50',
              'p-5 flex items-center gap-4',
            )}
          >
            <div
              className={cn(
                'flex size-12 items-center',
                'justify-center rounded-xl',
                'bg-violet-100',
              )}
            >
              <Crown className="size-6 text-violet-600" />
            </div>
            <div>
              <p className="font-semibold text-slate-800">
                Paid Member
              </p>
              <p className="text-sm text-slate-500">
                Akses penuh ke semua tes premium &
                laporan detail.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
