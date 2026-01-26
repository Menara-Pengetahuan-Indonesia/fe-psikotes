'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function PsikotesCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-ps-primary via-blue-500 to-purple-500 px-6 py-16 md:py-24">
      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity }} className="absolute -right-20 top-0 h-96 w-96 rounded-full bg-white/20 blur-3xl" />
      <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 10, repeat: Infinity }} className="absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-white/20 blur-3xl" />
      <div className="relative mx-auto max-w-3xl text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Siap Memulai Perjalananmu? 🚀</h2>
          <p className="mb-8 text-lg text-white/90">Yuk, kenali dirimu lebih dalam dan temukan potensi terbaikmu hari ini!</p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild size="lg" className="rounded-2xl bg-white px-8 text-lg text-ps-primary shadow-xl hover:bg-white/90">
              <Link href="/daftar">Mulai Psikotes Sekarang <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
