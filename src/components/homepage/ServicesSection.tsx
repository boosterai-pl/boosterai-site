import Image from 'next/image'
import type { Homepage } from '@/payload-types'

interface ServicesSectionProps {
  data: Homepage['salesBooster'] | Homepage['aiBooster']
  variant?: 'sales' | 'ai'
}

export default function ServicesSection({ data, variant = 'sales' }: ServicesSectionProps) {
  const bgColor = variant === 'sales' ? 'bg-white' : 'bg-gray-50'
  const accentColor = variant === 'sales' ? 'text-blue-600' : 'text-purple-600'

  return (
    <section className={`py-16 md:py-24 ${bgColor}`}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          {data?.sectionTitle && (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {data.sectionTitle}
            </h2>
          )}
          {data?.sectionSubtitle && (
            <div className="text-lg text-gray-600 max-w-3xl mx-auto">
              {/* Rich text content - will be enhanced later */}
              <p>{JSON.stringify(data.sectionSubtitle)}</p>
            </div>
          )}
        </div>

        {/* Services Grid */}
        {data?.services && data.services.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.services.map((service, index) => (
              <div
                key={index}
                className="group p-6 bg-white rounded-xl shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300"
              >
                {/* Icon */}
                {service.icon && typeof service.icon === 'object' && (
                  <div className="mb-4 relative w-16 h-16">
                    <Image
                      src={service.icon.url || ''}
                      alt={service.icon.alt || service.title || 'Service icon'}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}

                {/* Title */}
                {service.title && (
                  <h3
                    className={`text-xl font-semibold text-gray-900 mb-3 group-hover:${accentColor} transition-colors`}
                  >
                    {service.title}
                  </h3>
                )}

                {/* Description */}
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
