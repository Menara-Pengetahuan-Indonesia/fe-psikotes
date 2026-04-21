'use client'

import { useState } from 'react'
import {
  Users,
  Search,
  Shield,
  UserPlus,
  Mail,
  Phone,
  Calendar,
  Trash2,
  Pencil,
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
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { ConfirmDialog } from '@/features/admin/components/Common/ConfirmDialog'
import { useUsers, useCreateUser, useUpdateUser, useDeleteUser } from '@/features/admin/hooks'
import type { User as UserType } from '@/features/admin/services'

type UserRole = 'USER' | 'ADMIN' | 'SUPERADMIN'
type FilterType = 'all' | UserRole

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
  const { data: users, isLoading } = useUsers()
  const createUser = useCreateUser()
  const updateUser = useUpdateUser()
  const deleteUser = useDeleteUser()

  const [filter, setFilter] = useState<FilterType>('all')
  const [search, setSearch] = useState('')
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<UserType | null>(null)

  const [formFirstName, setFormFirstName] = useState('')
  const [formLastName, setFormLastName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formTelephone, setFormTelephone] = useState('')
  const [formPassword, setFormPassword] = useState('')
  const [formRole, setFormRole] = useState<UserRole>('USER')
  const [formError, setFormError] = useState('')

  const allUsers = users ?? []
  const superadminCount = allUsers.filter(u => u.role === 'SUPERADMIN').length
  const adminCount = allUsers.filter(u => u.role === 'ADMIN').length
  const userCount = allUsers.filter(u => u.role === 'USER').length

  const filtered = allUsers.filter(u => {
    const matchesFilter = filter === 'all' || u.role === filter
    const fullName = `${u.firstName} ${u.lastName}`.toLowerCase()
    const matchesSearch = !search || fullName.includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const openCreate = () => {
    setEditingUser(null)
    setFormFirstName('')
    setFormLastName('')
    setFormEmail('')
    setFormTelephone('')
    setFormPassword('')
    setFormRole('USER')
    setFormError('')
    setFormOpen(true)
  }

  const openEdit = (user: UserType) => {
    setEditingUser(user)
    setFormFirstName(user.firstName)
    setFormLastName(user.lastName)
    setFormEmail(user.email)
    setFormTelephone(user.telephone ?? '')
    setFormPassword('')
    setFormRole(user.role)
    setFormError('')
    setFormOpen(true)
  }

  const handleSubmit = async () => {
    if (!formFirstName.trim()) { setFormError('Nama depan wajib diisi.'); return }
    if (!formEmail.trim()) { setFormError('Email wajib diisi.'); return }

    try {
      if (editingUser) {
        await updateUser.mutateAsync({
          id: editingUser.id,
          dto: {
            firstName: formFirstName.trim(),
            lastName: formLastName.trim(),
            email: formEmail.trim(),
            telephone: formTelephone.trim() || undefined,
            ...(formPassword ? { password: formPassword } : {}),
            role: formRole,
          },
        })
      } else {
        if (!formPassword) { setFormError('Password wajib diisi.'); return }
        await createUser.mutateAsync({
          firstName: formFirstName.trim(),
          lastName: formLastName.trim(),
          email: formEmail.trim(),
          telephone: formTelephone.trim() || undefined,
          password: formPassword,
          role: formRole,
        })
      }
      setFormOpen(false)
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string | string[] } } })?.response?.data?.message
      setFormError(Array.isArray(msg) ? msg[0] : msg || 'Terjadi kesalahan.')
    }
  }

  const handleDelete = () => {
    if (!deleteId) return
    deleteUser.mutate(deleteId, { onSuccess: () => setDeleteId(null) })
  }

  const isPending = createUser.isPending || updateUser.isPending

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* HERO BANNER */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-rose-900 p-8 md:p-10 text-white">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-rose-300 font-black text-[10px] uppercase tracking-[0.3em] mb-2">User Management</p>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-1">Kelola User.</h1>
            <p className="text-slate-400 font-medium text-sm">Manage semua akun pengguna, admin, dan super admin.</p>
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

        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { count: allUsers.length, label: 'Total', icon: Users, color: 'bg-rose-500/30', iconColor: 'text-rose-300' },
            { count: superadminCount, label: 'Super Admin', icon: Crown, color: 'bg-violet-500/30', iconColor: 'text-violet-300' },
            { count: adminCount, label: 'Admin', icon: Shield, color: 'bg-indigo-500/30', iconColor: 'text-indigo-300' },
            { count: userCount, label: 'Pengguna', icon: User, color: 'bg-teal-500/30', iconColor: 'text-teal-300' },
          ].map(s => {
            const Icon = s.icon
            return (
              <div key={s.label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
                <div className={cn('size-10 rounded-xl flex items-center justify-center', s.color)}>
                  <Icon className={cn('size-5', s.iconColor)} />
                </div>
                <div>
                  {isLoading ? (
                    <Skeleton className="h-7 w-8 bg-white/20 rounded-lg" />
                  ) : (
                    <p className="text-2xl font-black leading-none">{s.count}</p>
                  )}
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{s.label}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
          <Users className="size-72" />
        </div>
      </div>

      {/* FILTER + SEARCH */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <div className="flex items-center bg-white rounded-xl border border-slate-100 p-1 gap-1">
          {([
            { key: 'all' as const, label: 'Semua', count: allUsers.length },
            { key: 'SUPERADMIN' as const, label: 'Super Admin', count: superadminCount },
            { key: 'ADMIN' as const, label: 'Admin', count: adminCount },
            { key: 'USER' as const, label: 'Pengguna', count: userCount },
          ]).map(f => (
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
                {isLoading ? '…' : f.count}
              </span>
            </button>
          ))}
        </div>
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <Input
            placeholder="Cari nama atau email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-11 h-11 bg-white border-slate-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-rose-500/10"
          />
        </div>
      </div>

      {/* LIST */}
      {isLoading ? (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden divide-y divide-slate-50">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-5 px-8 py-5">
              <Skeleton className="size-12 rounded-2xl" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-56" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
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

            return (
              <div
                key={user.id}
                className="group flex items-center gap-5 px-6 md:px-8 py-5 hover:bg-slate-50/50 transition-all"
              >
                <div className={cn('size-12 rounded-2xl flex items-center justify-center shrink-0 transition-all group-hover:scale-105 group-hover:shadow-md', accent.bg, accent.text)}>
                  <span className="text-sm font-black">{user.firstName?.[0]}{user.lastName?.[0]}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-0.5">
                    <h3 className="text-base font-black text-slate-900 truncate">{user.firstName} {user.lastName}</h3>
                    <span className={cn('text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shrink-0', role.badge)}>
                      {role.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-400 font-medium">
                    <span className="flex items-center gap-1.5 truncate">
                      <Mail className="size-3.5" />
                      {user.email}
                    </span>
                    {user.telephone && (
                      <span className="hidden md:flex items-center gap-1.5">
                        <Phone className="size-3.5" />
                        {user.telephone}
                      </span>
                    )}
                  </div>
                </div>

                <div className="hidden lg:flex items-center gap-1.5 text-xs font-medium text-slate-400 shrink-0">
                  <Calendar className="size-3.5" />
                  <span>{formatDate(user.createdAt)}</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => openEdit(user)}
                    className="size-9 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-500"
                    title="Edit"
                  >
                    <Pencil className="size-4" />
                  </button>
                  <button
                    onClick={() => setDeleteId(user.id)}
                    className="size-9 rounded-xl bg-white text-rose-400 border border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-50 hover:border-rose-200 hover:text-rose-500"
                    title="Hapus"
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
        description="Apakah Anda yakin ingin menghapus user ini? Tindakan ini tidak dapat dibatalkan."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        isPending={deleteUser.isPending}
      />

      {/* ADD / EDIT USER DIALOG */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="max-w-[440px] p-0 border-0 rounded-2xl overflow-hidden bg-white shadow-2xl">
          <div className="px-6 pt-6 pb-3">
            <div className="flex items-center gap-3 mb-2">
              <div className="size-9 rounded-xl bg-rose-500 text-white flex items-center justify-center">
                {editingUser ? <Pencil className="size-4" /> : <UserPlus className="size-4" />}
              </div>
              <div>
                <DialogTitle className="text-base font-black text-slate-900">
                  {editingUser ? 'Edit User' : 'Tambah User'}
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-400 font-medium">
                  {editingUser ? 'Perbarui informasi user.' : 'Buat akun pengguna baru.'}
                </DialogDescription>
              </div>
            </div>
          </div>
          <div className="px-6 pb-6 space-y-4">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nama Depan</Label>
                  <Input
                    placeholder="John"
                    value={formFirstName}
                    onChange={e => { setFormFirstName(e.target.value); setFormError('') }}
                    className="h-10 rounded-xl bg-slate-50 border-slate-200 px-4 font-bold text-sm focus:bg-white focus:ring-2 focus:ring-rose-500/10"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nama Belakang</Label>
                  <Input
                    placeholder="Doe"
                    value={formLastName}
                    onChange={e => { setFormLastName(e.target.value); setFormError('') }}
                    className="h-10 rounded-xl bg-slate-50 border-slate-200 px-4 font-bold text-sm focus:bg-white focus:ring-2 focus:ring-rose-500/10"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email</Label>
                <Input
                  type="email"
                  placeholder="email@example.com"
                  value={formEmail}
                  onChange={e => { setFormEmail(e.target.value); setFormError('') }}
                  className="h-10 rounded-xl bg-slate-50 border-slate-200 px-4 font-bold text-sm focus:bg-white focus:ring-2 focus:ring-rose-500/10"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Telepon</Label>
                <Input
                  placeholder="081234567890"
                  value={formTelephone}
                  onChange={e => { setFormTelephone(e.target.value); setFormError('') }}
                  className="h-10 rounded-xl bg-slate-50 border-slate-200 px-4 font-bold text-sm focus:bg-white focus:ring-2 focus:ring-rose-500/10"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Password {editingUser && <span className="normal-case text-slate-300">(kosongkan jika tidak diubah)</span>}
                </Label>
                <Input
                  type="password"
                  placeholder={editingUser ? '••••••••' : 'Min. 6 karakter, 1 huruf besar, 1 simbol'}
                  value={formPassword}
                  onChange={e => { setFormPassword(e.target.value); setFormError('') }}
                  className="h-10 rounded-xl bg-slate-50 border-slate-200 px-4 font-bold text-sm focus:bg-white focus:ring-2 focus:ring-rose-500/10"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Role</Label>
                <div className="flex gap-2">
                  {(['USER', 'ADMIN', 'SUPERADMIN'] as const).map(r => (
                    <button
                      key={r}
                      type="button"
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
                onClick={handleSubmit}
                disabled={isPending}
                className="flex-1 h-11 rounded-xl bg-slate-900 hover:bg-slate-800 font-black text-sm shadow-md transition-all active:scale-95"
              >
                {isPending ? 'Menyimpan...' : editingUser ? 'Simpan' : 'Tambah'}
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
