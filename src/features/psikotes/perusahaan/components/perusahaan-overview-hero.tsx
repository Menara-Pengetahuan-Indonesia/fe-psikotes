import {
  Building2,
  Plus,
  Hexagon,
  Diamond,
} from 'lucide-react'

export function PerusahaanOverviewHero() {
  return (
    <header
      className={
        'relative overflow-hidden text-white'
        + ' bg-linear-to-b from-primary-800'
        + ' via-primary-700 to-primary-500'
        + ' pt-28 pb-14 md:pt-36 md:pb-20'
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
          + ' w-150 h-150 bg-primary-900/20'
          + ' rounded-full blur-[120px]'
          + ' pointer-events-none animate-pulse'
        }
      />
      <div
        className={
          'absolute bottom-[-10%] right-[-5%]'
          + ' w-125 h-125 bg-primary-300/20'
          + ' rounded-full blur-[120px]'
          + ' pointer-events-none'
        }
      />

      {/* Floating Ornaments */}
      <Plus
        className={
          'absolute top-[15%] left-[10%]'
          + ' text-primary-300/30 w-8 h-8'
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
          + ' text-accent-400/20 w-16 h-16'
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
            + ' bg-primary-700/50'
            + ' border border-primary-400/30'
            + ' shadow-lg backdrop-blur-md'
            + ' mb-8 mx-auto'
          }
        >
          <Building2
            className="w-3.5 h-3.5 text-accent-400"
          />
          <span
            className={
              'text-[10px] font-black'
              + ' tracking-[0.2em]'
              + ' text-primary-50 uppercase'
            }
          >
            Corporate Solutions
          </span>
        </div>

        <h1
          className={
            'text-5xl md:text-7xl font-black'
            + ' tracking-tight leading-none'
            + ' mb-6 drop-shadow-2xl'
          }
        >
          Asesmen Profesional<br />
          <span className="text-accent-300">
            Perusahaan & Bisnis
          </span>
        </h1>

        <p
          className={
            'text-lg md:text-xl'
            + ' text-primary-50/80'
            + ' max-w-2xl mx-auto font-medium'
            + ' leading-relaxed'
          }
        >
          Solusi asesmen psikologi end-to-end untuk
          mendukung proses rekrutmen, pengembangan
          talenta, dan perencanaan karir strategis.
        </p>
      </div>
    </header>
  )
}
