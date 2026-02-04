import { PHILOSOPHY_ITEMS } from '../constants'

export function PhilosophySection() {
  return (
    <section className="py-20 md:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter">
              Achieving and Maintaining<br />The Good Life
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {PHILOSOPHY_ITEMS.map((item) => (
                <div key={item.title} className="space-y-2">
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-slate-500 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Image placeholder */}
          <div className="hidden lg:block">
            <div className="w-full aspect-square bg-slate-200 rounded-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
