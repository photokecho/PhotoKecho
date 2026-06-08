'use client'
import Link from 'next/link'
import Image from 'next/image'

const INSTA = 'https://www.instagram.com/photokecho?igsh=Z2Fodm9hbHNyM3l6&utm_source=qr'

const COLS = [
  {
    heading: 'Celebrations',
    links: [
      { l: 'Mehndi Nights',    h: '/#events', ext: false },
      { l: 'Nikkah Ceremonies',h: '/#events', ext: false },
      { l: 'Walima Receptions',h: '/#events', ext: false },
      { l: 'Sangeet Nights',   h: '/#events', ext: false },
      { l: 'Eid & Community',  h: '/#events', ext: false },
    ],
  },
  {
    heading: 'Studio',
    links: [
      { l: 'About Us',          h: '/about',    ext: false },
      { l: 'Packages',          h: '/packages', ext: false },
      { l: 'Design a Backdrop', h: '/build',    ext: false },
    ],
  },
  {
    heading: 'Contact',
    links: [
      { l: 'Book Now',               h: '/contact',                        ext: false },
      { l: 'Photokecho@gmail.com',   h: 'mailto:Photokecho@gmail.com',     ext: false },
      { l: '+1 (312) 675-4890',      h: 'tel:+13126754890',                ext: false },
      { l: '📸 Instagram',           h: INSTA,                             ext: true  },
    ],
  },
]

export function Footer() {
  return (
    <footer
      style={{ padding: 'clamp(56px,7vw,80px) var(--sx) clamp(32px,4vw,48px)', borderTop: '1px solid var(--ivory-3)', background: 'var(--ivory)' }}
      role="contentinfo">
      <div style={{ maxWidth: 'var(--cmax)', margin: '0 auto' }}>
        <div className="fcols" style={{ marginBottom: 'clamp(40px,6vw,64px)' }}>
          <div>
            <Link href="/" aria-label="PhotoKecho home"
              style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', marginBottom: 18 }}>
              <Image src="/logo.png" alt="PhotoKecho" width={56} height={56} style={{ objectFit:'contain' }}/>
            </Link>
            <p className="fs" style={{ fontSize: 14, fontStyle: 'italic', color: 'var(--dust)', lineHeight: 1.95, maxWidth: 280 }}>
              Chicago&apos;s photo booth studio for South Asian celebrations. Serving Chicago and surrounding areas since 2023.
            </p>
            {/* Instagram CTA */}
            <a href={INSTA} target="_blank" rel="noopener noreferrer"
              style={{ display:'inline-flex', alignItems:'center', gap:8, marginTop:20, textDecoration:'none', padding:'10px 16px', border:'1px solid rgba(184,146,42,.3)', transition:'border-color .3s, background .3s' }}
              onMouseEnter={e=>{ e.currentTarget.style.borderColor='var(--gold)'; e.currentTarget.style.background='rgba(184,146,42,.05)' }}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor='rgba(184,146,42,.3)'; e.currentTarget.style.background='transparent' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
              <span className="fd" style={{ fontSize:10, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--gold-2)' }}>@photokecho</span>
            </a>
          </div>

          {COLS.map(col => (
            <nav key={col.heading} aria-label={`${col.heading} links`}>
              <h3 className="fd" style={{ fontSize: 11, letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 22, fontWeight: 400 }}>
                {col.heading}
              </h3>
              <ul style={{ listStyle: 'none' }}>
                {col.links.map(({ l, h, ext }) => (
                  <li key={l} style={{ marginBottom: 12 }}>
                    <Link href={h}
                      target={ext ? '_blank' : undefined}
                      rel={ext ? 'noopener noreferrer' : undefined}
                      className="fs"
                      style={{ fontSize: 14, fontStyle: 'italic', color: 'var(--dust)', textDecoration: 'none', transition: 'color .3s', display: 'block', padding: '2px 0', minHeight: 28 }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--dust)')}>
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div style={{ paddingTop: 28, borderTop: '1px solid var(--ivory-3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <small className="fu" style={{ fontSize: 11, color: 'var(--dust)', fontWeight: 200, letterSpacing: '.08em' }}>
            © 2024 PhotoKecho. All rights reserved.
          </small>
          <span className="fu" style={{ fontSize: 11, color: 'var(--dust)', fontWeight: 200, letterSpacing: '.1em', fontStyle: 'italic' }}>
            Chicago, IL
          </span>
        </div>
      </div>
    </footer>
  )
}
