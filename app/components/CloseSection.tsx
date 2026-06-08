'use client'
import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'

const E = [0.19,1,0.22,1] as [number,number,number,number]

export function CloseSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once:true, amount:.2 })
  const { scrollYProgress } = useScroll({ target:ref, offset:['start end','end start'] })
  const bgY = useTransform(scrollYProgress, [0,1], ['-8%','8%'])

  return (
    <section ref={ref}
      style={{ position:'relative', minHeight:'100svh', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}
      aria-labelledby="close-heading">
      {/* Parallax bg */}
      <motion.div aria-hidden="true" style={{ position:'absolute', inset:'-10%', y:bgY, willChange:'transform' }}>
        <div style={{ position:'absolute', inset:0, background:`
          radial-gradient(ellipse 80% 60% at 50% 50%,rgba(200,150,60,.14) 0%,transparent 60%),
          radial-gradient(ellipse 120% 80% at 50% 100%,rgba(30,16,4,.70) 0%,transparent 65%),
          linear-gradient(175deg,#F0E4C8 0%,#D8C090 12%,#A07848 25%,#6A4820 40%,#3E2410 55%,#1E1008 70%,#0E0804 85%,#080604 100%)` }}/>
        <svg viewBox="0 0 1000 800" preserveAspectRatio="xMidYMid slice" style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}>
          <path d="M220 540 L220 200 Q500 50 780 200 L780 540" stroke="rgba(212,184,122,.18)" strokeWidth="5" fill="none"/>
          <circle cx="240" cy="120" r="30" fill="rgba(196,135,10,.38)"/><circle cx="240" cy="120" r="15" fill="rgba(240,195,40,.55)"/>
          <circle cx="760" cy="120" r="30" fill="rgba(196,135,10,.38)"/><circle cx="760" cy="120" r="15" fill="rgba(240,195,40,.55)"/>
          <rect x="240" y="440" width="7" height="80" fill="rgba(255,220,100,.45)"/>
          <rect x="753" y="440" width="7" height="80" fill="rgba(255,220,100,.45)"/>
          <ellipse cx="243" cy="437" rx="18" ry="18" fill="rgba(255,200,60,.25)"/>
          <ellipse cx="757" cy="437" rx="18" ry="18" fill="rgba(255,200,60,.25)"/>
          <ellipse cx="500" cy="-20" rx="450" ry="280" fill="rgba(255,200,80,.07)"/>
        </svg>
        <div style={{ position:'absolute', inset:0, background:'rgba(42,26,8,.46)' }}/>
      </motion.div>

      <div style={{ position:'relative', zIndex:2, textAlign:'center', padding:'clamp(80px,12vw,120px) var(--sx)', maxWidth:800 }}>
        <motion.p initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ duration:.8, ease:E, delay:.08 }}
          className="fd" style={{ fontSize:11, letterSpacing:'.4em', textTransform:'uppercase', color:'var(--gold)', marginBottom:40 }} aria-hidden="true">
          Photokecho
        </motion.p>

        <h2 id="close-heading">
          {[
            { text:'Your mother will ask',   italic:false },
            { text:'who did the room.',      italic:false },
            { text:'Let it be us.',          italic:true  },
          ].map(({ text, italic }, i) => (
            <span key={text} style={{ display:'block', overflow:'hidden' }}>
              <motion.span initial={{ y:'110%', opacity:0 }} animate={inView?{y:0,opacity:1}:{}}
                transition={{ duration:1.1, ease:E, delay:.2+i*.15 }}
                className="fs"
                style={{ display:'block', fontSize:'clamp(40px,7.5vw,88px)', fontWeight:300, color:italic?'var(--gold-w)':'var(--ivory)', lineHeight:1.02, letterSpacing:'-.02em', fontStyle:italic?'italic':'normal' }}>
                {text}
              </motion.span>
            </span>
          ))}
        </h2>

        <motion.p initial={{ opacity:0, y:16 }} animate={inView?{opacity:1,y:0}:{}}
          transition={{ duration:.9, ease:E, delay:.72 }}
          className="fs" style={{ fontSize:'clamp(15px,1.8vw,20px)', fontStyle:'italic', color:'rgba(232,220,196,.78)', lineHeight:1.88, margin:'32px auto 48px', maxWidth:540 }}>
          She will ask about the florals, the backdrop, the way the room felt when you walked in. You will be able to tell her exactly who made it feel that way.
        </motion.p>

        <motion.div initial={{ opacity:0, y:14 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:.9, ease:E, delay:.95 }}>
          <Link href="#contact" className="btn btn-gold">
            Reserve your date
            <span className="arr" aria-hidden="true" style={{ background:'var(--ink)' } as React.CSSProperties}/>
          </Link>
          <p className="fu" style={{ marginTop:20, fontSize:11, fontWeight:200, fontStyle:'italic', color:'rgba(212,184,122,.6)', letterSpacing:'.06em' }}>
            Photokecho@gmail.com · Chicago, IL · Response within 24 hours
          </p>
        </motion.div>
      </div>
    </section>
  )
}
