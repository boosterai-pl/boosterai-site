import Link from 'next/link'
import type { Homepage } from '@/payload-types'

interface CTASectionProps {
  data: Homepage['cta']
}

export default function CTASection({ data }: CTASectionProps) {
  if (!data) return null

  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl text-center">
        {data.headline && (
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 max-w-3xl mx-auto">
            {data.headline}
          </h2>
        )}

        {data.ctaLabel && data.ctaUrl && (
          <Link
            href={data.ctaUrl}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-lg hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all"
          >
            {data.ctaLabel}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        )}
      </div>
    </section>
  )
}
