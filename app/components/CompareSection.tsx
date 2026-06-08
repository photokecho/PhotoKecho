'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

const E = [0.19,1,0.22,1] as [number,number,number,number]

// Rewritten as emotional truths, not feature bullets
const THEIRS = [
  'A setup that looks borrowed from another event',
  'Props that make your guests feel like tourists',
  'A backdrop that competes with your florals',
  'A team counting down until they can pack up',
  'Photographs that could be from any walima anywhere',
  'A photostrip that ends up in a drawer',
  'An afterthought in the corner of the most important room',
]
const OURS = [
  'A setup built specifically for your colours, your venue, your day',
  'Props your guests will carry home and keep',
  'A backdrop that makes the room feel complete',
  'A team that has been at 500 South Asian celebrations and loves every one',
  'Photographs that are unmistakably, irreplaceably yours',
  'A photostrip your daughter will find in a box and cry over',
  'The centrepiece of the room, not an addition to it',
]

export function CompareSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once:true, amount:.1 })
  return (
    <section ref={ref}
      style={{ padding:'var(--sy) var(--sx)', background:'var(--ivory-2)', borderTop:'1px solid var(--ivory-3)' }}
      aria-labelledby="compare-heading">
      <div className="si">
        <motion.div initial={{ opacity:0, y:28 }} animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:1.0, ease:E }}
          style={{ textAlign:'center', marginBottom:'clamp(48px,6vw,80px)' }}>
          <p className="fd" style={{ fontSize:11, letterSpacing:'.28em', textTransform:'uppercase', color:'var(--gold)', marginBottom:20 }}>
            The honest truth
          </p>
          <h2 id="compare-heading" className="fs"
            style={{ fontSize:'var(--text-xl)', fontWeight:300, color:'var(--ink)', letterSpacing:'-.01em', lineHeight:1.06 }}>
            How most celebrations are remembered.<br/>
            <em style={{ fontStyle:'italic', color:'var(--gold-2)' }}>How yours will be.</em>
          </h2>
        </motion.div>

        <div className="compare-grid">
          {/* Most setups */}
          <motion.div initial={{ opacity:0, x:-24 }} animate={inView ? { opacity:1, x:0 } : {}}
            transition={{ duration:1.0, ease:E, delay:.15 }}>
            <div className="fd" style={{ fontSize:11, letterSpacing:'.22em', textTransform:'uppercase', color:'var(--dust)', marginBottom:32, display:'flex', alignItems:'center', gap:14 }}>
              <span>Most setups</span>
              <div style={{ flex:1, height:1, background:'var(--ivory-4)' }}/>
            </div>
            <ul style={{ listStyle:'none' }}>
              {THEIRS.map((item,i) => (
                <motion.li key={item}
                  initial={{ opacity:0, x:-10 }} animate={inView ? { opacity:1, x:0 } : {}}
                  transition={{ duration:.7, ease:E, delay:.2+i*.055 }}
                  style={{ display:'flex', gap:14, padding:'14px 0', borderBottom:'1px solid var(--ivory-3)', alignItems:'baseline' }}>
                  <span aria-hidden="true" style={{ color:'var(--veil)', fontSize:12, flexShrink:0, marginTop:2 }}>—</span>
                  <span className="fs" style={{ fontSize:'clamp(14px,1.5vw,17px)', fontStyle:'italic', color:'var(--dust)', lineHeight:1.65 }}>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Vertical divider */}
          <div aria-hidden="true" style={{ background:'linear-gradient(to bottom,transparent,var(--ivory-3),transparent)', alignSelf:'stretch' }} className="hidden md:block"/>

          {/* PhotoKecho */}
          <motion.div initial={{ opacity:0, x:24 }} animate={inView ? { opacity:1, x:0 } : {}}
            transition={{ duration:1.0, ease:E, delay:.2 }}>
            <div className="fd" style={{ fontSize:11, letterSpacing:'.22em', textTransform:'uppercase', color:'var(--gold)', marginBottom:32, display:'flex', alignItems:'center', gap:14 }}>
              <span>PhotoKecho</span>
              <div style={{ flex:1, height:1, background:'rgba(184,146,42,.2)' }}/>
            </div>
            <ul style={{ listStyle:'none' }}>
              {OURS.map((item,i) => (
                <motion.li key={item}
                  initial={{ opacity:0, x:10 }} animate={inView ? { opacity:1, x:0 } : {}}
                  transition={{ duration:.7, ease:E, delay:.25+i*.055 }}
                  style={{ display:'flex', gap:14, padding:'14px 0', borderBottom:'1px solid rgba(184,146,42,.1)', alignItems:'baseline' }}>
                  <span aria-hidden="true" style={{ color:'var(--gold)', fontSize:12, flexShrink:0, marginTop:2 }}>✦</span>
                  <span className="fs" style={{ fontSize:'clamp(14px,1.5vw,17px)', color:'var(--ink)', lineHeight:1.65 }}>{item}</span>
                </motion.li>
              ))}
            </ul>
            <motion.div initial={{ opacity:0, y:12 }} animate={inView ? { opacity:1, y:0 } : {}}
              transition={{ duration:.8, ease:E, delay:.9 }} style={{ marginTop:40 }}>
              <Link href="/build" className="btn">
                Design your setup
                <span className="arr" aria-hidden="true"/>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
