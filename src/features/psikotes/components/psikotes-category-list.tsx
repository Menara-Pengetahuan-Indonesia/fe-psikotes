'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Brain, Heart, Target, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const categories = [
  { icon: Brain, title: 'Tes Kepribadian', description: 'Kenali karakter unikmu dan temukan kekuatan tersembunyi dalam dirimu.', href: '/psikotes/kepribadian', color: 'bg-purple-100 text-purple-600', gradient: 'from-purple-500 to-pink-500' },
  { icon: Target, title: 'Tes Minat Karir', description: 'Temukan jalur karir yang paling cocok dengan passion dan bakatmu.', href: '/psikotes/karir', color: 'bg-ps-muted text-ps-primary', gradient: 'from-ps-primary to-blue-400' },
  { icon: Heart, title: 'Tes Kesehatan Mental', description: 'Cek kondisi kesehatan mentalmu dan dapatkan insight untuk self-care.', href: '/psikotes/mental', color: 'bg-green-100 text-green-600', gradient: 'from-green-500 to-emerald-400' },
]

export function PsikotesCategoryList() {
  return (
    <section id="kategori" className="bg-gray-50/50 px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Pilih Tes yang Kamu Butuhkan ✨</h2>
          <p className="mx-auto max-w-2xl text-gray-600">Setiap tes dirancang dengan penuh cinta untuk membantumu memahami diri lebih baik</p>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }} className="grid gap-6 md:grid-cols-3">
          {categories.map((cat) => (
            <motion.div key={cat.title} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}>
              <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.3 }}>
                <Card className="group h-full cursor-pointer overflow-hidden rounded-3xl border-0 bg-white shadow-sm hover:shadow-xl">
                  <CardContent className="flex h-full flex-col items-center p-8 text-center">
                    <motion.div whileHover={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 0.5 }} className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${cat.color}`}><cat.icon className="h-8 w-8" /></motion.div>
                    <h3 className="mb-3 text-xl font-bold text-gray-900">{cat.title}</h3>
                    <p className="mb-6 flex-1 text-sm text-gray-600">{cat.description}</p>
                    <Button asChild className={`w-full rounded-xl bg-gradient-to-r ${cat.gradient} text-white shadow-md hover:opacity-90`}><Link href={cat.href}>Mulai Tes <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
