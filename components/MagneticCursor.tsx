'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { gsap } from '@/lib/gsap'

export function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const [hasMouse, setHasMouse] = useState(false)
  const [visible, setVisible] = useState(false)
  const rafRef = useRef<ReturnType<typeof gsap.ticker.add> | null>(null)

  useEffect(() => {
    // Detect if device has fine pointer (mouse)
    const hasPointer = window.matchMedia('(pointer: fine)').matches
    if (!hasPointer) return
    setHasMouse(true)
  }, [])

  const onMouseMove = useCallback((e: MouseEvent) => {
    pos.current.x = e.clientX
    pos.current.y = e.clientY
    setVisible(true)
  }, [])

  useEffect(() => {
    if (!hasMouse) return

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    // Smooth follow using GSAP ticker
    const cursorEl = cursorRef.current
    const dotEl = dotRef.current
    const cx = { x: 0, y: 0 }
    const dx = { x: 0, y: 0 }

    const tick = () => {
      cx.x += (pos.current.x - cx.x) * 0.12
      cx.y += (pos.current.y - cx.y) * 0.12
      dx.x += (pos.current.x - dx.x) * 0.3
      dx.y += (pos.current.y - dx.y) * 0.3
      if (cursorEl) gsap.set(cursorEl, { x: cx.x, y: cx.y })
      if (dotEl) gsap.set(dotEl, { x: dx.x, y: dx.y })
    }

    gsap.ticker.add(tick)
    rafRef.current = tick

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      if (rafRef.current) gsap.ticker.remove(rafRef.current)
    }
  }, [hasMouse, onMouseMove])

  if (!hasMouse) return null

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-opacity duration-300"
        style={{
          border: '1px solid rgba(249,115,22,0.5)',
          opacity: visible ? 1 : 0,
        }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
        style={{
          backgroundColor: '#F97316',
          opacity: visible ? 1 : 0,
        }}
      />
    </>
  )
}
