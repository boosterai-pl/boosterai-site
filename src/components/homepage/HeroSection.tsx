import Image from 'next/image'
import Link from 'next/link'
import type { Homepage } from '@/payload-types'

interface HeroSectionProps {
  data: Homepage['hero']
}

export default function HeroSection({ data }: HeroSectionProps) {
  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 bg-gradient-to-br from-blue-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              {data?.headline || 'Booster 🚀'}
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI & Automation Agency
              </span>
            </h1>

            {data?.subheadline && (
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
                {data.subheadline}
              </p>
            )}

            {/* Badge */}
            {(data?.badgeText || data?.badgeSubtext) && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200 mb-8">
                <span className="text-2xl">✨</span>
                <div className="text-left">
                  {data.badgeText && (
                    <p className="text-sm font-semibold text-gray-900">{data.badgeText}</p>
                  )}
                  {data.badgeSubtext && (
                    <p className="text-xs text-gray-600">{data.badgeSubtext}</p>
                  )}
                </div>
              </div>
            )}

            {/* CTA Button */}
            {data?.ctaLabel && data?.ctaUrl && (
              <Link
                href={data.ctaUrl}
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
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

          {/* Illustration */}
          {data?.illustration && typeof data.illustration === 'object' && (
            <div className="relative h-64 md:h-96 lg:h-[500px]">
              <Image
                src={data.illustration.url || ''}
                alt={data.illustration.alt || 'Hero illustration'}
                fill
                priority
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
