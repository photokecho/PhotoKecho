import type { Metadata } from 'next'
import { BuildConfigurator } from '../components/BuildConfigurator'
import { Navigation } from '../components/Navigation'
import { Footer } from '../components/Footer'

export const metadata: Metadata = {
  title: 'Design Your Setup — PhotoKecho',
  description: 'Build your dream backdrop. Choose your wall, draping colour, florals, furniture, and booth style — see it update live.',
}

export default function BuildPage() {
  return (
    <>
      <Navigation />
      <main id="main-content" style={{ paddingTop: 80 }}>
        <BuildConfigurator />
      </main>
      <Footer />
    </>
  )
}
