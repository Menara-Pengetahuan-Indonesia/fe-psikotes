import {
  Wifi,
  BatteryCharging,
  Coffee,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'

interface TestInstructionBodyProps {
  /** Per-test instruction. If empty/whitespace, falls back to default checklist. */
  description?: string | null
}

const DEFAULT_CHECKLIST: { icon: LucideIcon; text: string }[] = [
  { icon: Wifi, text: 'Koneksi internet stabil' },
  {
    icon: BatteryCharging,
    text: 'Perangkat cukup daya atau terhubung charger',
  },
  { icon: Coffee, text: 'Kondisi fisik & pikiran siap, bebas gangguan' },
  {
    icon: ShieldCheck,
    text: 'Jawab dengan jujur — hasilnya untuk kamu sendiri',
  },
]

/**
 * Reusable body content for the pre-test instruction popup.
 * Renders the test's specific description when available, otherwise a
 * generic readiness checklist.
 *
 * Used by the "Siap memulai tes?" modal in `my-packages` and by the
 * intro screen on `/tes/[testId]`.
 */
export function TestInstructionBody({ description }: TestInstructionBodyProps) {
  const trimmed = description?.trim()

  if (trimmed) {
    return (
      <div>
        <p className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-3">
          Instruksi Pengerjaan
        </p>
        <div className="rounded-2xl bg-primary-50/60 border border-primary-100 px-4 py-3.5">
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
            {trimmed}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <p className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-3">
        Pastikan sebelum memulai
      </p>
      <ul className="space-y-2.5">
        {DEFAULT_CHECKLIST.map((item, i) => {
          const Icon = item.icon
          return (
            <li
              key={i}
              className="flex items-center gap-3 text-sm text-slate-700"
            >
              <div className="w-9 h-9 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-primary-700" />
              </div>
              <span className="font-medium leading-snug">{item.text}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
