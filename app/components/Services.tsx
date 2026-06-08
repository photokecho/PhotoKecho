'use client'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const E = [0.19,1,0.22,1] as [number,number,number,number]

// Services written as experiences she will feel, not features she will get
const SERVICES = [
  {
    num:'01',
    name:'The Desi Wedding Booth',
    sub:'For the celebration that has layers',
    desc:'Some events carry a hundred years of tradition in one room. Marigolds and mirrors and the smell of oud. This booth was built to understand that — to feel like it was always meant to be there, because we designed it knowing exactly what that room would look like.',
    tag:'Mehndi · Nikkah · Sangeet · Walima',
    feeling:'She will feel that the room was designed for her.',
  },
  {
    num:'02',
    name:'The Glam Booth',
    sub:'For the night the room becomes a stage',
    desc:'There are celebrations where every guest arrives in their finest. Where the chandelier is the size of a car and the florals took three days to arrange. This booth matches that room. It does not try to be noticed — it earns it.',
    tag:'Walimas · Black-tie Receptions',
    feeling:'Her guests will not be able to leave.',
  },
  {
    num:'03',
    name:'The Classic Open-Air',
    sub:'For the family that trusts the details',
    desc:'The most elegant choice is often the one that asks the least of the eye. Clean sight lines that let your colours breathe. The setup that disappears into the room so completely that guests only notice how beautiful everything looks — together.',
    tag:'All South Asian Celebrations',
    feeling:'She will not have to explain what she wanted.',
  },
  {
    num:'04',
    name:'The Eid & Community Booth',
    sub:'For the celebration that belongs to everyone',
    desc:'Some occasions are about a room full of people who love each other. Fast, joyful, warm. A setup designed to move at the rhythm of the night — where 400 people want a photograph and no one should have to wait.',
    tag:'Eid · Community Events · Iftar Galas',
    feeling:'Every single guest will have a memory to take home.',
  },
]

function Row({ svc, i }: { svc:typeof SERVICES[0]; i:number }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once:true, amount:.12 })
  const [hov, setHov] = useState(false)
  return (
    <motion.div ref={ref}
      initial={{ opacity:0, y:26 }} animate={inView?{opacity:1,y:0}:{}}
      transition={{ duration:1.0, ease:E, delay:i*.08 }}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ display:'grid', gridTemplateColumns:'clamp(40px,5vw,64px) 1fr auto', gap:'clamp(16px,3vw,40px)', alignItems:'start', padding:'clamp(28px,4vw,52px) 0', borderTop:'1px solid rgba(232,224,208,.6)', position:'relative' }}>
      <div aria-hidden="true" style={{ position:'absolute', inset:'0 -24px', background:'rgba(184,146,42,.022)', opacity:hov?1:0, transition:'opacity .5s var(--ease-gold)', pointerEvents:'none' }}/>
      <span className="fs" style={{ fontSize:13, fontStyle:'italic', color:hov?'var(--gold)':'var(--dust)', transition:'color .4s', paddingTop:4, position:'relative' }}>{svc.num}</span>
      <div style={{ position:'relative' }}>
        <h3 className="fs" style={{ fontSize:'clamp(20px,2.8vw,34px)', fontWeight:300, color:'var(--ink)', letterSpacing:'-.01em', lineHeight:1.15, marginBottom:4 }}>
          {svc.name}
          <em style={{ display:'block', fontStyle:'italic', color:'var(--gold-2)', fontSize:'.82em', marginTop:4 }}>{svc.sub}</em>
        </h3>
        <p className="fs hidden md:block" style={{ fontSize:'var(--text-base)', fontStyle:'italic', color:'var(--stone)', lineHeight:1.92, maxWidth:520, marginTop:14 }}>{svc.desc}</p>
        {/* The feeling — what she will experience */}
        <p className="fu hidden md:block" style={{ fontSize:12, fontWeight:300, color:'var(--champ-2)', marginTop:14, fontStyle:'italic' }}>
          ✦ {svc.feeling}
        </p>
        <span className="fd md:hidden" style={{ display:'inline-block', fontSize:11, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--dust)', marginTop:10 }}>{svc.tag}</span>
      </div>
      <div className="fd hidden md:block" style={{ fontSize:11, letterSpacing:'.16em', textTransform:'uppercase', color:hov?'var(--gold)':'var(--dust)', border:`1px solid ${hov?'rgba(184,146,42,.4)':'rgba(184,146,42,.15)'}`, padding:'8px 16px', alignSelf:'center', transition:'color .4s,border-color .4s', whiteSpace:'nowrap', position:'relative' }}>
        {svc.tag}
      </div>
    </motion.div>
  )
}

export function Services() {
  const headRef = useRef<HTMLDivElement>(null)
  const headIn  = useInView(headRef, { once:true, amount:.12 })
  return (
    <section id="events"
      style={{ padding:'var(--sy) var(--sx)', background:'var(--ivory)', borderTop:'1px solid var(--ivory-3)' }}
      aria-labelledby="services-heading">
      <div className="si">
        <div ref={headRef} style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'clamp(48px,6vw,88px)', flexWrap:'wrap', gap:24 }}>
          <motion.div initial={{ opacity:0, y:26 }} animate={headIn?{opacity:1,y:0}:{}} transition={{ duration:1.0, ease:E }}>
            <p className="fd" style={{ fontSize:11, letterSpacing:'.28em', textTransform:'uppercase', color:'var(--gold)', marginBottom:20 }}>Four Experiences</p>
            <h2 id="services-heading" className="fs" style={{ fontSize:'var(--text-xl)', fontWeight:300, color:'var(--ink)', lineHeight:1.06, letterSpacing:'-.01em' }}>
              Each one designed<br/>
              <em style={{ fontStyle:'italic', color:'var(--gold-2)' }}>for a different kind of feeling.</em>
            </h2>
          </motion.div>
          <motion.p initial={{ opacity:0, y:20 }} animate={headIn?{opacity:1,y:0}:{}} transition={{ duration:1.0, ease:E, delay:.13 }}
            className="fs" style={{ fontSize:'clamp(14px,1.5vw,17px)', fontStyle:'italic', color:'var(--stone)', lineHeight:1.88, maxWidth:360, textAlign:'right' }}>
            No two celebrations feel the same. We built four distinct experiences because the room you're planning deserves something that was designed for it.
          </motion.p>
        </div>
        <div role="list">
          {SERVICES.map((svc,i) => <div key={svc.num} role="listitem"><Row svc={svc} i={i} /></div>)}
          <div style={{ height:1, background:'rgba(232,224,208,.6)' }} aria-hidden="true"/>
        </div>
      </div>
    </section>
  )
}
