'use client'

import { useRef, useEffect, useCallback } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { ProjectImage } from '@/components/ProjectImage'

interface GalleryItem {
  title: string
  category: string
  hue: number
}

const row1: GalleryItem[] = [
  { title: 'Voyager Travel', category: 'Web App', hue: 25 },
  { title: 'Savoré Restaurant', category: 'Mobile', hue: 240 },
  { title: 'NexaRealty', category: 'SaaS', hue: 160 },
  { title: 'PulseClinic', category: 'Healthcare', hue: 330 },
  { title: 'ShopWave', category: 'E-Commerce', hue: 200 },
  { title: 'FitTrack', category: 'Fitness', hue: 50 },
  { title: 'PayFlow', category: 'Fintech', hue: 270 },
  { title: 'LearnHub', category: 'EdTech', hue: 120 },
  { title: 'PixelForge', category: 'Design', hue: 300 },
  { title: 'TaskFlow', category: 'Productivity', hue: 80 },
]

const row2: GalleryItem[] = [
  { title: 'CloudDesk', category: 'SaaS', hue: 190 },
  { title: 'ConnectApp', category: 'Social', hue: 350 },
  { title: 'MindForge', category: 'AI Tool', hue: 280 },
  { title: 'DataPulse', category: 'Dashboard', hue: 140 },
  { title: 'AutoPilot', category: 'Automation', hue: 35 },
  { title: 'HealthSync', category: 'MedTech', hue: 170 },
  { title: 'CryptoVault', category: 'Web3', hue: 260 },
  { title: 'EduStream', category: 'Streaming', hue: 310 },
  { title: 'GreenLens', category: 'Climate', hue: 145 },
  { title: 'SoundWave', category: 'Audio', hue: 20 },
]

const row3: GalleryItem[] = [
  { title: 'ArtBoard', category: 'Creative', hue: 290 },
  { title: 'DevStack', category: 'Dev Tools', hue: 210 },
  { title: 'MapQuest', category: 'Travel', hue: 40 },
  { title: 'BlockBase', category: 'Web3', hue: 250 },
  { title: 'FoodieGo', category: 'Delivery', hue: 15 },
  { title: 'MediTrack', category: 'Health', hue: 175 },
  { title: 'AdVantage', category: 'Marketing', hue: 340 },
  { title: 'CodeForge', category: 'Platform', hue: 225 },
  { title: 'NightOwl', category: 'Analytics', hue: 270 },
  { title: 'SwiftPay', category: 'Finance', hue: 100 },
]

const ITEMS_PER_ROW = row1.length
const ANGLE_STEP = 360 / ITEMS_PER_ROW
const RADIUS = 620

