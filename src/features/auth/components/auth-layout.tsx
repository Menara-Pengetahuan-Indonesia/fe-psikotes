import Image from 'next/image'
import Link from 'next/link'

interface AuthLayoutProps {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative min-h-dvh w-full flex flex-col items-center justify-center overflow-hidden bg-primary-50 px-4 py-12">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-200/40 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent-100/30 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-[440px] space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <Link href="/" className="flex items-center group">
            <Image
              src="/logo/logo_bermoela.png"
              alt="Bermoela"
              width={240}
              height={60}
              priority
              className="h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
        </div>

        {/* Card */}
        <div className="w-full bg-white/80 backdrop-blur-2xl border border-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] rounded-[2.5rem] p-8 md:p-10">
          {children}
        </div>

        {/* Footer */}
        <div className="text-center">
          <p
            className="text-[10px] font-medium text-slate-400 tracking-[0.1em]"
            suppressHydrationWarning
          >
            &copy; {new Date().getFullYear()} bermoela
          </p>
        </div>
      </div>
    </div>
  )
}
