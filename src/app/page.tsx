import Link from 'next/link'
import {
  BrainCircuit,
  HeartHandshake,
  Rocket,
  ChevronRight,
} from 'lucide-react'
import { TypingText } from '@/shared/components/typing-text'

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center bg-background px-6 md:h-screen md:overflow-hidden">
      
      {/* Background Blobs */}
      <div className="absolute -left-4 top-0 h-72 w-72 rounded-full bg-ps-primary opacity-10 blur-3xl"></div>
      <div className="absolute -right-4 top-0 h-72 w-72 rounded-full bg-ks-primary opacity-10 blur-3xl"></div>
      <div className="absolute -bottom-8 left-20 h-72 w-72 rounded-full bg-tr-primary opacity-10 blur-3xl"></div>

      {/* Background Grid */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[24px_24px]"></div>

      {/* Header */}
      <header className="relative z-10 flex w-full max-w-5xl items-center justify-center py-8">
        <div className="flex items-center gap-2 text-2xl font-bold tracking-tighter">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ps-primary text-white">
            <span className="text-xl">P</span>
          </div>
          <span>Psikotest.</span>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 flex w-full max-w-5xl flex-1 flex-col items-center justify-center gap-6 text-center">
        
        {/* Hero */}
        <div className="space-y-3">
          <div className="inline-flex items-center rounded-full border border-ps-primary bg-ps-muted px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-ps-primary">
            Platform Pengembangan Diri #1
          </div>
          <h1 className="text-5xl font-black tracking-tighter sm:text-6xl md:text-7xl">
            Kenali Dirimu, <br />
            <TypingText text="Gali Potensimu." />
          </h1>
          <p className="mx-auto max-w-sm text-base font-medium text-muted-foreground">
            Pilih langkah pertamamu untuk memahami diri dan tumbuh lebih baik hari ini.
          </p>
        </div>

        {/* Cards */}
        <div className="grid w-full max-w-4xl gap-5 sm:grid-cols-3">
          
          {/* Psikotes */}
          <Link href="/psikotes" className="group w-full">
            <div className="h-full overflow-hidden rounded-2xl border-2 border-ps-primary bg-white p-6 transition-all duration-300 hover:scale-105 hover:bg-ps-muted">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ps-primary text-white transition-transform duration-300 group-hover:scale-110">
                  <BrainCircuit className="h-7 w-7" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900">Psikotes Online</h3>
                  <p className="text-sm text-gray-600">Kenali potensi diri & minat bakat melalui tes psikologi terpercaya.</p>
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold text-ps-primary opacity-0 transition-all duration-300 group-hover:opacity-100">
                  Mulai Tes <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </Link>

          {/* Konseling */}
          <Link href="/konseling" className="group w-full">
            <div className="h-full overflow-hidden rounded-2xl border-2 border-ks-primary bg-white p-6 transition-all duration-300 hover:scale-105 hover:bg-ks-muted">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ks-primary text-white transition-transform duration-300 group-hover:scale-110">
                  <HeartHandshake className="h-7 w-7" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900">Konseling</h3>
                  <p className="text-sm text-gray-600">Curhat aman & nyaman bersama psikolog profesional.</p>
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold text-ks-primary opacity-0 transition-all duration-300 group-hover:opacity-100">
                  Mulai Konseling <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </Link>

          {/* Training */}
          <Link href="/training" className="group w-full">
            <div className="h-full overflow-hidden rounded-2xl border-2 border-tr-primary bg-white p-6 transition-all duration-300 hover:scale-105 hover:bg-tr-muted">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-tr-primary text-white transition-transform duration-300 group-hover:scale-110">
                  <Rocket className="h-7 w-7" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900">Training</h3>
                  <p className="text-sm text-gray-600">Webinar & kelas online untuk pengembangan diri.</p>
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold text-tr-primary opacity-0 transition-all duration-300 group-hover:opacity-100">
                  Lihat Program <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </Link>

        </div>
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 py-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40">
        &copy; {new Date().getFullYear()} Psikotest Indonesia
      </footer>
    </div>
  )
}
