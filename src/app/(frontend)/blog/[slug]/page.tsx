import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { RichText } from '@payloadcms/richtext-lexical/react'
import { getPayload } from 'payload'

import type { Category } from '@/payload-types'
import config from '@/payload.config'

export const revalidate = 60

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

async function getPost(slug: string) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const result = await payload.find({
    collection: 'blog-posts',
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
    depth: 2,
    limit: 1,
  })

  return result.docs[0] ?? null
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) return { title: 'Nie znaleziono | BoosterAI' }

  return {
    title: post.seo?.metaTitle ?? `${post.title} | BoosterAI`,
    description: post.seo?.metaDescription ?? post.excerpt ?? undefined,
  }
}

export async function generateStaticParams() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const posts = await payload.find({
    collection: 'blog-posts',
    where: { status: { equals: 'published' } },
    limit: 1000,
    select: { slug: true },
  })

  return posts.docs.map((post) => ({ slug: post.slug }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) notFound()

  const formattedDate = post.publishedDate
    ? new Intl.DateTimeFormat('pl-PL', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(new Date(post.publishedDate))
    : null

  const coverImage =
    typeof post.coverImage === 'object' && post.coverImage !== null && 'url' in post.coverImage
      ? post.coverImage
      : null

  const categories = Array.isArray(post.categories)
    ? post.categories.filter((cat): cat is Category => typeof cat === 'object' && cat !== null)
    : []

  return (
    <article className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors mb-8"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
            role="img"
          >
            <title>Wstecz</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Wróć do bloga
        </Link>

        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((cat) => (
              <span
                key={cat.id}
                className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full"
              >
                {cat.name}
              </span>
            ))}
          </div>
        )}

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
          {post.title}
        </h1>

        {formattedDate && <p className="mt-4 text-gray-500">{formattedDate}</p>}

        {coverImage?.url && (
          <div className="relative aspect-video w-full overflow-hidden rounded-xl mt-8">
            <Image
              src={coverImage.url}
              alt={coverImage.alt || post.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </div>
        )}

        {post.content && (
          <div className="mt-10 prose prose-lg prose-gray max-w-none">
            <RichText data={post.content} />
          </div>
        )}
      </div>
    </article>
  )
}
