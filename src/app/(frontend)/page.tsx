import CollaborationBanner from '@/components/homepage/CollaborationBanner'
import CTASection from '@/components/homepage/CTASection'
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
      <HeroSection data={homepage.hero} />

      <ServicesSection data={homepage.salesBooster} sectionId="sales-booster" />

      <ServicesSection data={homepage.aiBooster} sectionId="ai-booster" />

      <CollaborationBanner data={homepage.collaborationBanner} />

      <ProcessSection data={homepage.processSteps} />

      <UseCasesPreview data={homepage.useCasesSection} />

      <CTASection data={homepage.cta} />
    </>
  )
}
