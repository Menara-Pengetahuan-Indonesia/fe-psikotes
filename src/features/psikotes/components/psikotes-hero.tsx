'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

export function PsikotesHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-ps-muted via-white to-purple-50 px-6 py-16 md:py-24">
      {/* Floating blobs */}
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -right-20 top-20 h-72 w-72 rounded-full bg-ps-primary/10 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -left-20 bottom-20 h-64 w-64 rounded-full bg-purple-400/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        {/* Left - Copy */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-ps-primary shadow-sm"
          >
            <Sparkles className="h-4 w-4" />
            Yuk, kenali dirimu lebih dalam!
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl"
          >
            Temukan{' '}
            <span className="bg-gradient-to-r from-ps-primary to-purple-500 bg-clip-text text-transparent">
              Potensi Terbaikmu
            </span>{' '}
            Hari Ini
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            Psikotes yang menyenangkan dan mudah dipahami. Bukan untuk menghakimi, tapi untuk membantumu berkembang. 🌱
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild size="lg" className="rounded-2xl bg-ps-primary px-8 text-base shadow-lg shadow-ps-primary/25 hover:bg-ps-primary/90">
                <Link href="/daftar">
                  Mulai Gratis <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
            <Button asChild variant="outline" size="lg" className="rounded-2xl text-base">
              <Link href="#kategori">Lihat Jenis Tes</Link>
            </Button>
          </motion.div>
        </div>

        {/* Right - Illustration */}
        <div className="relative flex items-center justify-center">
          <div className="relative h-72 w-72 md:h-96 md:w-96">
            {/* Animated circles */}
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-0 top-0 h-48 w-48 rounded-3xl bg-gradient-to-br from-ps-primary to-blue-400 opacity-80"
            />
            <motion.div
              animate={{ scale: [1, 1.15, 1], rotate: [0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-0 right-0 h-56 w-56 rounded-3xl bg-gradient-to-br from-purple-400 to-pink-300 opacity-70"
            />
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-1/4 top-1/4 h-32 w-32 rounded-2xl bg-white shadow-xl"
            />
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-1/4 right-1/4 h-20 w-20 rounded-full bg-green-400 opacity-80"
            />
            {/* Center emoji */}
            <motion.div
              animate={{ y: [0, -8, 0], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-white text-5xl shadow-lg"
            >
              🧠
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
