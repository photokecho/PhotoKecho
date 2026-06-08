'use client'
import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const E = [0.19,1,0.22,1] as [number,number,number,number]

const BACKDROP_BASES = [
  { id:'plain white',    label:'Plain White',    icon:'⬜', desc:'Clean white fabric — elegant and simple' },
  { id:'plain ivory',    label:'Plain Ivory',    icon:'🤍', desc:'Warm ivory tone, soft and classic' },
  { id:'plain black',    label:'Plain Black',    icon:'⬛', desc:'Bold, dramatic, modern' },
  { id:'shimmer sequin', label:'Shimmer Sequin', icon:'✨', desc:'Light-catching sequin fabric, glam look' },
  { id:'satin fabric',   label:'Satin',          icon:'🪞', desc:'Smooth, glossy, luxurious sheen' },
  { id:'velvet',         label:'Velvet',         icon:'🎭', desc:'Rich texture, deep and opulent' },
]
const ARCH_COUNTS = [
  { id:'no arch',     label:'No Arch',    desc:'Backdrop only' },
  { id:'one arch',    label:'1 Arch',     desc:'Single centred arch' },
  { id:'two arches',  label:'2 Arches',   desc:'Double arch' },
  { id:'three arches',label:'3 Arches',   desc:'Triple arch' },
]
const ARCH_STYLES = [
  { id:'round top arch',         label:'Round Top'   },
  { id:'pointed arch',           label:'Pointed'     },
  { id:'square frame arch',      label:'Square Frame'},
  { id:'organic flowing arch',   label:'Organic'     },
]
const ARCH_COLOURS = [
  { id:'white',     label:'White',     hex:'#F5F0E8' },
  { id:'ivory',     label:'Ivory',     hex:'#EDE8DA' },
  { id:'gold',      label:'Gold',      hex:'#C9A96E' },
  { id:'rose gold', label:'Rose Gold', hex:'#C9967A' },
  { id:'black',     label:'Black',     hex:'#1A1A1A' },
  { id:'silver',    label:'Silver',    hex:'#C0C0C0' },
]
const DRAPE_OPTIONS = [
  { id:'no draping',          label:'No Draping',      desc:'No fabric draping' },
  { id:'swag draping',        label:'Swag / Swoosh',   desc:'Fabric swoops across the top' },
  { id:'side panel draping',  label:'Side Panels',     desc:'Flowing fabric on both sides' },
  { id:'full coverage draping',label:'Full Coverage',  desc:'Fabric across entire backdrop' },
  { id:'layered draping',     label:'Layered',         desc:'Multiple layers for depth' },
  { id:'cascading draping',   label:'Cascading',       desc:'Fabric flows down in waves' },
]
const DRAPE_COLOURS = [
  { id:'white',      label:'White',       hex:'#F5F0E8' },
  { id:'ivory',      label:'Ivory',       hex:'#EDE8DA' },
  { id:'blush pink', label:'Blush Pink',  hex:'#E8B4B8' },
  { id:'dusty rose', label:'Dusty Rose',  hex:'#C8848A' },
  { id:'deep maroon',label:'Maroon',      hex:'#6B1C26' },
  { id:'burgundy',   label:'Burgundy',    hex:'#800020' },
  { id:'dusty blue', label:'Dusty Blue',  hex:'#7B9BB5' },
  { id:'navy blue',  label:'Navy',        hex:'#1A2557' },
  { id:'sage green', label:'Sage Green',  hex:'#8FAF8A' },
  { id:'emerald',    label:'Emerald',     hex:'#1C5C3A' },
  { id:'champagne',  label:'Champagne',   hex:'#C9A96E' },
  { id:'lavender',   label:'Lavender',    hex:'#B8A9C9' },
  { id:'peach',      label:'Peach',       hex:'#FFBF9B' },
  { id:'gold',       label:'Gold',        hex:'#B8860B' },
  { id:'purple',     label:'Purple',      hex:'#6B3FA0' },
  { id:'terracotta', label:'Terracotta',  hex:'#C16B4A' },
]
const FLORAL_PLACEMENT = [
  { id:'no flowers',              label:'No Flowers',           desc:'No florals' },
  { id:'top centre cluster',      label:'Top Centre',           desc:'Flowers at the top centre' },
  { id:'both top corners',        label:'Both Top Corners',     desc:'Clusters in each top corner' },
  { id:'left corner only',        label:'Left Corner',          desc:'Single cluster top left' },
  { id:'right corner only',       label:'Right Corner',         desc:'Single cluster top right' },
  { id:'both sides cascading',    label:'Both Sides Cascading', desc:'Flowers trailing down both sides' },
  { id:'arch covered in flowers', label:'Full Arch Coverage',   desc:'Flowers covering the arch' },
  { id:'full flower wall',        label:'Full Flower Wall',     desc:'Entire backdrop in flowers' },
  { id:'floor arrangement',       label:'Floor Arrangement',    desc:'Flowers at the base' },
]
const FLORAL_TYPES = [
  { id:'roses',         label:'Roses',         icon:'🌹' },
  { id:'peonies',       label:'Peonies',        icon:'🌸' },
  { id:'hydrangeas',    label:'Hydrangeas',     icon:'💐' },
  { id:'orchids',       label:'Orchids',        icon:'🌺' },
  { id:'babys breath',  label:"Baby's Breath",  icon:'🤍' },
  { id:'marigolds',     label:'Marigolds',      icon:'🌼' },
  { id:'dahlias',       label:'Dahlias',        icon:'🌸' },
  { id:'greenery',      label:'Greenery Only',  icon:'🌿' },
  { id:'mixed flowers', label:'Mixed Flowers',  icon:'💐' },
]
const FLORAL_COLOURS = [
  { id:'all white',          label:'All White',        hex:'#F8F5F0' },
  { id:'blush and pink',     label:'Blush & Pink',     hex:'#E8A0A0' },
  { id:'deep red',           label:'Deep Red',         hex:'#8B1A1A' },
  { id:'burgundy and blush', label:'Burgundy & Blush', hex:'#9B2A3A' },
  { id:'blue and white',     label:'Blue & White',     hex:'#7B9BB5' },
  { id:'purple and white',   label:'Purple & White',   hex:'#9B7AC0' },
  { id:'orange marigold',    label:'Orange Marigold',  hex:'#E8841A' },
  { id:'yellow and white',   label:'Yellow & White',   hex:'#E8D44A' },
  { id:'all green',          label:'All Green',        hex:'#4A8A4A' },
  { id:'nude and blush',     label:'Nude & Blush',     hex:'#D4A898' },
  { id:'jewel tones',        label:'Jewel Tones',      hex:'#7B4A9B' },
  { id:'rainbow mixed',      label:'Rainbow Mixed',    hex:'#E8A040' },
]
const LIGHTING = [
  { id:'no lighting',       label:'No Lighting',      desc:'Natural' },
  { id:'warm fairy lights', label:'Fairy Lights',     desc:'Warm twinkling lights' },
  { id:'neon sign',         label:'Neon Sign',        desc:'Glowing neon text' },
  { id:'spotlights',        label:'Spotlights',       desc:'Dramatic uplighting' },
  { id:'pillar candles',    label:'Pillar Candles',   desc:'Tall candles on stands' },
  { id:'hanging lanterns',  label:'Hanging Lanterns', desc:'Decorative lanterns' },
]
const EXTRAS = [
  { id:'gold velvet rope stanchions', label:'Gold Stanchions',   icon:'🏛️' },
  { id:'floral pedestal stands',      label:'Floral Pedestals',  icon:'🌸' },
  { id:'prop table',                  label:'Prop Table',        icon:'🎭' },
  { id:'persian rug',                 label:'Persian Rug',       icon:'🪬' },
  { id:'elegant sofa seating',        label:'Sofa Seating',      icon:'🛋️' },
  { id:'dessert table',               label:'Dessert Table',     icon:'🎂' },
  { id:'ornate gold mirror frame',    label:'Gold Mirror Frame', icon:'🪞' },
]
const OCCASIONS = ['Mehndi Night','Nikkah Ceremony','Walima Reception','Sangeet Night','Eid Celebration','Birthday','Corporate Event','Bridal Shower']

