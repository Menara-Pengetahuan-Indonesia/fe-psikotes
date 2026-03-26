'use client'

import { useState } from 'react'
import {
  Users,
  Search,
  ChevronRight,
  Shield,
  ShieldCheck,
  ShieldBan,
  UserPlus,
  Mail,
  Calendar,
  Trash2,
  User,
  Crown,
  AlertCircle,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ConfirmDialog } from '@/features/admin/components/Common/ConfirmDialog'

type UserRole = 'USER' | 'ADMIN' | 'SUPERADMIN'
type FilterType = 'all' | 'USER' | 'ADMIN' | 'SUPERADMIN'

interface DummyUser {
  id: string
  name: string
  email: string
  role: UserRole
  status: 'active' | 'blocked'
  registeredAt: string
}

const dummyUsers: DummyUser[] = [
  { id: '1', name: 'Super Admin', email: 'superadmin@example.com', role: 'SUPERADMIN', status: 'active', registeredAt: '2025-12-01T08:00:00Z' },
  { id: '2', name: 'Admin Utama', email: 'admin@example.com', role: 'ADMIN', status: 'active', registeredAt: '2026-01-05T10:00:00Z' },
  { id: '3', name: 'Rina Wati', email: 'rina.wati@email.com', role: 'ADMIN', status: 'active', registeredAt: '2026-01-20T09:00:00Z' },
  { id: '4', name: 'Ahmad Fauzi', email: 'ahmad.fauzi@email.com', role: 'USER', status: 'active', registeredAt: '2026-01-15T08:00:00Z' },
  { id: '5', name: 'Siti Nurhaliza', email: 'siti.nurhaliza@email.com', role: 'USER', status: 'active', registeredAt: '2026-01-20T10:30:00Z' },
  { id: '6', name: 'Budi Santoso', email: 'budi.santoso@email.com', role: 'USER', status: 'active', registeredAt: '2026-02-01T14:00:00Z' },
  { id: '7', name: 'Dewi Lestari', email: 'dewi.lestari@email.com', role: 'USER', status: 'active', registeredAt: '2026-02-10T09:15:00Z' },
  { id: '8', name: 'Rizky Pratama', email: 'rizky.pratama@email.com', role: 'USER', status: 'blocked', registeredAt: '2026-02-14T11:00:00Z' },
  { id: '9', name: 'Maya Putri', email: 'maya.putri@email.com', role: 'USER', status: 'blocked', registeredAt: '2026-03-05T13:20:00Z' },
  { id: '10', name: 'Hendra Wijaya', email: 'hendra.wijaya@email.com', role: 'USER', status: 'active', registeredAt: '2026-03-10T10:00:00Z' },
]

const roleConfig: Record<UserRole, { label: string; badge: string; icon: typeof Shield }> = {
  SUPERADMIN: { label: 'Super Admin', badge: 'bg-rose-50 text-rose-600', icon: Crown },
  ADMIN: { label: 'Admin', badge: 'bg-violet-50 text-violet-600', icon: Shield },
  USER: { label: 'Pengguna', badge: 'bg-indigo-50 text-indigo-600', icon: User },
}

const accentColors = [
  { bg: 'bg-gradient-to-br from-rose-400 to-rose-500', text: 'text-white' },
  { bg: 'bg-gradient-to-br from-indigo-400 to-indigo-500', text: 'text-white' },
  { bg: 'bg-gradient-to-br from-teal-400 to-teal-500', text: 'text-white' },
  { bg: 'bg-gradient-to-br from-violet-400 to-violet-500', text: 'text-white' },
]

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch { return '-' }
}

