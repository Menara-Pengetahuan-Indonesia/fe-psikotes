import Link from 'next/link'
import { ArrowRight, Clock, Users, ChevronDown } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

// ── Props ─────────────────────────────────────────────────────────────────────

export interface TestDetailProps {
  title: string
  badge: string
  description: string
  duration: string
  participants: string
  aspects: { heading: string; items: { title: string; desc: string }[] }[]
  price: string
  originalPrice: string
}

// ── Component ─────────────────────────────────────────────────────────────────

export function TestDetail({
  title,
  badge,
  description,
  duration,
  participants,
  aspects,
  price,
  originalPrice,
}: TestDetailProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* ── Dark Hero ───────────────────────────────────────── */}
      <div className="bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-14">
          {/* Badge */}
          <Badge
            variant="secondary"
            className="inline-flex mb-4 px-3 py-1 text-xs font-bold uppercase tracking-wider bg-slate-800 text-slate-300"
          >
            {badge}
          </Badge>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl font-black leading-tight mb-6 max-w-3xl">
            {title}
          </h1>

          {/* Metrics Row */}
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <Clock className="w-4 h-4 text-slate-500" />
              <span>
                <span className="text-slate-300 font-semibold">{duration}</span>{' '}
                <span className="text-slate-500">Durasi</span>
              </span>
            </div>

            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <Users className="w-4 h-4 text-slate-500" />
              <span>
                <span className="text-slate-300 font-semibold">{participants}</span>{' '}
                <span className="text-slate-500">Peserta</span>
              </span>
            </div>

            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <span className="text-slate-300 font-semibold">{price}</span>
              <span className="text-slate-600 line-through text-xs">{originalPrice}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Body: 2-col Grid ────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* ── Left Column ─── About + Aspects + FAQ ──────── */}
          <div className="lg:col-span-2 space-y-12">
            {/* About */}
            <div>
              <h2 className="text-2xl font-black text-slate-900 mb-4">
                Tentang Tes Ini
              </h2>
              <div className="w-12 h-px bg-slate-200 mb-6" />
              <p className="text-base text-slate-500 leading-relaxed">
                {description}
              </p>
            </div>

            {/* Aspects */}
            {aspects.length > 0 && (
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-4">
                  Aspek yang Diukur
                </h2>
                <div className="w-12 h-px bg-slate-200 mb-6" />

                <div className="space-y-8">
                  {aspects.map((section) => (
                    <div key={section.heading}>
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                        {section.heading}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {section.items.map((item) => (
                          <div
                            key={item.title}
                            className="p-4 bg-slate-50 rounded-2xl border border-slate-100"
                          >
                            <p className="text-sm font-bold text-slate-900 mb-1">
                              {item.title}
                            </p>
                            <p className="text-xs text-slate-500 leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ Placeholder */}
            <div>
              <h2 className="text-2xl font-black text-slate-900 mb-4">
                Pertanyaan Umum
              </h2>
              <div className="w-12 h-px bg-slate-200 mb-6" />

              <div className="space-y-3">
                {[
                  'Berapa lama waktu yang diperlukan untuk menyelesaikan tes ini?',
                  'Apakah hasil tes bisa digunakan untuk keperluan akademik?',
                  'Dapatkah saya mengulang tes setelah selesai?',
                ].map((question) => (
                  <button
                    key={question}
                    className="w-full text-left flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-slate-200 transition-colors group"
                  >
                    <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900">
                      {question}
                    </span>
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-4" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right Column ─── Sticky Pricing Card ──────── */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-100 overflow-hidden">
              {/* Card Header */}
              <div className="bg-slate-900 text-white px-8 py-6">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Harga Spesial
                </p>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-black">{price}</span>
                  <span className="text-slate-500 line-through text-sm">
                    {originalPrice}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="bg-white px-8 py-6 space-y-6">
                {/* Includes */}
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Termasuk
                  </p>
                  <ul className="space-y-2">
                    {[
                      'Akses penuh ke seluruh modul tes',
                      'Laporan hasil analisis mendalam',
                      'Rekomendasi karir yang dipersonalisasi',
                      'Akses seumur hidup ke hasil Anda',
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-slate-600"
                      >
                        <span className="mt-0.5 w-4 h-4 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0">
                          <svg
                            className="w-2.5 h-2.5"
                            viewBox="0 0 10 10"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M2 5l2 2 4-4" />
                          </svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-100" />

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <Button
                    className="w-full rounded-2xl h-12 text-sm font-bold"
                    size="lg"
                  >
                    Mulai Tes Sekarang
                    <ArrowRight className="w-4 h-4" />
                  </Button>

                  <Link
                    href="#"
                    className="block w-full py-3 text-center text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
                  >
                    Pelajari lebih lanjut tentang tes ini
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
