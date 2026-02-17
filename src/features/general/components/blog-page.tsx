import {
  Plus,
  Hexagon,
  Diamond,
  Sparkles,
  Calendar,
  User,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const BLOG_POSTS = [
  {
    title: '5 Tanda Kamu Butuh Konseling Profesional',
    category: 'Kesehatan Mental',
    excerpt:
      'Mengenali tanda-tanda bahwa sudah'
      + ' waktunya mencari bantuan profesional...',
    date: '15 Jan 2026',
    author: 'Dr. Sarah Putri',
  },
  {
    title: 'Cara Mengelola Stres di Tempat Kerja',
    category: 'Karir',
    excerpt:
      'Tips praktis untuk menjaga kesehatan'
      + ' mental di lingkungan kerja kompetitif...',
    date: '12 Jan 2026',
    author: 'Andi Pratama, M.Psi',
  },
  {
    title: 'Memahami Hasil Psikotes: Panduan Lengkap',
    category: 'Psikologi',
    excerpt:
      'Pelajari cara membaca dan memahami'
      + ' hasil tes psikologi Anda...',
    date: '10 Jan 2026',
    author: 'Dr. Budi Santoso',
  },
  {
    title: 'Menemukan Passion: Langkah Awal Karir',
    category: 'Tips',
    excerpt:
      'Panduan langkah demi langkah untuk'
      + ' menemukan minat dan bakat sejatimu...',
    date: '8 Jan 2026',
    author: 'Rina Wijaya, M.Psi',
  },
  {
    title: 'Kesehatan Mental bagi Mahasiswa',
    category: 'Edukasi',
    excerpt:
      'Mengapa mahasiswa perlu memperhatikan'
      + ' kesehatan mental mereka...',
    date: '5 Jan 2026',
    author: 'Dr. Sarah Putri',
  },
  {
    title: 'Work-Life Balance: Mitos atau Kenyataan?',
    category: 'Lifestyle',
    excerpt:
      'Memahami konsep keseimbangan hidup dan'
      + ' bagaimana mencapainya...',
    date: '2 Jan 2026',
    author: 'Andi Pratama, M.Psi',
  },
]

export function BlogPage() {
  return (
    <main>
      {/* Hero */}
      <section
        className={cn(
          'relative overflow-hidden py-20 md:py-36',
          'bg-linear-to-b from-secondary-900',
          'via-secondary to-secondary-300',
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
            'w-150 h-150 bg-secondary-900/30',
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
              'bg-secondary/60 border',
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
              Our Blog
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
            Blog &{' '}
            <span className="text-amber-300">
              Artikel
            </span>
          </h1>
          <p
            className={cn(
              'text-xl text-sky-50 max-w-2xl',
              'mx-auto leading-relaxed',
              'font-medium opacity-90',
            )}
          >
            Wawasan terbaru seputar psikologi,
            kesehatan mental, dan pengembangan diri.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div
            className={cn(
              'grid sm:grid-cols-2 lg:grid-cols-3',
              'gap-8',
            )}
          >
            {BLOG_POSTS.map((post) => (
              <div
                key={post.title}
                className={cn(
                  'rounded-3xl border',
                  'border-slate-200 overflow-hidden',
                  'bg-white hover:-translate-y-1',
                  'hover:shadow-xl transition-all',
                  'duration-300 group cursor-pointer',
                )}
              >
                <div
                  className={cn(
                    'aspect-video bg-slate-100',
                    'flex items-center',
                    'justify-center',
                  )}
                >
                  <div
                    className={cn(
                      'w-16 h-16 rounded-2xl',
                      'bg-slate-200 flex',
                      'items-center justify-center',
                    )}
                  >
                    <Sparkles
                      className={cn(
                        'w-6 h-6',
                        'text-slate-400',
                      )}
                    />
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <Badge
                    variant="secondary"
                    className={cn(
                      'bg-secondary/10',
                      'text-secondary',
                      'hover:bg-secondary/15',
                      'font-bold',
                    )}
                  >
                    {post.category}
                  </Badge>
                  <h3
                    className={cn(
                      'font-black text-lg',
                      'text-slate-900',
                      'group-hover:text-secondary',
                      'transition-colors',
                      'line-clamp-2',
                    )}
                  >
                    {post.title}
                  </h3>
                  <p
                    className={cn(
                      'text-slate-500 text-sm',
                      'leading-relaxed',
                      'line-clamp-2',
                    )}
                  >
                    {post.excerpt}
                  </p>
                  <div
                    className={cn(
                      'flex items-center gap-4',
                      'text-xs text-slate-400 pt-2',
                    )}
                  >
                    <span
                      className={cn(
                        'flex items-center',
                        'gap-1',
                      )}
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span
                      className={cn(
                        'flex items-center',
                        'gap-1',
                      )}
                    >
                      <User className="w-3.5 h-3.5" />
                      {post.author}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
