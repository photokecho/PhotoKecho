'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

const E = [0.19, 1, 0.22, 1] as [number, number, number, number]

const STATS = [
  { n: '50+', label: 'Events completed',       sub: 'across Chicago & beyond'         },
  { n: '98%',  label: 'Would choose us again',   sub: 'when surveyed six months later'  },
  { n: '2023', label: 'Founded',                 sub: 'in Chicago, Illinois'            },
  { n: '4',    label: 'Signature booth styles',  sub: 'each designed for a distinct occasion' },
]

const VALUES = [
  {
    title: 'We are not generalists.',
    body: 'We turned down a lot of work to get here. Corporate trade shows, birthday parties, generic western weddings — they are fine events. They are not our events. We chose South Asian celebrations because they are the most visually ambitious, culturally rich, and emotionally significant gatherings we have ever seen. That choice is permanent.',
  },
  {
    title: 'Every setup is designed, not assembled.',
    body: 'We do not arrive on the day with a van full of equipment and build something generic. Every backdrop, every draping colour, every floral element is chosen weeks before the event, in conversation with you, around your vision. That process cannot be rushed — and it should not be.',
  },
  {
    title: 'The photograph is not the product.',
    body: "The product is the feeling the photograph carries. Thirty years from now, someone in your family will hold a photostrip from your walima and feel the room all over again. That is what we are building toward. Every single time.",
  },
]

export function AboutContent() {
  const ref1 = useRef<HTMLDivElement>(null)
  const ref2 = useRef<HTMLDivElement>(null)
  const in1  = useInView(ref1, { once: true, amount: .1 })
  const in2  = useInView(ref2, { once: true, amount: .1 })

  return (
    <>
      {/* Stats */}
      <section style={{ borderBottom: '1px solid var(--ivory-3)', background: 'var(--ivory)' }}>
        <div style={{ maxWidth: 'var(--cmax)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 1, background: 'var(--ivory-3)' }}>
          {STATS.map(({ n, label, sub }, i) => (
            <motion.div key={n}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: .3 }}
              transition={{ duration: .9, ease: E, delay: i * .08 }}
              style={{ background: 'var(--ivory)', padding: 'clamp(36px,5vw,56px) clamp(24px,3vw,40px)' }}>
              <div className="fs" style={{ fontSize: 'clamp(40px,5vw,60px)', fontWeight: 300, color: 'var(--gold)', lineHeight: 1, marginBottom: 8 }}>{n}</div>
              <div className="fd" style={{ fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--stone)', marginBottom: 4 }}>{label}</div>
              <div className="fu" style={{ fontSize: 11, color: 'var(--dust)', fontWeight: 200, fontStyle: 'italic' }}>{sub}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section ref={ref1} style={{ padding: 'var(--sy) var(--sx)', background: 'var(--ivory)' }}>
        <div style={{ maxWidth: 'var(--cmax)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 'clamp(48px,7vw,96px)', alignItems: 'start' }}>
          <motion.div initial={{ opacity: 0, y: 28 }} animate={in1 ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1.0, ease: E }}>
            <p className="fd" style={{ fontSize: 11, letterSpacing: '.28em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 24 }}>The Studio</p>
            <h2 className="fs" style={{ fontSize: 'var(--text-xl)', fontWeight: 300, color: 'var(--ink)', letterSpacing: '-.01em', lineHeight: 1.06, marginBottom: 24 }}>
              We started because<br />
              <em style={{ fontStyle: 'italic', color: 'var(--gold-2)' }}>no one else existed.</em>
            </h2>
            <p className="fs" style={{ fontSize: 'clamp(14px,1.5vw,17px)', fontStyle: 'italic', color: 'var(--stone)', lineHeight: 2, marginBottom: 24 }}>
              In 2021, we went to a walima where the photo booth was a shimmer wall rented from a corporate event company. The staff asked the groom how to spell his wife's name for the photostrip. The booth looked like it was borrowed from a trade show. It was beautiful event made slightly less than it could have been.
            </p>
            <p className="fs" style={{ fontSize: 'clamp(14px,1.5vw,17px)', fontStyle: 'italic', color: 'var(--stone)', lineHeight: 2, marginBottom: 24 }}>
              PhotoKecho was founded the following month. The idea was simple: build the studio that should have existed — one that understands the difference between a mehndi and a nikkah, between a walima and a sangeet, between a family that wants marigolds and one that wants mirrors.
            </p>
            <p className="fs" style={{ fontSize: 'clamp(14px,1.5vw,17px)', color: 'var(--ink)', lineHeight: 2, fontWeight: 300 }}>
              Three years and 500 celebrations later, that is still the only thing we do.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 28 }} animate={in1 ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1.0, ease: E, delay: .18 }}>
            <p className="fd" style={{ fontSize: 11, letterSpacing: '.28em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 24 }}>What We Believe</p>
            {VALUES.map(({ title, body }, i) => (
              <div key={title} style={{ marginBottom: 36, paddingBottom: 36, borderBottom: i < VALUES.length - 1 ? '1px solid var(--ivory-3)' : 'none' }}>
                <h3 className="fs" style={{ fontSize: 'clamp(18px,2vw,22px)', fontWeight: 300, color: 'var(--ink)', marginBottom: 12, lineHeight: 1.3 }}>{title}</h3>
                <p className="fu" style={{ fontSize: 14, fontWeight: 300, color: 'var(--stone)', lineHeight: 1.9, fontStyle: 'italic' }}>{body}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ref2} style={{ padding: 'var(--sy) var(--sx)', background: 'var(--ink)', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={in2 ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1.0, ease: E }}>
          <p className="fs" style={{ fontSize: 'clamp(20px,3vw,30px)', fontWeight: 300, fontStyle: 'italic', color: 'var(--ivory)', lineHeight: 1.8, maxWidth: 560, margin: '0 auto 36px' }}>
            Come and see what we can build for your celebration.
          </p>
          <Link href="/contact" className="btn btn-gold">
            Begin the conversation
            <span className="arr" aria-hidden="true" style={{ background: 'var(--ink)' } as React.CSSProperties} />
          </Link>
        </motion.div>
      </section>
    </>
  )
}