type Config = {
  backdropBase: string; archCount: string; archStyle: string; archColour: string
  drapeStyle: string; drapeColour: string; floralPlacement: string; floralType: string
  floralColour: string; lighting: string; extras: string[]; occasion: string; hours: number
}
const DEFAULT: Config = {
  backdropBase:'plain white', archCount:'no arch', archStyle:'round top arch', archColour:'white',
  drapeStyle:'no draping', drapeColour:'white', floralPlacement:'no flowers', floralType:'roses',
  floralColour:'all white', lighting:'no lighting', extras:[], occasion:'Walima Reception', hours:3,
}

function SectionTitle({ n, title, sub }: { n:string; title:string; sub:string }) {
  return (
    <div style={{ marginBottom:18 }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:5 }}>
        <span className="fd" style={{ fontSize:10, letterSpacing:'.2em', textTransform:'uppercase', color:'var(--gold)', background:'var(--gold-p)', padding:'2px 10px' }}>{n}</span>
        <span className="fd" style={{ fontSize:11, letterSpacing:'.2em', textTransform:'uppercase', color:'var(--ink)' }}>{title}</span>
      </div>
      <p className="fu" style={{ fontSize:12, color:'var(--stone)', fontStyle:'italic' }}>{sub}</p>
    </div>
  )
}

