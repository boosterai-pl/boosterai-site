import HeroSection from '@/components/homepage/HeroSection'
import ProcessSection from '@/components/homepage/ProcessSection'
import ServicesSection from '@/components/homepage/ServicesSection'
import UseCasesPreview from '@/components/homepage/UseCasesPreview'
import config from '@/payload.config'
import { getPayload } from 'payload'

export const revalidate = 60

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const homepage = await payload.findGlobal({
    slug: 'homepage',
    depth: 2,
  })

  return (
    <>
      {/* id="home" lives inside HeroSection */}
      <HeroSection data={homepage.hero} />

      {/* id="uslugi" — both service sections share this anchor */}
      <div id="uslugi">
        <ServicesSection data={homepage.salesBooster} sectionId="sales-booster" />
        <ServicesSection data={homepage.aiBooster} sectionId="ai-booster" />
      </div>

      <ProcessSection data={homepage.processSteps} />

      {/* id="use-cases" */}
      <div id="use-cases">
        <UseCasesPreview data={homepage.useCasesSection} />
      </div>
    </>
  )
}
