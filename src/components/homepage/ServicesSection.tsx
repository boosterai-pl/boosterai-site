import Image from 'next/image'
import type { Homepage } from '@/payload-types'

const extractLexicalText = (value: unknown): string => {
  if (!value || typeof value !== 'object') return ''

  const collect = (node: unknown): string => {
    if (!node || typeof node !== 'object') return ''

    const current = node as { text?: string; children?: unknown[] }
    const ownText = typeof current.text === 'string' ? current.text : ''
    const childrenText = Array.isArray(current.children)
      ? current.children.map((child) => collect(child)).join(' ')
      : ''

    return `${ownText} ${childrenText}`.trim()
  }

  const lexical = value as { root?: unknown }
  const root = lexical.root ?? value

  return collect(root).replace(/\s+/g, ' ').trim()
}

interface ServicesSectionProps {
  data: Homepage['salesBooster'] | Homepage['aiBooster']
  sectionId?: string
}

export default function ServicesSection({ data, sectionId }: ServicesSectionProps) {
  if (!data) return null
  const subtitle = extractLexicalText(data.sectionSubtitle)

  return (
    <section id={sectionId} className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        {data.sectionTitle && (
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            {data.sectionTitle}
          </h2>
        )}

        {subtitle && (
          <div className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            <p>{subtitle}</p>
          </div>
        )}

        {data.services && data.services.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {data.services.map((service, index) => (
              <div
                key={service.id || index}
                className="p-6 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all"
              >
                {service.icon && typeof service.icon === 'object' && service.icon.url && (
                  <div className="w-16 h-16 mb-4 relative">
                    <Image
                      src={service.icon.url}
                      alt={service.icon.alt || service.title || 'Service icon'}
                      fill
                      className="object-contain"
                      sizes="64px"
                    />
                  </div>
                )}

                {service.title && (
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{service.title}</h3>
                )}

                {service.description && (
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
