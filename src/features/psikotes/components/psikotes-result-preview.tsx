'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import Link from 'next/link'

const freeFeatures = [
  { text: 'Akses 1 tes dasar', included: true },
  { text: 'Hasil ringkas', included: true },
  { text: 'Analisis mendalam', included: false },
  { text: 'Rekomendasi personal', included: false },
  { text: 'Sertifikat digital', included: false },
]

const premiumFeatures = [
  { text: 'Akses semua jenis tes', included: true },
  { text: 'Hasil lengkap & detail', included: true },
  { text: 'Analisis mendalam', included: true },
  { text: 'Rekomendasi personal', included: true },
  { text: 'Sertifikat digital', included: true },
]

export function PsikotesResultPreview() {
  return (
    <section className="bg-gray-50/50 px-6 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Pilih yang Cocok Buatmu 💫</h2>
          <p className="mx-auto max-w-2xl text-gray-600">Mulai gratis atau unlock semua fitur premium</p>
        </motion.div>
        <div className="grid gap-6 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="h-full rounded-3xl border-2 border-gray-200 bg-white p-8">
              <div className="mb-2 text-4xl">🆓</div>
              <h3 className="mb-2 text-2xl font-bold text-gray-900">Gratis</h3>
              <p className="mb-6 text-gray-600">Untuk mencoba dan mengenal platform</p>
              <div className="mb-8 space-y-4">
                {freeFeatures.map((f) => (
                  <div key={f.text} className="flex items-center gap-3">
                    {f.included ? <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100"><Check className="h-4 w-4 text-green-600" /></div> : <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100"><X className="h-4 w-4 text-gray-400" /></div>}
                    <span className={f.included ? 'text-gray-900' : 'text-gray-400'}>{f.text}</span>
                  </div>
                ))}
              </div>
              <Button asChild variant="outline" className="w-full rounded-xl"><Link href="/daftar">Mulai Gratis</Link></Button>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
            <motion.div whileHover={{ scale: 1.02 }} className="relative h-full overflow-hidden rounded-3xl bg-gradient-to-br from-ps-primary via-blue-500 to-purple-500 p-[3px]">
              <div className="h-full rounded-[21px] bg-white p-8">
                <div className="mb-2 flex items-center gap-2"><span className="text-4xl">👑</span><span className="rounded-full bg-gradient-to-r from-ps-primary to-purple-500 px-3 py-1 text-xs font-bold text-white">RECOMMENDED</span></div>
                <h3 className="mb-2 text-2xl font-bold text-gray-900">Premium</h3>
                <p className="mb-6 text-gray-600">Untuk hasil maksimal & pengembangan diri</p>
                <div className="mb-8 space-y-4">
                  {premiumFeatures.map((f) => (
                    <div key={f.text} className="flex items-center gap-3"><div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100"><Check className="h-4 w-4 text-green-600" /></div><span className="text-gray-900">{f.text}</span></div>
                  ))}
                </div>
                <Button asChild className="w-full rounded-xl bg-gradient-to-r from-ps-primary to-purple-500 hover:opacity-90"><Link href="/daftar">Dapatkan Premium</Link></Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