function ColourRow({ colours, selected, onSelect }: { colours:{id:string;label:string;hex:string}[]; selected:string; onSelect:(id:string)=>void }) {
  return (
    <div style={{ display:'flex', flexWrap:'wrap', gap:10 }}>
      {colours.map(c => (
        <button key={c.id} onClick={()=>onSelect(c.id)} title={c.label}
          style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:5, background:'none', border:'none', cursor:'pointer' }}>
          <div style={{ width:36, height:36, borderRadius:'50%', background:c.hex, border:`3px solid ${selected===c.id?'var(--gold)':'transparent'}`, boxShadow:selected===c.id?'0 0 0 2px var(--gold-2)':'0 0 0 1px rgba(0,0,0,.12)', transition:'all .25s' }}/>
          <span className="fd" style={{ fontSize:8, letterSpacing:'.1em', textTransform:'uppercase', color:selected===c.id?'var(--gold-2)':'var(--dust)', maxWidth:48, textAlign:'center', lineHeight:1.3 }}>{c.label}</span>
        </button>
      ))}
    </div>
  )
}

function ChipGrid({ items, selected, onSelect, multi=false }: { items:{id:string;label:string;desc?:string;icon?:string}[]; selected:string|string[]; onSelect:(id:string)=>void; multi?:boolean }) {
  const isSel = (id:string) => multi?(selected as string[]).includes(id):selected===id
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))', gap:8 }}>
      {items.map(item => (
        <button key={item.id} onClick={()=>onSelect(item.id)}
          style={{ border:`2px solid ${isSel(item.id)?'var(--gold)':'var(--ivory-3)'}`, background:isSel(item.id)?'rgba(184,146,42,.06)':'var(--ivory)', cursor:'pointer', padding:'11px 14px', textAlign:'left', transition:'all .25s' }}>
          {item.icon && <div style={{ fontSize:17, marginBottom:5 }}>{item.icon}</div>}
          <p className="fd" style={{ fontSize:10, letterSpacing:'.13em', textTransform:'uppercase', color:isSel(item.id)?'var(--gold-2)':'var(--stone)', marginBottom:item.desc?3:0 }}>{item.label}</p>
          {item.desc && <p className="fu" style={{ fontSize:10, color:'var(--dust)', fontStyle:'italic', lineHeight:1.4 }}>{item.desc}</p>}
        </button>
      ))}
    </div>
  )
}

