import Link from 'next/link'
import { Instagram, Linkedin, Youtube } from 'lucide-react'

const FOOTER_COLS = [
  {
    heading: 'Program',
    links: [
      { label: 'Psikotes Premium', href: '/psikotes/premium' },
      { label: 'Konseling', href: '/konseling' },
      { label: 'Pelatihan', href: '/pelatihan' },
      { label: 'Membership', href: '/psikotes/membership/benefit' },
    ],
  },
  {
    heading: 'Layanan',
    links: [
      { label: 'Psikotes Gratis', href: '/psikotes/gratis' },
      { label: 'Mentoring', href: '/pelatihan' },
      { label: 'Webinar', href: '/pelatihan' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    heading: 'Tentang',
    links: [
      { label: 'Tentang Kami', href: '/' },
      { label: 'Kebijakan Privasi', href: '/' },
      { label: 'Syarat & Ketentuan', href: '/' },
      { label: 'Hubungi Kami', href: '/' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-black tracking-tighter">
              TITIK MULA<span className="text-indigo-400">.</span>
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Platform pengembangan diri terpadu berbasis riset psikologi profesional.
            </p>
          </div>
          {/* Columns */}
          {FOOTER_COLS.map((col) => (
            <div key={col.heading} className="space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-wider">{col.heading}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-slate-400 text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">© 2026 TITIK MULA. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-slate-500 hover:text-white">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-slate-500 hover:text-white">
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-slate-500 hover:text-white">
              <Youtube className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
