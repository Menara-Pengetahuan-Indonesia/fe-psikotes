'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export function PsikotesFooter() {
  return (
    <motion.footer initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="border-t bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-lg font-bold text-gray-900">Psikotest Platform</h3>
            <p className="text-sm text-gray-600">Platform psikologi terpercaya untuk membantu kamu mengenal diri dan berkembang lebih baik.</p>
          </div>
          <div className="flex flex-col gap-4 md:items-end">
            <div className="flex gap-6">
              <Link href="/tentang" className="text-sm text-gray-600 hover:text-ps-primary">Tentang</Link>
              <Link href="/privasi" className="text-sm text-gray-600 hover:text-ps-primary">Privasi</Link>
              <Link href="/kontak" className="text-sm text-gray-600 hover:text-ps-primary">Kontak</Link>
            </div>
            <p className="text-xs text-gray-500">© {new Date().getFullYear()} Psikotest Indonesia. All rights reserved.</p>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
