import { PHILOSOPHY_ITEMS } from '../constants'
import { Leaf } from 'lucide-react'

export function PhilosophySection() {
  return (
    <section className="py-20 md:py-32 bg-secondary-900 relative overflow-hidden">
       {/* Decorative Elements */}
       <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-800 rounded-bl-[100px] opacity-60 pointer-events-none" />
       <div className="absolute bottom-10 left-10 w-32 h-32 bg-primary-900 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-800 border border-secondary-700 text-primary-200 text-xs font-bold uppercase tracking-wide">
              <Leaf className="h-3 w-3" />
              Filosofi Kami
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
              Tumbuh Bahagia,<br />
              <span className="text-primary-400">Hidup Bermakna</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-8">
              {PHILOSOPHY_ITEMS.map((item, idx) => (
                <div key={item.title} className="space-y-3 group p-4 rounded-xl bg-secondary-800/50 hover:bg-secondary-800 transition-colors border border-secondary-800 hover:border-primary-900">
                  <div className="h-10 w-10 bg-secondary-700 rounded-xl flex items-center justify-center text-primary-300 font-bold group-hover:bg-primary-500 group-hover:text-white transition-colors">
                    {idx + 1}
                  </div>
                  <h3 className="font-bold text-lg text-white">{item.title}</h3>
                  <p className="text-secondary-300 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Abstract Composition Image */}
          <div className="hidden lg:block relative">
             <div className="aspect-square relative max-w-md mx-auto">
                <div className="absolute inset-0 bg-primary-900 rounded-[2rem] transform rotate-6 opacity-20"></div>
                <div className="absolute inset-0 bg-secondary-800 rounded-[2rem] transform -rotate-6 border border-secondary-700"></div>
                <div className="absolute inset-4 bg-secondary-950 rounded-[1.5rem] shadow-2xl flex items-center justify-center overflow-hidden border border-secondary-800">
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-secondary-900 skew-y-6 transform -translate-y-10"></div>
                    
                    <div className="grid grid-cols-2 gap-4 p-8 w-full">
                       <div className="h-32 bg-primary-500/20 rounded-2xl w-full border border-primary-500/30"></div>
                       <div className="h-32 bg-accent-500/20 rounded-2xl w-full mt-8 border border-accent-500/30"></div>
                       <div className="h-32 bg-secondary-500/20 rounded-2xl w-full -mt-8 border border-secondary-500/30"></div>
                       <div className="h-32 bg-surface-500/20 rounded-2xl w-full border border-surface-500/30"></div>
                    </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  )
}
