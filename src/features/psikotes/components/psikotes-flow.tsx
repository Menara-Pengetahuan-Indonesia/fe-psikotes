'use client'

import { motion } from 'framer-motion'

const steps = [
  { number: 1, title: 'Pilih Tes', description: 'Pilih jenis tes sesuai kebutuhanmu', emoji: '👆' },
  { number: 2, title: 'Kerjakan', description: 'Jawab dengan jujur, santai aja!', emoji: '✍️' },
  { number: 3, title: 'Lihat Hasil', description: 'Dapatkan insight secara instan', emoji: '📊' },
  { number: 4, title: 'Berkembang', description: 'Gunakan untuk jadi lebih baik', emoji: '🚀' },
]

export function PsikotesFlow() {
  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Semudah 1, 2, 3, 4! 🎯</h2>
          <p className="mx-auto max-w-2xl text-gray-600">Proses yang simpel dan menyenangkan untuk mengenal dirimu</p>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }} className="hidden md:block">
          <div className="relative flex items-start justify-between">
            <div className="absolute left-0 right-0 top-12 border-t-2 border-dashed border-ps-primary/30"></div>
            {steps.map((step, i) => (
              <motion.div key={step.number} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} className="relative flex w-1/4 flex-col items-center text-center">
                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }} className="relative z-10 mb-4 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-ps-primary to-blue-400 text-4xl shadow-lg">{step.emoji}</motion.div>
                <h3 className="mb-2 text-lg font-bold text-gray-900">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }} className="md:hidden">
          <div className="relative space-y-8 pl-12">
            <div className="absolute bottom-0 left-5 top-0 border-l-2 border-dashed border-ps-primary/30"></div>
            {steps.map((step) => (
              <motion.div key={step.number} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} className="relative flex items-start gap-4">
                <motion.div whileHover={{ scale: 1.1 }} className="absolute -left-12 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-ps-primary to-blue-400 text-xl">{step.emoji}</motion.div>
                <div><h3 className="font-bold text-gray-900">{step.title}</h3><p className="text-sm text-gray-600">{step.description}</p></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
