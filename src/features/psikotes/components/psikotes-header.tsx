'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { motion, useScroll, useTransform } from 'framer-motion'
import { BrainCircuit, ChevronDown, Menu, Heart, Target, Brain, MessageCircle, GraduationCap, Info } from 'lucide-react'
import { useState } from 'react'

const psikotesItems = [
  { icon: Brain, label: 'Kepribadian', subtitle: 'Kenali karaktermu', href: '/psikotes/kepribadian' },
  { icon: Target, label: 'Minat & Karier', subtitle: 'Temukan passion-mu', href: '/psikotes/karir' },
  { icon: Heart, label: 'Kesehatan Mental', subtitle: 'Cek kondisi mentalmu', href: '/psikotes/mental' },
]

const layananItems = [
  { icon: MessageCircle, label: 'Konseling & Coaching', href: '/konseling' },
  { icon: GraduationCap, label: 'Training & Program', href: '/training' },
]

export function PsikotesHeader() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()
  
  const backgroundColor = useTransform(scrollY, [0, 100], ['rgba(255,255,255,0.8)', 'rgba(255,255,255,0.95)'])
  const isActive = (path: string) => pathname === path || pathname.startsWith(path)

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
      style={{ backgroundColor }}
      className="sticky top-0 z-50 border-b border-gray-200/50 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }} className="flex h-8 w-8 items-center justify-center rounded-lg bg-ps-primary text-white">
            <BrainCircuit className="h-5 w-5" />
          </motion.div>
          <span className="text-lg">Psikotest</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${isActive('/psikotes') ? 'bg-ps-muted text-ps-primary' : 'text-gray-600 hover:bg-gray-100'}`}>
                Psikotes <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64 rounded-2xl p-2">
              {psikotesItems.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link href={item.href} className="flex cursor-pointer items-start gap-3 rounded-xl p-3 hover:bg-ps-muted">
                    <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-ps-muted text-ps-primary"><item.icon className="h-4 w-4" /></div>
                    <div><div className="font-medium text-gray-900">{item.label}</div><div className="text-xs text-gray-500">{item.subtitle}</div></div>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${isActive('/konseling') || isActive('/training') ? 'bg-ps-muted text-ps-primary' : 'text-gray-600 hover:bg-gray-100'}`}>
                Layanan <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56 rounded-2xl p-2">
              {layananItems.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link href={item.href} className="flex cursor-pointer items-center gap-3 rounded-xl p-3 hover:bg-ps-muted">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ps-muted text-ps-primary"><item.icon className="h-4 w-4" /></div>
                    <div className="font-medium text-gray-900">{item.label}</div>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/tentang" className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${isActive('/tentang') ? 'bg-ps-muted text-ps-primary' : 'text-gray-600 hover:bg-gray-100'}`}>Tentang Kami</Link>
        </nav>

        <div className="flex items-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden md:block">
            <Button asChild className="rounded-full bg-ps-primary hover:bg-ps-primary/90"><Link href="/daftar">Mulai Tes</Link></Button>
          </motion.div>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="md:hidden"><Button variant="ghost" size="icon"><Menu className="h-5 w-5" /></Button></SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader><SheetTitle className="flex items-center gap-2"><div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ps-primary text-white"><BrainCircuit className="h-5 w-5" /></div>Psikotest</SheetTitle></SheetHeader>
              <div className="mt-8 space-y-6">
                <div><div className="mb-2 px-2 text-xs font-semibold uppercase text-gray-500">Psikotes</div>
                  {psikotesItems.map((item) => (<Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="flex items-start gap-3 rounded-xl p-3 hover:bg-ps-muted"><div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-ps-muted text-ps-primary"><item.icon className="h-4 w-4" /></div><div><div className="font-medium text-gray-900">{item.label}</div><div className="text-xs text-gray-500">{item.subtitle}</div></div></Link>))}
                </div>
                <div><div className="mb-2 px-2 text-xs font-semibold uppercase text-gray-500">Layanan</div>
                  {layananItems.map((item) => (<Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 rounded-xl p-3 hover:bg-ps-muted"><div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ps-muted text-ps-primary"><item.icon className="h-4 w-4" /></div><div className="font-medium text-gray-900">{item.label}</div></Link>))}
                </div>
                <Link href="/tentang" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 rounded-xl p-3 hover:bg-ps-muted"><div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ps-muted text-ps-primary"><Info className="h-4 w-4" /></div><div className="font-medium text-gray-900">Tentang Kami</div></Link>
                <Button asChild className="w-full rounded-xl bg-ps-primary hover:bg-ps-primary/90"><Link href="/daftar" onClick={() => setMobileOpen(false)}>Mulai Tes</Link></Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}
