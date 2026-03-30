'use client'

import { ReactLenis, useLenis } from 'lenis/react'
import { useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

function LenisGSAPConnector() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    lenis.on('scroll', ScrollTrigger.update)

    const update = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(update)
      lenis.off('scroll', ScrollTrigger.update)
    }
  }, [lenis])

  return null
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.075,
        duration: 1.5,
        smoothWheel: true,
        wheelMultiplier: 0.8,
        touchMultiplier: 1.5,
      }}
    >
      <LenisGSAPConnector />
      {children}
    </ReactLenis>
  )
}
