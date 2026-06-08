'use client'
import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const E = [0.19,1,0.22,1] as [number,number,number,number]

// Three testimonials — each one tells a different emotional story
const QUOTES = [
  {
    text: "I had been imagining my walima since I was twelve years old. The florals. The light. The way the room would feel when I walked in. I was terrified it wouldn't look like the picture in my head. And then I saw it. And it was better. It was exactly the way the feeling felt — and I didn't know that was possible.",
    name: 'Nadia & Tariq M.',
    event: 'Walima Reception · Four Seasons Chicago · June 2024',
    detail: 'She asked if we could be there for every future celebration.',
  },
  {
    text: "My mum stood in front of the backdrop for twenty minutes. Not for photographs. She just stood there, looking at it. She kept saying she couldn't believe something so beautiful was ours for the night. I've planned a lot of events. I have never seen my mother look at something like that.",
    name: 'Aisha & Bilal R.',
    event: 'Mehndi Night · Private Estate · August 2024',
    detail: 'Her mother called us the following week. Just to say thank you.',
  },
  {
    text: "The photograph from my nikkah is already on my parents' wall. My bhaabi sent me the picture of it hanging there, in the hallway, next to my mum and dad's wedding portrait. I did not expect to feel that much about a photostrip. But I do. I really do.",
    name: 'Fatima & Omar N.',
    event: 'Nikkah Ceremony · Hilton Chicago · September 2024',
    detail: "The photostrip is now beside her parents' wedding portrait.",
  },
]

export function Testimonial() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once:true, amount:.15 })
  const [active, setActive] = useState(0)

  return (
    <section ref={ref}
      style={{ padding:'var(--sy) var(--sx)', background:'var(--ivory)', borderTop:'1px solid var(--ivory-3)' }}
      aria-labelledby="testimonial-heading">
      <div className="si">
        <motion.div initial={{ opacity:0, y:24 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:1.0, ease:E }}
          style={{ marginBottom:'clamp(48px,6vw,72px)', display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:20 }}>
          <h2 id="testimonial-heading" className="fs"
            style={{ fontSize:'var(--text-xl)', fontWeight:300, color:'var(--ink)', letterSpacing:'-.01em' }}>
            In their own words.
          </h2>
          <p className="fu" style={{ fontSize:11, color:'var(--dust)', fontWeight:200, fontStyle:'italic' }}>
            Every word exactly as written, unedited.
          </p>
        </motion.div>

        <motion.div initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ duration:1.0, ease:E, delay:.15 }}>

          {/* Tab switcher — first names only, intimate */}
          <div role="tablist" aria-label="Client testimonials"
            style={{ display:'flex', gap:1, marginBottom:48, background:'var(--ivory-3)' }}>
            {QUOTES.map(({ name }, i) => (
              <button key={name} role="tab" aria-selected={active===i}
                onClick={()=>setActive(i)} className="fd"
                style={{ flex:1, padding:'14px 16px', border:'none', background:active===i?'var(--ink)':'var(--ivory)', color:active===i?'var(--gold-w)':'var(--dust)', fontSize:11, letterSpacing:'.16em', textTransform:'uppercase', cursor:'pointer', transition:'background .4s,color .4s', minHeight:44 }}>
                {name.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* The quote */}
          <AnimatePresence mode="wait">
            <motion.figure key={active}
              initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-14 }}
              transition={{ duration:.5, ease:E }}>
              <div aria-hidden="true" className="fs"
                style={{ position:'relative', fontSize:'clamp(120px,18vw,220px)', fontWeight:300, color:'var(--gold-p)', lineHeight:1, userSelect:'none', pointerEvents:'none', opacity:.7, marginBottom:'-0.12em' }}>
                "
              </div>
              <blockquote style={{ position:'relative', zIndex:1 }}>
                <p className="fs" style={{ fontSize:'clamp(17px,2.2vw,24px)', fontWeight:300, color:'var(--ink)', lineHeight:1.88, marginBottom:36 }}>
                  {QUOTES[active].text}
                </p>
                {/* The emotional detail beneath the quote */}
                <p className="fu" style={{ fontSize:12, fontWeight:200, fontStyle:'italic', color:'var(--champ-2)', marginBottom:28, paddingLeft:24, borderLeft:'2px solid var(--gold-p)' }}>
                  {QUOTES[active].detail}
                </p>
                <div style={{ display:'flex', alignItems:'center', gap:16 }}>
                  <div style={{ flex:1, maxWidth:44, height:1, background:'var(--ivory-4)' }} aria-hidden="true"/>
                  <figcaption>
                    <cite className="fd" style={{ fontStyle:'normal', fontSize:11, letterSpacing:'.24em', textTransform:'uppercase', color:'var(--ink)', display:'block', marginBottom:4 }}>
                      {QUOTES[active].name}
                    </cite>
                    <span className="fs" style={{ fontSize:13, fontStyle:'italic', color:'var(--champ-2)' }}>
                      {QUOTES[active].event}
                    </span>
                  </figcaption>
                </div>
              </blockquote>
            </motion.figure>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