export default function SuperAdminUsersPage() {
  const [filter, setFilter] = useState<FilterType>('all')
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState<DummyUser[]>(dummyUsers)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [formOpen, setFormOpen] = useState(false)

  // Form state
  const [formName, setFormName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formRole, setFormRole] = useState<UserRole>('USER')
  const [formError, setFormError] = useState('')

  const superadminCount = users.filter((u) => u.role === 'SUPERADMIN').length
  const adminCount = users.filter((u) => u.role === 'ADMIN').length
  const userCount = users.filter((u) => u.role === 'USER').length

  const filtered = users.filter((u) => {
    const matchesFilter = filter === 'all' || u.role === filter
    const matchesSearch = !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const openCreate = () => {
    setFormName('')
    setFormEmail('')
    setFormRole('USER')
    setFormError('')
    setFormOpen(true)
  }

  const handleAddUser = () => {
    if (!formName.trim()) { setFormError('Nama wajib diisi.'); return }
    if (!formEmail.trim()) { setFormError('Email wajib diisi.'); return }
    const newUser: DummyUser = {
      id: String(Date.now()),
      name: formName.trim(),
      email: formEmail.trim(),
      role: formRole,
      status: 'active',
      registeredAt: new Date().toISOString(),
    }
    setUsers((prev) => [newUser, ...prev])
    setFormOpen(false)
  }

  const handleToggleStatus = (id: string) => {
    setUsers((prev) => prev.map((u) => u.id === id ? { ...u, status: u.status === 'active' ? 'blocked' as const : 'active' as const } : u))
  }

  const handleDelete = () => {
    if (!deleteId) return
    setUsers((prev) => prev.filter((u) => u.id !== deleteId))
    setDeleteId(null)
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* HERO BANNER */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-rose-900 p-8 md:p-10 text-white">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-rose-300 font-black text-[10px] uppercase tracking-[0.3em] mb-2">
              Super Admin
            </p>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-1">
              Kelola User.
            </h1>
            <p className="text-slate-400 font-medium text-sm">
              Manage semua akun pengguna, admin, dan super admin.
            </p>
          </div>
          <Button
            size="lg"
            onClick={openCreate}
            className="bg-white text-slate-900 hover:bg-rose-50 rounded-2xl h-14 px-8 font-black text-base shadow-xl transition-all active:scale-95 group shrink-0"
          >
            <UserPlus className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Tambah User
          </Button>
        </div>

        {/* Stats */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-rose-500/30 flex items-center justify-center">
              <Users className="size-5 text-rose-300" />
            </div>
            <div>
              <p className="text-2xl font-black leading-none">{dummyUsers.length}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Total</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-violet-500/30 flex items-center justify-center">
              <Crown className="size-5 text-violet-300" />
            </div>
            <div>
              <p className="text-2xl font-black leading-none">{superadminCount}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Super Admin</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-indigo-500/30 flex items-center justify-center">
              <Shield className="size-5 text-indigo-300" />
            </div>
            <div>
              <p className="text-2xl font-black leading-none">{adminCount}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Admin</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-teal-500/30 flex items-center justify-center">
              <User className="size-5 text-teal-300" />
            </div>
            <div>
              <p className="text-2xl font-black leading-none">{userCount}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Pengguna</p>
            </div>
          </div>
        </div>

        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
          <Users className="size-72" />
        </div>
      </div>

      {/* FILTER + SEARCH */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <div className="flex items-center bg-white rounded-xl border border-slate-100 p-1 gap-1">
          {([
            { key: 'all', label: 'Semua', count: dummyUsers.length },
            { key: 'SUPERADMIN', label: 'Super Admin', count: superadminCount },
            { key: 'ADMIN', label: 'Admin', count: adminCount },
            { key: 'USER', label: 'Pengguna', count: userCount },
          ] as const).map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                'px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap',
                filter === f.key
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
              )}
            >
              {f.label}{' '}
              <span className={cn('ml-1', filter === f.key ? 'text-slate-400' : 'text-slate-300')}>
                {f.count}
              </span>
            </button>
          ))}
        </div>
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <Input
            placeholder="Cari nama atau email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11 h-11 bg-white border-slate-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-rose-500/10"
          />
        </div>
      </div>

      {/* LIST */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-16 text-center flex flex-col items-center">
          <div className="size-16 rounded-2xl bg-rose-50 flex items-center justify-center mb-5">
            <Users className="size-8 text-rose-400" />
          </div>
          <p className="text-slate-900 font-black text-lg mb-1">Tidak ditemukan.</p>
          <p className="text-slate-400 font-medium text-sm">Coba ubah filter atau kata kunci pencarian.</p>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden divide-y divide-slate-50">
          {filtered.map((user, index) => {
            const accent = accentColors[index % accentColors.length]
            const role = roleConfig[user.role]
            const RoleIcon = role.icon
            const isActive = user.status === 'active'

            return (
              <div
                key={user.id}
                className="group flex items-center gap-5 px-6 md:px-8 py-5 hover:bg-slate-50/50 transition-all"
              >
                {/* Avatar */}
                <div className={cn('size-12 rounded-2xl flex items-center justify-center shrink-0 transition-all group-hover:scale-105 group-hover:shadow-md', accent.bg, accent.text)}>
                  <RoleIcon className="size-5" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-0.5">
                    <h3 className="text-base font-black text-slate-900 truncate">{user.name}</h3>
                    <span className={cn('text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shrink-0', role.badge)}>
                      {role.label}
                    </span>
                    <span className={cn(
                      'text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shrink-0',
                      isActive ? 'bg-teal-50 text-teal-600' : 'bg-rose-50 text-rose-600'
                    )}>
                      {isActive ? 'Aktif' : 'Diblokir'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-slate-400 font-medium">
                    <Mail className="size-3.5" />
                    <span className="truncate">{user.email}</span>
                  </div>
                </div>

                {/* Date */}
                <div className="hidden lg:flex items-center gap-1.5 text-xs font-medium text-slate-400 shrink-0">
                  <Calendar className="size-3.5" />
                  <span>{formatDate(user.registeredAt)}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleToggleStatus(user.id) }}
                    className={cn(
                      'size-9 rounded-xl bg-white border border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all',
                      isActive
                        ? 'text-rose-400 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-500'
                        : 'text-teal-400 hover:bg-teal-50 hover:border-teal-200 hover:text-teal-500'
                    )}
                    title={isActive ? 'Blokir' : 'Aktifkan'}
                  >
                    {isActive ? <ShieldBan className="size-4" /> : <ShieldCheck className="size-4" />}
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setDeleteId(user.id) }}
                    className="size-9 rounded-xl bg-white text-rose-400 border border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-50 hover:border-rose-200 hover:text-rose-500"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteId}
        title="Hapus User"
        description="Apakah Anda yakin ingin menghapus user ini? Semua data terkait akan ikut terhapus. Tindakan ini tidak dapat dibatalkan."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />

      {/* ADD USER DIALOG */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="max-w-[420px] p-0 border-0 rounded-2xl overflow-hidden bg-white shadow-2xl">
          <div className="px-6 pt-6 pb-3">
            <div className="flex items-center gap-3 mb-2">
              <div className="size-9 rounded-xl bg-rose-500 text-white flex items-center justify-center">
                <UserPlus className="size-4" />
              </div>
              <div>
                <DialogTitle className="text-base font-black text-slate-900">Tambah User</DialogTitle>
                <DialogDescription className="text-xs text-slate-400 font-medium">Buat akun pengguna baru.</DialogDescription>
              </div>
            </div>
          </div>
          <div className="px-6 pb-6 space-y-4">
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nama Lengkap</Label>
                <Input
                  placeholder="Misal: Ahmad Fauzi"
                  value={formName}
                  onChange={(e) => { setFormName(e.target.value); setFormError('') }}
                  className="h-10 rounded-xl bg-slate-50 border-slate-200 px-4 font-bold text-sm focus:bg-white focus:ring-2 focus:ring-rose-500/10"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email</Label>
                <Input
                  type="email"
                  placeholder="email@example.com"
                  value={formEmail}
                  onChange={(e) => { setFormEmail(e.target.value); setFormError('') }}
                  className="h-10 rounded-xl bg-slate-50 border-slate-200 px-4 font-bold text-sm focus:bg-white focus:ring-2 focus:ring-rose-500/10"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Role</Label>
                <div className="flex gap-2">
                  {(['USER', 'ADMIN', 'SUPERADMIN'] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => setFormRole(r)}
                      className={cn(
                        'flex-1 h-10 rounded-xl text-xs font-black uppercase tracking-wider transition-all border',
                        formRole === r
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'
                      )}
                    >
                      {roleConfig[r].label}
                    </button>
                  ))}
                </div>
              </div>
              {formError && (
                <p className="text-rose-500 text-[10px] font-bold flex items-center gap-1">
                  <AlertCircle className="size-3" />{formError}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 pt-2">
              <Button
                onClick={handleAddUser}
                className="flex-1 h-11 rounded-xl bg-slate-900 hover:bg-slate-800 font-black text-sm shadow-md transition-all active:scale-95"
              >
                Tambah
              </Button>
              <Button type="button" variant="ghost" className="h-11 rounded-xl px-4 font-bold text-slate-400 text-sm" onClick={() => setFormOpen(false)}>
                Batal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
