import { CheckCircle2, Video } from 'lucide-react'

const GATHERING_POINTS = [
  'Dipandu oleh Community Manager berpengalaman',
  'Topik diskusi yang relevan dengan kehidupan sehari-hari',
  'Sesi tanya jawab interaktif',
]

export function GatheringSection() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* Video placeholder */}
        <div className="order-2 md:order-1 relative">
          <div className="absolute inset-0 bg-black/5 transform -rotate-3 rounded-3xl" />
          <div className="relative bg-white border border-slate-200 rounded-3xl p-2 shadow-2xl">
            <div className="aspect-video bg-slate-900 rounded-2xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 grid grid-cols-4 gap-1 p-1 opacity-50">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="bg-slate-800 rounded-md" />
                ))}
              </div>
              <div className="relative z-10 text-center">
                <Video className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <span className="inline-block px-4 py-2 bg-black/50 backdrop-blur-md rounded-full text-white text-xs font-bold border border-white/10">
                  Live Gathering Session
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="order-1 md:order-2 space-y-6">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Weekly Activity</span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Members Gathering</h2>
          <p className="text-lg text-slate-500 leading-relaxed">
            Setiap minggu, kami mengadakan sesi kumpul online untuk berdiskusi, berbagi cerita, dan saling menguatkan. Ini adalah ruang amanmu untuk menjadi diri sendiri.
          </p>
          <ul className="space-y-4">
            {GATHERING_POINTS.map((item) => (
              <li key={item} className="flex items-center gap-3 text-slate-700 font-medium">
                <CheckCircle2 className="w-5 h-5 text-black" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
