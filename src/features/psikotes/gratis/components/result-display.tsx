import Link from 'next/link'
import {
  Download,
  ArrowRight,
  Users,
  CheckCircle2,
  Brain,
  Sparkles,
  Share2,
  Lock,
  Star,
  Plus,
  Hexagon,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import {
  GRATIS_TESTS,
  PREMIUM_TESTS,
  MAHASISWA_TESTS,
  KESEHATAN_MENTAL_TESTS,
  PERUSAHAAN_TESTS,
  RESULTS_MAP,
} from '@features/psikotes/constants'
import type { ResultData } from '@features/psikotes/constants'

type Category =
  | 'gratis'
  | 'premium'
  | 'mahasiswa'
  | 'kesehatan-mental'
  | 'perusahaan'

interface ResultDisplayProps {
  slug?: string
  backHref?: string
  tesLainnyaHref?: string
  category?: Category
}

const PREMIUM_BENEFITS = [
  'Strategy Report Karir Spesifik',
  'Analisa Kekuatan & Kelemahan Valid',
  'Panduan Pengembangan Diri Actionable',
]

function getSuggestedTests(category: Category) {
  switch (category) {
    case 'premium':
      return PREMIUM_TESTS.slice(0, 4)
    case 'mahasiswa':
      return MAHASISWA_TESTS.slice(0, 4)
    case 'kesehatan-mental':
      return KESEHATAN_MENTAL_TESTS.slice(0, 4)
    case 'perusahaan':
      return PERUSAHAAN_TESTS.slice(0, 4)
    default:
      return GRATIS_TESTS.slice(0, 4)
  }
}

function getTestHref(
  category: Category,
  slug: string,
) {
  switch (category) {
    case 'premium':
      return `/psikotes/premium/${slug}`
    case 'mahasiswa':
      return `/psikotes/mahasiswa/${slug}`
    case 'kesehatan-mental':
      return `/psikotes/kesehatan-mental/${slug}`
    case 'perusahaan':
      return `/psikotes/perusahaan/${slug}`
    default:
      return `/psikotes/gratis/${slug}`
  }
}

const DEFAULT_RESULT: ResultData = {
  code: 'N/A',
  title: 'Hasil Tes',
  subtitle: 'Berdasarkan analisa jawaban tes',
  description:
    'Hasil tes kamu telah teridentifikasi.',
}

export function ResultDisplay({
  slug = '',
  backHref = '/psikotes/gratis',
  tesLainnyaHref = '/psikotes/gratis',
  category = 'gratis',
}: ResultDisplayProps) {
  const result = RESULTS_MAP[slug] ?? DEFAULT_RESULT
  const suggestedTests = getSuggestedTests(category)

  return (
    <div className="min-h-screen bg-[#faf5e4] pb-24">
      {/* ── Hero Header ───────────────── */}
      <header
        className={cn(
          'relative overflow-hidden',
          'bg-linear-to-b from-emerald-800',
          'via-emerald-700 to-emerald-500',
          'text-white pt-28 pb-16 md:pt-36',
          'md:pb-20',
        )}
      >
        {/* Topographic Pattern */}
        <div
          className={cn(
            'absolute inset-0 opacity-[0.05]',
            'pointer-events-none mix-blend-overlay',
          )}
          style={{
            backgroundImage:
              'url("data:image/svg+xml,'
              + '%3Csvg width=\'200\''
              + ' height=\'200\''
              + ' viewBox=\'0 0 200 200\''
              + ' xmlns=\'http://www.w3.org/'
              + '2000/svg\'%3E%3Cpath'
              + ' d=\'M0 100 C 20 80, 40 120,'
              + ' 60 100 S 100 80, 120 100'
              + ' S 160 120, 200 100\''
              + ' stroke=\'white\''
              + ' fill=\'transparent\''
              + ' stroke-width=\'1\'/%3E'
              + '%3C/svg%3E")',
            backgroundSize: '400px 400px',
          }}
        />

        {/* Ornaments */}
        <Plus
          className={cn(
            'absolute top-[15%] left-[8%]',
            'text-emerald-400/20 w-8 h-8',
            'pointer-events-none',
          )}
        />
        <Hexagon
          className={cn(
            'absolute bottom-[12%] right-[8%]',
            'text-white/5 w-24 h-24',
            '-rotate-12 pointer-events-none',
          )}
        />

        {/* Ambient Glows */}
        <div
          className={cn(
            'absolute top-0 left-0',
            'w-96 h-96 bg-emerald-500/20',
            'rounded-full blur-[120px]',
            '-translate-x-1/2 -translate-y-1/2',
            'pointer-events-none',
          )}
        />
        <div
          className={cn(
            'absolute bottom-0 right-0',
            'w-80 h-80 bg-amber-500/10',
            'rounded-full blur-[100px]',
            'translate-x-1/4 translate-y-1/4',
            'pointer-events-none',
          )}
        />

        <div
          className={cn(
            'max-w-2xl mx-auto px-6',
            'relative z-10 text-center space-y-4',
          )}
        >
          <div
            className={cn(
              'inline-flex items-center gap-2',
              'px-4 py-2 bg-white/10',
              'border border-white/10',
              'backdrop-blur-md rounded-full',
              'text-xs font-bold uppercase',
              'tracking-widest mb-4',
            )}
          >
            <Sparkles
              className={cn(
                'w-3 h-3 text-amber-300',
                'fill-amber-300',
              )}
            />
            Hasil Tes Kamu
          </div>
          <h1
            className={cn(
              'text-3xl md:text-5xl',
              'font-black leading-tight',
              'tracking-tight',
            )}
          >
            Selamat! Profil kamu
            <br /> telah teridentifikasi.
          </h1>
          <p
            className={cn(
              'text-emerald-200 font-medium',
              'text-lg',
            )}
          >
            {result.subtitle}
          </p>
        </div>
      </header>

      <main
        className={cn(
          'max-w-2xl mx-auto px-6',
          'pt-12 space-y-12',
        )}
      >
        {/* ── Result Card ─────────────── */}
        <div
          className={cn(
            'bg-white rounded-3xl p-4',
            'border border-stone-200',
            'shadow-xl shadow-stone-300/30',
          )}
        >
          <div
            className={cn(
              'relative bg-emerald-800',
              'rounded-2xl',
              'overflow-hidden flex flex-col',
              'items-center justify-center',
              'text-center py-12 px-8',
              'text-white',
            )}
          >
            {/* Decorative blobs */}
            <div
              className={cn(
                'absolute top-0 right-0',
                'w-80 h-80 bg-emerald-600',
                'rounded-full blur-[120px]',
                'opacity-40 -translate-y-1/2',
                'translate-x-1/2',
              )}
            />
            <div
              className={cn(
                'absolute bottom-0 left-0',
                'w-80 h-80 bg-emerald-500',
                'rounded-full blur-[120px]',
                'opacity-20 translate-y-1/2',
                '-translate-x-1/2',
              )}
            />

            <div
              className={cn(
                'relative z-10 space-y-5',
              )}
            >
              <div
                className={cn(
                  'inline-block px-4 py-2',
                  'rounded-full border',
                  'border-white/10 bg-white/5',
                  'backdrop-blur-sm text-[10px]',
                  'font-bold uppercase',
                  'tracking-[0.2em]',
                  'text-emerald-200',
                )}
              >
                Personality Type
              </div>

              <div className="space-y-2">
                <h2
                  className={cn(
                    'text-5xl md:text-6xl',
                    'font-black text-white',
                    'tracking-tighter',
                  )}
                >
                  {result.code}
                </h2>
                <h3
                  className={cn(
                    'text-xl md:text-2xl',
                    'font-bold text-emerald-200',
                    'tracking-tight',
                  )}
                >
                  {result.title}
                </h3>
              </div>

              {/* Abstract visualization rings */}
              <div
                className={cn(
                  'w-24 h-24 mx-auto relative',
                )}
              >
                <div
                  className={cn(
                    'absolute inset-0 border-2',
                    'border-white/20 rounded-full',
                  )}
                />
                <div
                  className={cn(
                    'absolute inset-3 border',
                    'border-white/10 rounded-full',
                  )}
                />
                <div
                  className={cn(
                    'absolute inset-0 flex',
                    'items-center justify-center',
                  )}
                >
                  <Brain
                    className={cn(
                      'w-10 h-10 text-white',
                      'opacity-90',
                    )}
                    strokeWidth={1}
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className={cn(
              'p-6 text-center space-y-4',
            )}
          >
            <p
              className={cn(
                'text-sm text-stone-500',
                'max-w-md mx-auto leading-relaxed',
              )}
            >
              {result.description}
            </p>
            <div className="flex flex-col gap-3">
              <button
                className={cn(
                  'w-full py-4 bg-emerald-700',
                  'text-white rounded-xl font-bold',
                  'uppercase tracking-widest text-xs',
                  'hover:bg-emerald-800',
                  'transition-all flex items-center',
                  'justify-center gap-2 shadow-lg',
                  'shadow-emerald-200',
                )}
              >
                <Download className="w-4 h-4" />
                Download Laporan Lengkap (PDF)
              </button>
              <button
                className={cn(
                  'w-full py-4 bg-white border',
                  'border-stone-200 text-stone-800',
                  'rounded-xl font-bold uppercase',
                  'tracking-widest text-xs',
                  'hover:border-emerald-500',
                  'transition-all flex items-center',
                  'justify-center gap-2',
                )}
              >
                <Share2 className="w-4 h-4" />
                Bagikan Hasil
              </button>
            </div>
          </div>
        </div>

        {/* ── Premium Upsell ──────────── */}
        <div
          className={cn(
            'bg-emerald-900 rounded-3xl',
            'p-8 md:p-12 border border-emerald-800',
            'shadow-xl relative overflow-hidden',
            'text-white',
          )}
        >
          <div
            className={cn(
              'relative z-10',
              'grid md:grid-cols-2 gap-8',
              'items-center',
            )}
          >
            <div className="space-y-6">
              <div
                className={cn(
                  'inline-flex items-center gap-2',
                  'text-amber-400 font-bold',
                  'text-xs uppercase tracking-widest',
                )}
              >
                <Lock className="w-3 h-3" />
                Unlock: Premium
              </div>
              <h3
                className={cn(
                  'text-2xl md:text-3xl',
                  'font-black tracking-tight',
                  'leading-tight',
                )}
              >
                Buka Analisa Mendalam Potensi Dirimu
              </h3>
              <p
                className={cn(
                  'text-emerald-300 text-sm',
                  'leading-relaxed',
                )}
              >
                Hasil di atas hanya 10% dari potensi
                aslimu. Dapatkan laporan premium
                setebal 40+ halaman yang menganalisa
                karir, asmara, dan kekuatan
                tersembunyi.
              </p>
              <ul className="space-y-3">
                {PREMIUM_BENEFITS.map((item) => (
                  <li
                    key={item}
                    className={cn(
                      'flex items-center gap-3',
                      'text-sm text-emerald-200',
                      'font-medium',
                    )}
                  >
                    <CheckCircle2
                      className="w-4 h-4 text-white"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing Box */}
            <div
              className={cn(
                'bg-white/5 rounded-2xl p-6',
                'border border-white/10',
                'backdrop-blur-sm space-y-4',
              )}
            >
              <div
                className={cn(
                  'text-center pb-4',
                  'border-b border-white/10',
                )}
              >
                <span
                  className={cn(
                    'text-emerald-300',
                    'line-through text-xs',
                  )}
                >
                  Rp 350.000
                </span>
                <div
                  className={cn(
                    'text-3xl font-black',
                    'text-white',
                  )}
                >
                  Rp 199.000
                </div>
              </div>
              <button
                className={cn(
                  'w-full py-4 bg-white',
                  'text-emerald-900 rounded-xl',
                  'font-bold uppercase',
                  'tracking-wider text-xs',
                  'hover:bg-emerald-50',
                  'transition-all flex',
                  'items-center justify-center',
                  'gap-2',
                )}
              >
                Upgrade ke Premium
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Community Section ────────── */}
        <section
          className={cn(
            'space-y-8 bg-white rounded-3xl',
            'p-8 border border-stone-100',
          )}
        >
          <div className="text-center space-y-4">
            <div
              className={cn(
                'w-12 h-12 bg-emerald-50',
                'rounded-2xl flex items-center',
                'justify-center mx-auto',
                'text-emerald-700',
                'border border-emerald-100',
              )}
            >
              <Users className="w-6 h-6" />
            </div>
            <h3
              className={cn(
                'text-xl font-black',
                'text-stone-800 leading-tight',
              )}
            >
              Jangan Tumbuh Sendirian
            </h3>
            <p
              className={cn(
                'text-stone-500 text-sm',
                'max-w-md mx-auto',
              )}
            >
              Bergabunglah dengan 50.000+ member
              lainnya di Community Hub. Networking,
              event eksklusif, dan support system
              positif.
            </p>
          </div>

          <div
            className={cn(
              'flex flex-col md:flex-row gap-4',
            )}
          >
            <div
              className={cn(
                'flex-1 bg-emerald-50/50',
                'rounded-2xl p-6 border',
                'border-emerald-100',
                'flex items-start gap-4',
              )}
            >
              <div
                className={cn(
                  'p-2 bg-white rounded-lg',
                  'border border-emerald-200',
                )}
              >
                <Star
                  className={cn(
                    'w-4 h-4 text-emerald-700',
                  )}
                />
              </div>
              <div>
                <h4
                  className={cn(
                    'font-bold text-sm',
                    'text-stone-800',
                  )}
                >
                  Networking
                </h4>
                <p
                  className={cn(
                    'text-xs text-stone-500 mt-1',
                  )}
                >
                  Temukan partner akuntabilitas
                  sefrekuensi.
                </p>
              </div>
            </div>
            <div
              className={cn(
                'flex-1 bg-emerald-50/50',
                'rounded-2xl p-6 border',
                'border-emerald-100',
                'flex items-start gap-4',
              )}
            >
              <div
                className={cn(
                  'p-2 bg-white rounded-lg',
                  'border border-emerald-200',
                )}
              >
                <Sparkles
                  className={cn(
                    'w-4 h-4 text-emerald-700',
                  )}
                />
              </div>
              <div>
                <h4
                  className={cn(
                    'font-bold text-sm',
                    'text-stone-800',
                  )}
                >
                  Exclusive Events
                </h4>
                <p
                  className={cn(
                    'text-xs text-stone-500 mt-1',
                  )}
                >
                  Webinar rutin dengan expert
                  psikologi.
                </p>
              </div>
            </div>
          </div>

          <button
            className={cn(
              'w-full py-4 border',
              'border-emerald-200 text-emerald-800',
              'rounded-xl font-bold uppercase',
              'tracking-wider text-xs',
              'hover:border-emerald-600',
              'hover:bg-emerald-700',
              'hover:text-white transition-all',
            )}
          >
            Gabung Komunitas (Gratis)
          </button>
        </section>

        {/* ── More Tests ──────────────── */}
        <section
          className={cn(
            'pt-8 border-t border-stone-200',
          )}
        >
          <div
            className={cn(
              'flex items-center',
              'justify-between mb-8',
            )}
          >
            <h3
              className={cn(
                'text-xl font-black',
                'text-stone-800',
              )}
            >
              Eksplorasi Tes Lainnya
            </h3>
            <Link
              href={tesLainnyaHref}
              className={cn(
                'text-xs font-bold',
                'text-stone-400',
                'hover:text-emerald-700',
                'uppercase tracking-wider',
                'flex items-center gap-2',
              )}
            >
              Lihat Semua
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div
            className={cn(
              'grid grid-cols-2',
              'md:grid-cols-4 gap-4',
            )}
          >
            {suggestedTests.map((test) => {
              const Icon = test.icon
              return (
                <Link
                  key={test.id}
                  href={getTestHref(
                    category,
                    test.slug,
                  )}
                  className={cn(
                    'bg-white p-6 rounded-2xl',
                    'flex flex-col items-center',
                    'text-center gap-4',
                    'hover:bg-emerald-50',
                    'transition-colors cursor-pointer',
                    'border border-stone-100',
                    'hover:border-emerald-200 group',
                  )}
                >
                  <div
                    className={cn(
                      'w-10 h-10 bg-emerald-50',
                      'rounded-full flex items-center',
                      'justify-center',
                      'border border-emerald-200',
                      'group-hover:scale-110',
                      'transition-transform',
                    )}
                  >
                    <Icon
                      className={cn(
                        'w-5 h-5',
                        'text-emerald-700',
                      )}
                    />
                  </div>
                  <span
                    className={cn(
                      'font-bold text-xs',
                      'text-stone-800 uppercase',
                      'tracking-wide',
                    )}
                  >
                    {test.title}
                  </span>
                </Link>
              )
            })}
          </div>
        </section>

        {/* ── Back Link ───────────────── */}
        <div className="text-center pt-4">
          <Link
            href={backHref}
            className={cn(
              'inline-flex items-center gap-2',
              'text-sm font-bold text-stone-400',
              'hover:text-emerald-700',
              'transition-colors',
            )}
          >
            Kembali ke Halaman Tes
          </Link>
        </div>
      </main>
    </div>
  )
}
