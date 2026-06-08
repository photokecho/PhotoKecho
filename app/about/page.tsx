import type { Metadata } from 'next'
import { PageShell } from '../components/PageShell'
import { AboutContent } from '../components/AboutContent'

export const metadata: Metadata = {
  title: 'About — PhotoKecho',
  description: 'PhotoKecho is the only luxury photo booth studio in Chicago built exclusively for South Asian celebrations. We have been honoured to hold 500+ celebrations.',
}

export default function About() {
  return (
    <PageShell
      title="We build the frame that holds the feeling."
      subtitle="PhotoKecho exists for one reason: because every South Asian family deserves a celebration that is captured the way it actually felt."
    >
      <AboutContent />
    </PageShell>
  )
}
