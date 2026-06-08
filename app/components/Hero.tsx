'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence, MotionValue } from 'framer-motion'
import Link from 'next/link'

const E = [0.19,1,0.22,1] as [number,number,number,number]
const D = 2.1

function Mark({ size=52 }:{ size?:number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <circle cx="50" cy="38" r="24" stroke="var(--gold)" strokeWidth="3" fill="none"/>
      <circle cx="50" cy="38" r="10" fill="var(--gold)" fillOpacity=".6"/>
      <path d="M26 38 Q50 8 74 38" stroke="var(--gold)" strokeWidth="2.5" fill="none"/>
      <rect x="18" y="30" width="64" height="44" rx="4" stroke="var(--gold)" strokeWidth="2.5" fill="none"/>
      <path d="M35 72 Q50 86 65 72" stroke="var(--gold)" strokeWidth="2" fill="none"/>
    </svg>
  )
}

function Scene({ mobile=false }) {
  const vb = mobile ? "0 0 375 300" : "0 0 800 900"
  const flL = mobile
    ? [[40,60,22],[58,43,15],[22,46,18],[40,60,11],[72,37,10],[18,78,12],[60,82,8]]
    : [[80,140,40],[112,108,28],[48,116,34],[80,140,20],[125,88,18],[32,168,22],[110,170,14]]
  const flR = mobile
    ? [[335,60,22],[317,43,15],[353,46,18],[335,60,11],[303,37,10],[357,78,12],[315,82,8]]
    : [[720,140,40],[688,108,28],[752,116,34],[720,140,20],[675,88,18],[768,168,22],[690,170,14]]
  const fills = ['rgba(196,135,10,.45)','rgba(212,96,10,.42)','rgba(80,140,40,.4)','rgba(240,195,40,.7)','rgba(196,135,10,.36)','rgba(80,140,40,.36)','rgba(240,195,40,.55)']
  return (
    <svg viewBox={vb} preserveAspectRatio="xMidYMid slice"
      style={{ position:'absolute', inset:0, width:'100%', height:'100%' }} aria-hidden="true">
      {!mobile && <>
        <path d="M40 900 L40 340 Q400 40 760 340 L760 900" stroke="rgba(212,184,122,.18)" strokeWidth="7" fill="none"/>
        <path d="M40 900 L40 340 Q400 40 760 340 L760 900" stroke="rgba(212,184,122,.055)" strokeWidth="18" fill="none"/>
      </>}
      {mobile && <path d="M15 300 L15 130 Q188 20 360 130 L360 300" stroke="rgba(212,184,122,.18)" strokeWidth="5" fill="none"/>}
      {flL.map(([cx,cy,r],i) => <circle key={`l${i}`} cx={cx} cy={cy} r={r} fill={fills[i]}/>)}
      {flR.map(([cx,cy,r],i) => <circle key={`r${i}`} cx={cx} cy={cy} r={r} fill={fills[i]}/>)}
      {!mobile && <>
        <rect x="152" y="630" width="10" height="130" fill="rgba(255,220,100,.5)"/>
        <rect x="638" y="630" width="10" height="130" fill="rgba(255,220,100,.5)"/>
        <ellipse cx="157" cy="628" rx="24" ry="22" fill="rgba(255,200,60,.28)"/>
        <ellipse cx="643" cy="628" rx="24" ry="22" fill="rgba(255,200,60,.28)"/>
        <ellipse cx="400" cy="876" rx="270" ry="40" fill="rgba(139,26,42,.55)"/>
        <ellipse cx="400" cy="876" rx="218" ry="30" fill="rgba(139,26,42,.4)"/>
        <ellipse cx="400" cy="-20" rx="380" ry="290" fill="rgba(255,218,80,.09)"/>
      </>}
      {mobile && <>
        <ellipse cx="188" cy="290" rx="130" ry="18" fill="rgba(139,26,42,.5)"/>
        <ellipse cx="188" cy="-10" rx="200" ry="120" fill="rgba(255,218,80,.08)"/>
      </>}
    </svg>
  )
}

