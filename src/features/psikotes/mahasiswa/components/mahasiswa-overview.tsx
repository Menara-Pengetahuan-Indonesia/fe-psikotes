import {
  GraduationCap,
  Plus,
  Hexagon,
  Diamond,
  BookOpen,
} from 'lucide-react'

import { TestCategoryCard } from '../../components'
import { MAHASISWA_TESTS } from '../../constants'

export function MahasiswaOverview() {
  return (
    <div className="bg-[#faf5e4]">
      {/* ── Rich Hero ──────────────────────────────────────── */}
      <header
        className={
          'relative overflow-hidden text-white'
          + ' bg-linear-to-b from-emerald-800'
          + ' via-emerald-700 to-emerald-500'
          + ' pt-32 pb-20 md:pt-40 md:pb-28'
        }
      >
        {/* Topographic SVG overlay */}
        <div
          className={
            'absolute inset-0 opacity-[0.05]'
            + ' pointer-events-none mix-blend-overlay'
          }
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width=\'200\''
              + ' height=\'200\' viewBox=\'0 0 200 200\''
              + ' xmlns=\'http://www.w3.org/2000/svg\'%3E'
              + '%3Cpath d=\'M0 100 C 20 80, 40 120,'
              + ' 60 100 S 100 80, 120 100 S 160 120,'
              + ' 200 100\' stroke=\'white\''
              + ' fill=\'transparent\''
              + ' stroke-width=\'1\'/%3E%3C/svg%3E")',
            backgroundSize: '400px 400px',
          }}
        />

        {/* Ambient Glows */}
        <div
          className={
            'absolute top-[-10%] left-[-10%]'
            + ' w-150 h-150 bg-emerald-900/20'
            + ' rounded-full blur-[120px]'
            + ' pointer-events-none animate-pulse'
          }
        />
        <div
          className={
            'absolute bottom-[-10%] right-[-5%]'
            + ' w-125 h-125 bg-emerald-300/20'
            + ' rounded-full blur-[120px]'
            + ' pointer-events-none'
          }
        />

        {/* Floating Ornaments */}
        <Plus
          className={
            'absolute top-[15%] left-[10%]'
            + ' text-emerald-300/30 w-8 h-8'
            + ' animate-pulse'
          }
        />
        <Hexagon
          className={
            'absolute top-[40%] right-[10%]'
            + ' text-white/5 w-24 h-24'
            + ' -rotate-12 animate-float-slow'
          }
        />
        <Diamond
          className={
            'absolute bottom-[10%] left-[20%]'
            + ' text-amber-400/20 w-16 h-16'
            + ' rotate-12 animate-float-medium'
          }
        />

        <div
          className={
            'max-w-7xl mx-auto px-6'
            + ' relative z-10 text-center'
          }
        >
          {/* Glassmorphic Badge */}
          <div
            className={
              'inline-flex items-center gap-2'
              + ' px-4 py-1.5 rounded-full'
              + ' bg-emerald-700/50'
              + ' border border-emerald-400/30'
              + ' shadow-lg backdrop-blur-md'
              + ' mb-8 mx-auto'
            }
          >
            <GraduationCap
              className="w-3.5 h-3.5 text-amber-400"
            />
            <span
              className={
                'text-[10px] font-black'
                + ' tracking-[0.2em]'
                + ' text-emerald-50 uppercase'
              }
            >
              Student Solutions
            </span>
          </div>

          <h1
            className={
              'text-5xl md:text-7xl font-black'
              + ' tracking-tight leading-none'
              + ' mb-6 drop-shadow-2xl'
            }
          >
            Asesmen untuk<br />
            <span className="text-amber-300">
              Mahasiswa & Pelajar
            </span>
          </h1>

          <p
            className={
              'text-lg md:text-xl'
              + ' text-emerald-50/80'
              + ' max-w-2xl mx-auto font-medium'
              + ' leading-relaxed'
            }
          >
            Temukan potensi terbaik Anda dengan rangkaian
            tes psikologi profesional yang dirancang khusus
            untuk mendukung perjalanan akademik dan karir.
          </p>
        </div>
      </header>

      {/* ── Content Section ────────────────────────────────── */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Label */}
          <div
            className={
              'flex flex-col md:flex-row'
              + ' md:items-end justify-between'
              + ' gap-6 mb-12'
            }
          >
            <div className="space-y-2">
              <div
                className={
                  'inline-flex items-center gap-2'
                  + ' text-emerald-600 font-black'
                  + ' text-[10px] uppercase'
                  + ' tracking-[0.3em]'
                }
              >
                <BookOpen className="w-3 h-3" />
                Student Assessments
              </div>
              <h2
                className={
                  'text-3xl md:text-4xl font-black'
                  + ' text-slate-900 tracking-tight'
                }
              >
                Pilihan Tes Mahasiswa
              </h2>
            </div>
            <div
              className={
                'h-px bg-slate-200 grow'
                + ' hidden md:block mx-8 mb-4'
              }
            />
          </div>

          {/* Card Grid */}
          <div
            className={
              'grid grid-cols-1 sm:grid-cols-2'
              + ' lg:grid-cols-4 gap-6'
            }
          >
            {MAHASISWA_TESTS.map((test, index) => (
              <TestCategoryCard
                key={test.id}
                test={test}
                number={index + 1}
                href={
                  `/psikotes/mahasiswa/${test.slug}`
                }
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
