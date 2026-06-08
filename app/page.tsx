import { Navigation }     from './components/Navigation'
import { Hero }           from './components/Hero'
import { Ticker, Manifesto } from './components/Ticker'
import { ProofSection }   from './components/ProofSection'
import { CompareSection } from './components/CompareSection'
import { Services }       from './components/Services'
import { Testimonial }    from './components/Testimonial'
import { Pricing }        from './components/Pricing'
import { UrgencySection } from './components/UrgencySection'
import { CloseSection }   from './components/CloseSection'
import { Contact }        from './components/Contact'
import { Footer }         from './components/Footer'

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <Ticker />
      <Manifesto />
      <ProofSection />
      <CompareSection />
      <Services />
      <Testimonial />
      <Pricing />
      <UrgencySection />
      <CloseSection />
      <Contact />
      <Footer />
    </main>
  )
}
