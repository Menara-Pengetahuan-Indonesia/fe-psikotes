import { Video, Monitor, Users, ArrowRight } from 'lucide-react'

const TRAINING_PROGRAMS = [
  {
    icon: Video,
    title: 'Program Webinar',
    description:
      'Ikuti webinar live interaktif bersama para ahli psikologi dan pengembangan diri setiap minggu dengan topik yang relevan dan praktis.',
    schedule: 'Setiap Minggu',
    price: 'Mulai Rp 99.000',
  },
  {
    icon: Monitor,
    title: 'Kelas Online',
    description:
      'Akses kelas online terstruktur yang bisa diikuti kapan saja dan di mana saja. Materi kurikulum dirancang secara sistematis untuk hasil maksimal.',
    schedule: 'Akses Seumur Hidup',
    price: 'Mulai Rp 199.000',
  },
  {
    icon: Users,
    title: 'Mentoring Eksklusif',
    description:
      'Sesi mentoring one-on-one dengan mentor berpengalaman untuk mendapatkan bimbingan personal sesuai tujuan pengembangan diri Anda.',
    schedule: 'Fleksibel',
    price: 'Mulai Rp 499.000',
  },
]

export function PelatihanPrograms() {
  return (
    <section id="programs" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Program Tersedia</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Pilih program yang paling sesuai dengan gaya belajar dan tujuan pengembangan diri Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TRAINING_PROGRAMS.map((program) => {
            const Icon = program.icon

            return (
              <div
                key={program.title}
                className="group bg-white border border-gray-200 rounded-3xl p-8 hover:border-gray-300 hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center group-hover:bg-gray-900 transition-colors mb-6">
                  <Icon className="w-7 h-7 text-gray-900 group-hover:text-white transition-colors" />
                </div>

                <h3 className="text-xl font-black text-gray-900 mb-3">{program.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed flex-grow mb-6">{program.description}</p>

                <div className="border-t border-gray-100 pt-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Jadwal</span>
                    <span className="text-sm font-bold text-gray-600">{program.schedule}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Harga</span>
                    <span className="font-black text-gray-900">{program.price}</span>
                  </div>
                </div>

                <button className="mt-6 w-full py-3 bg-gray-50 text-gray-900 rounded-xl text-xs font-bold uppercase tracking-wider group-hover:bg-gray-900 group-hover:text-white transition-all flex items-center justify-center gap-2">
                  Daftar Sekarang <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
