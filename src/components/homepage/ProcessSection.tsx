import type { Homepage } from '@/payload-types'

interface ProcessSectionProps {
  data: Homepage['processSteps']
}

export default function ProcessSection({ data }: ProcessSectionProps) {
  if (!data) return null
  const steps = data.steps ?? []

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        {data.sectionTitle && (
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
            {data.sectionTitle}
          </h2>
        )}

        {steps.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                {step.number && (
                  <div className="text-7xl md:text-8xl font-bold text-blue-100 mb-4">
                    {step.number}
                  </div>
                )}

                {step.title && (
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                )}

                {step.description && (
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                )}

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <svg
                      className="w-8 h-8 text-blue-400"
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
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
