'use client'

import { useRef, useState, useCallback } from 'react'

interface BentoCardProps {
  children: React.ReactNode
  className?: string
}

export function BentoCard({ children, className = '' }: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }, [])

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`bento-card relative overflow-hidden rounded-[20px] border border-white/[0.08] p-6 transition-all duration-300 hover:border-white/[0.15] group ${className}`}
      style={{ backgroundColor: 'rgba(255,255,255,0.025)', backdropFilter: 'blur(8px)' }}
    >
      {/* Inner glow that follows cursor */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[20px] transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(249,115,22,0.1), transparent 40%)`,
        }}
      />

      {/* Border glow that follows cursor */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[20px] transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          padding: '1px',
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(249,115,22,0.35), transparent 40%)`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  )
}
