'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const E = [0.19,1,0.22,1] as [number,number,number,number]

// Not event types — emotional moments
const ITEMS = [
  'The moment she sees the room',
  'The baraat she dreamed about',
  'The mehndi that lasted until morning',
  'The walima her mother will describe forever',
  'The sangeet no one wanted to leave',
  'The nikkah that felt like a film',
  'The photographs that outlast everything',
  'The feeling she had planned for years',
]
const DOUBLED = [...ITEMS, ...ITEMS]

export function Ticker() {
  return (
    <div style={{ overflow:'hidden', borderTop:'1px solid var(--ivory-3)', borderBottom:'1px solid var(--ivory-3)', padding:'15px 0', background:'var(--ivory)' }}
      role="marquee" aria-label="The moments we hold">
      <div className="ticker-rail" style={{ display:'flex', width:'max-content' }} aria-hidden="true">
        {DOUBLED.map((item,i) => (
          <div key={i} className="fs"
            style={{ display:'inline-flex', alignItems:'center', gap:44, padding:'0 32px', fontSize:'clamp(13px,1.5vw,16px)', fontStyle:'italic', fontWeight:300, color:'var(--stone)', whiteSpace:'nowrap' }}>
            {item}
            <span style={{ width:4, height:4, background:'var(--gold)', borderRadius:'50%', flexShrink:0 }}/>
          </div>
        ))}
      </div>
    </div>
  )
}

// The manifesto — speaks to her, not about us
export function Manifesto() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once:true, amount:.25 })
  return (
    <section ref={ref}
      style={{ padding:'clamp(72px,10vw,120px) var(--sx)', background:'var(--ivory)' }}
      aria-label="Our purpose">
      <div style={{ maxWidth:840, margin:'0 auto', textAlign:'center' }}>
        <motion.p initial={{ opacity:0, y:22 }} animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:1.0, ease:E }}
          className="fs" style={{ fontSize:'clamp(18px,3vw,26px)', fontWeight:300, fontStyle:'italic', color:'var(--stone)', lineHeight:1.85, marginBottom:28 }}>
          There is a photograph on your parents' wall.
          <br />You have walked past it your entire life.
          <br />You know the colour of the light in it.
        </motion.p>
        <motion.p initial={{ opacity:0, y:22 }} animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:1.0, ease:E, delay:.15 }}
          className="fs" style={{ fontSize:'clamp(18px,3vw,26px)', fontWeight:300, color:'var(--ink)', lineHeight:1.85, marginBottom:28 }}>
          Someone built the frame that holds that feeling.
        </motion.p>
        <motion.p initial={{ opacity:0, y:22 }} animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:1.0, ease:E, delay:.3 }}
          className="fs" style={{ fontSize:'clamp(18px,3vw,26px)', fontWeight:300, fontStyle:'italic', color:'var(--gold-2)', lineHeight:1.85 }}>
          That is the only thing we do.
        </motion.p>
      </div>
    </section>
  )
}
