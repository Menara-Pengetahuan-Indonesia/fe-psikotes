'use client'

import { useState } from 'react'
import { Sparkles, Calendar, User, BookOpen, X, Construction } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BLOG_POSTS, type BlogPost } from '../constants'

const CATEGORIES = ['Semua', ...Array.from(new Set(BLOG_POSTS.map(p => p.category)))]

export function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

  const filtered = activeCategory === 'Semua'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(p => p.category === activeCategory)

  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50/50 via-white to-white pt-32 pb-20">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-sky-100/50 rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-accent-100/30 rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-100">
            <BookOpen className="w-4 h-4 text-sky-600" />
            <span className="text-xs font-black text-sky-700 uppercase tracking-widest">Blog</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-[0.95]">
            Blog & <span className="text-sky-500 italic">Artikel</span>
          </h1>

          <p className="text-gray-500 font-medium max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Wawasan terbaru seputar psikologi, kesehatan mental, dan pengembangan diri dari para ahli kami.
          </p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="relative overflow-hidden py-16">
        <div className="absolute top-[-8%] left-[-6%] w-[350px] h-[350px] bg-primary-100/30 rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'px-5 py-2.5 rounded-full text-xs font-bold transition-all border',
                  activeCategory === cat
                    ? 'bg-sky-500 border-sky-500 text-white shadow-lg shadow-sky-500/20'
                    : 'bg-white border-slate-200 text-slate-500 hover:border-sky-300 hover:text-sky-600'
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <button
                key={post.title}
                onClick={() => setSelectedPost(post)}
                className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden text-left flex flex-col"
              >
                <div className="aspect-[16/9] bg-gradient-to-br from-sky-50 to-primary-50 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-2xl bg-white/80 flex items-center justify-center shadow-sm">
                    <Sparkles className="w-6 h-6 text-sky-400" />
                  </div>
                </div>

                <div className="p-6 flex-1 space-y-3">
                  <span className="inline-block px-3 py-1 rounded-full bg-sky-50 text-sky-600 text-[10px] font-bold uppercase tracking-wider">
                    {post.category}
                  </span>
                  <h3 className="font-bold text-lg text-slate-900 leading-tight group-hover:text-sky-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" /> {post.author}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative p-8 md:p-12 rounded-[3rem] bg-gradient-to-r from-sky-500 to-primary-600 shadow-2xl overflow-hidden">
            <div className="relative z-10 text-center space-y-6">
              <Sparkles className="w-10 h-10 text-accent-300 mx-auto" />
              <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-tight">
                Punya Topik <span className="text-accent-300 italic">Menarik?</span>
              </h2>
              <p className="text-white/80 font-medium text-sm md:text-base max-w-xl mx-auto">
                Kami terbuka untuk kolaborasi. Jika kamu seorang psikolog atau penulis yang ingin berbagi wawasan, hubungi tim editorial kami.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popup Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setSelectedPost(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center space-y-5">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
            >
              <X className="w-4 h-4 text-slate-500" />
            </button>

            <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto">
              <Construction className="w-8 h-8 text-amber-500" />
            </div>

            <h3 className="text-xl font-black text-slate-900">{selectedPost.title}</h3>

            <p className="text-slate-500 text-sm leading-relaxed">
              Artikel ini sedang dalam proses penulisan dan belum tersedia untuk dibaca. Nantikan segera ya!
            </p>

            <div className="pt-2">
              <button
                onClick={() => setSelectedPost(null)}
                className="px-8 h-12 rounded-xl bg-primary-600 text-white text-sm font-bold hover:bg-primary-700 transition-colors"
              >
                Oke, Mengerti
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
