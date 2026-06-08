'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

const E = [0.19,1,0.22,1] as [number,number,number,number]
const LINKS = [
  { label:'Celebrations', href:'/#events'  },
  { label:'Build',        href:'/build'    },
  { label:'Packages',     href:'/packages' },
  { label:'About',        href:'/about'    },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const alwaysFrosted = pathname !== '/'

  const onScroll = useCallback(() => setScrolled(window.scrollY > 80), [])
  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive:true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [open])
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', fn)
    return () => document.removeEventListener('keydown', fn)
  }, [])

  const isCondensed = scrolled || alwaysFrosted

  return (
    <>
      <motion.nav initial={{ y:-8, opacity:0 }} animate={{ y:0, opacity:1 }}
        transition={{ duration:.8, ease:E, delay: pathname==='/' ? 2.2 : 0.1 }}
        role="navigation" aria-label="Primary navigation"
        style={{ position:'fixed', top:0, left:0, right:0, zIndex:900,
          padding: isCondensed ? '12px clamp(20px,4vw,48px)' : '28px clamp(20px,4vw,48px)',
          display:'flex', alignItems:'center', justifyContent:'space-between',
          background: isCondensed ? 'rgba(250,247,240,.96)' : 'transparent',
          backdropFilter: isCondensed ? 'blur(24px) saturate(180%)' : 'none',
          borderBottom: isCondensed ? '1px solid var(--ivory-3)' : '1px solid transparent',
          transition:'padding .55s var(--ease-gold),background .55s,border-color .55s' }}>

        <Link href="/" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none' }} aria-label="PhotoKecho home">
          <Image src="/logo.png" alt="PhotoKecho logo" width={48} height={48} style={{ objectFit:'contain' }} priority />
        </Link>

        <div className="hidden md:flex" style={{ alignItems:'center', gap:32 }}>
          {LINKS.map(({ label, href }) => {
            const active = pathname === href || (href.startsWith('/#') && pathname === '/')
            return (
              <Link key={label} href={href} className="fd"
                style={{ fontSize:11, letterSpacing:'.2em', textTransform:'uppercase', color: active ? 'var(--gold-2)' : 'var(--stone)', textDecoration:'none', transition:'color .3s', padding:'4px 0' }}
                onMouseEnter={e=>(e.currentTarget.style.color='var(--gold-2)')}
                onMouseLeave={e=>(e.currentTarget.style.color= active ? 'var(--gold-2)' : 'var(--stone)')}>
                {label}
              </Link>
            )
          })}
          {/* Instagram link */}
          <a href="https://www.instagram.com/photokecho?igsh=Z2Fodm9hbHNyM3l6&utm_source=qr"
            target="_blank" rel="noopener noreferrer" className="fd"
            style={{ fontSize:11, letterSpacing:'.2em', textTransform:'uppercase', color:'var(--stone)', textDecoration:'none', transition:'color .3s', padding:'4px 0', display:'flex', alignItems:'center', gap:6 }}
            onMouseEnter={e=>(e.currentTarget.style.color='var(--gold-2)')}
            onMouseLeave={e=>(e.currentTarget.style.color='var(--stone)')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
            Instagram
          </a>
          <Link href="/contact" className="btn" style={{ padding:'12px 24px', minHeight:44, fontSize:11 }}>
            Book Now
          </Link>
        </div>

        <button className="flex md:hidden" onClick={()=>setOpen(v=>!v)}
          aria-label={open?'Close menu':'Open menu'} aria-expanded={open} aria-controls="mob-menu"
          style={{ background:'none', border:'none', padding:8, cursor:'pointer', flexDirection:'column', gap:6, display:'flex', minWidth:44, minHeight:44, justifyContent:'center', alignItems:'center' }}>
          {[0,1,2].map(i=>(
            <span key={i} aria-hidden="true" style={{ width:24, height:1, background:'var(--stone)', display:'block', transition:'transform .4s var(--ease-silk),opacity .4s',
              transform:open?(i===0?'translateY(7px) rotate(45deg)':i===2?'translateY(-7px) rotate(-45deg)':'none'):'none',
              opacity:(open&&i===1)?0:1 }}/>
          ))}
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div id="mob-menu" role="dialog" aria-modal="true" aria-label="Navigation"
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            transition={{ duration:.4, ease:E }}
            style={{ position:'fixed', inset:0, background:'var(--ivory)', zIndex:800, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
            <Image src="/logo.png" alt="PhotoKecho" width={80} height={80} style={{ objectFit:'contain', marginBottom:40 }} />
            {[...LINKS,
              { label:'Instagram', href:'https://www.instagram.com/photokecho?igsh=Z2Fodm9hbHNyM3l6&utm_source=qr' },
              { label:'Book Now',  href:'/contact' }
            ].map(({ label, href }, i) => (
              <motion.div key={label} initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }}
                transition={{ delay:.07+i*.055, duration:.55, ease:E }} style={{ marginBottom:28 }}>
                <Link href={href}
                  onClick={()=>setOpen(false)}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="fs"
                  style={{ fontSize:'clamp(26px,7vw,38px)', fontWeight:300, fontStyle:'italic', color:'var(--ink)', textDecoration:'none', display:'flex', alignItems:'center', padding:'8px 24px', minHeight:52, transition:'color .3s' }}
                  onMouseEnter={e=>(e.currentTarget.style.color='var(--gold-2)')}
                  onMouseLeave={e=>(e.currentTarget.style.color='var(--ink)')}>
                  {label}
                </Link>
              </motion.div>
            ))}
            <div className="fu" style={{ fontSize:13, color:'var(--dust)', letterSpacing:'.1em', marginTop:20, fontWeight:200 }}>
              Photokecho@gmail.com
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
