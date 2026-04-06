import Link from 'next/link'
import Image from 'next/image'
import type { Homepage, UseCase } from '@/payload-types'

interface UseCasesSectionProps {
  data: Homepage['useCasesSection']
}

export default function UseCasesSection({ data }: UseCasesSectionProps) {
  if (!data?.featuredCases || data.featuredCases.length === 0) return null

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        {data.sectionTitle && (
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              {data.sectionTitle}
            </h2>
          </div>
        )}

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.featuredCases.map((caseItem, index) => {
            const useCase = typeof caseItem === 'object' ? (caseItem as UseCase) : null
            if (!useCase) return null

            return (
              <Link
                key={useCase.id || index}
                href={`/use-cases/${useCase.slug}`}
                className="group block bg-white rounded-xl shadow-sm hover:shadow-xl overflow-hidden transition-all duration-300"
              >
                {/* Cover Image */}
                {useCase.coverImage && typeof useCase.coverImage === 'object' && (
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={useCase.coverImage.url || ''}
                      alt={useCase.coverImage.alt || useCase.title || 'Use case'}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  {/* Category Tag */}
                  {useCase.category && typeof useCase.category === 'object' && (
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full mb-3">
                      {useCase.category.name}
                    </span>
                  )}

                  {/* Title */}
                  {useCase.title && (
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {useCase.title}
                    </h3>
                  )}

                  {/* Client */}
                  {useCase.client && (
                    <p className="text-gray-600 leading-relaxed mb-4">Klient: {useCase.client}</p>
                  )}

                  {/* Read More Link */}
                  <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                    <span>Czytaj więcej</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            href="/use-cases"
            className="inline-flex items-center gap-2 px-6 py-3 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
          >
            Zobacz wszystkie wdrożenia
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
      </div>
    </section>
  )
}
