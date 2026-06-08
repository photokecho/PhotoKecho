'use client'
import { useEffect, useRef } from 'react'
export function Cursor() {
  const dot  = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const pos  = useRef({ x: -100, y: -100 })
  const rpos = useRef({ x: -100, y: -100 })
  const raf  = useRef<number>(0)
  const hov  = useRef(false)
  useEffect(() => {
    const mq = window.matchMedia('(hover:hover) and (pointer:fine)')
    if (!mq.matches) return
    const d = dot.current, r = ring.current
    if (!d || !r) return
    const loop = () => {
      rpos.current.x += (pos.current.x - rpos.current.x) * 0.09
      rpos.current.y += (pos.current.y - rpos.current.y) * 0.09
      r.style.left = rpos.current.x + 'px'
      r.style.top  = rpos.current.y + 'px'
      raf.current = requestAnimationFrame(loop)
    }
    raf.current = requestAnimationFrame(loop)
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      d.style.left = e.clientX + 'px'
      d.style.top  = e.clientY + 'px'
    }
    const onOver = (e: MouseEvent) => {
      const el = (e.target as Element).closest('a,button,[data-hover]')
      if (el && !hov.current)  { document.body.classList.add('cur-on');    hov.current = true  }
      if (!el && hov.current)  { document.body.classList.remove('cur-on'); hov.current = false }
    }
    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(raf.current)
    }
  }, [])
  return (
    <>
      <div ref={dot}  className="cur-dot"  aria-hidden="true" />
      <div ref={ring} className="cur-ring" aria-hidden="true" />
    </>
  )
}
