import { Users, Video, MessageSquare, ArrowRight } from 'lucide-react'

export function MembershipHero() {
  return (
    <header className="pt-32 pb-20 px-6 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Copy */}
        <div className="space-y-8">
          <span className="inline-block py-1 px-3 rounded-full bg-black text-white text-[10px] font-bold tracking-widest uppercase">
            Exclusive Access
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 leading-[1.1]">
            The Good Life <br />
            <span className="text-slate-400">Community.</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-lg leading-relaxed">
            Bergabung dengan ekosistem pertumbuhan diri terbesar di Indonesia. Akses materi premium, webinar eksklusif, dan komunitas yang suportif.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-black text-white rounded-xl font-bold text-sm tracking-wide hover:bg-slate-800 transition-all flex items-center gap-2">
              Gabung Sekarang <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-8 py-4 bg-white border border-slate-200 text-slate-900 rounded-xl font-bold text-sm tracking-wide hover:border-black transition-all">
              Lihat Detail Benefit
            </button>
          </div>
        </div>

        {/* Right: Visual card mockup */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-200 to-transparent rounded-[40px] blur-3xl opacity-50" />
          <div className="relative bg-white border border-slate-200 rounded-[32px] p-6 shadow-2xl space-y-4 transform rotate-2 hover:rotate-0 transition-transform duration-500">
            <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="font-black text-lg">Community Hub</p>
                <p className="text-xs text-slate-400">12.5k+ Members Online</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <Video className="w-8 h-8 mb-3 text-slate-900" />
                <p className="font-bold text-sm">Weekly Webinar</p>
                <p className="text-[10px] text-slate-400">Live with Experts</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <MessageSquare className="w-8 h-8 mb-3 text-slate-900" />
                <p className="font-bold text-sm">Group Discussion</p>
                <p className="text-[10px] text-slate-400">Supportive Peers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
