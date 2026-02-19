import {
  Plus,
  Hexagon,
  Diamond,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export function HeroBackground() {
  return (
    <>
      {/* Base gradient */}
      <div className={cn(
        "absolute inset-0",
        "bg-linear-to-b from-white via-slate-50/80",
        "to-slate-100"
      )} />

      {/* Dot grid pattern */}
      <div
        className={cn(
          "absolute inset-0 opacity-[0.4]",
          "pointer-events-none"
        )}
        style={{
          backgroundImage:
            'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Topographic line pattern */}
      <div
        className={cn(
          "absolute inset-0 opacity-[0.03]",
          "pointer-events-none mix-blend-multiply"
        )}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 100 C 20 80, 40 120, 60 100 S 100 80, 120 100 S 160 120, 200 100' stroke='%23334155' fill='transparent' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '400px 400px',
        }}
      />

      {/* Ambient glows */}
      <div className={cn(
        "absolute -top-[15%] -left-[10%]",
        "w-150 h-150",
        "bg-primary-200/40 rounded-full blur-[150px]",
        "pointer-events-none"
      )} />
      <div className={cn(
        "absolute top-[10%] -right-[10%]",
        "w-125 h-125",
        "bg-konseling-200/30 rounded-full blur-[150px]",
        "pointer-events-none"
      )} />
      <div className={cn(
        "absolute -bottom-[15%] left-[20%]",
        "w-125 h-125",
        "bg-pelatihan-200/30 rounded-full blur-[150px]",
        "pointer-events-none"
      )} />

      {/* Technical ornaments */}
      <Plus className={cn(
        "absolute top-[12%] left-[8%]",
        "text-primary-400/30 w-8 h-8 animate-pulse"
      )} />
      <Plus className={cn(
        "absolute bottom-[18%] left-[4%]",
        "text-konseling-400/20 w-6 h-6 rotate-45"
      )} />
      <Plus className={cn(
        "absolute top-[35%] right-[6%]",
        "text-pelatihan-400/25 w-10 h-10",
        "animate-spin-slow"
      )} />
      <Hexagon className={cn(
        "absolute top-[18%] right-[22%]",
        "text-slate-300/30 w-28 h-28",
        "-rotate-12 animate-float-medium"
      )} />
      <Diamond className={cn(
        "absolute bottom-[12%] right-[28%]",
        "text-slate-300/30 w-16 h-16",
        "rotate-12 animate-float-slow"
      )} />

      {/* Glass polygon shards */}
      <div className={cn(
        "absolute top-[12%] left-[40%]",
        "w-16 h-16 bg-white/60 backdrop-blur-sm",
        "rounded-tr-[2rem] rounded-bl-[1.5rem]",
        "rotate-25 border border-white/80",
        "shadow-lg pointer-events-none"
      )} />
      <div className={cn(
        "absolute bottom-[18%] right-[12%]",
        "w-12 h-12 bg-white/50 backdrop-blur-sm",
        "rounded-tl-[1.5rem] rounded-br-3xl",
        "-rotate-15 border border-white/70",
        "shadow-md pointer-events-none"
      )} />

      {/* Floating colored spheres */}
      <div className={cn(
        "absolute top-[8%] right-[15%]",
        "w-20 h-20 rounded-full",
        "bg-linear-to-br from-primary-300/20",
        "to-teal-300/10 blur-xl",
        "animate-float-slow pointer-events-none"
      )} />
      <div className={cn(
        "absolute bottom-[25%] left-[8%]",
        "w-24 h-24 rounded-full",
        "bg-linear-to-br from-konseling-300/20",
        "to-violet-300/10 blur-xl",
        "animate-float-medium pointer-events-none"
      )} />
      <div className={cn(
        "absolute bottom-[8%] right-[35%]",
        "w-16 h-16 rounded-full",
        "bg-linear-to-br from-pelatihan-300/20",
        "to-accent-300/10 blur-xl",
        "animate-float-fast pointer-events-none"
      )} />
    </>
  )
}
