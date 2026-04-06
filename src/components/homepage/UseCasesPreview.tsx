import Image from 'next/image'
import Link from 'next/link'
import type { Homepage, UseCase } from '@/payload-types'

interface UseCasesPreviewProps {
  data: Homepage['useCasesSection']
}

const isUseCase = (value: unknown): value is UseCase => {
  if (!value || typeof value !== 'object') return false
  const candidate = value as Partial<UseCase>
  return typeof candidate.id === 'number' && typeof candidate.slug === 'string'
}

export default function UseCasesPreview({ data }: UseCasesPreviewProps) {
  if (!data || !data.featuredCases || data.featuredCases.length === 0) return null
  const cases = data.featuredCases.filter(isUseCase)
  if (cases.length === 0) return null

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        {data.sectionTitle && (
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            {data.sectionTitle}
          </h2>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cases.map((useCase) => {
            return (
              <Link
                key={useCase.id}
                href={`/use-cases/${useCase.slug}`}
                className="group block bg-gray-50 rounded-xl overflow-hidden border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all"
              >
                {useCase.coverImage &&
                  typeof useCase.coverImage === 'object' &&
                  useCase.coverImage.url && (
                    <div className="relative aspect-video bg-gray-200">
                      <Image
                        src={useCase.coverImage.url}
                        alt={useCase.coverImage.alt || useCase.title || ''}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )}

                <div className="p-6">
                  {useCase.category && typeof useCase.category === 'object' && (
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full mb-3">
                      {useCase.category.name}
                    </span>
                  )}

                  {useCase.title && (
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {useCase.title}
                    </h3>
                  )}

                  {useCase.client && (
                    <p className="text-gray-600 leading-relaxed mb-4">Klient: {useCase.client}</p>
                  )}

                  <div className="flex items-center gap-2 text-blue-600 font-medium">
                    <span>Dowiedz się więcej</span>
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
