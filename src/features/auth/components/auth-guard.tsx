'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { useAuthStore } from '@/store/auth.store'
import { cn } from '@/lib/utils'

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated } = useAuthStore()
  const pathname = usePathname()

  const redirectParam = `?redirect=${
    encodeURIComponent(pathname)
  }`
  const needsLogin = !isAuthenticated

  return (
    <div className="relative">
      <div
        className={cn(
          needsLogin && 'pointer-events-none select-none',
          needsLogin && 'blur-sm opacity-60',
          'transition-all duration-300',
        )}
      >
        {children}
      </div>

      {/* Not logged in dialog */}
      <Dialog open={needsLogin}>
        <DialogContent
          showCloseButton={false}
          onPointerDownOutside={(e) =>
            e.preventDefault()
          }
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className={cn(
              'text-lg font-black text-foreground',
              'tracking-tight',
            )}>
              Daftar Dulu, Yuk!
            </DialogTitle>
            <DialogDescription className={cn(
              'text-sm text-muted-foreground leading-relaxed',
            )}>
              Kamu harus daftar dulu untuk melihat detail
              tes. Gratis dan cuma butuh beberapa detik.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 pt-2">
            <Button asChild className={cn(
              'w-full h-12 rounded-xl',
              'bg-secondary text-white',
              'font-black text-xs uppercase',
              'tracking-widest',
              'hover:bg-primary transition-all',
              'shadow-xl shadow-secondary/10',
              'hover:shadow-primary/20',
            )}>
              <Link href={`/daftar${redirectParam}`}>
                Daftar Sekarang
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <p className={cn(
              'text-center text-xs font-bold',
              'text-muted-foreground uppercase tracking-wide',
            )}>
              Sudah punya akun?{' '}
              <Link
                href={`/masuk${redirectParam}`}
                className={cn(
                  'text-primary-600',
                  'hover:text-primary-700',
                  'transition-colors',
                )}
              >
                Masuk
              </Link>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
