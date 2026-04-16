import type { Metadata } from 'next'

import { getPayload } from 'payload'

import BlogPostCard from '@/components/blog/BlogPostCard'
import config from '@/payload.config'

export const metadata: Metadata = {
  title: 'Blog | BoosterAI',
  description: 'Artykuły i aktualności ze świata AI i automatyzacji.',
}

export const revalidate = 60

export default async function BlogPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const posts = await payload.find({
    collection: 'blog-posts',
    where: { status: { equals: 'published' } },
    sort: '-publishedDate',
    depth: 1,
    limit: 100,
  })

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Blog</h1>
        <p className="text-lg text-gray-600 mb-12">
          Artykuły i aktualności ze świata AI i automatyzacji.
        </p>

        {posts.docs.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">Brak artykułów. Wróć wkrótce.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {posts.docs.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
