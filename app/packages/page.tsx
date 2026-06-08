import type { Metadata } from 'next'
import { PageShell } from '../components/PageShell'
import { Pricing } from '../components/Pricing'
import { UrgencySection } from '../components/UrgencySection'
import { Contact } from '../components/Contact'

export const metadata: Metadata = {
  title: 'Packages & Investment — PhotoKecho',
  description: 'Three tiers, one standard of excellence. Essentials from $350, Luxe from $650, Prestige from $950. All built around South Asian celebrations.',
}

export default function Packages() {
  return (
    <PageShell
      title={`Three tiers.\nOne standard.`}
      subtitle="Every package is a promise, not a list of deliverables. Each one built around your specific celebration — not adapted from a generic template."
    >
      <Pricing />
      <UrgencySection />
      <Contact />
    </PageShell>
  )
}
