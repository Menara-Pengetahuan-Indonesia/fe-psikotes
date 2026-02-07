'use client'

import {
  User,
  Mail,
  Shield,
  MapPin,
  Crown,
} from 'lucide-react'

import { useAuthStore } from '@/store/auth.store'
import { cn } from '@/lib/utils'

const ROLE_LABELS: Record<string, string> = {
  user: 'Pengguna',
  company: 'Perusahaan',
  admin: 'Administrator',
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
    {
      icon: MapPin,
      label: 'Alamat',
      value: user?.address || 'Belum diisi',
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

      {/* Profile info */}
      <div
        className={cn(
          'rounded-xl bg-white border',
          'border-slate-100 shadow-sm p-6',
          'space-y-1'
        )}
      >
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          Informasi Akun
        </h2>
        <div className="divide-y divide-slate-100">
          {infoItems.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.label}
                className={cn(
                  'flex items-center gap-4 py-4'
                )}
              >
                <div
                  className={cn(
                    'flex h-10 w-10 items-center',
                    'justify-center rounded-lg',
                    'bg-slate-50'
                  )}
                >
                  <Icon className="h-5 w-5 text-slate-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">
                    {item.label}
                  </p>
                  <p
                    className={cn(
                      'text-sm font-medium',
                      'text-slate-800'
                    )}
                  >
                    {item.value}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Membership */}
      <div
        className={cn(
          'rounded-xl bg-white border',
          'border-slate-100 shadow-sm p-6'
        )}
      >
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          Status Membership
        </h2>
        <div
          className={cn(
            'rounded-lg bg-gradient-to-r',
            'from-purple-50 to-indigo-50',
            'p-5 flex items-center gap-4'
          )}
        >
          <div
            className={cn(
              'flex h-12 w-12 items-center',
              'justify-center rounded-xl',
              'bg-purple-100'
            )}
          >
            <Crown className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="font-semibold text-slate-800">
              Paid Member
            </p>
            <p className="text-sm text-slate-500">
              Akses penuh ke semua tes premium & laporan detail.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
