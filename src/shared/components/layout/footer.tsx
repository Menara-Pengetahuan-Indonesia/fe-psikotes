'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sparkles, Instagram, Linkedin, Twitter, Facebook } from 'lucide-react'

const FOOTER_LINKS = [
  {
    title: 'Layanan',
    links: [
      { label: 'Psikotes Online', href: '/psikotes' },
      { label: 'Konseling & Mentoring', href: '/konseling' },
      { label: 'Pelatihan Skill', href: '/pelatihan' },
      { label: 'Untuk Perusahaan', href: '/perusahaan' },
    ],
  },
  {
    title: 'Tentang Kami',
    links: [
      { label: 'Filosofi', href: '/about' },
      { label: 'Karir', href: '/careers' },
      { label: 'Blog', href: '/blog' },
      { label: 'Hubungi Kami', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Syarat & Ketentuan', href: '/terms' },
      { label: 'Kebijakan Privasi', href: '/privacy' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
]

export function Footer() {
  const pathname = usePathname()

  // Hide Footer on Homepage
  if (pathname === '/') return null

  return (
    <footer className="relative bg-white pt-20 pb-10 overflow-hidden border-t border-slate-100">
      
      {/* --- DECORATIVE BLUR --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-20 bg-gradient-to-b from-slate-50 to-transparent opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
               <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300">
                  <Sparkles className="w-4 h-4 text-white fill-white" />
               </div>
               <span className="font-black text-xl tracking-tight text-slate-900">
                TITIK<span className="text-emerald-500">MULA</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed">
              Platform pengembangan diri #1 di Indonesia. Temukan potensi, raih mimpi, dan tumbuh bahagia bersama kami.
            </p>
            
            {/* Socials */}
            <div className="flex gap-4">
              {[Instagram, Linkedin, Twitter, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {FOOTER_LINKS.map((section) => (
              <div key={section.title} className="space-y-4">
                <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link 
                        href={link.href} 
                        className="text-slate-500 text-sm hover:text-emerald-600 transition-colors font-medium flex items-center gap-2 group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-emerald-400 transition-colors" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-xs font-medium">
            © {new Date().getFullYear()} Titik Mula Indonesia. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2 opacity-50 grayscale hover:grayscale-0 transition-all">
                <div className="h-6 w-8 bg-slate-200 rounded" />
                <div className="h-6 w-8 bg-slate-200 rounded" />
                <div className="h-6 w-8 bg-slate-200 rounded" />
             </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
