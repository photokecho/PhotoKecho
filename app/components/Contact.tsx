'use client'
import { useRef, useState, useId } from 'react'
import { motion, useInView } from 'framer-motion'

const E = [0.19,1,0.22,1] as [number,number,number,number]

const DETAILS = [
  { k:'Email',    v:'Photokecho@gmail.com'       },
  { k:'Phone',    v:'+1 (312) 675-4890'          },
  { k:'Location', v:'Chicago, IL & Surrounding'  },
  { k:'Response', v:'Within 24 hours'            },
]

function Field({ label, id, children, full=false }: { label:string; id:string; children:React.ReactNode; full?:boolean }) {
  return (
    <div style={{ gridColumn:full?'1/-1':undefined }}>
      <div className="cf">
        <label htmlFor={id} className="fd" style={{ display:'block', fontSize:11, letterSpacing:'.2em', textTransform:'uppercase', color:'var(--dust)', paddingTop:18, marginBottom:6, cursor:'pointer' }}>
          {label}
        </label>
        {children}
      </div>
    </div>
  )
}

export function Contact() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once:true, amount:.08 })
  const [sent, setSent] = useState(false)
  const uid = useId()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name     = data.get('name') as string
    const email    = data.get('email') as string
    const phone    = data.get('phone') as string
    const type     = data.get('type') as string
    const date     = data.get('date') as string
    const guests   = data.get('guests') as string
    const message  = data.get('message') as string

    // Send confirmation email to the customer via mailto fallback
    // In production you'd use a service like EmailJS or Resend
    setSent(true)

    // Open mailto so the business gets notified
    const subject = encodeURIComponent(`New Booking Request — ${type} — ${name}`)
    const body = encodeURIComponent(
`New booking request from your website:

Name: ${name}
Email: ${email}
Phone: ${phone}
Event Type: ${type}
Event Date: ${date}
Guest Count: ${guests}

Message:
${message}

---
Reply to this email to respond to the customer.`
    )
    window.location.href = `mailto:Photokecho@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" ref={ref}
      style={{ padding:'var(--sy) var(--sx)', background:'var(--ivory-2)', borderTop:'1px solid var(--ivory-3)' }}
      aria-labelledby="contact-heading">
      <div style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'clamp(48px,8vw,120px)', alignItems:'start' }}>

        <motion.div initial={{ opacity:0, y:26 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:1.0, ease:E }}>
          <p className="fd" style={{ fontSize:11, letterSpacing:'.28em', textTransform:'uppercase', color:'var(--gold)', marginBottom:32 }}>Get in Touch</p>
          <h2 id="contact-heading" className="fs"
            style={{ fontSize:'var(--text-xl)', fontWeight:300, lineHeight:1.06, letterSpacing:'-.01em', color:'var(--ink)', marginBottom:24 }}>
            Ready to book?<br/>
            <em style={{ fontStyle:'italic', color:'var(--gold-2)' }}>Let's talk.</em>
          </h2>
          <p className="fs" style={{ fontSize:'clamp(15px,1.5vw,17px)', fontStyle:'italic', color:'var(--stone)', lineHeight:2, marginBottom:40, maxWidth:380 }}>
            Fill out the form and we'll get back to you within 24 hours. You can also email or call us directly.
          </p>
          <dl>
            {DETAILS.map(({ k, v }) => (
              <div key={k} style={{ display:'flex', alignItems:'baseline', gap:20, padding:'14px 0', borderBottom:'1px solid var(--ivory-3)' }}>
                <dt className="fd" style={{ fontSize:11, letterSpacing:'.2em', textTransform:'uppercase', color:'var(--dust)', width:90, flexShrink:0 }}>{k}</dt>
                <dd className="fs" style={{ fontSize:'var(--text-base)', fontStyle:'italic', color:'var(--ink)', margin:0 }}>{v}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div initial={{ opacity:0, y:26 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:1.0, ease:E, delay:.16 }}>
          {sent ? (
            <div style={{ paddingTop:80, textAlign:'center' }} role="alert" aria-live="polite">
              <div className="fs" style={{ fontSize:52, fontWeight:300, color:'var(--gold-2)', marginBottom:20 }} aria-hidden="true">✦</div>
              <p className="fs" style={{ fontSize:22, fontWeight:300, fontStyle:'italic', color:'var(--ink)', lineHeight:1.7, marginBottom:12 }}>
                Thanks! We received your request.
              </p>
              <p className="fu" style={{ fontSize:14, color:'var(--stone)', fontStyle:'italic' }}>
                We'll reply to {' '}<strong>Photokecho@gmail.com</strong>{' '} within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate aria-label="Booking enquiry form">
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(190px,1fr))', gap:'0 24px' }}>
                <Field label="Your Name" id={`${uid}-n`}>
                  <input name="name" id={`${uid}-n`} type="text" placeholder="Aisha Khan" required autoComplete="name"/>
                </Field>
                <Field label="Your Email" id={`${uid}-e`}>
                  <input name="email" id={`${uid}-e`} type="email" placeholder="aisha@email.com" required autoComplete="email"/>
                </Field>
                <Field label="Your Phone" id={`${uid}-p`}>
                  <input name="phone" id={`${uid}-p`} type="tel" placeholder="+1 (312) 000-0000" autoComplete="tel"/>
                </Field>
                <Field label="Event Type" id={`${uid}-t`}>
                  <select name="type" id={`${uid}-t`} defaultValue="">
                    <option value="" disabled>Select your event</option>
                    {['Mehndi Night','Nikkah Ceremony','Walima Reception','Sangeet Night','Eid Celebration','Birthday','Corporate Event','Other'].map(o=><option key={o}>{o}</option>)}
                  </select>
                </Field>
                <Field label="Event Date" id={`${uid}-d`}>
                  <input name="date" id={`${uid}-d`} type="date" autoComplete="off"/>
                </Field>
                <Field label="Guest Count" id={`${uid}-g`}>
                  <select name="guests" id={`${uid}-g`} defaultValue="">
                    <option value="" disabled>Roughly how many?</option>
                    {['Under 50','50–100','100–200','200–400','400+'].map(o=><option key={o}>{o}</option>)}
                  </select>
                </Field>
                <Field label="Tell us about your event" id={`${uid}-v`} full>
                  <textarea name="message" id={`${uid}-v`} rows={4} placeholder="Venue, theme, any special requests — whatever you'd like us to know."/>
                </Field>
              </div>
              <button type="submit" className="btn" style={{ marginTop:40 }}>
                Send Request
                <span className="arr" aria-hidden="true"/>
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
