import Image from 'next/image'
import Link from 'next/link'

import type { BlogPost } from '@/payload-types'

interface BlogPostCardProps {
  post: BlogPost
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const formattedDate = post.publishedDate
    ? new Intl.DateTimeFormat('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' }).format(
        new Date(post.publishedDate),
      )
    : null

  const coverImage =
    typeof post.coverImage === 'object' && post.coverImage !== null && 'url' in post.coverImage
      ? post.coverImage
      : null

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="h-full bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all overflow-hidden">
        {coverImage?.url && (
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={coverImage.url}
              alt={coverImage.alt || post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-6">
          {formattedDate && <p className="text-sm text-gray-500 mb-2">{formattedDate}</p>}
          <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="text-gray-600 leading-relaxed line-clamp-3">{post.excerpt}</p>
          )}
        </div>
      </article>
    </Link>
  )
}
