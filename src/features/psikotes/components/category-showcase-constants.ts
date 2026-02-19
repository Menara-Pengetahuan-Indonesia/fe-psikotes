import { Leaf, Sparkles } from 'lucide-react'

export type Pill = {
  label: string
  color: 'dark' | 'teal' | 'amber'
}

export const PILL_COLORS: Record<
  Pill['color'],
  string
> = {
  dark: 'bg-primary-900 text-white',
  teal: 'bg-primary-500 text-white',
  amber: 'bg-accent-400 text-accent-900',
}

const pill = (
  label: string,
  color: Pill['color'],
): Pill => ({ label, color })

export const ROWS: Pill[][] = [
  [
    pill('Kenali Dirimu', 'dark'),
    pill('Tumbuh Setiap Hari', 'teal'),
    pill('Berani Berubah', 'amber'),
    pill('Percaya Proses', 'dark'),
    pill('Jadi Versi Terbaik', 'teal'),
    pill('Mulai Dari Sekarang', 'amber'),
  ],
  [
    pill('Potensi Tanpa Batas', 'teal'),
    pill('Langkah Kecil Bermakna', 'amber'),
    pill('Mental Kuat', 'dark'),
    pill('Fokus & Konsisten', 'teal'),
    pill('Bangkit Lebih Kuat', 'amber'),
    pill('Hidup Penuh Tujuan', 'dark'),
  ],
  [
    pill('Investasi Diri', 'amber'),
    pill('Kenal Potensi', 'dark'),
    pill('Masa Depan Cerah', 'teal'),
    pill('Berani Bermimpi', 'amber'),
    pill('Jiwa Tangguh', 'dark'),
    pill('Semangat Bertumbuh', 'teal'),
  ],
]

export const MARQUEE_CSS = `
@keyframes marquee-left {
  from { transform: translateX(0) }
  to { transform: translateX(-50%) }
}
@keyframes marquee-right {
  from { transform: translateX(-50%) }
  to { transform: translateX(0) }
}
.marquee-track {
  animation-duration: var(--duration, 30s);
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
.marquee-left { animation-name: marquee-left }
.marquee-right { animation-name: marquee-right }
.marquee-row:hover .marquee-track,
.marquee-row:focus-within .marquee-track {
  animation-play-state: paused;
}
@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation-play-state: paused;
  }
}`

export const SEP_ICONS = [Leaf, Sparkles]
