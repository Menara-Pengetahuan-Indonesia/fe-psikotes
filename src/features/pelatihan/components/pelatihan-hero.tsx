import { GraduationCap, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function PelatihanHero() {
  return (
    <header className="pt-20 pb-16 px-6 bg-linear-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto space-y-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-8 group"
        >
          <ArrowRight className="w-4 h-4 group-hover:-translate-x-1 transition-transform rotate-180" />
          Kembali ke Beranda
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-gray-900" />
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tighter leading-none">
              LIFESKILLS<br />
              PROGRAM<span className="text-gray-400">.</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
              Tingkatkan skill dan potensi diri melalui kelas dan webinar eksklusif yang dirancang oleh para ahli.
            </p>
            <Link
              href="#programs"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-bold text-sm rounded-xl hover:bg-gray-800 transition-all mt-4"
            >
              Lihat Program <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
