'use client'

import { useRef, useEffect, useCallback, useState } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'

interface GalleryItem {
  title: string
  category: string
  hue: number
}

const galleryItems: GalleryItem[] = [
  { title: 'Voyager Travel', category: 'Web App', hue: 25 },
  { title: 'Savoré Restaurant', category: 'Mobile', hue: 240 },
  { title: 'NexaRealty', category: 'SaaS', hue: 160 },
  { title: 'PulseClinic', category: 'Healthcare', hue: 330 },
  { title: 'ShopWave', category: 'E-Commerce', hue: 200 },
  { title: 'FitTrack', category: 'Mobile App', hue: 50 },
  { title: 'PayFlow', category: 'Fintech', hue: 270 },
  { title: 'LearnHub', category: 'EdTech', hue: 120 },
  { title: 'CloudDesk', category: 'SaaS', hue: 190 },
  { title: 'ConnectApp', category: 'Social', hue: 350 },
  { title: 'MindForge', category: 'AI Tool', hue: 280 },
  { title: 'DataPulse', category: 'Dashboard', hue: 140 },
]

// Deterministic layout positions (percentage offset from center)
const positions = [
  { x: -28, y: -20 }, { x: 25, y: -15 }, { x: -15, y: 22 },
  { x: 30, y: 10 }, { x: -30, y: -5 }, { x: 20, y: -25 },
  { x: -10, y: 25 }, { x: 28, y: 18 }, { x: -25, y: -22 },
  { x: 15, y: 20 }, { x: -20, y: 8 }, { x: 22, y: -18 },
]

const Z_GAP = 600
const PERSPECTIVE = 1200

export function DepthGallery() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)

  useGSAP(
    () => {
      const scene = sceneRef.current
      const wrapper = wrapperRef.current
      if (!scene || !wrapper) return

      const totalDepth = galleryItems.length * Z_GAP + 500

      // Pin the viewport while scrolling through the section
      ScrollTrigger.create({
        trigger: wrapper,
        start: 'top top',
        end: 'bottom bottom',
        onEnter: () => setIsActive(true),
        onLeave: () => setIsActive(false),
        onEnterBack: () => setIsActive(true),
        onLeaveBack: () => setIsActive(false),
      })

      // Drive the camera forward through Z-space
      gsap.to(scene, {
        z: totalDepth,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
        },
      })

      // Header reveal
      gsap.to('.depth-label', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: wrapper,
          start: 'top 80%',
        },
      })

      // Fade header out as we enter the tunnel
      gsap.to('.depth-header', {
        opacity: 0,
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: '10% top',
          scrub: true,
        },
      })
    },
    { scope: wrapperRef }
  )

  // Mouse parallax on perspective origin
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!viewportRef.current || !isActive) return
    const xPct = 50 + ((e.clientX / window.innerWidth) - 0.5) * 8
    const yPct = 50 + ((e.clientY / window.innerHeight) - 0.5) * 8
    gsap.to(viewportRef.current, {
      perspectiveOrigin: `${xPct}% ${yPct}%`,
      duration: 0.8,
      ease: 'power2.out',
    })
  }, [isActive])

  useEffect(() => {
    const isFine = window.matchMedia('(pointer: fine)').matches
    if (!isFine) return
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  return (
    <section id="gallery">
      {/* Tall scroll container */}
      <div
        ref={wrapperRef}
        className="relative"
        style={{ height: `${galleryItems.length * 80 + 100}vh` }}
      >
        {/* Header */}
        <div className="depth-header sticky top-0 z-20 pt-32 pb-16 text-center pointer-events-none">
          <span className="depth-label gs-reveal inline-block text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-4">
            Into the Void
          </span>
          <h2 className="depth-label gs-reveal text-4xl md:text-5xl lg:text-6xl font-heading font-black leading-tight">
            Explore our
            <br />
            <span className="text-muted">universe</span>
          </h2>
        </div>

        {/* Fixed 3D viewport — only visible while in this section */}
        <div
          ref={viewportRef}
          className="fixed top-0 left-0 w-full h-screen overflow-hidden transition-opacity duration-500"
          style={{
            perspective: `${PERSPECTIVE}px`,
            perspectiveOrigin: '50% 50%',
            opacity: isActive ? 1 : 0,
            pointerEvents: isActive ? 'auto' : 'none',
            zIndex: isActive ? 5 : -1,
          }}
        >
          {/* The 3D scene */}
          <div
            ref={sceneRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              transformStyle: 'preserve-3d',
              transform: 'translateZ(0px)',
            }}
          >
            {galleryItems.map((item, i) => {
              const pos = positions[i % positions.length]
              const zDepth = -(i + 1) * Z_GAP

              return (
                <div
                  key={i}
                  className="absolute group cursor-pointer"
                  style={{
                    left: `${50 + pos.x}%`,
                    top: `${50 + pos.y}%`,
                    transform: `translate(-50%, -50%) translateZ(${zDepth}px)`,
                    width: 'clamp(200px, 22vw, 380px)',
                    aspectRatio: '16 / 10',
                  }}
                >
                  {/* Card with gradient */}
                  <div
                    className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10"
                    style={{
                      background: `linear-gradient(${135 + i * 25}deg,
                        hsl(${item.hue}, 70%, 45%) 0%,
                        hsl(${(item.hue + 60) % 360}, 60%, 30%) 100%)`,
                      boxShadow: `0 20px 60px -10px hsla(${item.hue}, 70%, 30%, 0.4)`,
                    }}
                  >
                    {/* Image number */}
                    <span className="absolute top-4 left-5 font-heading text-5xl font-black text-white/10">
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-400 flex items-end p-5">
                      <div className="translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                        <span className="text-[10px] uppercase tracking-widest text-accent font-bold">
                          {item.category}
                        </span>
                        <h4 className="text-white font-heading font-bold text-base mt-0.5">
                          {item.title}
                        </h4>
                      </div>
                    </div>
                  </div>

                  {/* Subtle glow behind card */}
                  <div
                    className="absolute -inset-2 rounded-2xl -z-10 blur-2xl opacity-20"
                    style={{
                      background: `hsl(${item.hue}, 60%, 40%)`,
                    }}
                  />
                </div>
              )
            })}
          </div>

          {/* Center crosshair */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
            <div className="w-5 h-5 border border-white/10 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white/30 rounded-full" />
          </div>

          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 30%, rgba(10,10,10,0.85) 100%)',
            }}
          />

          {/* Speed lines at edges */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              background:
                'repeating-conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 8deg, rgba(255,255,255,0.01) 9deg, transparent 10deg)',
            }}
          />
        </div>
      </div>
    </section>
  )
}
