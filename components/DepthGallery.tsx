'use client'

import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { ProjectImage } from '@/components/ProjectImage'

interface GalleryItem {
  title: string
  category: string
  hue: number
}

const topRow: GalleryItem[] = [
  { title: 'Voyager Travel', category: 'Web App', hue: 25 },
  { title: 'Savoré Restaurant', category: 'Mobile', hue: 240 },
  { title: 'NexaRealty', category: 'SaaS', hue: 160 },
  { title: 'PulseClinic', category: 'Healthcare', hue: 330 },
  { title: 'ShopWave', category: 'E-Commerce', hue: 200 },
  { title: 'FitTrack', category: 'Fitness', hue: 50 },
  { title: 'PayFlow', category: 'Fintech', hue: 270 },
  { title: 'LearnHub', category: 'EdTech', hue: 120 },
]

const bottomRow: GalleryItem[] = [
  { title: 'CloudDesk', category: 'SaaS', hue: 190 },
  { title: 'ConnectApp', category: 'Social', hue: 350 },
  { title: 'MindForge', category: 'AI Tool', hue: 280 },
  { title: 'DataPulse', category: 'Dashboard', hue: 140 },
  { title: 'AutoPilot', category: 'Automation', hue: 35 },
  { title: 'HealthSync', category: 'MedTech', hue: 170 },
  { title: 'CryptoVault', category: 'Web3', hue: 260 },
  { title: 'EduStream', category: 'Streaming', hue: 310 },
]

const ANGLE_STEP = 360 / topRow.length
const RADIUS = 550

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
        transform: `translateY(${yOffset}px)`,
      }}
    >
      {items.map((item, i) => {
        const angle = i * ANGLE_STEP + angleOffset
        return (
          <div
            key={i}
            className="absolute group cursor-pointer"
            style={{
              width: '300px',
              height: '190px',
              marginLeft: '-150px',
              marginTop: '-95px',
              transform: `rotateY(${angle}deg) translateZ(${RADIUS}px)`,
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
  const topRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // Pin the viewport for the duration of the scroll
      ScrollTrigger.create({
        trigger: pinRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: viewportRef.current,
        pinSpacing: false,
      })

      // Top row spins clockwise
      gsap.to(topRef.current, {
        rotateY: 360,
        ease: 'none',
        scrollTrigger: {
          trigger: pinRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      })

      // Bottom row spins counter-clockwise
      gsap.to(bottomRef.current, {
        rotateY: -360,
        ease: 'none',
        scrollTrigger: {
          trigger: pinRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      })

      // Slight scene tilt on scroll
      gsap.fromTo(
        sceneRef.current,
        { rotateX: -8 },
        {
          rotateX: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: pinRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
          },
        }
      )

      // Header animations
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

  return (
    <section id="gallery">
      {/* Scroll container — 200vh means one full screen of scrolling drives the rotation */}
      <div ref={pinRef} style={{ height: '200vh' }}>
        {/* This gets pinned */}
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
            style={{
              transformStyle: 'preserve-3d',
              transform: 'rotateX(-8deg)',
            }}
          >
            <div style={{ position: 'relative', transformStyle: 'preserve-3d' }}>
              <CylinderRow items={topRow} refProp={topRef} yOffset={-110} />
              <CylinderRow items={bottomRow} refProp={bottomRef} yOffset={110} angleOffset={ANGLE_STEP / 2} />
            </div>
          </div>

          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none z-20"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 35%, rgba(10,10,10,0.85) 100%)',
            }}
          />

          {/* Side fades */}
          <div className="absolute inset-y-0 left-0 w-40 pointer-events-none z-20" style={{ background: 'linear-gradient(to right, #0A0A0A, transparent)' }} />
          <div className="absolute inset-y-0 right-0 w-40 pointer-events-none z-20" style={{ background: 'linear-gradient(to left, #0A0A0A, transparent)' }} />

          {/* Top/bottom fades for clean transition */}
          <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-20" style={{ background: 'linear-gradient(to bottom, #0A0A0A, transparent)' }} />
          <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-20" style={{ background: 'linear-gradient(to top, #0A0A0A, transparent)' }} />
        </div>
      </div>
    </section>
  )
}
