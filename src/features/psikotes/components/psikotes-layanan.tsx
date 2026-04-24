'use client'

import { useState } from 'react'
import {
  Brain,
  HeartHandshake,
  ShieldHalf,
  GraduationCap,
  Building2,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface ServiceOutput {
  heading: string
  items: string[]
}

interface Service {
  title: string
  icon: LucideIcon
  outputs: ServiceOutput[]
}

const SERVICES: Service[] = [
  {
    title: 'Tes Pemetaan, Asesmen & Blueprint Pengembangan Diri Yang Anda dapatkan:',
    icon: Brain,
    outputs: [
      {
        heading: 'Kepribadian & Pola Diri',
        items: [
          'Kepribadian (misalnya berbasis Big Five Personality Traits)',
          'Pola pikir, emosi, dan perilaku',
          'Nilai hidup dan motivasi intrinsik',
        ],
      },
      {
        heading: 'Kekuatan & Titik Buta',
        items: [
          'Core strengths (kekuatan dominan)',
          'Development gaps (area yang menghambat)',
          'Blind spots (titik buta psikologis)',
        ],
      },
      {
        heading: 'Risiko & Hambatan',
        items: [
          'Trauma atau limiting beliefs',
          'Pola sabotase diri (self-sabotage)',
          'Risiko burnout, kecemasan, atau stagnasi',
        ],
      },
      {
        heading: 'Strategi & Tujuan',
        items: [
          'Tujuan jangka pendek, menengah, panjang',
          'Strategi pengembangan (skill, mindset, habit)',
          'Metode intervensi (coaching, terapi, learning path)',
        ],
      },
      {
        heading: 'Action Plan & Evaluasi',
        items: [
          'Action plan (harian/mingguan)',
          'KPI perkembangan diri',
          'Mekanisme evaluasi (misalnya refleksi berkala atau reassessment)',
        ],
      },
    ],
  },
  {
    title: 'Konsultasi, Konseling & Coaching',
    icon: HeartHandshake,
    outputs: [
      {
        heading: 'Tujuan & Nilai Hidup',
        items: [
          'Tujuan hidup yang spesifik dan bermakna (personal & profesional)',
          'Nilai inti (core values) sebagai kompas keputusan',
          'Prioritas hidup yang lebih terstruktur',
        ],
      },
      {
        heading: 'Pengelolaan Emosi',
        items: [
          'Kemampuan mengelola stres, kecemasan, dan emosi negatif',
          'Penyembuhan atau pengelolaan luka batin (inner healing)',
          'Stabilitas mental dalam menghadapi tekanan hidup',
        ],
      },
      {
        heading: 'Perubahan Mindset',
        items: [
          'Perubahan dari limiting beliefs → empowering beliefs',
          'Growth mindset (adaptif, terbuka terhadap feedback)',
          'Cara pandang baru terhadap masalah dan kegagalan',
        ],
      },
      {
        heading: 'Kebiasaan Baru',
        items: [
          'Kebiasaan baru yang mendukung tujuan (produktif, sehat, disiplin)',
          'Pengurangan perilaku destruktif',
          'Sistem rutinitas yang konsisten dan terukur',
        ],
      },
      {
        heading: 'Kemandirian',
        items: [
          'Mampu mengambil keputusan secara mandiri',
          'Memiliki sistem refleksi & evaluasi diri',
          'Tidak bergantung terus-menerus pada coach/counselor',
        ],
      },
    ],
  },
  {
    title: 'Trauma Therapy & Support Group',
    icon: ShieldHalf,
    outputs: [
      {
        heading: 'Rasa Aman & Pemulihan Emosional (Safety & Stabilization)',
        items: [
          'Penurunan intensitas reaksi trauma (panic, flashback, hypervigilance)',
          'Meningkatnya rasa aman (internal & dalam relasi)',
          'Kemampuan grounding & self-regulation dasar',
        ],
      },
      {
        heading: 'Pelepasan Trauma (Trauma Processing)',
        items: [
          'Mampu mengakses dan memproses pengalaman trauma secara aman',
          'Berkurangnya emotional charge terhadap memori traumatis',
          'Integrasi pengalaman tanpa disasosiasi atau penghindaran',
        ],
      },
      {
        heading: 'Regulasi Sistem Saraf & Emosi',
        items: [
          'Kemampuan mengelola respon fight/flight/freeze',
          'Peningkatan toleransi terhadap stres (window of tolerance)',
          'Emosi lebih stabil dan tidak reaktif',
        ],
      },
      {
        heading: 'Koneksi Sosial & Rasa Tidak Sendirian (Support System)',
        items: [
          'Merasa dipahami dan diterima (validation)',
          'Penurunan isolasi & loneliness',
          'Terbangunnya trust dalam relasi',
        ],
      },
      {
        heading: 'Integrasi Diri & Pertumbuhan Pasca Trauma (Post-Traumatic Growth)',
        items: [
          'Identitas diri yang lebih utuh & kuat',
          'Muncul makna baru dari pengalaman trauma',
          'Kemampuan menjalani hidup dengan lebih bermakna dan penuh harapan',
        ],
      },
    ],
  },
  {
    title: 'Pelatihan',
    icon: GraduationCap,
    outputs: [
      {
        heading: 'Pelatihan 1: Mental Healing Individu',
        items: [
          'Stabilitas Diri & Emotional Safety: Mengelola emosi & trigger; merasa aman; tidak mudah panic',
          'Self-Awareness & Insight Psikologis: Memahami akar trauma, pola emosi & perilaku; menyadari limiting beliefs',
          'Skill Healing & Coaching: Menguasai teknik self-healing (grounding, breathing, reframing)',
          'Perubahan Perilaku & Implementasi: Perubahan nyata (lebih tenang, relasi membaik, fungsi hidup meningkat)',
          'Kemandirian & Profesionalisme: Mandiri menjaga kesehatan mental; memiliki rutinitas self-care',
        ],
      },
      {
        heading: 'Pelatihan 2: Calon Counselor & Life Coach',
        items: [
          'Stabilitas Diri & Emotional Safety: Menjaga stabilitas diri saat sesi; menciptakan psychological safety untuk klien',
          'Self-Awareness & Insight Psikologis: Mengidentifikasi pola klien; melakukan basic assessment (listening, empati, probing)',
          'Skill Healing & Coaching: Menguasai teknik coaching (questioning, reframing, intervention)',
          'Perubahan Perilaku & Implementasi: Membantu klien berubah; mampu menjalankan sesi coaching terstruktur',
          'Kemandirian & Profesionalisme: Siap praktik profesional; memahami etika dan batasan profesi',
        ],
      },
    ],
  },
  {
    title: 'Solusi Kustom bagi Perusahaan',
    icon: Building2,
    outputs: [
      {
        heading: 'Organizational Diagnosis & Insight',
        items: [
          'Pemetaan kondisi organisasi (budaya kerja, mental health, leadership, produktivitas)',
          'Identifikasi akar masalah vs gejala (burnout, konflik, disengagement)',
          'Data baseline (psikologis & organisasi) sebagai dasar intervensi',
        ],
      },
      {
        heading: 'Strategic Intervention Blueprint',
        items: [
          'Rencana intervensi terintegrasi (coaching, counseling, training, system improvement)',
          'Prioritas program berdasarkan dampak bisnis',
          'Roadmap implementasi + KPI organisasi',
        ],
      },
      {
        heading: 'Workforce Mental Resilience & Wellbeing',
        items: [
          'Penurunan stress, burnout, dan konflik kerja',
          'Peningkatan stabilitas emosi & daya tahan mental karyawan',
          'Lingkungan kerja lebih sehat & suportif',
        ],
      },
      {
        heading: 'Coaching Capability',
        items: [
          'Leader mampu melakukan coaching, komunikasi efektif, dan people development',
          'Peningkatan kemampuan handling konflik & performance management',
          'Terbentuknya budaya feedback & growth',
        ],
      },
      {
        heading: 'Culture Transformation',
        items: [
          'Peningkatan produktivitas & engagement karyawan',
          'Perubahan budaya kerja (lebih kolaboratif, adaptif, accountable)',
          'Dampak bisnis terukur (retensi, output kerja, kepuasan karyawan)',
        ],
      },
    ],
  },
]

export function PsikotesServices() {
  const [active, setActive] = useState(0)
  const current = SERVICES[active]

  return (
    <div className="w-full max-w-5xl mx-auto font-[family-name:var(--font-quicksand)]">
      {/* Tab buttons */}
      <div className="grid grid-cols-5 gap-1.5 md:gap-2 mb-0">
        {SERVICES.map((service, idx) => {
          const Icon = service.icon
          const isActive = active === idx
          return (
            <button
              key={service.title}
              onClick={() => setActive(idx)}
              className={`
                flex flex-col items-center gap-1 md:gap-1.5 px-1 md:px-2 py-2 md:py-3 rounded-xl md:rounded-2xl border text-center
                transition-all cursor-pointer
                ${isActive
                  ? 'bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-200'
                  : 'bg-primary-50 border-primary-200 text-primary-700 hover:bg-primary-100'
                }
              `}
            >
              <Icon className="w-5 h-5 md:w-6 md:h-6" />
              <span className="text-[8px] md:text-xs font-bold leading-tight line-clamp-2">{service.title}</span>
            </button>
          )
        })}
      </div>

      {/* Panel */}
      <div className="bg-white border-2 border-primary-200 rounded-2xl mt-3 p-4 md:p-6">
        <h3 className="text-primary-700 text-sm md:text-lg font-bold mb-4 text-center">
          {current.title}
        </h3>

        {/* Columns */}
        <div className="contents">
          <div
            className="hidden md:grid gap-3"
            style={{
              gridTemplateColumns: `repeat(${current.outputs.length}, minmax(0, 1fr))`,
            }}
          >
            {current.outputs.map((output, idx) => (
              <div
                key={output.heading}
                className="bg-primary-50 border border-primary-200 rounded-xl p-3 md:p-4"
              >
                <h4 className="text-primary-700 text-sm font-bold mb-2 leading-tight text-left">
                  {idx + 1}. {output.heading}
                </h4>
                <ul className="space-y-1.5">
                  {output.items.map((item) => (
                    <li key={item} className="text-xs text-gray-900 leading-relaxed flex gap-1.5 text-left">
                      <span className="text-primary-500 shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-2 md:hidden">
            {current.outputs.map((output, idx) => (
              <div
                key={output.heading}
                className="bg-primary-50 border border-primary-200 rounded-xl p-3"
              >
                <h4 className="text-primary-700 text-xs font-bold mb-1.5 leading-tight text-left">
                  {idx + 1}. {output.heading}
                </h4>
                <ul className="space-y-1">
                  {output.items.map((item) => (
                    <li key={item} className="text-[11px] text-gray-900 leading-relaxed flex gap-1.5 text-left">
                      <span className="text-primary-500 shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
