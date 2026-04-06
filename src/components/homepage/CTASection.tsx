import Link from 'next/link'
import type { Homepage } from '@/payload-types'

interface CTASectionProps {
  data: Homepage['cta']
}

export default function CTASection({ data }: CTASectionProps) {
  if (!data?.headline) return null

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl relative z-10">
        <div className="text-center">
          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8">
            {data.headline}
          </h2>

          {/* CTA Button */}
          {data.ctaLabel && data.ctaUrl && (
            <Link
              href={data.ctaUrl}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
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
          )}
        </div>
      </div>
    </section>
  )
}
