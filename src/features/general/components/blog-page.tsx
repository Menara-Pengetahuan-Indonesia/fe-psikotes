import { cn } from '@/lib/utils'

import { BlogHeroSection } from './blog-hero-section'
import { BlogCard } from './blog-card'
import { BLOG_POSTS } from './blog-constants'

export function BlogPage() {
  return (
    <main>
      <BlogHeroSection />

      {/* Blog Grid */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div
            className={cn(
              'grid sm:grid-cols-2 lg:grid-cols-3',
              'gap-8',
            )}
          >
            {BLOG_POSTS.map((post) => (
              <BlogCard key={post.title} post={post} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
