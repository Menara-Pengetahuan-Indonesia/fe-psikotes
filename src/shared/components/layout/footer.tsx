'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import {
  getFooterTheme,
  getFooterLinks,
  getFooterCta,
  SOCIAL_LINKS,
} from '@/config/footer'
import { FooterCtaBanner } from './footer-cta-banner'

export function Footer() {
  const pathname = usePathname()
  const theme = getFooterTheme(pathname)
  const links = getFooterLinks(pathname)
  const cta = getFooterCta(pathname)

  const hidden = pathname === '/masuk'
    || pathname === '/daftar'
    || pathname === '/forgot-password'
    || pathname.startsWith('/mahasiswa/try-out/form')
    || pathname.startsWith('/gratis/')
    || pathname.startsWith('/premium/')
    || pathname.startsWith('/tes/')
    || pathname.startsWith('/dashboard')
    || pathname.startsWith('/pengguna')
    || pathname.startsWith('/admin')
    || pathname.startsWith('/superadmin')
  if (hidden) return null

  return (
    <footer
      className={cn(
        'relative',
        'overflow-visible',
        theme.bg,
      )}
    >
      {/* CTA Banner — centered, elevated above footer content */}
      <div className="max-w-4xl mx-auto px-6 pt-0 relative z-20 -mt-20">
        <FooterCtaBanner cta={cta} theme={theme} />
      </div>

      {/* Content */}
      <div
        className={cn(
          'max-w-7xl mx-auto px-6 relative z-10',
          'pt-8 pb-12 gap-6',
        )}
      >

        {/* Brand + Links Grid */}
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2.5 group"
            >
              <Image
                src="/logo/logo_bermoela.png"
                alt="Bermoela"
                width={40}
                height={40}
                className={cn(
                  'w-10 h-10 object-contain',
                  'group-hover:rotate-12',
                  'transition-transform duration-300',
                )}
              />
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
                    'border',
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
                    'font-black text-xs',
                    'uppercase tracking-wider',
                    theme.brandAccent,
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
                          'hover:text-emerald-600 transition-colors',
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
            'pt-4 border-t border-gray-100',
            'flex flex-col sm:flex-row',
            'justify-between items-center gap-2',
          )}
        >
          <p className={cn('text-xs font-medium', theme.copyright)} suppressHydrationWarning>
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
