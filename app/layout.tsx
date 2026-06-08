import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Cursor } from './components/Cursor'

export const metadata: Metadata = {
  title: 'PhotoKecho — For the Celebration You Have Always Imagined',
  description: 'The only luxury photo booth studio in Chicago built exclusively for South Asian celebrations. Mehndis, nikkahs, walimas, sangeet — designed for the day your family will describe forever.',
  keywords: 'south asian photo booth, mehndi photo booth, walima photo booth, luxury wedding chicago, south asian wedding chicago',
  openGraph: {
    title: 'PhotoKecho — She will look at this photograph for fifty years.',
    description: 'For the South Asian celebration that will be talked about for the rest of your family\'s life.',
    type: 'website',
  },
}
export const viewport: Viewport = { width:'device-width', initialScale:1, themeColor:'#FAF7F0' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-nav">Skip to main content</a>
        <Cursor />
        {children}
      </body>
    </html>
  )
}
