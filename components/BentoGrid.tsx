'use client'

import { useRef, useEffect } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { BentoCard } from '@/components/BentoCard'
import {
  Code2, PenTool, Globe, Smartphone, Zap, Database,
  ArrowUpRight, MapPin, Star, Quote, ExternalLink, Link,
  Users, Rocket, Clock, Heart, Palette, Send,
} from 'lucide-react'

const techStack = [
  { name: 'React', icon: Code2 },
  { name: 'Next.js', icon: Globe },
  { name: 'TypeScript', icon: Code2 },
  { name: 'Node.js', icon: Database },
  { name: 'React Native', icon: Smartphone },
  { name: 'Figma', icon: PenTool },
  { name: 'Tailwind', icon: Code2 },
  { name: 'n8n', icon: Zap },
]

const socialLinks = [
  { name: 'GitHub', icon: ExternalLink, href: '#' },
  { name: 'LinkedIn', icon: Link, href: '#' },
  { name: 'X', icon: Send, href: '#' },
  { name: 'Dribbble', icon: Palette, href: '#' },
]

export function BentoGrid() {
  const gridRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Global mouse tracking for border glow across all cards
  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    const onMove = (e: MouseEvent) => {
      const cards = grid.querySelectorAll<HTMLElement>('.bento-card')
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect()
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
      })
    }
    grid.addEventListener('mousemove', onMove)
    return () => grid.removeEventListener('mousemove', onMove)
  }, [])

  // Scroll-triggered stagger entrance
  useGSAP(
    () => {
      gsap.to('.bento-label', {
        opacity: 1, y: 0, duration: 0.6,
        scrollTrigger: { trigger: '.bento-label', start: 'top 90%' },
      })

      gsap.to('.bento-title', {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '.bento-title', start: 'top 90%' },
      })

      const cards = gsap.utils.toArray<HTMLElement>('.bento-card')
      cards.forEach((card, i) => {
        gsap.to(card, {
          opacity: 1, y: 0, scale: 1,
          duration: 0.6, delay: i * 0.06, ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 85%' },
        })
      })
    },
    { scope: containerRef }
  )

  return (
    <section ref={containerRef} id="bento" className="py-36 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="bento-label gs-reveal inline-block text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-5">
            At a Glance
          </span>
          <h2 className="bento-title gs-reveal text-4xl md:text-5xl lg:text-6xl font-heading font-black leading-tight">
            Everything about
            <br />
            <span className="text-muted">SUSPENDED.</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[180px]"
        >
          {/* ─── 1. Profile / Agency Identity — col-span-1, row-span-2 ─── */}
          <BentoCard className="gs-reveal md:row-span-2 flex flex-col justify-between">
            <div>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5" style={{ backgroundColor: 'rgba(249,115,22,0.15)' }}>
                <span className="font-heading font-black text-2xl text-accent">S.</span>
              </div>
              <h3 className="font-heading font-bold text-xl text-white mb-2">SUSPENDED.</h3>
              <p className="text-sm text-muted leading-relaxed">
                Creative software agency building digital experiences that suspend disbelief.
              </p>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-emerald-400">Available for projects</span>
            </div>
          </BentoCard>

          {/* ─── 2. Location ─── */}
          <BentoCard className="gs-reveal flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={14} className="text-accent" />
              <span className="text-xs text-muted uppercase tracking-wider font-medium">Location</span>
            </div>
            <div>
              <p className="font-heading font-bold text-lg text-white">Remote-first</p>
              <p className="text-sm text-muted">Worldwide, any timezone</p>
            </div>
            {/* Mini globe decoration */}
            <div className="absolute top-4 right-4 w-20 h-20 rounded-full border border-white/5 opacity-30">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10" />
              <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/10" />
              <div className="absolute inset-2 rounded-full border border-white/5" />
            </div>
          </BentoCard>

          {/* ─── 3. Featured Project — col-span-2 ─── */}
          <BentoCard className="gs-reveal md:col-span-2 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-accent uppercase tracking-wider font-semibold">Featured Project</span>
              <ArrowUpRight size={16} className="text-muted group-hover:text-accent transition-colors duration-300" />
            </div>
            <div className="flex-1 rounded-xl overflow-hidden mb-4" style={{ background: 'linear-gradient(135deg, #F97316, #DC2626)', minHeight: '60px' }}>
              <div className="w-full h-full flex items-center justify-center p-4">
                {/* Mini browser mockup */}
                <div className="w-full max-w-xs rounded-lg overflow-hidden" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
                  <div className="flex items-center gap-1.5 px-3 py-2" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <div className="ml-2 flex-1 h-3 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
                  </div>
                  <div className="p-3 space-y-2">
                    <div className="h-2 w-3/4 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }} />
                    <div className="h-2 w-1/2 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
                    <div className="h-6 w-20 rounded-full mt-2" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }} />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-white">Voyager Travel</h3>
              <p className="text-sm text-muted">Booking platform with real-time availability</p>
            </div>
          </BentoCard>

          {/* ─── 4. Tech Stack — col-span-1, row-span-2 ─── */}
          <BentoCard className="gs-reveal md:row-span-2 flex flex-col">
            <span className="text-xs text-accent uppercase tracking-wider font-semibold mb-5">Tech Stack</span>
            <div className="grid grid-cols-2 gap-3 flex-1 content-start">
              {techStack.map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-white/5 transition-all duration-300 hover:border-accent/30"
                  style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                >
                  <tech.icon size={14} className="text-accent shrink-0" />
                  <span className="text-xs text-white font-medium truncate">{tech.name}</span>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* ─── 5. Stats ─── */}
          <BentoCard className="gs-reveal flex flex-col justify-center items-center text-center">
            <div className="flex items-center gap-6">
              <div>
                <span className="block font-heading text-3xl font-black text-accent">50+</span>
                <span className="text-[10px] text-muted uppercase tracking-wider">Projects</span>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <span className="block font-heading text-3xl font-black text-accent">30+</span>
                <span className="text-[10px] text-muted uppercase tracking-wider">Clients</span>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <span className="block font-heading text-3xl font-black text-accent">99%</span>
                <span className="text-[10px] text-muted uppercase tracking-wider">Happy</span>
              </div>
            </div>
          </BentoCard>

          {/* ─── 6. Social Links ─── */}
          <BentoCard className="gs-reveal flex flex-col justify-between">
            <span className="text-xs text-accent uppercase tracking-wider font-semibold mb-3">Connect</span>
            <div className="grid grid-cols-2 gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-white/5 text-muted hover:text-white hover:border-accent/30 transition-all duration-300 cursor-pointer"
                  style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                >
                  <link.icon size={14} />
                  <span className="text-xs font-medium">{link.name}</span>
                </a>
              ))}
            </div>
          </BentoCard>

          {/* ─── 7. Testimonial — col-span-2 ─── */}
          <BentoCard className="gs-reveal md:col-span-2 flex flex-col justify-between">
            <Quote size={20} className="text-accent/40 mb-3" />
            <p className="text-sm text-white/80 leading-relaxed italic mb-4">
              &ldquo;SUSPENDED. delivered beyond our expectations. Their attention to detail and technical expertise transformed our vision into a product our users love.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-accent" style={{ backgroundColor: 'rgba(249,115,22,0.15)' }}>
                AK
              </div>
              <div>
                <p className="text-xs text-white font-medium">Ahmed K.</p>
                <p className="text-[10px] text-muted">CEO, Voyager Travel</p>
              </div>
              <div className="ml-auto flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="text-accent fill-accent" />
                ))}
              </div>
            </div>
          </BentoCard>

          {/* ─── 8. CTA ─── */}
          <BentoCard className="gs-reveal flex flex-col justify-between">
            <Rocket size={20} className="text-accent mb-2" />
            <div>
              <h3 className="font-heading font-bold text-lg text-white mb-1">Start a Project</h3>
              <p className="text-xs text-muted mb-3">Let&apos;s build something extraordinary together.</p>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-xs font-semibold text-accent hover:text-white transition-colors duration-300 cursor-pointer"
            >
              Get in touch
              <ArrowUpRight size={12} />
            </a>
          </BentoCard>

          {/* ─── 9. Values / Philosophy ─── */}
          <BentoCard className="gs-reveal flex flex-col justify-between">
            <Heart size={16} className="text-accent mb-2" />
            <div className="space-y-2">
              {['Craft over speed', 'Clarity over complexity', 'Humans over metrics'].map((val) => (
                <div key={val} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-accent" />
                  <span className="text-xs text-white/70">{val}</span>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* ─── 10. Availability / Response time ─── */}
          <BentoCard className="gs-reveal flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={14} className="text-accent" />
              <span className="text-xs text-muted uppercase tracking-wider font-medium">Response</span>
            </div>
            <div>
              <p className="font-heading font-bold text-3xl text-white">&lt;24h</p>
              <p className="text-xs text-muted">Average reply time</p>
            </div>
          </BentoCard>

          {/* ─── 11. Team ─── */}
          <BentoCard className="gs-reveal flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-3">
              <Users size={14} className="text-accent" />
              <span className="text-xs text-muted uppercase tracking-wider font-medium">Team</span>
            </div>
            <div className="flex -space-x-2 mb-2">
              {['S', 'A', 'M', 'K'].map((letter, i) => (
                <div
                  key={letter}
                  className="w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                  style={{
                    borderColor: '#0A0A0A',
                    backgroundColor: `hsl(${25 + i * 60}, 60%, ${35 + i * 5}%)`,
                    zIndex: 4 - i,
                  }}
                >
                  {letter}
                </div>
              ))}
              <div
                className="w-9 h-9 rounded-full border-2 flex items-center justify-center text-[10px] text-muted"
                style={{ borderColor: '#0A0A0A', backgroundColor: 'rgba(255,255,255,0.05)' }}
              >
                +3
              </div>
            </div>
            <p className="text-xs text-muted">7 specialists across design & engineering</p>
          </BentoCard>
        </div>
      </div>
    </section>
  )
}
