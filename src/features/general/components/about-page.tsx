import Link from 'next/link'
import {
  Plus,
  Hexagon,
  Diamond,
  Circle,
  Sparkles,
  ArrowRight,
  Eye,
  Rocket,
  ShieldCheck,
  Heart,
  Lightbulb,
  Users,
  Trophy,
  Handshake,
  Brain,
  GraduationCap,
  HeartHandshake,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const VALUES = [
  {
    icon: ShieldCheck,
    title: 'Profesional',
    desc: 'Standar etika profesi tertinggi.',
  },
  {
    icon: Trophy,
    title: 'Terpercaya',
    desc: 'Didukung psikolog berlisensi.',
  },
  {
    icon: Lightbulb,
    title: 'Inovatif',
    desc: 'Metode asesmen modern.',
  },
  {
    icon: Heart,
    title: 'Inklusif',
    desc: 'Untuk semua kalangan.',
  },
  {
    icon: Rocket,
    title: 'Berdampak',
    desc: 'Hasil nyata dan terukur.',
  },
  {
    icon: Handshake,
    title: 'Kolaboratif',
    desc: 'Bersama institusi & perusahaan.',
  },
] as const

const STATS = [
  { value: '50K+', label: 'Pengguna Aktif' },
  { value: '200+', label: 'Tes Tersedia' },
  { value: '50+', label: 'Psikolog Berlisensi' },
  { value: '98%', label: 'Tingkat Kepuasan' },
] as const

const SERVICES_OVERVIEW = [
  {
    icon: Brain,
    title: 'Psikotes Online',
    desc:
      'Asesmen psikologi terstandar dengan'
      + ' hasil real-time dan laporan'
      + ' komprehensif.',
    color: 'bg-emerald-600',
    lightBg: 'bg-emerald-50',
    lightText: 'text-emerald-600',
  },
  {
    icon: HeartHandshake,
    title: 'Konseling',
    desc:
      'Sesi konseling profesional bersama'
      + ' psikolog berlisensi secara daring.',
    color: 'bg-indigo-600',
    lightBg: 'bg-indigo-50',
    lightText: 'text-indigo-600',
  },
  {
    icon: GraduationCap,
    title: 'Pelatihan',
    desc:
      'Program pengembangan diri melalui'
      + ' webinar, kelas, dan mentoring.',
    color: 'bg-orange-600',
    lightBg: 'bg-orange-50',
    lightText: 'text-orange-600',
  },
] as const

export function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section
        className={cn(
          'relative overflow-hidden py-20 md:py-36',
          'bg-linear-to-b from-[#0a1f33]',
          'via-[#143D60] to-[#1d5a8a]',
        )}
      >
        <div
          className={cn(
            'absolute inset-0 opacity-[0.07]',
            'pointer-events-none mix-blend-overlay',
          )}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 100 C 20 80, 40 120, 60 100 S 100 80, 120 100 S 160 120, 200 100' stroke='white' fill='transparent' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '400px 400px',
          }}
        />
        <div
          className={cn(
            'absolute top-[-10%] left-[-10%]',
            'w-150 h-150 bg-[#0a1f33]/30',
            'rounded-full blur-[120px]',
            'pointer-events-none',
          )}
        />
        <div
          className={cn(
            'absolute bottom-[-10%] right-[-5%]',
            'w-125 h-125 bg-sky-300/15',
            'rounded-full blur-[120px]',
            'pointer-events-none',
          )}
        />
        <Plus
          className={cn(
            'absolute top-[10%] left-[15%]',
            'text-sky-300/30 w-8 h-8',
            'animate-pulse',
          )}
        />
        <Hexagon
          className={cn(
            'absolute top-[20%] right-[25%]',
            'text-white/10 w-24 h-24',
            '-rotate-12 animate-float-medium',
          )}
        />
        <Diamond
          className={cn(
            'absolute bottom-[20%] right-[40%]',
            'text-amber-200/10 w-16 h-16',
            'rotate-12 animate-float-slow',
          )}
        />

        <div
          className={cn(
            'max-w-5xl mx-auto px-6',
            'relative z-10 text-center',
          )}
        >
          <div
            className={cn(
              'inline-flex items-center gap-2',
              'px-4 py-2 rounded-full',
              'bg-[#143D60]/60 border',
              'border-sky-400/40 shadow-lg',
              'backdrop-blur-md mb-8',
            )}
          >
            <Sparkles
              className={cn(
                'w-4 h-4 text-amber-400',
                'fill-amber-400',
              )}
            />
            <span
              className={cn(
                'text-[11px] font-black',
                'tracking-[0.2em]',
                'text-sky-50 uppercase',
              )}
            >
              Indonesian Life School
            </span>
          </div>
          <h1
            className={cn(
              'text-5xl md:text-6xl lg:text-7xl',
              'font-black text-white',
              'tracking-tighter leading-none',
              'drop-shadow-lg mb-6',
            )}
          >
            Tentang{' '}
            <span className="text-amber-300">
              BERMOELA
            </span>
          </h1>
          <p
            className={cn(
              'text-xl text-sky-50 max-w-2xl',
              'mx-auto leading-relaxed',
              'font-medium opacity-90 text-pretty',
            )}
          >
            Platform psikologi terpercaya yang membantu
            individu dan organisasi memahami potensi
            diri melalui asesmen, konseling, dan
            pelatihan berdampak.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white pb-20 relative z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div
            className={cn(
              'grid grid-cols-2 md:grid-cols-4',
              'gap-4 -mt-6',
            )}
          >
            {STATS.map((s) => (
              <div
                key={s.label}
                className={cn(
                  'bg-white rounded-3xl p-6',
                  'text-center shadow-xl',
                  'shadow-[#143D60]/5 border',
                  'border-slate-100',
                )}
              >
                <p
                  className={cn(
                    'text-3xl md:text-4xl',
                    'font-black text-[#143D60]',
                    'mb-1',
                  )}
                >
                  {s.value}
                </p>
                <p
                  className={cn(
                    'text-xs md:text-sm',
                    'text-slate-500 font-medium',
                  )}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section
        className={cn(
          'bg-white py-20 md:py-28',
          'relative overflow-hidden',
        )}
      >
        <Plus
          className={cn(
            'absolute top-[15%] right-[8%]',
            'text-[#143D60]/5 w-16 h-16',
            'rotate-45 pointer-events-none',
          )}
        />
        <Circle
          className={cn(
            'absolute bottom-[15%] left-[5%]',
            'text-amber-400/10 w-20 h-20',
            'pointer-events-none',
          )}
        />
        <div className="max-w-5xl mx-auto px-6">
          <div
            className={cn(
              'text-center mb-14 space-y-4',
            )}
          >
            <div
              className={cn(
                'inline-flex items-center gap-2',
                'px-4 py-1.5 rounded-full',
                'bg-white border border-slate-200',
                'shadow-sm',
              )}
            >
              <Sparkles
                className={cn(
                  'w-3.5 h-3.5 text-[#143D60]',
                  'fill-[#143D60]',
                )}
              />
              <span
                className={cn(
                  'text-[10px] font-black',
                  'tracking-[0.2em]',
                  'text-slate-500 uppercase',
                )}
              >
                Our Purpose
              </span>
            </div>
            <h2
              className={cn(
                'text-4xl md:text-5xl font-black',
                'text-[#143D60] tracking-tight',
              )}
            >
              Misi &{' '}
              <span className="text-amber-500">
                Visi
              </span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div
              className={cn(
                'p-8 md:p-10 rounded-3xl',
                'bg-[#143D60] relative',
                'overflow-hidden group',
              )}
            >
              <div
                className={cn(
                  'absolute top-0 right-0',
                  'w-40 h-40 bg-white/5',
                  'rounded-full -translate-y-1/2',
                  'translate-x-1/2',
                  'pointer-events-none',
                )}
              />
              <div
                className={cn(
                  'w-14 h-14 rounded-2xl',
                  'bg-white/15 flex items-center',
                  'justify-center mb-6',
                  'backdrop-blur-sm',
                )}
              >
                <Rocket
                  className="w-7 h-7 text-amber-300"
                />
              </div>
              <h2
                className={cn(
                  'text-2xl md:text-3xl font-black',
                  'text-white mb-4',
                )}
              >
                Misi Kami
              </h2>
              <p
                className={cn(
                  'text-sky-100/80',
                  'leading-relaxed text-lg',
                )}
              >
                Menyediakan layanan psikologi
                berkualitas tinggi yang mudah diakses
                oleh seluruh masyarakat Indonesia
                melalui asesmen ilmiah, konseling,
                dan pelatihan.
              </p>
            </div>
            <div
              className={cn(
                'p-8 md:p-10 rounded-3xl',
                'bg-gradient-to-br from-amber-400',
                'to-amber-500 relative overflow-hidden',
                'group',
              )}
            >
              <div
                className={cn(
                  'absolute bottom-0 left-0',
                  'w-40 h-40 bg-white/10',
                  'rounded-full translate-y-1/2',
                  '-translate-x-1/2',
                  'pointer-events-none',
                )}
              />
              <div
                className={cn(
                  'w-14 h-14 rounded-2xl',
                  'bg-white/20 flex items-center',
                  'justify-center mb-6',
                  'backdrop-blur-sm',
                )}
              >
                <Eye
                  className={cn(
                    'w-7 h-7',
                    'text-amber-900',
                  )}
                />
              </div>
              <h2
                className={cn(
                  'text-2xl md:text-3xl font-black',
                  'text-amber-950 mb-4',
                )}
              >
                Visi Kami
              </h2>
              <p
                className={cn(
                  'text-amber-900/80',
                  'leading-relaxed text-lg',
                )}
              >
                Menjadi platform psikologi terdepan
                di Indonesia yang memberdayakan
                setiap individu mengenali potensi
                terbaiknya untuk kehidupan bermakna.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section
        className={cn(
          'bg-[#faf5e4] py-20 md:py-28',
          'relative overflow-hidden',
        )}
      >
        <Plus
          className={cn(
            'absolute top-[8%] left-[6%]',
            'text-[#143D60]/10 w-10 h-10',
            'rotate-45 pointer-events-none',
          )}
        />
        <Diamond
          className={cn(
            'absolute bottom-[12%] right-[8%]',
            'text-amber-500/15 w-8 h-8',
            'rotate-12 pointer-events-none',
          )}
        />
        <Circle
          className={cn(
            'absolute top-[20%] right-[12%]',
            'text-[#143D60]/5 w-14 h-14',
            'pointer-events-none',
          )}
        />
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14 space-y-4">
            <div
              className={cn(
                'inline-flex items-center gap-2',
                'px-4 py-1.5 rounded-full',
                'bg-white border border-slate-200',
                'shadow-sm',
              )}
            >
              <Sparkles
                className={cn(
                  'w-3.5 h-3.5 text-amber-500',
                  'fill-amber-500',
                )}
              />
              <span
                className={cn(
                  'text-[10px] font-black',
                  'tracking-[0.2em]',
                  'text-slate-500 uppercase',
                )}
              >
                Layanan Kami
              </span>
            </div>
            <h2
              className={cn(
                'text-4xl md:text-5xl font-black',
                'text-[#143D60] tracking-tight',
              )}
            >
              Tiga Pilar{' '}
              <span className="text-amber-500">
                Utama
              </span>
            </h2>
            <p
              className={cn(
                'text-slate-600 max-w-xl',
                'mx-auto leading-relaxed',
              )}
            >
              Solusi pengembangan diri komprehensif
              untuk setiap kebutuhan Anda.
            </p>
          </div>
          <div
            className={cn(
              'grid md:grid-cols-3 gap-6',
            )}
          >
            {SERVICES_OVERVIEW.map((s) => (
              <div
                key={s.title}
                className={cn(
                  'bg-white rounded-3xl border',
                  'border-slate-100 p-8',
                  'shadow-lg shadow-stone-200/50',
                  'hover:-translate-y-1',
                  'hover:shadow-xl transition-all',
                  'duration-300 group',
                )}
              >
                <div
                  className={cn(
                    'w-14 h-14 rounded-2xl',
                    'flex items-center justify-center',
                    'mb-6',
                    s.color,
                  )}
                >
                  <s.icon
                    className="w-7 h-7 text-white"
                  />
                </div>
                <h3
                  className={cn(
                    'text-xl font-black',
                    'text-slate-900 mb-3',
                  )}
                >
                  {s.title}
                </h3>
                <p
                  className={cn(
                    'text-slate-500',
                    'leading-relaxed',
                  )}
                >
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section
        className={cn(
          'bg-white py-20 md:py-28',
          'relative overflow-hidden',
        )}
      >
        <Hexagon
          className={cn(
            'absolute top-[10%] left-[5%]',
            'text-[#143D60]/5 w-20 h-20',
            '-rotate-12 pointer-events-none',
          )}
        />
        <Diamond
          className={cn(
            'absolute bottom-[15%] right-[10%]',
            'text-amber-400/10 w-12 h-12',
            'rotate-12 pointer-events-none',
          )}
        />
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14 space-y-4">
            <div
              className={cn(
                'inline-flex items-center gap-2',
                'px-4 py-1.5 rounded-full',
                'bg-white border border-slate-200',
                'shadow-sm',
              )}
            >
              <Sparkles
                className={cn(
                  'w-3.5 h-3.5 text-[#143D60]',
                  'fill-[#143D60]',
                )}
              />
              <span
                className={cn(
                  'text-[10px] font-black',
                  'tracking-[0.2em]',
                  'text-slate-500 uppercase',
                )}
              >
                Core Values
              </span>
            </div>
            <h2
              className={cn(
                'text-4xl md:text-5xl font-black',
                'text-[#143D60] tracking-tight',
              )}
            >
              Nilai-Nilai{' '}
              <span className="text-amber-500">
                Kami
              </span>
            </h2>
            <p
              className={cn(
                'text-slate-600 max-w-xl',
                'mx-auto leading-relaxed',
              )}
            >
              Prinsip yang menjadi landasan setiap
              layanan dan keputusan di BERMOELA.
            </p>
          </div>
          <div
            className={cn(
              'grid sm:grid-cols-2',
              'lg:grid-cols-3 gap-5',
            )}
          >
            {VALUES.map((v) => (
              <div
                key={v.title}
                className={cn(
                  'p-6 rounded-3xl bg-white',
                  'border border-slate-100',
                  'shadow-lg shadow-stone-200/50',
                  'hover:-translate-y-1',
                  'hover:shadow-xl transition-all',
                  'duration-300 group',
                )}
              >
                <div
                  className={cn(
                    'w-12 h-12 rounded-2xl',
                    'bg-[#143D60]/10',
                    'flex items-center',
                    'justify-center mb-5',
                    'group-hover:bg-[#143D60]',
                    'transition-colors duration-300',
                  )}
                >
                  <v.icon
                    className={cn(
                      'w-6 h-6 text-[#143D60]',
                      'group-hover:text-white',
                      'transition-colors duration-300',
                    )}
                  />
                </div>
                <h3
                  className={cn(
                    'text-lg font-black',
                    'text-slate-900 mb-2',
                  )}
                >
                  {v.title}
                </h3>
                <p
                  className={cn(
                    'text-sm text-slate-500',
                    'leading-relaxed',
                  )}
                >
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team CTA */}
      <section
        className={cn(
          'relative overflow-hidden',
          'py-20 md:py-28',
          'bg-[#143D60]',
        )}
      >
        <div
          className={cn(
            'absolute top-0 left-0',
            'w-80 h-80 bg-sky-400/10',
            'rounded-full -translate-x-1/2',
            '-translate-y-1/2 blur-[80px]',
            'pointer-events-none',
          )}
        />
        <div
          className={cn(
            'absolute bottom-0 right-0',
            'w-80 h-80 bg-amber-400/10',
            'rounded-full translate-x-1/2',
            'translate-y-1/2 blur-[80px]',
            'pointer-events-none',
          )}
        />
        <Plus
          className={cn(
            'absolute top-[15%] right-[15%]',
            'text-white/5 w-12 h-12',
            'pointer-events-none',
          )}
        />
        <Diamond
          className={cn(
            'absolute bottom-[20%] left-[10%]',
            'text-amber-300/10 w-10 h-10',
            'rotate-12 pointer-events-none',
          )}
        />
        <div
          className={cn(
            'max-w-3xl mx-auto px-6',
            'text-center relative z-10',
            'space-y-6',
          )}
        >
          <div
            className={cn(
              'w-16 h-16 rounded-2xl',
              'bg-white/10 flex items-center',
              'justify-center mx-auto',
              'backdrop-blur-sm',
            )}
          >
            <Users
              className="w-8 h-8 text-amber-300"
            />
          </div>
          <h2
            className={cn(
              'text-3xl md:text-5xl font-black',
              'text-white tracking-tight',
            )}
          >
            Tim Profesional{' '}
            <span className="text-amber-300">
              Kami
            </span>
          </h2>
          <p
            className={cn(
              'text-sky-100/70 leading-relaxed',
              'max-w-xl mx-auto text-lg',
            )}
          >
            Tim kami terdiri dari psikolog berlisensi,
            konselor berpengalaman, dan tenaga ahli
            yang berdedikasi membantu Anda mencapai
            potensi terbaik.
          </p>
          <Button
            asChild
            size="lg"
            className={cn(
              'h-14 px-10 text-base rounded-2xl',
              'bg-amber-400 hover:bg-amber-300',
              'text-[#143D60] font-bold shadow-lg',
              'shadow-amber-400/20',
              'transition-all group',
            )}
          >
            <Link
              href="/contact"
              className="flex items-center gap-2"
            >
              Hubungi Kami
              <ArrowRight
                className={cn(
                  'w-5 h-5',
                  'group-hover:translate-x-1',
                  'transition-transform',
                )}
              />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
