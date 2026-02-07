'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { CompleteProfileDialog } from './complete-profile-dialog'
import { useAuthStore } from '@/store/auth.store'
import { cn } from '@/lib/utils'

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, user } = useAuthStore()

  const needsLogin = !isAuthenticated
  const needsProfile =
    isAuthenticated && !user?.isProfileComplete
  const showBlur = needsLogin || needsProfile

  return (
    <div className="relative">
      <div
        className={cn(
          showBlur && 'pointer-events-none select-none',
          showBlur && 'blur-sm opacity-60',
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
              'text-lg font-black text-slate-900',
              'tracking-tight',
            )}>
              Daftar Dulu, Yuk!
            </DialogTitle>
            <DialogDescription className={cn(
              'text-sm text-slate-500 leading-relaxed',
            )}>
              Kamu harus daftar dulu untuk melihat detail
              tes. Gratis dan cuma butuh beberapa detik.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 pt-2">
            <Button asChild className={cn(
              'w-full h-12 rounded-xl',
              'bg-slate-950 text-white',
              'font-black text-xs uppercase',
              'tracking-widest',
              'hover:bg-emerald-600 transition-all',
              'shadow-xl shadow-slate-950/10',
              'hover:shadow-emerald-600/20',
            )}>
              <Link href="/daftar">
                Daftar Sekarang
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <p className={cn(
              'text-center text-xs font-bold',
              'text-slate-400 uppercase tracking-wide',
            )}>
              Sudah punya akun?{' '}
              <Link
                href="/masuk"
                className={cn(
                  'text-emerald-600',
                  'hover:text-emerald-700',
                  'transition-colors',
                )}
              >
                Masuk
              </Link>
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Profile incomplete dialog */}
      <CompleteProfileDialog open={needsProfile} />
    </div>
  )
}