function RequestModal({ cfg, image, onClose }: { cfg:Config; image:string|null; onClose:()=>void }) {
  const [sent, setSent] = useState(false)
  const price = 499 + Math.max(0, cfg.hours-3)*50
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const d = new FormData(e.currentTarget)
    const extras = cfg.extras.length ? cfg.extras.join(', ') : 'None'
    const subject = encodeURIComponent(`Backdrop Request — ${cfg.occasion}`)
    const body = encodeURIComponent(`New backdrop booking request:

Name: ${d.get('name')}
Email: ${d.get('email')}
Phone: ${d.get('phone')}
Event Date: ${d.get('date')}

BACKDROP DESIGN:
Occasion: ${cfg.occasion} · Hours: ${cfg.hours}
Base: ${cfg.backdropBase}
Arch: ${cfg.archCount}${cfg.archCount!=='no arch'?` — ${cfg.archStyle} in ${cfg.archColour}`:''}
Draping: ${cfg.drapeStyle}${cfg.drapeStyle!=='no draping'?` — ${cfg.drapeColour}`:''}
Florals: ${cfg.floralPlacement}${cfg.floralPlacement!=='no flowers'?` — ${cfg.floralType}, ${cfg.floralColour}`:''}
Lighting: ${cfg.lighting}
Extras: ${extras}

PRICE: $${price}+ (custom backdrop priced separately)
Notes: ${d.get('notes')}`)
    setSent(true)
    setTimeout(()=>{ window.location.href=`mailto:Photokecho@gmail.com?subject=${subject}&body=${body}` },500)
  }
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      onClick={e=>{if(e.target===e.currentTarget)onClose()}}
      style={{position:'fixed',inset:0,background:'rgba(26,22,14,.88)',zIndex:9000,display:'flex',alignItems:'center',justifyContent:'center',padding:20,backdropFilter:'blur(10px)'}}>
      <motion.div initial={{y:24,opacity:0}} animate={{y:0,opacity:1}}
        style={{background:'var(--ivory)',border:'1px solid var(--ivory-3)',padding:'clamp(28px,4vw,48px)',width:'100%',maxWidth:540,maxHeight:'90vh',overflowY:'auto',position:'relative'}}>
        <button onClick={onClose} style={{position:'absolute',top:16,right:16,background:'none',border:'none',cursor:'pointer',fontSize:20,color:'var(--dust)',padding:8}}>✕</button>
        {sent ? (
          <div style={{textAlign:'center',padding:'48px 0'}}>
            <div className="fs" style={{fontSize:52,color:'var(--gold-2)',marginBottom:16}}>✦</div>
            <p className="fs" style={{fontSize:22,fontWeight:300,fontStyle:'italic',color:'var(--ink)',lineHeight:1.7}}>Request sent!<br/>We&apos;ll reply within 24 hours.</p>
          </div>
        ):(
          <>
            <h2 className="fs" style={{fontSize:28,fontWeight:300,color:'var(--ink)',marginBottom:6}}>Request This Setup</h2>
            <p className="fu" style={{fontSize:13,color:'var(--stone)',fontStyle:'italic',marginBottom:24}}>We&apos;ll confirm availability and send a full quote within 24 hours.</p>
            {image&&<div style={{marginBottom:20,overflow:'hidden',border:'1px solid var(--ivory-3)'}}>
              <img src={image} alt="Your AI backdrop" style={{width:'100%',display:'block'}}/>
              <p className="fd" style={{fontSize:9,letterSpacing:'.16em',textTransform:'uppercase',color:'var(--dust)',padding:'8px 12px',background:'var(--ivory-2)'}}>Your AI-designed backdrop</p>
            </div>}
            <div style={{background:'var(--ivory-2)',border:'1px solid var(--ivory-3)',padding:'14px 18px',marginBottom:22}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <span className="fd" style={{fontSize:9,letterSpacing:'.18em',textTransform:'uppercase',color:'var(--dust)'}}>Estimated price</span>
                <span className="fs" style={{fontSize:22,fontWeight:300,color:'var(--gold-2)'}}>${price}<span className="fu" style={{fontSize:11,color:'var(--dust)'}}>+ custom backdrop</span></span>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              {[{name:'name',label:'Your Name',type:'text',ph:'Aisha Khan',auto:'name'},{name:'email',label:'Email',type:'email',ph:'aisha@email.com',auto:'email'},{name:'phone',label:'Phone',type:'tel',ph:'+1 (312) 000-0000',auto:'tel'},{name:'date',label:'Event Date',type:'date',ph:'',auto:'off'}].map(f=>(
                <div key={f.name} className="cf">
                  <label className="fd" style={{display:'block',fontSize:9,letterSpacing:'.2em',textTransform:'uppercase',color:'var(--dust)',paddingTop:14,marginBottom:5}}>{f.label}</label>
                  <input name={f.name} type={f.type} placeholder={f.ph} autoComplete={f.auto} style={{background:'transparent',border:'none',outline:'none',fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:15,fontStyle:'italic',color:'var(--ink)',paddingBottom:12,width:'100%'}}/>
                </div>
              ))}
              <div className="cf">
                <label className="fd" style={{display:'block',fontSize:9,letterSpacing:'.2em',textTransform:'uppercase',color:'var(--dust)',paddingTop:14,marginBottom:5}}>Notes</label>
                <textarea name="notes" rows={3} placeholder="Venue, any other details…" style={{background:'transparent',border:'none',outline:'none',fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:15,fontStyle:'italic',color:'var(--ink)',paddingBottom:12,width:'100%',resize:'none'}}/>
              </div>
              <button type="submit" className="btn" style={{marginTop:24,width:'100%',justifyContent:'center'}}>Send Request <span className="arr" aria-hidden="true"/></button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}

export function BuildConfigurator() {
  const [cfg, setCfg] = useState<Config>(DEFAULT)
  const [image, setImage] = useState<string|null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string|null>(null)
  const [generated, setGenerated] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const set = <K extends keyof Config>(k:K, v:Config[K]) => setCfg(p=>({...p,[k]:v}))
  const toggleExtra = (id:string) => setCfg(p=>({...p,extras:p.extras.includes(id)?p.extras.filter(x=>x!==id):[...p.extras,id]}))

  const generate = useCallback(async()=>{
    setLoading(true); setError(null)
    try {

      const res = await fetch('/api/generate-backdrop',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({backdropBase:cfg.backdropBase,archCount:cfg.archCount,archStyle:cfg.archStyle,archColour:cfg.archColour,drapeStyle:cfg.drapeStyle,drapeColour:cfg.drapeColour,floralPlacement:cfg.floralPlacement,floralType:cfg.floralType,floralColour:cfg.floralColour,lighting:cfg.lighting,extras:cfg.extras,occasion:cfg.occasion}),
      })
      const data = await res.json()
      if(data?.imageUrl){setImage(data.imageUrl);setGenerated(true)}
      else setError(data?.error||'Generation failed. Please try again.')
    } catch { setError('Connection error. Please try again.') }
    finally{setLoading(false)}
  },[cfg])

  const price = 499+Math.max(0,cfg.hours-3)*50
  const showArchOpts = cfg.archCount!=='no arch'
  const showDrapeCol = cfg.drapeStyle!=='no draping'
  const showFloralDet = cfg.floralPlacement!=='no flowers'
  const summary=[cfg.backdropBase,showArchOpts?`${cfg.archCount} (${cfg.archColour} ${cfg.archStyle})`:null,showDrapeCol?`${cfg.drapeColour} ${cfg.drapeStyle}`:null,showFloralDet?`${cfg.floralColour} ${cfg.floralType} — ${cfg.floralPlacement}`:null,cfg.lighting!=='no lighting'?cfg.lighting:null,...cfg.extras].filter(Boolean)

  return (
    <div style={{background:'var(--ivory)',minHeight:'calc(100vh - 80px)'}}>
      <div style={{padding:'clamp(32px,5vw,56px) var(--sx)',background:'var(--ivory)',borderBottom:'1px solid var(--ivory-3)'}}>
        <div style={{maxWidth:'var(--cmax)',margin:'0 auto'}}>
          <p className="fd" style={{fontSize:11,letterSpacing:'.28em',textTransform:'uppercase',color:'var(--gold)',marginBottom:12}}>AI Backdrop Designer</p>
          <h1 className="fs" style={{fontSize:'var(--text-xl)',fontWeight:300,color:'var(--ink)',letterSpacing:'-.01em',marginBottom:10}}>
            Design your backdrop,<br/><em style={{fontStyle:'italic',color:'var(--gold-2)'}}>then see it come to life.</em>
          </h1>
          <p className="fs" style={{fontSize:'clamp(14px,1.4vw,17px)',fontStyle:'italic',color:'var(--stone)',lineHeight:1.8,maxWidth:560}}>
            Choose every detail — base, arches, draping, florals, lighting, and extras. Hit <strong style={{fontStyle:'normal'}}>Generate</strong> and see your exact backdrop in seconds.
          </p>
        </div>
      </div>

      <div style={{maxWidth:'var(--cmax)',margin:'0 auto',display:'grid',gridTemplateColumns:'1fr clamp(300px,38%,460px)'}} className="build-layout">
        <div style={{padding:'clamp(24px,4vw,48px)',borderRight:'1px solid var(--ivory-3)',display:'flex',flexDirection:'column',gap:40}}>

          <div><SectionTitle n="01" title="Backdrop Base" sub="The main fabric or material."/>
            <ChipGrid items={BACKDROP_BASES} selected={cfg.backdropBase} onSelect={v=>set('backdropBase',v)}/></div>

          <div style={{paddingTop:32,borderTop:'1px solid var(--ivory-3)'}}>
            <SectionTitle n="02" title="Arch Frame" sub="Choose how many arches and what style."/>
            <p className="fd" style={{fontSize:10,letterSpacing:'.18em',textTransform:'uppercase',color:'var(--stone)',marginBottom:10}}>Number of arches</p>
            <ChipGrid items={ARCH_COUNTS} selected={cfg.archCount} onSelect={v=>set('archCount',v)}/>
            <AnimatePresence>{showArchOpts&&<motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}} style={{overflow:'hidden'}}>
              <div style={{marginTop:20}}><p className="fd" style={{fontSize:10,letterSpacing:'.18em',textTransform:'uppercase',color:'var(--stone)',marginBottom:10}}>Arch style</p>
                <ChipGrid items={ARCH_STYLES} selected={cfg.archStyle} onSelect={v=>set('archStyle',v)}/></div>
              <div style={{marginTop:20}}><p className="fd" style={{fontSize:10,letterSpacing:'.18em',textTransform:'uppercase',color:'var(--stone)',marginBottom:12}}>Arch colour</p>
                <ColourRow colours={ARCH_COLOURS} selected={cfg.archColour} onSelect={v=>set('archColour',v)}/></div>
            </motion.div>}</AnimatePresence>
          </div>

          <div style={{paddingTop:32,borderTop:'1px solid var(--ivory-3)'}}>
            <SectionTitle n="03" title="Fabric Draping" sub="Add flowing fabric for elegance."/>
            <ChipGrid items={DRAPE_OPTIONS} selected={cfg.drapeStyle} onSelect={v=>set('drapeStyle',v)}/>
            <AnimatePresence>{showDrapeCol&&<motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}} style={{overflow:'hidden'}}>
              <div style={{marginTop:20}}><p className="fd" style={{fontSize:10,letterSpacing:'.18em',textTransform:'uppercase',color:'var(--stone)',marginBottom:12}}>Drape colour</p>
                <ColourRow colours={DRAPE_COLOURS} selected={cfg.drapeColour} onSelect={v=>set('drapeColour',v)}/></div>
            </motion.div>}</AnimatePresence>
          </div>

          <div style={{paddingTop:32,borderTop:'1px solid var(--ivory-3)'}}>
            <SectionTitle n="04" title="Florals" sub="Choose placement, flower type, and colour."/>
            <p className="fd" style={{fontSize:10,letterSpacing:'.18em',textTransform:'uppercase',color:'var(--stone)',marginBottom:10}}>Floral placement</p>
            <ChipGrid items={FLORAL_PLACEMENT} selected={cfg.floralPlacement} onSelect={v=>set('floralPlacement',v)}/>
            <AnimatePresence>{showFloralDet&&<motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}} style={{overflow:'hidden'}}>
              <div style={{marginTop:20}}><p className="fd" style={{fontSize:10,letterSpacing:'.18em',textTransform:'uppercase',color:'var(--stone)',marginBottom:10}}>Flower type</p>
                <ChipGrid items={FLORAL_TYPES} selected={cfg.floralType} onSelect={v=>set('floralType',v)}/></div>
              <div style={{marginTop:20}}><p className="fd" style={{fontSize:10,letterSpacing:'.18em',textTransform:'uppercase',color:'var(--stone)',marginBottom:12}}>Flower colour</p>
                <ColourRow colours={FLORAL_COLOURS} selected={cfg.floralColour} onSelect={v=>set('floralColour',v)}/></div>
            </motion.div>}</AnimatePresence>
          </div>

          <div style={{paddingTop:32,borderTop:'1px solid var(--ivory-3)'}}>
            <SectionTitle n="05" title="Lighting" sub="Set the mood with lighting elements."/>
            <ChipGrid items={LIGHTING} selected={cfg.lighting} onSelect={v=>set('lighting',v)}/></div>

          <div style={{paddingTop:32,borderTop:'1px solid var(--ivory-3)'}}>
            <SectionTitle n="06" title="Extras & Add-ons" sub="Select as many as you like."/>
            <ChipGrid items={EXTRAS} selected={cfg.extras} onSelect={toggleExtra} multi/></div>

          <div style={{paddingTop:32,borderTop:'1px solid var(--ivory-3)'}}>
            <SectionTitle n="07" title="Your Event" sub="Helps the AI match the right style."/>
            <p className="fd" style={{fontSize:10,letterSpacing:'.18em',textTransform:'uppercase',color:'var(--stone)',marginBottom:12}}>Event type</p>
            <div style={{display:'flex',flexWrap:'wrap',gap:8,marginBottom:28}}>
              {OCCASIONS.map(o=><button key={o} onClick={()=>set('occasion',o)} style={{padding:'9px 16px',border:`1px solid ${cfg.occasion===o?'var(--gold)':'var(--ivory-3)'}`,background:cfg.occasion===o?'rgba(184,146,42,.07)':'var(--ivory)',cursor:'pointer',fontFamily:"'Cinzel',serif",fontSize:10,letterSpacing:'.13em',textTransform:'uppercase',color:cfg.occasion===o?'var(--gold-2)':'var(--dust)',transition:'all .25s'}}>{o}</button>)}
            </div>
            <p className="fd" style={{fontSize:10,letterSpacing:'.18em',textTransform:'uppercase',color:'var(--stone)',marginBottom:12}}>Hours needed</p>
            <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:6}}>
              <button onClick={()=>set('hours',Math.max(3,cfg.hours-1))} style={{width:40,height:40,border:'1px solid var(--ivory-3)',background:'var(--ivory)',cursor:'pointer',fontSize:22,color:'var(--stone)',display:'flex',alignItems:'center',justifyContent:'center'}}>−</button>
              <span className="fs" style={{fontSize:34,fontWeight:300,color:'var(--ink)',minWidth:48,textAlign:'center'}}>{cfg.hours}</span>
              <button onClick={()=>set('hours',Math.min(12,cfg.hours+1))} style={{width:40,height:40,border:'1px solid var(--ivory-3)',background:'var(--ivory)',cursor:'pointer',fontSize:22,color:'var(--stone)',display:'flex',alignItems:'center',justifyContent:'center'}}>+</button>
              <span className="fu" style={{fontSize:13,color:'var(--stone)',fontStyle:'italic'}}>hours · $499 base + $50/hr extra</span>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div style={{background:'var(--ivory-2)',borderLeft:'1px solid var(--ivory-3)',display:'flex',flexDirection:'column',position:'sticky',top:80,height:'calc(100vh - 80px)'}}>
          <div style={{flex:1,position:'relative',overflow:'hidden',background:'#0d0a06'}}>
            <AnimatePresence mode="wait">
              {loading?<motion.div key="load" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:20}}>
                <motion.div animate={{rotate:360}} transition={{duration:2,repeat:Infinity,ease:'linear'}} style={{width:56,height:56,border:'2px solid rgba(184,146,42,.2)',borderTop:'2px solid var(--gold)',borderRadius:'50%'}}/>
                <div style={{textAlign:'center'}}>
                  <p className="fd" style={{fontSize:11,letterSpacing:'.22em',textTransform:'uppercase',color:'var(--gold)',marginBottom:8}}>Generating your backdrop</p>
                  <p className="fu" style={{fontSize:12,color:'var(--dust)',fontStyle:'italic'}}>About 15 seconds…</p>
                </div>
              </motion.div>
              :image?<motion.div key="img" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} style={{position:'absolute',inset:0}}>
                <img src={image} alt="AI generated backdrop" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center top'}}/>
                <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'28px 18px 14px',background:'linear-gradient(to top,rgba(4,4,8,.88),transparent)'}}>
                  <p className="fd" style={{fontSize:9,letterSpacing:'.2em',textTransform:'uppercase',color:'var(--gold)',marginBottom:4}}>✦ AI Generated Preview</p>
                  <p className="fs" style={{fontSize:13,fontWeight:300,fontStyle:'italic',color:'var(--ivory)',lineHeight:1.4}}>This is what your backdrop will look like</p>
                </div>
              </motion.div>
              :<motion.div key="empty" initial={{opacity:0}} animate={{opacity:1}} style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:32}}>
                <div className="fs" style={{fontSize:48,color:'rgba(184,146,42,.3)',marginBottom:16}}>✦</div>
                <p className="fd" style={{fontSize:11,letterSpacing:'.22em',textTransform:'uppercase',color:'rgba(212,184,122,.6)',marginBottom:12}}>Your design will appear here</p>
                <p className="fu" style={{fontSize:12,color:'rgba(180,170,150,.6)',fontStyle:'italic',lineHeight:1.7}}>Make your selections on the left, then hit <strong style={{color:'rgba(212,184,122,.8)',fontStyle:'normal'}}>Generate Preview</strong>.</p>
              </motion.div>}
            </AnimatePresence>
            {error&&<div style={{position:'absolute',bottom:16,left:16,right:16,background:'rgba(100,20,30,.9)',padding:'12px 16px',border:'1px solid rgba(200,80,100,.4)'}}>
              <p className="fu" style={{fontSize:12,color:'#FFB0B0',marginBottom:8}}>{error}</p>
            </div>}
          </div>

          {summary.length>0&&<div style={{padding:'12px 20px',borderTop:'1px solid var(--ivory-3)',background:'var(--ivory-2)',maxHeight:100,overflowY:'auto'}}>
            <p className="fd" style={{fontSize:9,letterSpacing:'.18em',textTransform:'uppercase',color:'var(--dust)',marginBottom:8}}>Your design</p>
            <div style={{display:'flex',flexWrap:'wrap',gap:5}}>
              {summary.map((s,i)=><span key={i} className="fd" style={{fontSize:8,letterSpacing:'.1em',textTransform:'uppercase',color:'var(--gold-2)',background:'var(--gold-p)',padding:'3px 8px'}}>{s as string}</span>)}
            </div>
          </div>}

          <div style={{padding:'16px 20px',borderTop:'1px solid var(--ivory-3)',background:'var(--ivory)',display:'flex',flexDirection:'column',gap:10}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:4}}>
              <p className="fd" style={{fontSize:9,letterSpacing:'.18em',textTransform:'uppercase',color:'var(--dust)'}}>Estimated price</p>
              <p className="fs" style={{fontSize:24,fontWeight:300,color:'var(--gold-2)'}}>${price}<span className="fu" style={{fontSize:11,color:'var(--dust)'}}>+ backdrop</span></p>
            </div>
            <button onClick={generate} disabled={loading} className="btn btn-gold"
              style={{width:'100%',justifyContent:'center',opacity:loading?.7:1,cursor:loading?'not-allowed':'pointer'}}>
              {loading?'⏳  Generating…':generated?'✦  Regenerate Preview':'✦  Generate AI Preview'}
            </button>
            <button onClick={()=>setShowModal(true)} className="btn" style={{width:'100%',justifyContent:'center'}}>
              Request This Setup <span className="arr" aria-hidden="true"/>
            </button>
          </div>
        </div>
      </div>

      <style>{`@media(max-width:768px){.build-layout{grid-template-columns:1fr!important}.build-layout>div:last-child{position:relative!important;top:auto!important;height:auto!important;min-height:520px}}`}</style>
      <AnimatePresence>{showModal&&<RequestModal cfg={cfg} image={image} onClose={()=>setShowModal(false)}/>}</AnimatePresence>
    </div>
  )
}
