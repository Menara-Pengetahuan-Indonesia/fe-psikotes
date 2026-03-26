'use client'

import {
  Server,
  Database,
  Cpu,
  Wifi,
  HardDrive,
  Activity,
  Shield,
  Clock,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Download,
  Trash2,
  FileText,
  Users,
  BarChart3,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const systemServices = [
  { name: 'API Server', status: 'online' as const, uptime: '99.9%', responseTime: '45ms', icon: Server },
  { name: 'PostgreSQL Database', status: 'online' as const, uptime: '99.8%', responseTime: '12ms', icon: Database },
  { name: 'Redis Cache', status: 'online' as const, uptime: '99.9%', responseTime: '2ms', icon: Cpu },
  { name: 'WebSocket', status: 'online' as const, uptime: '99.7%', responseTime: '8ms', icon: Wifi },
  { name: 'File Storage', status: 'online' as const, uptime: '99.9%', responseTime: '35ms', icon: HardDrive },
]

const recentLogs = [
  { level: 'info' as const, message: 'Backup database berhasil diselesaikan', time: '10 menit lalu' },
  { level: 'info' as const, message: 'User admin@bermoela.com login dari 192.168.1.100', time: '25 menit lalu' },
  { level: 'warning' as const, message: 'Rate limit tercapai untuk IP 103.45.67.89', time: '1 jam lalu' },
  { level: 'info' as const, message: 'Cache Redis di-flush secara otomatis', time: '2 jam lalu' },
  { level: 'warning' as const, message: 'Disk usage mencapai 75%', time: '3 jam lalu' },
  { level: 'info' as const, message: 'SSL certificate renewal berhasil', time: '5 jam lalu' },
  { level: 'error' as const, message: 'Failed login attempt: unknown@email.com (3x)', time: '6 jam lalu' },
  { level: 'info' as const, message: 'Scheduled maintenance completed', time: 'Kemarin' },
]

const logLevelConfig = {
  info: { color: 'bg-teal-100 text-teal-600', dot: 'bg-teal-500' },
  warning: { color: 'bg-amber-100 text-amber-600', dot: 'bg-amber-500' },
  error: { color: 'bg-rose-100 text-rose-600', dot: 'bg-rose-500' },
}

const statusColor = { online: 'bg-teal-500', offline: 'bg-rose-500' }

export default function SuperAdminSystemPage() {
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
              Sistem.
            </h1>
            <p className="text-slate-400 font-medium text-sm">
              Monitoring, logs, dan maintenance platform.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-xl h-11 px-5 font-bold border-white/20 text-white hover:bg-white/10 hover:text-white">
              <Download className="size-4 mr-2" /> Backup
            </Button>
            <Button className="bg-white text-slate-900 hover:bg-rose-50 rounded-xl h-11 px-5 font-black shadow-lg transition-all active:scale-95">
              <RefreshCw className="size-4 mr-2" /> Flush Cache
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-teal-500/30 flex items-center justify-center">
              <Activity className="size-5 text-teal-300" />
            </div>
            <div>
              <p className="text-2xl font-black leading-none">99.8%</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Uptime</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-indigo-500/30 flex items-center justify-center">
              <Users className="size-5 text-indigo-300" />
            </div>
            <div>
              <p className="text-2xl font-black leading-none">42</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Active Now</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-violet-500/30 flex items-center justify-center">
              <HardDrive className="size-5 text-violet-300" />
            </div>
            <div>
              <p className="text-2xl font-black leading-none">75%</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Disk</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-amber-500/30 flex items-center justify-center">
              <AlertTriangle className="size-5 text-amber-300" />
            </div>
            <div>
              <p className="text-2xl font-black leading-none">2</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Warnings</p>
            </div>
          </div>
        </div>

        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
          <Shield className="size-72" />
        </div>
      </div>

      {/* SERVICES + LOGS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: Services */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden h-full">
            <div className="px-7 py-5 border-b border-slate-50 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-teal-100 flex items-center justify-center">
                <Server className="size-5 text-teal-600" />
              </div>
              <div>
                <h2 className="text-base font-black text-slate-900">Services</h2>
                <p className="text-xs text-slate-400 font-medium">{systemServices.length} services aktif</p>
              </div>
            </div>
            <div className="divide-y divide-slate-50">
              {systemServices.map((service) => {
                const Icon = service.icon
                return (
                  <div key={service.name} className="px-7 py-4 flex items-center gap-4">
                    <div className="size-9 rounded-xl bg-teal-100 flex items-center justify-center shrink-0">
                      <Icon className="size-4 text-teal-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-black text-slate-900">{service.name}</p>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-[10px] font-bold text-slate-400">{service.uptime}</span>
                        <span className="text-[10px] font-bold text-slate-400">{service.responseTime}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <div className={cn('size-2 rounded-full animate-pulse', statusColor[service.status])} />
                      <span className="text-[9px] font-black text-teal-600 uppercase tracking-widest">Online</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* RIGHT: Logs */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden h-full">
            <div className="px-7 py-5 border-b border-slate-50 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                <FileText className="size-5 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-base font-black text-slate-900">System Logs</h2>
                <p className="text-xs text-slate-400 font-medium">Log aktivitas sistem terbaru</p>
              </div>
            </div>
            <div className="divide-y divide-slate-50">
              {recentLogs.map((log, i) => {
                const config = logLevelConfig[log.level]
                return (
                  <div key={i} className="px-7 py-3.5 flex items-center gap-4">
                    <div className={cn('size-2 rounded-full shrink-0', config.dot)} />
                    <span className={cn('text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shrink-0', config.color)}>
                      {log.level}
                    </span>
                    <p className="text-sm font-medium text-slate-700 flex-1 min-w-0 truncate">{log.message}</p>
                    <span className="text-[10px] font-medium text-slate-400 shrink-0">{log.time}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-[2rem] border border-slate-100 p-6 group hover:shadow-md transition-all">
          <div className="size-12 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-500 flex items-center justify-center text-white mb-4">
            <Download className="size-5" />
          </div>
          <h3 className="text-base font-black text-slate-900 mb-1">Backup Database</h3>
          <p className="text-xs text-slate-400 font-medium mb-4">Buat backup database secara manual</p>
          <Button variant="outline" className="w-full rounded-xl h-10 font-bold text-xs border-slate-200 hover:bg-teal-50 hover:text-teal-600 hover:border-teal-200">
            Jalankan Backup
          </Button>
        </div>
        <div className="bg-white rounded-[2rem] border border-slate-100 p-6 group hover:shadow-md transition-all">
          <div className="size-12 rounded-2xl bg-gradient-to-br from-indigo-400 to-indigo-500 flex items-center justify-center text-white mb-4">
            <RefreshCw className="size-5" />
          </div>
          <h3 className="text-base font-black text-slate-900 mb-1">Flush Cache</h3>
          <p className="text-xs text-slate-400 font-medium mb-4">Bersihkan cache Redis dan CDN</p>
          <Button variant="outline" className="w-full rounded-xl h-10 font-bold text-xs border-slate-200 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200">
            Flush Sekarang
          </Button>
        </div>
        <div className="bg-white rounded-[2rem] border border-slate-100 p-6 group hover:shadow-md transition-all">
          <div className="size-12 rounded-2xl bg-gradient-to-br from-rose-400 to-rose-500 flex items-center justify-center text-white mb-4">
            <Trash2 className="size-5" />
          </div>
          <h3 className="text-base font-black text-slate-900 mb-1">Cleanup Data</h3>
          <p className="text-xs text-slate-400 font-medium mb-4">Hapus data temporary dan orphaned files</p>
          <Button variant="outline" className="w-full rounded-xl h-10 font-bold text-xs border-slate-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200">
            Jalankan Cleanup
          </Button>
        </div>
      </div>
    </div>
  )
}
