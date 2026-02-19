import { Sparkles, Calendar, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

import type { BlogPost } from './blog-constants'

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <div
      className={cn(
        'rounded-3xl border',
        'border-slate-200 overflow-hidden',
        'bg-white hover:-translate-y-1',
        'hover:shadow-xl transition-all',
        'duration-300 group cursor-pointer',
      )}
    >
      <div
        className={cn(
          'aspect-video bg-slate-100',
          'flex items-center',
          'justify-center',
        )}
      >
        <div
          className={cn(
            'w-16 h-16 rounded-2xl',
            'bg-slate-200 flex',
            'items-center justify-center',
          )}
        >
          <Sparkles
            className={cn(
              'w-6 h-6',
              'text-slate-400',
            )}
          />
        </div>
      </div>
      <div className="p-6 space-y-3">
        <Badge
          variant="secondary"
          className={cn(
            'bg-secondary/10',
            'text-secondary',
            'hover:bg-secondary/15',
            'font-bold',
          )}
        >
          {post.category}
        </Badge>
        <h3
          className={cn(
            'font-black text-lg',
            'text-slate-900',
            'group-hover:text-secondary',
            'transition-colors',
            'line-clamp-2',
          )}
        >
          {post.title}
        </h3>
        <p
          className={cn(
            'text-slate-500 text-sm',
            'leading-relaxed',
            'line-clamp-2',
          )}
        >
          {post.excerpt}
        </p>
        <div
          className={cn(
            'flex items-center gap-4',
            'text-xs text-slate-400 pt-2',
          )}
        >
          <span
            className={cn(
              'flex items-center',
              'gap-1',
            )}
          >
            <Calendar className="w-3.5 h-3.5" />
            {post.date}
          </span>
          <span
            className={cn(
              'flex items-center',
              'gap-1',
            )}
          >
            <User className="w-3.5 h-3.5" />
            {post.author}
          </span>
        </div>
      </div>
    </div>
  )
}
