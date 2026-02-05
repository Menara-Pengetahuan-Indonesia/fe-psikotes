import { Users, Heart, MessageSquare, ArrowRight } from 'lucide-react'

const KONSELING_SERVICES = [
  {
    icon: Users,
    title: 'Konseling Individu',
    description:
      'Sesi konseling pribadi dengan psikolog profesional untuk menghadapi tantangan personal, karir, atau kesehatan mental Anda secara mendalam.',
    price: 'Mulai Rp 250.000',
    duration: '60 Menit / Sesi',
  },
  {
    icon: Heart,
    title: 'Konseling Pasangan',
    description:
      'Bantu memperkuat hubungan Anda dan pasangan melalui sesi konseling yang dipandu oleh ahli hubungan berpengalaman.',
    price: 'Mulai Rp 350.000',
    duration: '90 Menit / Sesi',
  },
  {
    icon: MessageSquare,
    title: 'Konseling Kelompok',
    description:
      'Sesi konseling berkelompok yang dipandu profesional untuk berbagi pengalaman dan mendapat dukungan dari sesama dalam lingkungan yang aman.',
    price: 'Mulai Rp 150.000',
    duration: '90 Menit / Sesi',
  },
]

export function KonselingServices() {
  return (
    <section id="services" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Layanan Konseling</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Pilih jenis konseling yang paling sesuai dengan kebutuhan Anda saat ini.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {KONSELING_SERVICES.map((service) => {
            const Icon = service.icon

            return (
              <div
                key={service.title}
                className="group bg-white border border-gray-200 rounded-3xl p-8 hover:border-gray-300 hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center group-hover:bg-gray-900 transition-colors mb-6">
                  <Icon className="w-7 h-7 text-gray-900 group-hover:text-white transition-colors" />
                </div>

                <h3 className="text-xl font-black text-gray-900 mb-3">{service.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed flex-grow mb-6">{service.description}</p>

                <div className="border-t border-gray-100 pt-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Harga</span>
                    <span className="font-black text-gray-900">{service.price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Durasi</span>
                    <span className="text-sm font-bold text-gray-600">{service.duration}</span>
                  </div>
                </div>

                <button className="mt-6 w-full py-3 bg-gray-50 text-gray-900 rounded-xl text-xs font-bold uppercase tracking-wider group-hover:bg-gray-900 group-hover:text-white transition-all flex items-center justify-center gap-2">
                  Mulai Konseling <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
