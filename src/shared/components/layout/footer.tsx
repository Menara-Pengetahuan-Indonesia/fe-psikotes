'use client'

import * as React from 'react'
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
    <footer className="fixed bottom-0 left-0 right-0 h-100 bg-slate-900 overflow-hidden z-0">

      <div className="max-w-7xl mx-auto px-6 relative z-10 h-full flex flex-col justify-center py-10 gap-10">
        {/* Top Section */}
        <div className="grid md:grid-cols-4 gap-8">

          {/* Brand Column */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
               <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300">
                  <Sparkles className="w-5 h-5 text-white fill-white" />
               </div>
               <span className="font-black text-2xl tracking-tight text-white">
                BER<span className="text-emerald-400">MOELA</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Platform pengembangan diri #1 di Indonesia.
            </p>

            {/* Socials */}
            <div className="flex gap-2.5">
              {[
                { Icon: Instagram, href: 'https://instagram.com/bermoela' },
                { Icon: Linkedin, href: 'https://linkedin.com/company/bermoela' },
                { Icon: Twitter, href: 'https://x.com/bermoela' },
                { Icon: Facebook, href: 'https://facebook.com/bermoela' },
              ].map(({ Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-emerald-600 hover:text-white transition-colors border border-slate-700"
                >
                  <Icon className="w-4.5 h-4.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {FOOTER_LINKS.map((section) => (
              <div key={section.title} className="space-y-3">
                <h4 className="font-bold text-white text-sm uppercase tracking-wider">{section.title}</h4>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-slate-400 text-sm hover:text-emerald-400 transition-colors font-medium flex items-center gap-2 group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-emerald-500 transition-colors" />
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
        <div className="pt-5 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-slate-500 text-xs font-medium">
            © {new Date().getFullYear()} Bermoela Indonesia. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 opacity-30 grayscale hover:grayscale-0 transition-all">
                <div className="h-5 w-8 bg-slate-700 rounded" />
                <div className="h-5 w-8 bg-slate-700 rounded" />
             </div>
          </div>
        </div>
      </div>
    </footer>
  )
}