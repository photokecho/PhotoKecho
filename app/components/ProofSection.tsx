'use client'
import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

const E = [0.19,1,0.22,1] as [number,number,number,number]

function Counter({ to, suffix='' }: { to:number; suffix?:string }) {
  const [val, setVal] = useState(0)
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once:true, amount:.5 })
  useEffect(() => {
    if (!inView) return
    let start: number
    const step = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts-start)/1400, 1)
      setVal(Math.round((1-Math.pow(1-p,3))*to))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, to])
  return <div ref={ref}>{val}{suffix}</div>
}

// Numbers rewritten as feelings, not metrics
const NUMS = [
  { to:50, suffix:'+', label:'Events completed', sub:'across Chicago and surrounding areas' },
  { to:98,  suffix:'%', label:'Would choose us again',   sub:'when asked six months after their event' },
  { to:2, suffix:' yrs', label:'In business', sub:'serving Chicago since 2023' },
  { to:4,   suffix:'',  label:'Experiences designed',   sub:'each one built for a specific celebration' },
]

// Event breakdown — rewritten with emotional weight
const EVENTS = [
  { event:'Mehndi Nights',    n:'15+', color:'var(--saffron)', sub:'The night before the night.' },
  { event:'Nikkah Ceremonies', n:'10+',  color:'var(--gold-2)',  sub:'The moment everything changes.' },
  { event:'Walima Receptions', n:'12+', color:'var(--crimson)', sub:'The celebration that says: we made it.' },
  { event:'Sangeet Nights',    n:'8+',  color:'var(--marigold)',sub:'The night that will be retold for decades.' },
  { event:'Eid Celebrations',  n:'5+',  color:'var(--sage)',    sub:'The gathering that feels like home.' },
  { event:'Private Soirées',   n:'10+',  color:'var(--dust)',    sub:'The intimate ones that matter most.' },
]

export function ProofSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once:true, amount:.1 })
  return (
    <section id="proof" ref={ref} style={{ background:'var(--ink)', overflow:'hidden' }} aria-labelledby="proof-heading">

      {/* Emotional numbers */}
      <div className="proof-nums">
        {NUMS.map(({ to, suffix, label, sub }, i) => (
          <motion.div key={label}
            initial={{ opacity:0, y:24 }} animate={inView ? { opacity:1, y:0 } : {}}
            transition={{ duration:.9, ease:E, delay:i*.09 }}
            style={{ background:'var(--ink)', padding:'clamp(36px,5vw,56px) clamp(24px,4vw,44px)', borderRight:i<3?'1px solid rgba(255,255,255,.05)':undefined }}>
            <div className="fs" style={{ fontSize:'clamp(44px,6vw,68px)', fontWeight:300, color:'var(--gold)', lineHeight:1, marginBottom:10, letterSpacing:'-.02em' }}>
              <Counter to={to} suffix={suffix} />
            </div>
            <div className="fd" style={{ fontSize:11, letterSpacing:'.2em', textTransform:'uppercase', color:'var(--veil)', marginBottom:6 }}>{label}</div>
            <div className="fu" style={{ fontSize:11, color:'var(--dust)', fontWeight:200, fontStyle:'italic' }}>{sub}</div>
          </motion.div>
        ))}
      </div>

      {/* The celebrations we have held */}
      <div style={{ padding:'clamp(56px,8vw,96px) var(--sx)', borderTop:'1px solid rgba(255,255,255,.06)' }}>
        <div className="si">
          <motion.div initial={{ opacity:0, y:24 }} animate={inView ? { opacity:1, y:0 } : {}}
            transition={{ duration:1.0, ease:E, delay:.2 }}
            style={{ marginBottom:'clamp(40px,6vw,64px)' }}>
            <h2 id="proof-heading" className="fs"
              style={{ fontSize:'var(--text-xl)', fontWeight:300, color:'var(--ivory)', letterSpacing:'-.01em', marginBottom:16 }}>
              The celebrations<br/>
              <em style={{ fontStyle:'italic', color:'var(--gold-w)' }}>we have been honoured to hold.</em>
            </h2>
            <p className="fs" style={{ fontSize:'clamp(15px,1.4vw,18px)', fontStyle:'italic', color:'var(--dust)', lineHeight:1.8, maxWidth:560 }}>
              These are not events. They are the days that define a family's story. We do not take that lightly.
            </p>
          </motion.div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'1px', background:'rgba(255,255,255,.05)' }}>
            {EVENTS.map(({ event, n, color, sub }, i) => (
              <motion.div key={event}
                initial={{ opacity:0, y:16 }} animate={inView ? { opacity:1, y:0 } : {}}
                transition={{ duration:.8, ease:E, delay:.3+i*.07 }}
                style={{ background:'var(--ink)', padding:'32px 28px', borderTop:`2px solid ${color}` }}>
                <div className="fs" style={{ fontSize:'clamp(28px,3.5vw,44px)', fontWeight:300, color:'var(--ivory)', lineHeight:1, marginBottom:8 }}>{n}</div>
                <div className="fd" style={{ fontSize:11, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--dust)', marginBottom:8 }}>{event}</div>
                <div className="fu" style={{ fontSize:11, color:'rgba(196,151,58,.5)', fontStyle:'italic', fontWeight:200 }}>{sub}</div>
              </motion.div>
            ))}
          </div>

          {/* The testimonial embedded in proof */}
          <motion.div initial={{ opacity:0 }} animate={inView ? { opacity:1 } : {}}
            transition={{ duration:.9, ease:E, delay:.8 }}
            style={{ marginTop:'clamp(40px,6vw,64px)', padding:'clamp(28px,4vw,44px)', background:'rgba(255,255,255,.03)', border:'1px solid rgba(196,151,58,.12)' }}>
            <p className="fs" style={{ fontSize:'clamp(15px,1.8vw,21px)', fontStyle:'italic', color:'var(--veil)', lineHeight:1.85, maxWidth:640, marginBottom:28 }}>
              "I cried when I saw it. Not because it was beautiful — though it was. Because it felt exactly like the room I had been imagining in my head since I was a little girl. I didn't know that was possible from a photo booth company."
            </p>
            <div>
              <div className="fd" style={{ fontSize:11, letterSpacing:'.2em', textTransform:'uppercase', color:'var(--gold)' }}>Nadia & Tariq M.</div>
              <div className="fu" style={{ fontSize:11, color:'var(--dust)', fontWeight:200, marginTop:4, fontStyle:'italic' }}>Walima Reception · Four Seasons Chicago · June 2024</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
