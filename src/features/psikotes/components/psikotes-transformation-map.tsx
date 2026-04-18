import { Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { TRANSFORMATION_STEPS } from '../constants'
import { ScrollButton } from './scroll-button'

export function PsikotesTransformationMap() {

  return (
    <section className="py-12 md:py-16 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-lg shadow-sky-100/40 border border-gray-100 relative overflow-hidden">

          {/* Decorative corner */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-sky-50 to-transparent rounded-[3rem] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-amber-50/60 to-transparent rounded-[3rem] pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-12 items-center">

            {/* Left */}
            <div className="lg:col-span-4 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200">
                <Sparkles className="w-3 h-3 text-emerald-500 fill-emerald-500" />
                <span className="text-xs font-black text-emerald-700 uppercase tracking-widest">Transformation Journey</span>
              </div>
              <h2 className="text-3xl font-black text-gray-900 tracking-tight leading-tight">
                Peta Perjalanan <br />
                <span className="text-emerald-500 italic">&quot;The New You&quot;</span>
              </h2>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">
                Empat langkah kunci untuk melepaskan kendala masa lalu dan meraih masa depan yang indah. Semua bermula dari sini.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-emerald-100 flex items-center justify-center text-[10px] font-black text-emerald-600">
                      {i}
                    </div>
                  ))}
                </div>
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">+10k Jiwa yang Tumbuh</span>
              </div>
            </div>

            {/* Right: 2x2 grid */}
            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
              {TRANSFORMATION_STEPS.map((step, idx) => {
                const hoverBorder = [
                  'hover:border-emerald-200 hover:shadow-emerald-50',
                  'hover:border-amber-200 hover:shadow-amber-50',
                  'hover:border-sky-200 hover:shadow-sky-50',
                  'hover:border-emerald-200 hover:shadow-emerald-50',
                ][idx]
                const numColor = [
                  'group-hover/item:text-emerald-50',
                  'group-hover/item:text-amber-50',
                  'group-hover/item:text-sky-50',
                  'group-hover/item:text-emerald-50',
                ][idx]
                return (
                  <div
                    key={step.id}
                    className={`bg-gray-50 border border-gray-100 p-6 rounded-[2rem] hover:bg-white hover:shadow-md transition-colors duration-300 group/item relative overflow-hidden ${hoverBorder}`}
                  >
                    <div className="flex gap-4">
                      <div className={cn(
                        'w-12 h-12 rounded-xl flex items-center justify-center shrink-0',
                        'transition-transform duration-300 group-hover/item:scale-110 shadow-sm',
                        step.color
                      )}>
                        <step.icon className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-black text-gray-800 text-base tracking-tight">{step.title}</h4>
                        <p className="text-sm text-gray-500 font-medium leading-relaxed">{step.description}</p>
                      </div>
                    </div>

                    <span className={`absolute -right-2 -bottom-4 text-7xl font-black text-gray-100 select-none transition-colors ${numColor}`}>
                      0{idx + 1}
                    </span>

                    <ScrollButton targetId={step.id} />
                  </div>
                )
              })}
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