function ImagePanel({ y }: { y: MotionValue<number> }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.play().catch(() => {/* autoplay blocked — fine, poster shows */})
  }, [])

  return (
    <motion.div
      initial={{ opacity:0 }} animate={{ opacity:1 }}
      transition={{ duration:1.6, ease:E, delay:D-.4 }}
      style={{ position:'absolute', top:0, right:0, width:'62%', height:'100%', zIndex:2, overflow:'hidden' }}
      className="hidden md:block" aria-hidden="true">

      {/* Parallax wrapper */}
      <motion.div style={{ y, position:'absolute', inset:'-10%', willChange:'transform' }}>
        {/* The actual video */}
        <video
          ref={videoRef}
          src="/hero-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }}
        />
        {/* Dark overlay — left edge blends into ivory, bottom darkens */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right,var(--ivory) 0%,rgba(250,247,240,.08) 8%,transparent 22%),linear-gradient(to top,rgba(10,6,2,.55) 0%,transparent 50%)' }}/>
      </motion.div>

      {/* Corner ornaments */}
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:.8, ease:E, delay:D+1.4 }}
        style={{ position:'absolute', top:36, left:36, width:44, height:44, borderTop:'1px solid rgba(212,184,122,.4)', borderLeft:'1px solid rgba(212,184,122,.4)' }}/>
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:.8, ease:E, delay:D+1.4 }}
        style={{ position:'absolute', bottom:36, right:36, width:44, height:44, borderBottom:'1px solid rgba(212,184,122,.4)', borderRight:'1px solid rgba(212,184,122,.4)' }}/>

      {/* Stats badge */}
      <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ duration:.9, ease:E, delay:D+1.8 }}
        style={{ position:'absolute', bottom:46, right:46, background:'rgba(250,247,240,.92)', border:'1px solid rgba(212,184,122,.4)', padding:'20px 24px', backdropFilter:'blur(12px)' }}>
        <div className="fs" style={{ fontSize:38, fontWeight:300, color:'var(--gold-2)', lineHeight:1, marginBottom:4 }}>50+</div>
        <div className="fd" style={{ fontSize:11, letterSpacing:'.2em', textTransform:'uppercase', color:'var(--stone)', lineHeight:1.5 }}>
          Happy clients<br/>and counting
        </div>
      </motion.div>
    </motion.div>
  )
}

