'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Sparkles,
  Plus,
  Star,
  Circle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  getFooterTheme,
  getFooterLinks,
  getFooterCta,
  SOCIAL_LINKS,
  TOPO_PATTERN_SVG,
} from '@/config/footer'
import { FooterCtaBanner } from './footer-cta-banner'

export function Footer() {
  const pathname = usePathname()
  const theme = getFooterTheme(pathname)
  const links = getFooterLinks(pathname)
  const cta = getFooterCta(pathname)

  const hidden = pathname === '/'
    || pathname === '/masuk'
    || pathname === '/daftar'
    || pathname === '/forgot-password'
  if (hidden) return null

  return (
    <footer
      className={cn(
        'fixed bottom-0 left-0 right-0 z-0',
        'h-100 overflow-hidden',
        theme.bg,
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
          'w-96 h-96 rounded-full blur-[120px]',
          'pointer-events-none',
          theme.glowTop,
        )}
      />
      <div
        className={cn(
          'absolute -bottom-24 -left-24',
          'w-72 h-72 rounded-full blur-[100px]',
          'pointer-events-none',
          theme.glowBottom,
        )}
      />

      {/* Static Ornaments */}
      <Plus
        className={cn(
          'absolute top-12 right-[15%]',
          'w-10 h-10 pointer-events-none',
          theme.ornamentPlus,
        )}
      />
      <Star
        className={cn(
          'absolute bottom-16 left-[10%]',
          'w-8 h-8 pointer-events-none',
          theme.ornamentStar,
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
        <FooterCtaBanner cta={cta} theme={theme} />

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
                  'w-10 h-10 rounded-lg',
                  'flex items-center justify-center',
                  'shadow-lg group-hover:rotate-12',
                  'transition-transform duration-300',
                  theme.logoBg,
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
                <span className={theme.brandAccent}>
                  MOELA
                </span>
              </span>
            </Link>
            <p
              className={cn(
                'text-sm leading-relaxed',
                theme.textMuted,
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
                    'transition-colors',
                    theme.socialIcon,
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
            {links.map((section) => (
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
                          'text-sm font-medium',
                          'flex items-center gap-2 group',
                          'hover:text-white transition-colors',
                          theme.linkText,
                        )}
                      >
                        <span
                          className={cn(
                            'w-1.5 h-1.5 rounded-full',
                            'transition-colors',
                            theme.bullet,
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
          <p className={cn('text-xs font-medium', theme.copyright)}>
            &copy; {new Date().getFullYear()} Bermoela Indonesia.
            All rights reserved.
          </p>
          <p className={cn('text-xs', theme.madeWith)}>
            Dibuat dengan ❤️ di Indonesia
          </p>
        </div>
      </div>
    </footer>
  )
}
