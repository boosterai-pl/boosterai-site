import Link from 'next/link'
import type { Homepage } from '@/payload-types'

interface CollaborationBannerProps {
  data: Homepage['collaborationBanner']
}

export default function CollaborationBanner({ data }: CollaborationBannerProps) {
  if (!data) return null

  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-blue-600 to-blue-700">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl text-center">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white">{data.title}</h2>

          {data.ctaLabel && data.ctaUrl && (
            <Link
              href={data.ctaUrl}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              {data.ctaLabel}
              <svg
                className="w-5 h-5"
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
      </div>
    </section>
  )
}