export function Hero() {
  const [done,    setDone]    = useState(false)
  const [mounted, setMounted] = useState(false)
  const { scrollY } = useScroll()
  const imgY = useTransform(scrollY, [0,600], [0,70])

  useEffect(() => {
    setMounted(true)
    const t = setTimeout(() => setDone(true), 1900)
    return () => clearTimeout(t)
  }, [])
  if (!mounted) return null

  const word = (i: number) => ({
    hidden: { y:'108%', opacity:0 },
    show: { y:0, opacity:1, transition:{ duration:1.1, ease:E, delay:D+i*.14 } },
  })
  const fade = (d: number) => ({
    hidden:{ opacity:0, y:14 },
    show:{ opacity:1, y:0, transition:{ duration:.85, ease:E, delay:D+d } },
  })

  return (
    <>
      <AnimatePresence>
        {!done && (
          <motion.div initial={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:.6, ease:E }}
            style={{ position:'fixed', inset:0, background:'var(--ivory)', zIndex:9500, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', pointerEvents:'none' }}
            aria-hidden="true">
            <motion.div initial={{ scale:.84, opacity:0 }} animate={{ scale:1, opacity:1 }}
              transition={{ duration:.95, ease:E, delay:.06 }} style={{ marginBottom:20 }}>
              <Mark />
            </motion.div>
            <div style={{ display:'flex', overflow:'hidden', height:18, alignItems:'center' }}>
              {'PHOTOKECHO'.split('').map((ch,i) => (
                <motion.span key={i} initial={{ y:'100%', opacity:0 }} animate={{ y:0, opacity:1 }}
                  transition={{ duration:.46, ease:E, delay:.46+i*.037 }}
                  className="fd" style={{ fontSize:11, letterSpacing:'.44em', color:'var(--gold)', display:'inline-block' }}>
                  {ch}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="main-content"
        style={{ position:'relative', width:'100%', minHeight:'100svh', display:'flex', flexDirection:'column', background:'var(--ivory)', overflow:'hidden' }}
        aria-label="PhotoKecho — South Asian luxury photo booth studio">

        {/* Mobile scene */}
        <div className="mobile-scene">
          <div style={{ position:'absolute', inset:0, background:`
            radial-gradient(ellipse 80% 80% at 50% 28%,rgba(212,184,122,.22) 0%,transparent 58%),
            linear-gradient(178deg,#EEE0C0 0%,#B89860 24%,#7A5028 50%,#2A1406 76%,#100A04 100%)` }}/>
          <div className="shim" style={{ position:'absolute', inset:0 }}/>
          <Scene mobile />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom,transparent 36%,var(--ivory) 100%)' }}/>
          <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ duration:.8, ease:E, delay:D+.5 }}
            style={{ position:'absolute', bottom:72, left:'50%', transform:'translateX(-50%)', background:'rgba(250,247,240,.9)', border:'1px solid rgba(212,184,122,.4)', padding:'12px 20px', backdropFilter:'blur(8px)', textAlign:'center', whiteSpace:'nowrap' }}>
            <span className="fd" style={{ fontSize:11, letterSpacing:'.22em', textTransform:'uppercase', color:'var(--gold-2)' }}>
              For the celebration you've always imagined
            </span>
          </motion.div>
        </div>

        <div style={{ display:'flex', flex:1, position:'relative' }}>
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:1.4, ease:E, delay:D+.7 }}
            aria-hidden="true" className="fs hidden md:block"
            style={{ position:'absolute', bottom:'-6%', left:'11%', fontSize:'clamp(130px,21vw,320px)', fontWeight:300, fontStyle:'italic', color:'rgba(184,146,42,.038)', lineHeight:1, userSelect:'none', pointerEvents:'none', zIndex:1, letterSpacing:'-.04em', whiteSpace:'nowrap' }}>
            Kecho
          </motion.div>
          <motion.div initial={{ scaleY:0, opacity:0 }} animate={{ scaleY:1, opacity:1 }} transition={{ duration:1.1, ease:E, delay:D+.2 }}
            aria-hidden="true" className="hidden md:block"
            style={{ position:'absolute', top:80, bottom:80, left:48, width:1, background:'linear-gradient(to bottom,transparent,var(--champ) 15%,var(--champ) 85%,transparent)', transformOrigin:'top', zIndex:3 }}/>
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:.8, ease:E, delay:D+.75 }}
            aria-hidden="true" className="fd hidden md:flex"
            style={{ position:'absolute', top:'50%', left:18, transform:'translateY(-50%) rotate(-90deg)', transformOrigin:'center', fontSize:11, letterSpacing:'.44em', textTransform:'uppercase', color:'var(--champ-2)', whiteSpace:'nowrap', zIndex:3 }}>
            Chicago · Est. 2023
          </motion.div>

          {/* THE COPY — every word chosen for a bride, not a buyer */}
          <div style={{ position:'relative', zIndex:4, width:'min(100%,clamp(320px,42%,540px))', flexShrink:0, display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'clamp(24px,8svh,80px) 0 clamp(64px,9svh,100px) clamp(24px,5vw,80px)', background:'var(--ivory)' }}>

            <motion.div variants={fade(0)} initial="hidden" animate="show"
              style={{ display:'flex', alignItems:'center', gap:14, marginBottom:22 }}>
              <div style={{ width:28, height:1, background:'var(--gold)', flexShrink:0 }} aria-hidden="true"/>
              <span className="fd" style={{ fontSize:11, letterSpacing:'.34em', textTransform:'uppercase', color:'var(--gold-2)' }}>
                For the celebration you have always imagined
              </span>
            </motion.div>

            {/* The headline — an emotion, not a claim */}
            <h1>
              <span className="clip">
                <motion.span variants={word(0)} initial="hidden" animate="show" className="fs"
                  style={{ display:'block', fontSize:'var(--text-hero)', fontWeight:300, color:'var(--ink)', lineHeight:.95, letterSpacing:'-.02em' }}>
                  Your guests will talk
                </motion.span>
              </span>
              <span className="clip">
                <motion.span variants={word(1)} initial="hidden" animate="show" className="fs"
                  style={{ display:'block', fontSize:'var(--text-hero)', fontWeight:300, color:'var(--ink)', lineHeight:.95, letterSpacing:'-.02em' }}>
                  about your celebration
                </motion.span>
              </span>
              <span className="clip">
                <motion.span variants={word(2)} initial="hidden" animate="show" className="fs"
                  style={{ display:'block', fontSize:'var(--text-hero)', fontWeight:300, fontStyle:'italic', color:'var(--gold-2)', lineHeight:.95, letterSpacing:'-.02em' }}>
                  for years.
                </motion.span>
              </span>
            </h1>

            <motion.div initial={{ scaleX:0, opacity:0 }} animate={{ scaleX:1, opacity:1 }}
              transition={{ duration:.85, ease:E, delay:D+.55 }} aria-hidden="true"
              style={{ width:48, height:1, background:'linear-gradient(to right,var(--champ-2),transparent)', margin:'26px 0', transformOrigin:'left' }}/>

            {/* Sub — speaks to her interior world */}
            <motion.p variants={fade(.62)} initial="hidden" animate="show" className="fs"
              style={{ fontSize:'clamp(15px,1.4vw,18px)', fontStyle:'italic', fontWeight:300, color:'var(--stone)', lineHeight:1.88, maxWidth:310 }}>
              You have spent months imagining this day. The florals. The light. The way it all comes together.{' '}
              <strong style={{ color:'var(--ink)', fontStyle:'normal', fontWeight:300 }}>
                We build the frame that holds that feeling forever.
              </strong>
            </motion.p>

            <motion.div variants={fade(.92)} initial="hidden" animate="show"
              style={{ display:'flex', flexDirection:'column', marginTop:40 }}>
              <Link href="/build" className="btn" style={{ width:'fit-content' }}>
                Begin designing your setup
                <span className="arr" aria-hidden="true"/>
              </Link>
              <Link href="#proof" className="lnk" style={{ marginTop:16 }}>
                See whose celebrations we've held →
              </Link>
            </motion.div>
          </div>

          <ImagePanel y={imgY} />
        </div>

        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:.8, ease:E, delay:D+2.1 }}
          aria-hidden="true"
          style={{ position:'absolute', bottom:32, left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:10, zIndex:5 }}>
          <div style={{ width:1, height:52, background:'rgba(184,146,42,.15)', position:'relative', overflow:'hidden' }}>
            <div className="scroll-line-fill" style={{ position:'absolute', left:0, right:0, height:'100%', background:'var(--gold)' }}/>
          </div>
          <span className="fd" style={{ fontSize:11, letterSpacing:'.36em', textTransform:'uppercase', color:'var(--dust)' }}>Scroll</span>
        </motion.div>
      </section>
    </>
  )
}
