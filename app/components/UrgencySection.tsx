'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

const E = [0.19,1,0.22,1] as [number,number,number,number]

// Urgency rewritten as emotional truths, not sales pressure
const TRUTHS = [
  {
    title: 'The setup you are imagining takes three weeks to build.',
    body: 'We do not arrive on the day with a van full of equipment and assemble something generic. Your backdrop, your draping, your florals, your props — every element is chosen and designed specifically for you. That process cannot be rushed. It should not be.',
    icon: '◈',
    accent: 'var(--saffron)',
  },
  {
    title: 'The most requested dates are gone by February.',
    body: 'June through October is South Asian wedding season in Chicago. The dates that fall on auspicious weekends — the ones every family is competing for — fill first. If your date is already set, do not assume we are available. We may not be.',
    icon: '◷',
    accent: 'var(--gold)',
  },
  {
    title: 'You will not be able to add this to the photographs later.',
    body: 'Everything else about your celebration — the flowers, the food, the dress — can be refined and adjusted. The photographs from that evening are permanent. They cannot be redesigned. They will be exactly what they are, on the night, in the room, as you built them.',
    icon: '✦',
    accent: 'var(--crimson)',
  },
]

export function UrgencySection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once:true, amount:.1 })
  return (
    <section ref={ref}
      style={{ padding:'var(--sy) var(--sx)', background:'var(--ink)' }}
      aria-labelledby="urgency-heading">
      <div className="si">
        <motion.div initial={{ opacity:0, y:26 }} animate={inView?{opacity:1,y:0}:{}}
          transition={{ duration:1.0, ease:E }}
          style={{ marginBottom:'clamp(48px,6vw,72px)' }}>
          <h2 id="urgency-heading" className="fs"
            style={{ fontSize:'var(--text-xl)', fontWeight:300, color:'var(--ivory)', letterSpacing:'-.01em', lineHeight:1.06, marginBottom:20 }}>
            Three things most brides<br/>
            <em style={{ fontStyle:'italic', color:'var(--gold-w)' }}>tell us they wish they'd known sooner.</em>
          </h2>
          <p className="fs" style={{ fontSize:'clamp(15px,1.4vw,18px)', fontStyle:'italic', color:'var(--dust)', lineHeight:1.8, maxWidth:560 }}>
            Not to pressure you. Because we genuinely wish someone had told us these things — and we believe you deserve to know them before you make any decision at all.
          </p>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:1, background:'rgba(255,255,255,.05)' }}>
          {TRUTHS.map(({ title, body, icon, accent }, i) => (
            <motion.div key={title}
              initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}}
              transition={{ duration:.9, ease:E, delay:.15+i*.1 }}
              style={{ background:'var(--ink)', padding:'clamp(32px,4vw,52px) clamp(24px,3.5vw,44px)', borderTop:`2px solid ${accent}` }}>
              <div className="fs" style={{ fontSize:28, color:'rgba(212,184,122,.38)', marginBottom:20 }}>{icon}</div>
              <h3 className="fs" style={{ fontSize:'clamp(18px,2.2vw,24px)', fontWeight:300, color:'var(--ivory)', lineHeight:1.35, marginBottom:18 }}>{title}</h3>
              <p className="fu" style={{ fontSize:14, fontWeight:300, color:'var(--dust)', lineHeight:1.92, fontStyle:'italic' }}>{body}</p>
            </motion.div>
          ))}
        </div>

        {/* The quiet, honest close */}
        <motion.div initial={{ opacity:0 }} animate={inView?{opacity:1}:{}}
          transition={{ duration:.9, ease:E, delay:.65 }}
          style={{ marginTop:'clamp(48px,6vw,72px)', textAlign:'center' }}>
          <p className="fs" style={{ fontSize:'clamp(18px,2.4vw,26px)', fontWeight:300, fontStyle:'italic', color:'var(--veil)', lineHeight:1.88, maxWidth:640, margin:'0 auto', marginBottom:36 }}>
            We are not asking you to book today.<br/>
            We are asking you to find out if your date is still available.
          </p>
          <Link href="#contact" className="btn btn-gold">
            Check your date
            <span className="arr" aria-hidden="true" style={{ background:'var(--ink)' } as React.CSSProperties}/>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
