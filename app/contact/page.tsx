import type { Metadata } from 'next'
import { PageShell } from '../components/PageShell'
import { Contact } from '../components/Contact'

export const metadata: Metadata = {
  title: 'Reserve a Date — PhotoKecho',
  description: 'Tell us about the day you have been imagining. We respond within 24 hours.',
}

export default function ContactPage() {
  return (
    <PageShell
      title="Tell us about the day you have been imagining."
      subtitle="Every enquiry is read by a real person who has been to hundreds of South Asian celebrations. We are not a booking form. We are a conversation."
    >
      <Contact />
    </PageShell>
  )
}