function CylinderRow({
  items,
  refProp,
  yOffset,
  angleOffset = 0,
}: {
  items: GalleryItem[]
  refProp: React.RefObject<HTMLDivElement | null>
  yOffset: number
  angleOffset?: number
}) {
  return (
    <div
      ref={refProp}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 0,
        height: 0,
        transformStyle: 'preserve-3d',
        transform: `translateY(${yOffset}px)`
      }}
    >
      {items.map((item, i) => {
        const angle = i * ANGLE_STEP + angleOffset
        return (
          <div
            key={i}
            className="absolute group cursor-pointer"
            style={{
              width: '280px',
              height: '175px',
              marginLeft: '-140px',
              marginTop: '-87px',
              transform: `rotateY(${angle}deg) translateZ(-${RADIUS}px)`,
              backfaceVisibility: 'hidden',
            }}
          >
            <div className="w-full h-full rounded-xl overflow-hidden border border-white/10 shadow-2xl transition-transform duration-300 group-hover:scale-105">
              <ProjectImage
                title={item.title}
                category={item.category}
                hue={item.hue}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end p-4">
                <div className="translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-[10px] uppercase tracking-widest text-accent font-bold">{item.category}</span>
                  <h4 className="text-white font-heading font-bold text-sm">{item.title}</h4>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function DepthGallery() {
  const pinRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const row1Ref = useRef<HTMLDivElement>(null)
  const row2Ref = useRef<HTMLDivElement>(null)
  const row3Ref = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // Pin the viewport
      ScrollTrigger.create({
        trigger: pinRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: viewportRef.current,
        pinSpacing: false,
      })

      const scrubConfig = {
        trigger: pinRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      }

      // Row 1 (top) — clockwise
      gsap.to(row1Ref.current, { rotateY: 360, ease: 'none', scrollTrigger: scrubConfig })

      // Row 2 (middle) — counter-clockwise, 1.5x speed
      gsap.to(row2Ref.current, { rotateY: -540, ease: 'none', scrollTrigger: { ...scrubConfig } })

      // Row 3 (bottom) — clockwise, 1.25x speed
      gsap.to(row3Ref.current, { rotateY: 450, ease: 'none', scrollTrigger: { ...scrubConfig } })

      // Scene tilt on scroll
      gsap.fromTo(sceneRef.current, { rotateX: -12 }, {
        rotateX: 12, ease: 'none', scrollTrigger: { ...scrubConfig },
      })

      // Header
      gsap.to('.gallery-label', {
        opacity: 1, y: 0, duration: 0.6,
        scrollTrigger: { trigger: pinRef.current, start: 'top 80%' },
      })
      gsap.to('.gallery-title', {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: pinRef.current, start: 'top 78%' },
      })
    },
    { scope: pinRef }
  )

  // Mouse tilt
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!sceneRef.current || !viewportRef.current) return
    const xNorm = (e.clientX / window.innerWidth - 0.5) * 2
    const yNorm = (e.clientY / window.innerHeight - 0.5) * 2
    gsap.to(sceneRef.current, {
      rotateY: xNorm * 8,
      duration: 0.8,
      ease: 'power2.out',
      overwrite: 'auto',
    })
    gsap.to(viewportRef.current, {
      perspectiveOrigin: `${50 + xNorm * 5}% ${50 + yNorm * 5}%`,
      duration: 0.8,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }, [])

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  return (
    <section id="gallery">
      <div ref={pinRef} style={{ height: '250vh' }}>
        <div
          ref={viewportRef}
          className="h-screen w-full overflow-hidden relative"
          style={{ perspective: '1200px' }}
        >
          {/* Title overlay */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
            <span className="gallery-label gs-reveal inline-block text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-4">
              Our Universe
            </span>
            <h2 className="gallery-title gs-reveal text-5xl md:text-7xl lg:text-8xl font-heading font-black leading-[0.9] tracking-tight text-center">
              EXPERT DIGITAL
              <br />
              <span className="text-muted">PRODUCTION</span>
            </h2>
          </div>

          {/* 3D scene */}
          <div
            ref={sceneRef}
            className="absolute inset-0 flex items-center justify-center"
            style={{ transformStyle: 'preserve-3d', transform: 'rotateX(-12deg)' }}
          >
            <div style={{ position: 'relative', transformStyle: 'preserve-3d' }}>
              <CylinderRow items={row1} refProp={row1Ref} yOffset={-200} />
              <CylinderRow items={row2} refProp={row2Ref} yOffset={0} angleOffset={ANGLE_STEP / 1} />
              <CylinderRow items={row3} refProp={row3Ref} yOffset={200} angleOffset={ANGLE_STEP / 1} />
            </div>
          </div>

          {/* Vignette */}
          <div className="absolute inset-0 pointer-events-none z-20" style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(10,10,10,0.9) 100%)' }} />

          {/* Edge fades */}
          <div className="absolute inset-y-0 left-0 w-48 pointer-events-none z-20" style={{ background: 'linear-gradient(to right, #0A0A0A, transparent)' }} />
          <div className="absolute inset-y-0 right-0 w-48 pointer-events-none z-20" style={{ background: 'linear-gradient(to left, #0A0A0A, transparent)' }} />
          <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none z-20" style={{ background: 'linear-gradient(to bottom, #0A0A0A, transparent)' }} />
          <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-20" style={{ background: 'linear-gradient(to top, #0A0A0A, transparent)' }} />
        </div>
      </div>
    </section>
  )
}
