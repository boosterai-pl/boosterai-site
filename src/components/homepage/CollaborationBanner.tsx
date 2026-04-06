import Link from 'next/link'
import type { Homepage } from '@/payload-types'

interface CollaborationBannerProps {
  data: Homepage['collaborationBanner']
}

export default function CollaborationBanner({ data }: CollaborationBannerProps) {
  if (!data?.title) return null

  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Title */}
          <div className="text-center md:text-left flex-1">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">{data.title}</h2>
          </div>

          {/* CTA Button */}
          {data.ctaLabel && data.ctaUrl && (
            <div className="flex-shrink-0">
              <Link
                href={data.ctaUrl}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                {data.ctaLabel}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
