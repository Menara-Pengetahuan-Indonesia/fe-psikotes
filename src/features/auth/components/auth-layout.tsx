'use client'

import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AuthLayoutProps {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative min-h-dvh w-full flex items-center justify-center overflow-hidden bg-primary-50 px-4 py-12">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-200/50 blur-[80px] rounded-full animate-float-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent-100/60 blur-[80px] rounded-full animate-float-medium" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-secondary-100/40 blur-[100px] rounded-full animate-float-fast" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.4]"
          style={{ 
            backgroundImage: `radial-gradient(circle at 1px 1px, #14B8A6 1px, transparent 0)`, /* primary-500 */
            backgroundSize: '40px 40px' 
          }}
        />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[480px]">
        {/* Card */}
        <div className="relative bg-white/80 backdrop-blur-2xl border border-primary-100/50 rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-primary-900/5">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="group flex items-center gap-2.5">
              <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:scale-105 transition-transform duration-300">
                <Sparkles className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-xl font-bold text-secondary-900 tracking-tight">
                Bermoela
              </span>
            </div>
          </div>

          {children}
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-secondary-900/40">
          &copy; {new Date().getFullYear()} Bermoela. Seluruh hak cipta dilindungi.
        </p>
      </div>
    </div>
  )
}
