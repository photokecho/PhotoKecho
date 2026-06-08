'use client'
import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const E = [0.19,1,0.22,1] as [number,number,number,number]

const PKGS = [
  {
    tier:'Base Package',
    name:'Standard Booth',
    price:'$499',
    note:'3 hours · everything included',
    featured:false,
    promise:'Perfect for smaller gatherings and intimate celebrations.',
    extras:'Additional hours available at $50/hr',
    features:[
      'Open-air photo booth setup',
      'Choice of backdrop style',
      'Custom-designed photostrip',
      'Props included',
      'Dedicated attendant for the full event',
      'Digital gallery sent same night',
      'Unlimited prints during the event',
    ],
  },
  {
    tier:'Most Popular',
    name:'Premium Booth',
    price:'$499',
    note:'3 hours · custom backdrop included',
    featured:true,
    promise:'Our most booked package — great for weddings, mehndis, and walimas.',
    extras:'Add-ons: Photobook $50 · Custom backdrop priced on request · Extra hours $50/hr',
    features:[
      'Open-air photo booth setup',
      'Custom backdrop tailored to your event theme',
      'Photostrip designed around your colours',
      'Premium props collection',
      'Dedicated attendant throughout',
      'Digital gallery sent same night',
      'Unlimited prints',
      'Photobook add-on available (+$50)',
    ],
  },
  {
    tier:'Full Experience',
    name:'Deluxe Package',
    price:'Custom',
    note:'Priced based on your event needs',
    featured:false,
    promise:'For larger events that need something fully tailored.',
    extras:'Everything priced transparently — no surprises',
    features:[
      'Everything in Premium',
      'Fully custom backdrop built for your event',
      'Multiple hours covered',
      'Photobook included',
      'Two attendants for larger events',
      'Priority setup before guests arrive',
      'Consultation call to plan every detail',
    ],
  },
]

