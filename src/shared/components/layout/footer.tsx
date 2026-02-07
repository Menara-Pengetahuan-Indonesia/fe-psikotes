'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Sparkles,
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  Plus,
  Star,
  Circle,
  ArrowRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'

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

const SOCIAL_LINKS = [
  { Icon: Instagram, href: 'https://instagram.com/bermoela' },
  { Icon: Linkedin, href: 'https://linkedin.com/company/bermoela' },
  { Icon: Twitter, href: 'https://x.com/bermoela' },
  { Icon: Facebook, href: 'https://facebook.com/bermoela' },
]

const TOPO_PATTERN_SVG =
  'url("data:image/svg+xml,'
  + '%3Csvg width=\'200\''
  + ' height=\'200\''
  + ' viewBox=\'0 0 200 200\''
  + ' xmlns=\'http://www.w3.org/'
  + '2000/svg\'%3E%3Cpath'
  + ' d=\'M0 100 C 20 80, 40 120,'
  + ' 60 100 S 100 80, 120 100'
  + ' S 160 120, 200 100\''
  + ' stroke=\'white\''
  + ' fill=\'transparent\''
  + ' stroke-width=\'1\'/%3E'
  + '%3C/svg%3E")'

export function Footer() {
  const pathname = usePathname()

  if (pathname === '/') return null

  return (
    <footer
      className={cn(
        'fixed bottom-0 left-0 right-0 z-0',
        'h-100 bg-emerald-950 overflow-hidden',
      )}
    >
      {/* Topographic Pattern Overlay */}
      <div
        className={cn(
          'absolute inset-0 opacity-[0.04]',
          'pointer-events-none mix-blend-overlay',
        )}
        style={{
          backgroundImage: TOPO_PATTERN_SVG,
          backgroundSize: '400px 400px',
        }}
      />

      {/* Ambient Glows */}
      <div
        className={cn(
          'absolute -top-32 -right-32',
          'w-96 h-96 rounded-full',
          'bg-emerald-800/30 blur-[120px]',
          'pointer-events-none',
        )}
      />
      <div
        className={cn(
          'absolute -bottom-24 -left-24',
          'w-72 h-72 rounded-full',
          'bg-amber-500/10 blur-[100px]',
          'pointer-events-none',
        )}
      />

      {/* Static Ornaments */}
      <Plus
        className={cn(
          'absolute top-12 right-[15%]',
          'text-emerald-400/10 w-10 h-10',
          'pointer-events-none',
        )}
      />
      <Star
        className={cn(
          'absolute bottom-16 left-[10%]',
          'text-amber-400/10 w-8 h-8',
          'pointer-events-none',
        )}
      />
      <Circle
        className={cn(
          'absolute top-16 left-[8%]',
          'text-white/5 w-14 h-14',
          'pointer-events-none',
        )}
      />

      {/* Content */}
      <div
        className={cn(
          'max-w-7xl mx-auto px-6 relative z-10',
          'h-full flex flex-col justify-center',
          'py-8 gap-6',
        )}
      >
        {/* CTA Banner */}
        <div
          className={cn(
            'rounded-2xl md:rounded-3xl p-6 md:p-8',
            'bg-white/5 backdrop-blur-sm',
            'border border-white/10',
            'flex flex-col sm:flex-row items-center',
            'justify-between gap-4',
          )}
        >
          <div>
            <h3
              className={cn(
                'text-lg md:text-xl font-bold',
                'text-white',
              )}
            >
              Siap Mengenali Potensimu?
            </h3>
            <p className="text-emerald-200/60 text-sm mt-1">
              Mulai perjalanan pengembangan dirimu sekarang
            </p>
          </div>
          <Link
            href="/psikotes"
            className={cn(
              'inline-flex items-center gap-2',
              'px-6 py-3 rounded-full',
              'bg-amber-500 hover:bg-amber-400',
              'text-emerald-950 font-bold text-sm',
              'transition-colors shrink-0',
            )}
          >
            Mulai Sekarang
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Brand + Links Grid */}
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2.5 group"
            >
              <div
                className={cn(
                  'w-10 h-10 bg-emerald-500 rounded-lg',
                  'flex items-center justify-center',
                  'shadow-lg group-hover:rotate-12',
                  'transition-transform duration-300',
                )}
              >
                <Sparkles
                  className="w-5 h-5 text-white fill-white"
                />
              </div>
              <span
                className={cn(
                  'font-black text-2xl tracking-tight',
                  'text-white',
                )}
              >
                BER
                <span className="text-emerald-400">MOELA</span>
              </span>
            </Link>
            <p
              className={cn(
                'text-emerald-200/60 text-sm',
                'leading-relaxed',
              )}
            >
              Platform pengembangan diri #1 di Indonesia.
            </p>

            {/* Social Icons */}
            <div className="flex gap-2.5">
              {SOCIAL_LINKS.map(({ Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'w-9 h-9 rounded-full',
                    'bg-white/10 border border-white/10',
                    'flex items-center justify-center',
                    'text-emerald-200/60',
                    'hover:bg-emerald-500 hover:text-white',
                    'hover:border-emerald-500',
                    'transition-colors',
                  )}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          <div
            className={cn(
              'md:col-span-3',
              'grid grid-cols-2 sm:grid-cols-3 gap-8',
            )}
          >
            {FOOTER_LINKS.map((section) => (
              <div key={section.title} className="space-y-3">
                <h4
                  className={cn(
                    'font-black text-white text-xs',
                    'uppercase tracking-wider',
                  )}
                >
                  {section.title}
                </h4>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className={cn(
                          'text-emerald-200/70 text-sm',
                          'hover:text-white transition-colors',
                          'font-medium flex items-center',
                          'gap-2 group',
                        )}
                      >
                        <span
                          className={cn(
                            'w-1.5 h-1.5 rounded-full',
                            'bg-emerald-700',
                            'group-hover:bg-amber-400',
                            'transition-colors',
                          )}
                        />
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
        <div
          className={cn(
            'pt-4 border-t border-white/10',
            'flex flex-col sm:flex-row',
            'justify-between items-center gap-2',
          )}
        >
          <p className="text-emerald-200/40 text-xs font-medium">
            &copy; {new Date().getFullYear()} Bermoela Indonesia.
            All rights reserved.
          </p>
          <p className="text-emerald-200/30 text-xs">
            Dibuat dengan ❤️ di Indonesia
          </p>
        </div>
      </div>
    </footer>
  )
}
