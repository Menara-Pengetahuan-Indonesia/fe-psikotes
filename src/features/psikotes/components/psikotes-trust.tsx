'use client'

import { motion } from 'framer-motion'

const trustItems = [
  { title: 'Bukan Diagnosis Klinis', description: 'Tes ini untuk pengembangan diri, bukan mendiagnosis kondisi medis.', emoji: '💚' },
  { title: 'Data Aman & Privat', description: 'Datamu terenkripsi dan tidak dibagikan tanpa izin.', emoji: '🔒' },
  { title: 'Untuk Berkembang', description: 'Hasil tes membantumu memahami dan mengembangkan diri.', emoji: '🌱' },
]

export function PsikotesTrust() {
  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Kamu Aman di Sini 🤗</h2>
          <p className="mx-auto max-w-2xl text-gray-600">Kami berkomitmen menjaga keamanan dan kenyamananmu</p>
        </motion.div>
        <div className="grid gap-8 md:grid-cols-3">
          {trustItems.map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex flex-col items-center rounded-3xl bg-gray-50 p-8 text-center">
              <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="mb-4 text-5xl">{item.emoji}</motion.div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