function Card({ pkg, i }: { pkg:typeof PKGS[0]; i:number }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once:true, amount:.08 })
  const [exp, setExp] = useState(false)
  return (
    <motion.article ref={ref}
      initial={{ opacity:0, y:26 }} animate={inView?{opacity:1,y:0}:{}}
      transition={{ duration:1.0, ease:E, delay:i*.09 }}
      aria-labelledby={`pkg-${i}`}
      style={{ background:pkg.featured?'var(--ink)':'var(--ivory)', borderTop:pkg.featured?'2px solid var(--gold)':'1px solid var(--ivory-3)', padding:'clamp(32px,4vw,52px) clamp(24px,3.5vw,44px)', display:'flex', flexDirection:'column' }}>
      <p className="fd" style={{ fontSize:11, letterSpacing:'.24em', textTransform:'uppercase', color:pkg.featured?'var(--gold)':'var(--dust)', marginBottom:16 }}>{pkg.tier}</p>
      <h3 id={`pkg-${i}`} className="fs" style={{ fontSize:'clamp(26px,3.5vw,36px)', fontWeight:300, color:pkg.featured?'var(--gold-w)':'var(--ink)', marginBottom:8 }}>{pkg.name}</h3>
      <p className="fs" style={{ fontSize:'clamp(13px,1.4vw,15px)', fontStyle:'italic', color:pkg.featured?'rgba(210,195,170,.8)':'var(--stone)', marginBottom:28, lineHeight:1.7 }}>{pkg.promise}</p>
      <div style={{ marginBottom:16 }}>
        <div className="fd" style={{ fontSize:'clamp(28px,3vw,40px)', fontWeight:400, color:pkg.featured?'var(--gold-w)':'var(--gold-2)', lineHeight:1, letterSpacing:'-.01em' }}>{pkg.price}</div>
        <div className="fd" style={{ fontSize:11, letterSpacing:'.16em', textTransform:'uppercase', color:pkg.featured?'var(--stone)':'var(--dust)', marginTop:8 }}>{pkg.note}</div>
      </div>
      {/* Add-ons line */}
      <p className="fu" style={{ fontSize:12, color:pkg.featured?'var(--gold)':'var(--champ-2)', fontStyle:'italic', marginBottom:24, lineHeight:1.6 }}>
        {pkg.extras}
      </p>
      <div style={{ height:1, background:pkg.featured?'rgba(255,255,255,.07)':'var(--ivory-3)', marginBottom:28 }} aria-hidden="true"/>
      <ul style={{ listStyle:'none' }} aria-label={`${pkg.name} includes`}>
        {pkg.features.slice(0, pkg.featured?8:4).map((f,j) => (
          <li key={j} className="fs" style={{ display:'flex', gap:14, padding:'9px 0', borderBottom:`1px solid ${pkg.featured?'rgba(255,255,255,.04)':'var(--ivory-3)'}`, fontSize:14, fontStyle:'italic', color:pkg.featured?'rgba(200,190,170,.78)':'var(--stone)', alignItems:'baseline' }}>
            <span aria-hidden="true" style={{ width:3, height:3, background:pkg.featured?'var(--gold)':'var(--champ-2)', borderRadius:'50%', flexShrink:0, marginTop:8 }}/>
            {f}
          </li>
        ))}
        <AnimatePresence initial={false}>
          {exp && !pkg.featured && (
            <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:.5, ease:E }} style={{ overflow:'hidden' }}>
              {pkg.features.slice(4).map((f,j) => (
                <li key={j} className="fs" style={{ display:'flex', gap:14, padding:'9px 0', borderBottom:'1px solid var(--ivory-3)', fontSize:14, fontStyle:'italic', color:'var(--stone)', alignItems:'baseline' }}>
                  <span aria-hidden="true" style={{ width:3, height:3, background:'var(--champ-2)', borderRadius:'50%', flexShrink:0, marginTop:8 }}/>
                  {f}
                </li>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </ul>
      {!pkg.featured && pkg.features.length > 4 && (
        <button onClick={()=>setExp(v=>!v)} aria-expanded={exp} className="fd"
          style={{ background:'none', border:'none', cursor:'pointer', marginTop:12, fontSize:11, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--gold-2)', padding:'8px 0', textAlign:'left', minHeight:44, display:'flex', alignItems:'center' }}>
          {exp ? '— See less' : `+ ${pkg.features.length-4} more included`}
        </button>
      )}
      <Link href="/contact"
        className={`btn ${pkg.featured?'btn-gold':''}`}
        style={{ display:'flex', alignItems:'center', justifyContent:'center', paddingTop:14, paddingBottom:14, textAlign:'center', fontSize:11, letterSpacing:'.18em', textTransform:'uppercase', textDecoration:'none', minHeight:56, marginTop:36, ...(!pkg.featured?{background:'transparent',color:'var(--gold)',border:'1px solid rgba(184,146,42,.28)'}:{}) }}
        onMouseEnter={e=>{ if(!pkg.featured){e.currentTarget.style.background='rgba(184,146,42,.07)';e.currentTarget.style.borderColor='var(--gold)'} }}
        onMouseLeave={e=>{ if(!pkg.featured){e.currentTarget.style.background='transparent';e.currentTarget.style.borderColor='rgba(184,146,42,.28)'} }}>
        Book {pkg.name}
      </Link>
    </motion.article>
  )
}

export function Pricing() {
  const headRef = useRef<HTMLDivElement>(null)
  const headIn  = useInView(headRef, { once:true, amount:.2 })
  return (
    <section id="pricing"
      style={{ padding:'var(--sy) var(--sx)', background:'var(--ivory-2)', borderTop:'1px solid var(--ivory-3)' }}
      aria-labelledby="pricing-heading">
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <motion.div ref={headRef} initial={{ opacity:0, y:26 }} animate={headIn?{opacity:1,y:0}:{}}
          transition={{ duration:1.0, ease:E }}
          style={{ textAlign:'center', marginBottom:'clamp(48px,6vw,88px)' }}>
          <p className="fd" style={{ fontSize:11, letterSpacing:'.28em', textTransform:'uppercase', color:'var(--gold)', marginBottom:24 }}>Pricing</p>
          <h2 id="pricing-heading" className="fs" style={{ fontSize:'var(--text-xl)', fontWeight:300, color:'var(--ink)', lineHeight:1.04, letterSpacing:'-.01em', marginBottom:20 }}>
            Simple, transparent pricing.<br/>
            <em style={{ fontStyle:'italic', color:'var(--gold-2)' }}>No hidden fees.</em>
          </h2>
          <p className="fs" style={{ fontSize:'clamp(15px,1.6vw,18px)', fontStyle:'italic', color:'var(--stone)', lineHeight:1.85, maxWidth:520, margin:'0 auto' }}>
            All packages start at $499 for 3 hours. Add extra hours at $50/hr. Photobook add-on is $50. Custom backdrops are priced based on what you need.
          </p>
        </motion.div>
        <div className="pkg-grid" style={{ gap:1, background:'var(--ivory-3)' }}>
          {PKGS.map((pkg,i) => <Card key={pkg.name} pkg={pkg} i={i} />)}
        </div>
        <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
          transition={{ duration:.8, ease:E, delay:.3 }}
          className="fu" style={{ textAlign:'center', marginTop:44, fontSize:11, fontWeight:200, fontStyle:'italic', color:'var(--dust)', lineHeight:1.8 }}>
          Not sure what you need? Just reach out — we'll help you figure out the right package for your event.<br/>
          Based in Chicago. Available for events in the surrounding area.
        </motion.p>
      </div>
    </section>
  )
}
