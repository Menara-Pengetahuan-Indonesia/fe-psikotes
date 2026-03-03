'use client'

import { useAuthStoreHydrated } from '@/store/auth.store'
import {
  UserDashboard,
  AdminDashboard,
  SuperAdminDashboard,
} from '@/features/dashboard'

export default function DashboardPage() {
  const { user, _hasHydrated } = useAuthStoreHydrated()

  if (!_hasHydrated) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    )
  }

  const role = user?.role || 'USER'

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      {role === 'USER' && <UserDashboard />}
      {role === 'ADMIN' && <AdminDashboard />}
      {role === 'SUPERADMIN' && <SuperAdminDashboard />}
    </div>
  )
}
