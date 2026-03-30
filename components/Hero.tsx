'use client'

import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { ArrowDown } from 'lucide-react'

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.from('.hero-line-inner', {
        yPercent: 100,
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.12,
        delay: 0.3,
      })

      gsap.from('.hero-sub', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
        delay: 1,
      })

      gsap.from('.hero-cta', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out',
        delay: 1.3,
      })

      gsap.from('.scroll-indicator', {
        opacity: 0,
        duration: 0.6,
        delay: 1.6,
      })

      gsap.to('.scroll-indicator', {
        y: 10,
        duration: 1.2,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
        delay: 2,
      })

      gsap.to('.hero-title-wrap', {
        yPercent: 50,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to('.hero-grid', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Grid bg */}
      <div className="hero-grid absolute inset-0 opacity-[0.04]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.06] blur-[200px] bg-accent" />

      <div className="hero-title-wrap relative z-10 text-center px-6 max-w-6xl mx-auto">
        <div className="overflow-hidden mb-8">
          <p className="hero-line-inner text-sm tracking-[0.4em] uppercase text-muted font-medium">
            Creative Software Agency
          </p>
        </div>

        <h1 className="font-heading font-black leading-[0.85] tracking-[-0.03em]">
          <div className="overflow-hidden">
            <span className="hero-line-inner block text-[clamp(4rem,14vw,13rem)] text-white">
              SUSPENDED
            </span>
          </div>
          <div className="overflow-hidden mt-2">
            <span
              className="hero-line-inner block text-[clamp(4rem,14vw,13rem)]"
              style={{
                WebkitTextStroke: '2px rgba(255,255,255,0.25)',
                color: 'transparent',
              }}
            >
              STUDIO
            </span>
          </div>
        </h1>

        <p className="hero-sub mt-10 max-w-xl mx-auto text-lg leading-relaxed text-muted">
          We build digital experiences that suspend disbelief.
          <br />
          Websites &middot; Apps &middot; Automations
        </p>

        <div className="hero-cta mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#work"
            className="inline-flex items-center gap-2 px-10 py-4 bg-accent text-black font-heading font-bold text-sm uppercase tracking-widest rounded-full cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]"
          >
            View Our Work
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-10 py-4 border border-white/15 text-white font-heading font-medium text-sm uppercase tracking-widest rounded-full cursor-pointer transition-all duration-300 hover:border-accent hover:text-accent"
          >
            Get in Touch
          </a>
        </div>
      </div>

      <div className="scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-[10px] text-muted tracking-[0.3em] uppercase">
          Scroll
        </span>
        <ArrowDown size={14} className="text-muted" />
      </div>
    </section>
  )
}
