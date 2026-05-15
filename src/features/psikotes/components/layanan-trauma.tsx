'use client'

import {
  HeartPulse,
  ShieldCheck,
  Lock,
  Users,
  HeartHandshake,
  Activity,
  User,
  Plus,
  Hexagon,
  Diamond,
  Sparkles,
  ArrowRight,
  Calendar,
  Shield,
  TrendingUp,
} from 'lucide-react'

export function TraumaHero() {
  return (
    <section className="relative overflow-hidden bg-white pt-28 md:pt-32 pb-16 md:pb-24">
      {/* Decorative orbs */}
      <div className="absolute top-[-8%] left-[-8%] w-[400px] h-[400px] bg-primary-100/40 rounded-full pointer-events-none blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[350px] h-[350px] bg-accent-100/40 rounded-full pointer-events-none blur-3xl" />
      <div className="absolute top-[20%] right-[8%] w-[150px] h-[150px] bg-amber-200/30 rounded-full pointer-events-none blur-2xl" />
      <div className="absolute top-[40%] left-[5%] w-[100px] h-[100px] bg-sky-100/40 rounded-full pointer-events-none blur-xl" />

      {/* Floating Ornaments */}
      <div className="absolute top-32 left-[10%] opacity-20 animate-pulse">
        <Plus className="w-8 h-8 text-primary-400" />
      </div>
      <div className="absolute bottom-40 right-[15%] opacity-15 animate-bounce delay-700">
        <Hexagon className="w-12 h-12 text-accent-400" />
      </div>
      <div className="absolute top-48 right-[20%] opacity-10">
        <Diamond className="w-6 h-6 text-primary-600" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 mb-16 md:mb-20">

          {/* Left: Content */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-200 text-primary-700 text-xs font-semibold px-3 py-1.5 rounded-full w-fit">
              <HeartPulse className="w-3.5 h-3.5 text-primary-600" />
              Trauma Therapy & Support Group
            </div>

            {/* Heading */}
            <div className="space-y-1">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-[1.15] tracking-tight font-[family-name:var(--font-quicksand)]">
                Pulih sesuai kecepatanmu
              </h1>
              <h1 className="text-3xl md:text-5xl font-bold leading-[1.15] tracking-tight font-[family-name:var(--font-quicksand)] text-gray-900">
                dalam lingkungan yang <span className="text-accent-500">aman & terstruktur</span>
              </h1>
            </div>

            {/* Subtext */}
            <p className="text-sm md:text-base text-gray-500 max-w-md leading-relaxed font-medium">
              dipandu oleh profesional yang memahami trauma. Kamu tidak harus memikulnya sendiri — pemulihan itu mungkin dan dimulai dari sini.
            </p>

            {/* Feature badges */}
            <div className="flex flex-wrap items-center gap-0">
              <div className="flex items-center gap-2 pr-5">
                <div className="w-8 h-8 rounded-lg bg-primary-50 border border-primary-200 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-primary-600" />
                </div>
                <div>
                  <p className="text-[10px] md:text-xs font-bold text-gray-800 leading-tight">Perawatan</p>
                  <p className="text-[10px] md:text-xs text-gray-500 leading-tight">Berbasis Trauma</p>
                </div>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div className="flex items-center gap-2 px-5">
                <div className="w-8 h-8 rounded-lg bg-primary-50 border border-primary-200 flex items-center justify-center shrink-0">
                  <Lock className="w-4 h-4 text-primary-600" />
                </div>
                <div>
                  <p className="text-[10px] md:text-xs font-bold text-gray-800 leading-tight">Lingkungan Aman</p>
                  <p className="text-[10px] md:text-xs text-gray-500 leading-tight">& Rahasia</p>
                </div>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div className="flex items-center gap-2 pl-5">
                <div className="w-8 h-8 rounded-lg bg-primary-50 border border-primary-200 flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4 text-primary-600" />
                </div>
                <div>
                  <p className="text-[10px] md:text-xs font-bold text-gray-800 leading-tight">Pulih</p>
                  <p className="text-[10px] md:text-xs text-gray-500 leading-tight">Bersama</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Illustration placeholder */}
          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-[4/3] bg-primary-50 rounded-3xl border border-primary-100 overflow-hidden flex items-center justify-center">
              {/* Stylized Healing Image Mockup */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-100/30 to-transparent" />
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-white shadow-xl border border-primary-100 flex items-center justify-center overflow-hidden">
                   <div className="absolute inset-0 bg-primary-50/50" />
                   <div className="relative z-20 flex flex-col items-center gap-3">
                      <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-primary-100 flex items-center justify-center">
                        <User className="w-8 h-8 md:w-12 md:h-12 text-primary-600" />
                      </div>
                      <div className="flex gap-2">
                        <div className="w-6 h-6 rounded-full bg-accent-200 animate-pulse" />
                        <div className="w-6 h-6 rounded-full bg-primary-200 animate-pulse delay-75" />
                        <div className="w-6 h-6 rounded-full bg-sky-200 animate-pulse delay-150" />
                      </div>
                   </div>
                </div>
                {/* Decorative floating leaves/shapes */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary-200/40 rounded-full blur-xl" />
                <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-accent-200/30 rounded-full blur-xl" />
              </div>
              
              {/* Bermoela logo badge */}
              <div className="absolute bottom-4 left-4 w-10 h-10 rounded-xl bg-white shadow-md border border-primary-100 flex items-center justify-center">
                <span className="text-primary-600 font-black text-sm font-[family-name:var(--font-courgette)]">b</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Features Card */}
        <div className="bg-primary-50/50 border border-primary-100 rounded-3xl p-6 md:p-8 relative overflow-hidden backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white border border-primary-100 flex items-center justify-center shrink-0 shadow-sm">
                <HeartHandshake className="w-6 h-6 md:w-8 md:h-8 text-primary-600" />
              </div>
              <div className="space-y-1">
                <h3 className="text-primary-800 font-bold text-sm md:text-base">Terapi Sesuai Kecepatanmu</h3>
                <p className="text-gray-500 text-[11px] md:text-xs leading-relaxed">
                  Setiap sesi disesuaikan dengan kesiapan emosi dan sistem saraf Anda.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white border border-primary-100 flex items-center justify-center shrink-0 shadow-sm">
                <Activity className="w-6 h-6 md:w-8 md:h-8 text-primary-600" />
              </div>
              <div className="space-y-1">
                <h3 className="text-primary-800 font-bold text-sm md:text-base">Berbasis Bukti & Holistik</h3>
                <p className="text-gray-500 text-[11px] md:text-xs leading-relaxed">
                  Pendekatan berbasis riset dan menyeluruh untuk pemulihan yang berkelanjutan.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white border border-primary-100 flex items-center justify-center shrink-0 shadow-sm">
                <Users className="w-6 h-6 md:w-8 md:h-8 text-primary-600" />
              </div>
              <div className="space-y-1">
                <h3 className="text-primary-800 font-bold text-sm md:text-base">Kamu Tidak Sendirian</h3>
                <p className="text-gray-500 text-[11px] md:text-xs leading-relaxed">
                  Dukungan dari profesional dan komunitas yang memahami perjalanan Anda.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function TraumaApproach() {
  const approaches = [
    {
      title: 'Terapi Somatik',
      icon: User,
      items: [
        'Fokus pada hubungan tubuh dan pikiran',
        'Melepaskan ketegangan yang tersimpan',
        'Mengembalikan rasa aman dalam tubuh',
      ],
    },
    {
      title: 'Terapi Berbasis EMDR',
      icon: Activity,
      items: [
        'Membantu memproses memori traumatis',
        'Mengurangi gejala PTSD, kecemasan, dan flashback',
        'Pendekatan terstruktur dan terbukti efektif',
      ],
    },
    {
      title: 'Terapi Naratif',
      icon: HeartPulse,
      items: [
        'Membantu Anda menulis ulang cerita hidup',
        'Menguatkan makna, nilai, dan identitas baru',
        'Membangun harapan dan arah hidup baru',
      ],
    },
  ]

  return (
    <section className="py-16 md:py-24 px-6 bg-white relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-1/4 left-[-5%] opacity-[0.03] rotate-12">
        <Plus className="w-64 h-64 text-primary-900" />
      </div>
      <div className="absolute bottom-1/4 right-[-5%] opacity-[0.03] -rotate-12">
        <Hexagon className="w-80 h-80 text-primary-900" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-50/30 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center justify-center gap-2 text-accent-500 mb-2">
            <Sparkles className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-widest">Metodologi Kami</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-primary-800 font-[family-name:var(--font-quicksand)]">
            Pendekatan Terapi
          </h2>
          <div className="w-12 h-0.5 bg-accent-500 mx-auto" />
          <p className="text-gray-500 text-sm md:text-base leading-relaxed">
            Kami menggunakan metode berbasis bukti yang terbukti efektif untuk membantu Anda memproses, melepaskan, dan pulih dari pengalaman traumatis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {approaches.map((app) => (
            <div
              key={app.title}
              className="bg-white border-2 border-primary-50 rounded-3xl p-6 md:p-8 hover:border-primary-200 transition-all duration-300 hover:shadow-xl hover:shadow-primary-100/20 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary-50/50 rounded-bl-[4rem] -translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              
              <div className="flex items-start gap-4 mb-6 relative z-10">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-primary-50 flex items-center justify-center shrink-0 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                  <app.icon className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <h3 className="text-primary-800 font-bold text-lg md:text-xl pt-2">
                  {app.title}
                </h3>
              </div>
              <ul className="space-y-3 relative z-10">
                {app.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="text-primary-500 font-bold shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function TraumaSupportGroup() {
  const features = [
    {
      title: 'Kelompok Kecil',
      desc: '6-10 peserta untuk ruang yang aman dan intim.',
      icon: Users,
    },
    {
      title: 'Terstruktur & Aman',
      desc: 'Dipandu oleh psikolog berpengalaman dengan etika profesional.',
      icon: Shield,
    },
    {
      title: 'Topik Beragam',
      desc: 'Dari trauma, kehilangan, burnout, hingga relasi dan self-worth.',
      icon: Calendar,
    },
    {
      title: 'Pertumbuhan Bersama',
      desc: 'Saling mendukung, berbagi, dan tumbuh lebih kuat bersama.',
      icon: TrendingUp,
    },
  ]

  return (
    <section className="py-16 md:py-24 px-6 relative overflow-hidden">
      {/* Flowing background elements */}
      <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-accent-50/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[10%] left-[5%] w-[250px] h-[250px] bg-primary-50/50 rounded-full blur-3xl pointer-events-none" />
      
      {/* Floating Ornaments */}
      <div className="absolute top-10 left-[20%] opacity-10 rotate-45">
        <Plus className="w-10 h-10 text-primary-600" />
      </div>
      <div className="absolute bottom-20 right-[25%] opacity-10">
        <Diamond className="w-8 h-8 text-accent-600" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="bg-primary-50/60 rounded-[2.5rem] p-8 md:p-12 border border-primary-100 relative overflow-hidden backdrop-blur-sm">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 relative z-10">
            {/* Left side */}
            <div className="lg:w-[40%] space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-primary-800 font-[family-name:var(--font-quicksand)]">
                  Grup Dukungan
                </h2>
                <div className="w-10 h-0.5 bg-accent-500" />
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  Bergabunglah dengan kelompok kecil yang dikurasi dengan orang-orang yang memahami apa yang Anda alami. Penyembuhan bersama mempercepat pemulihan individu dengan cara yang tidak bisa dilakukan terapi sendirian.
                </p>
              </div>
              
              <button className="inline-flex items-center gap-2.5 px-6 py-3 bg-primary-600 text-white rounded-full font-bold text-sm md:text-base hover:bg-primary-700 transition-all shadow-lg shadow-primary-200 active:scale-95">
                Lihat Jadwal & Topik Grup
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Right side grid */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
              {features.map((f) => (
                <div key={f.title} className="flex flex-col items-center text-center space-y-4 group">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center shadow-sm border border-primary-100 group-hover:scale-110 transition-transform duration-300">
                    <f.icon className="w-6 h-6 md:w-8 md:h-8 text-primary-600" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-primary-800 font-bold text-sm md:text-base">{f.title}</h4>
                    <p className="text-gray-500 text-xs md:text-sm leading-relaxed px-2">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
