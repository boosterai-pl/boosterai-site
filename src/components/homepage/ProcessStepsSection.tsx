import type { Homepage } from '@/payload-types'

interface ProcessStepsSectionProps {
  data: Homepage['processSteps']
}

export default function ProcessStepsSection({ data }: ProcessStepsSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        {data?.sectionTitle && (
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              {data.sectionTitle}
            </h2>
          </div>
        )}

        {/* Steps */}
        {data?.steps && data.steps.length > 0 && (
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-blue-200" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {data.steps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Step Number Circle */}
                  <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white text-3xl font-bold shadow-lg relative z-10">
                    {step.number || index + 1}
                  </div>

                  {/* Step Content */}
                  <div className="text-center">
                    {step.title && (
                      <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
                        {step.title}
                      </h3>
                    )}
                    {step.description && (
                      <p className="text-gray-600 leading-relaxed">{step.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
