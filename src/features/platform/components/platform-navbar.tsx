'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

const NAV_ITEMS = [
  {
    label: 'Psikotes',
    children: [
      { label: 'Perusahaan', href: '/platform/psikotes/perusahaan' },
      { label: 'Mahasiswa & Pelajar', href: '/platform/psikotes/mahasiswa' },
      { label: 'Kesehatan Mental', href: '/platform/psikotes/kesehatan-mental' },
      { label: 'Premium', href: '/platform/psikotes/premium' },
      { label: 'Gratis', href: '/platform/psikotes/gratis' },
    ],
  },
  {
    label: 'Training',
    children: [
      { label: 'Program Training', href: '/training' },
      { label: 'Jadwal Training', href: '/training' },
      { label: 'Mentoring Eksklusif', href: '/training' },
    ],
  },
  {
    label: 'Konseling',
    children: [
      { label: 'Konseling Individu', href: '/konseling' },
      { label: 'Konseling Pasangan', href: '/konseling' },
    ],
  },
  { label: 'Blog', href: '/blog', children: [] },
]

export function PlatformNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <span className="w-7 h-7 bg-slate-900 text-white rounded-lg flex items-center justify-center text-xs font-black">T</span>
            <span className="font-black text-slate-900 text-lg tracking-tighter">TITIK MULA<span className="text-indigo-600">.</span></span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="relative group"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-slate-900 py-2">
                  {item.label}
                  {item.children.length > 0 && <ChevronDown className={`h-3 w-3 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} />}
                </button>
                {item.children.length > 0 && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 pt-1 w-52">
                    <div className="bg-white border border-slate-200 rounded-xl shadow-lg py-2">
                      {item.children.map((child) => (
                        <Link key={child.label} href={child.href} className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900">{child.label}</Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" asChild><Link href="/login">Masuk</Link></Button>
            <Button asChild><Link href="/register">Join Member</Link></Button>
          </div>

          {/* Mobile Toggle */}
          <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-6 py-4 space-y-4">
          {NAV_ITEMS.map((item) => (
            <div key={item.label}>
              <button className="w-full text-left font-semibold text-slate-800" onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}>
                {item.label}
              </button>
              {activeDropdown === item.label && item.children.map((child) => (
                <Link key={child.label} href={child.href} className="block pl-4 py-1 text-sm text-slate-500">{child.label}</Link>
              ))}
            </div>
          ))}
          <div className="flex flex-col gap-2 pt-4 border-t border-slate-100">
            <Button variant="outline" asChild><Link href="/login">Masuk</Link></Button>
            <Button asChild><Link href="/register">Join Member</Link></Button>
          </div>
        </div>
      )}
    </nav>
  )
}
