'use client'

import { useRef, useState, useCallback } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import {
  ArrowUpRight, Lock, Zap, Palette,
  BarChart3, Globe, PenTool, Layers, Rocket,
  Shield, Cpu, Send, Music, TrendingUp,
} from 'lucide-react'

/* ──────────────────── Glow Card ──────────────────── */

function GlowCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top })
  }, [])

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`bento-item relative overflow-hidden rounded-[20px] border border-white/[0.07] p-7 group cursor-default transition-colors duration-500 hover:border-white/[0.14] ${className}`}
      style={{ backgroundColor: 'rgba(255,255,255,0.025)' }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[20px] transition-opacity duration-500" style={{ opacity: hovered ? 1 : 0, background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgba(249,115,22,0.07), transparent 40%)` }} />
      <div className="pointer-events-none absolute inset-0 rounded-[20px] transition-opacity duration-500" style={{ opacity: hovered ? 1 : 0, padding: '1px', background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, rgba(249,115,22,0.3), transparent 40%)`, WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} />
      <div className="relative z-10 h-full flex flex-col">{children}</div>
    </div>
  )
}

/* ──────────────────── Bar Chart ──────────────────── */

function BarChartAnim() {
  const heights = [35, 55, 40, 70, 50, 85, 60, 90, 55, 75, 65, 95]
  return (
    <>
      <div className="flex items-end gap-[3px] h-28 mt-auto pt-4">
        {heights.map((h, i) => (
          <div
            key={i}
            className="bar-col flex-1 rounded-t-sm transition-all ease-out"
            style={{
              height: '15%',
              backgroundColor: 'rgba(249,115,22,0.12)',
              transitionDuration: `${500 + i * 40}ms`,
              transitionDelay: `${i * 40}ms`,
              '--bar-h': `${h}%`,
            } as React.CSSProperties}
          />
        ))}
      </div>
      <style>{`.group:hover .bar-col { height: var(--bar-h) !important; background-color: rgba(249,115,22,0.35) !important; }`}</style>
    </>
  )
}

/* ──────────────────── Main Grid ──────────────────── */

export function BentoGrid() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.to('.bento-label', { opacity: 1, y: 0, duration: 0.6, scrollTrigger: { trigger: '.bento-label', start: 'top 90%' } })
    gsap.to('.bento-title', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: '.bento-title', start: 'top 90%' } })
    const items = gsap.utils.toArray<HTMLElement>('.bento-item')
    items.forEach((item, i) => {
      gsap.to(item, { opacity: 1, y: 0, scale: 1, duration: 0.6, delay: i * 0.05, ease: 'power3.out', scrollTrigger: { trigger: containerRef.current, start: 'top 85%' } })
    })
  }, { scope: containerRef })

  return (
    <section ref={containerRef} id="bento" className="py-36 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="bento-label gs-reveal inline-block text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-5">Benefits</span>
          <h2 className="bento-title gs-reveal text-4xl md:text-5xl lg:text-6xl font-heading font-black leading-tight">Creativity.<br /><span className="text-muted">Cubed.</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* ── 1. Responsive Design (2-col) ── */}
          <GlowCard className="gs-reveal lg:col-span-2 min-h-[300px]">
            <h3 className="font-heading font-bold text-lg text-white text-center mb-2">Bespoke,<br />responsive-first design.</h3>
            <div className="relative flex-1 mt-2 flex items-end justify-center gap-5">
              {/* Desktop */}
              <div className="relative w-[58%] transition-all duration-700 ease-out group-hover:-translate-y-3 group-hover:rotate-[-1deg]">
                <div className="rounded-lg border border-white/10 overflow-hidden" style={{ backgroundColor: 'rgba(0,0,0,0.35)' }}>
                  <div className="flex items-center gap-1 px-2.5 py-2" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
                    <div className="w-2 h-2 rounded-full bg-red-400/70" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400/70" />
                    <div className="w-2 h-2 rounded-full bg-green-400/70" />
                    <div className="ml-3 flex-1 h-3.5 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }} />
                  </div>
                  <div className="p-3">
                    {/* Nav bar mockup */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-5 h-5 rounded bg-accent/20 transition-colors duration-700 group-hover:bg-accent/40" />
                      <div className="flex-1" />
                      <div className="h-1.5 w-8 rounded-full bg-white/8" />
                      <div className="h-1.5 w-8 rounded-full bg-white/8" />
                      <div className="h-1.5 w-8 rounded-full bg-white/8" />
                    </div>
                    {/* Hero mockup */}
                    <div className="flex gap-3">
                      <div className="w-20 h-16 rounded bg-accent/10 transition-all duration-700 group-hover:bg-accent/25 group-hover:scale-[1.03]" />
                      <div className="flex-1 space-y-1.5 pt-1">
                        <div className="h-2 w-full rounded-full bg-white/10 transition-all duration-500 group-hover:bg-white/15" />
                        <div className="h-2 w-4/5 rounded-full bg-white/6" />
                        <div className="h-2 w-3/5 rounded-full bg-white/4" />
                      </div>
                    </div>
                    {/* CTA row */}
                    <div className="flex gap-2 mt-3">
                      <div className="h-7 w-20 rounded-full bg-accent/20 transition-all duration-700 group-hover:bg-accent/40 group-hover:scale-105" />
                      <div className="h-7 w-20 rounded-full border border-white/8" />
                    </div>
                    {/* Grid cards */}
                    <div className="flex gap-2 mt-3">
                      {[0,1,2].map(i => (
                        <div key={i} className="flex-1 h-10 rounded bg-white/[0.03] border border-white/5 transition-all duration-500 group-hover:border-white/10" style={{ transitionDelay: `${i * 80}ms` }} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute -top-6 left-0 right-0 flex justify-between px-2 items-end">
                  <span className="text-[9px] text-white/20 font-mono">12</span>
                  <div className="flex-1 mx-2 border-b border-dashed border-white/8 mb-0.5" />
                  <span className="text-[9px] text-white/20 font-mono">H</span>
                </div>
              </div>

              {/* Phone */}
              <div className="relative w-[20%] transition-all duration-700 ease-out delay-100 group-hover:-translate-y-4 group-hover:rotate-[2deg]">
                <div className="rounded-2xl border border-white/10 overflow-hidden" style={{ backgroundColor: 'rgba(0,0,0,0.35)' }}>
                  <div className="flex justify-center pt-2 pb-1">
                    <div className="h-1.5 w-10 rounded-full bg-white/10" />
                  </div>
                  <div className="px-2 pb-3 space-y-2">
                    <div className="h-14 rounded-lg bg-accent/8 transition-colors duration-700 group-hover:bg-accent/20" />
                    <div className="h-2 w-3/4 mx-auto rounded-full bg-white/8" />
                    <div className="h-2 w-1/2 mx-auto rounded-full bg-white/5" />
                    <div className="h-6 w-14 mx-auto rounded-full bg-accent/15 transition-colors duration-700 group-hover:bg-accent/30" />
                  </div>
                </div>
                <div className="absolute -top-6 left-0 right-0 flex justify-between px-1 items-end">
                  <span className="text-[9px] text-white/20 font-mono">12</span>
                  <div className="flex-1 mx-1 border-b border-dashed border-white/8 mb-0.5" />
                  <span className="text-[9px] text-white/20 font-mono">H</span>
                </div>
              </div>
            </div>
          </GlowCard>

          {/* ── 2. Secure ── */}
          <GlowCard className="gs-reveal min-h-[300px] flex flex-col items-center text-center">
            <h3 className="font-heading font-bold text-lg text-white mb-2">Seriously<br />Secure.</h3>
            <p className="text-[11px] text-white/25 mb-2">Enterprise-grade from day one.</p>
            <div className="flex-1 flex items-center justify-center">
              <div className="relative">
                {/* Rings */}
                <div className="absolute -inset-8 rounded-full border border-white/[0.03] group-hover:border-accent/10 group-hover:scale-110 transition-all duration-1000" />
                <div className="absolute -inset-14 rounded-full border border-white/[0.02] group-hover:border-accent/5 group-hover:scale-105 transition-all duration-1000 delay-100" />
                {/* Lock body */}
                <div className="relative w-20 h-14 rounded-b-2xl border-2 border-white/10 group-hover:border-accent/30 transition-all duration-700 flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
                  <div className="w-3 h-3 rounded-full bg-white/8 group-hover:bg-accent group-hover:shadow-[0_0_20px_rgba(249,115,22,0.5)] transition-all duration-500" />
                  <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-3 bg-white/5 group-hover:bg-accent/40 rounded-b transition-all duration-500" />
                </div>
                {/* Shackle */}
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-12 h-9 border-[2.5px] border-b-0 border-white/10 rounded-t-full transition-all duration-700 ease-out group-hover:-translate-y-3 group-hover:border-accent/30" />
              </div>
            </div>
          </GlowCard>

          {/* ── 3. Fast Dev ── */}
          <GlowCard className="gs-reveal min-h-[280px]">
            <h3 className="font-heading font-bold text-lg text-white mb-1">Fast dev.<br />Fast loads.</h3>
            <p className="text-[11px] text-white/25 mb-2">Optimized for Core Web Vitals.</p>
            {/* Performance metrics */}
            <div className="flex gap-4 mb-3">
              {[{ label: 'LCP', val: '0.8s' }, { label: 'FID', val: '12ms' }, { label: 'CLS', val: '0.01' }].map((m) => (
                <div key={m.label} className="text-center">
                  <span className="block text-[10px] text-white/20 uppercase tracking-wider">{m.label}</span>
                  <span className="block text-xs text-accent/60 font-bold group-hover:text-accent transition-colors duration-500">{m.val}</span>
                </div>
              ))}
            </div>
            <BarChartAnim />
          </GlowCard>

          {/* ── 4. Copy ── */}
          <GlowCard className="gs-reveal min-h-[280px] flex flex-col items-center text-center">
            <h3 className="font-heading font-bold text-lg text-white mb-4">Copy that sings.</h3>
            <div className="relative flex-1 w-full overflow-hidden">
              {/* Musical notes */}
              {[
                { note: '♪', x: 12, d: 0 },
                { note: '♫', x: 30, d: 120 },
                { note: '♩', x: 50, d: 240 },
                { note: '♬', x: 68, d: 360 },
                { note: '♪', x: 85, d: 480 },
              ].map((n, i) => (
                <span key={i} className="absolute text-2xl" style={{ left: `${n.x}%`, bottom: '15%' }}>
                  <span
                    className="block text-white/[0.04] group-hover:text-white/20 transition-all duration-1000 ease-out group-hover:-translate-y-20 group-hover:rotate-[20deg]"
                    style={{ transitionDelay: `${n.d}ms` }}
                  >{n.note}</span>
                </span>
              ))}
              {/* Floating lines */}
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className="absolute left-1/2 -translate-x-1/2 h-px bg-white/[0.03] group-hover:bg-accent/10 transition-all duration-700 group-hover:scale-x-125"
                  style={{ top: `${30 + i * 22}%`, width: `${50 + i * 15}%`, transitionDelay: `${i * 100}ms` }}
                />
              ))}
              <div className="absolute inset-0 flex items-center justify-center">
                <PenTool size={40} className="text-white/[0.05] transition-all duration-700 group-hover:text-white/15 group-hover:scale-110 group-hover:-rotate-12" />
              </div>
            </div>
          </GlowCard>

          {/* ── 5. CMS ── */}
          <GlowCard className="gs-reveal min-h-[280px]">
            <h3 className="font-heading font-bold text-lg text-white mb-1">Powerful CMS.<br />Scaleable &amp; teachable.</h3>
            <p className="text-[11px] text-white/25 mb-4">Content management you&apos;ll enjoy.</p>
            <div className="mt-auto space-y-2.5">
              {[
                { w1: '60%', w2: '45%' },
                { w1: '75%', w2: '55%' },
                { w1: '50%', w2: '70%' },
              ].map((row, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl border border-white/5 transition-all duration-500 ease-out group-hover:border-white/10 group-hover:-translate-y-0.5"
                  style={{ backgroundColor: 'rgba(255,255,255,0.015)', transitionDelay: `${i * 80}ms` }}
                >
                  <div className="w-7 h-7 rounded-lg bg-white/[0.04] group-hover:bg-accent/15 transition-all duration-500 group-hover:scale-110 shrink-0" style={{ transitionDelay: `${i * 80}ms` }} />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-1.5 rounded-full bg-white/8 transition-all duration-500 group-hover:bg-white/12" style={{ width: row.w1 }} />
                    <div className="h-1 rounded-full bg-white/4" style={{ width: row.w2 }} />
                  </div>
                  <Layers size={13} className="text-white/[0.06] group-hover:text-accent/30 transition-all duration-500 shrink-0" style={{ transitionDelay: `${i * 80}ms` }} />
                </div>
              ))}
            </div>
          </GlowCard>

          {/* ── 6. Integrations ── */}
          <GlowCard className="gs-reveal min-h-[320px]">
            <h3 className="font-heading font-bold text-lg text-white mb-1">Professional<br />integrations.</h3>
            <p className="text-[11px] text-white/25 mb-4">Your tools, connected seamlessly.</p>
            <div className="space-y-1.5 flex-1">
              {[
                { name: 'Next.js', icon: Globe, desc: 'Framework' },
                { name: 'Stripe', icon: Zap, desc: 'Payments' },
                { name: 'Vercel', icon: Rocket, desc: 'Deploy' },
                { name: 'Figma', icon: Palette, desc: 'Design' },
                { name: 'n8n', icon: Cpu, desc: 'Automation' },
                { name: 'Cloudflare', icon: Shield, desc: 'Security' },
              ].map((tool, i) => (
                <div
                  key={tool.name}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl border border-white/[0.04] transition-all duration-500 ease-out group-hover:border-white/10 group-hover:translate-x-1.5"
                  style={{ backgroundColor: 'rgba(255,255,255,0.01)', transitionDelay: `${i * 60}ms` }}
                >
                  <tool.icon size={14} className="text-white/15 group-hover:text-accent/60 transition-all duration-500 shrink-0 group-hover:scale-110" style={{ transitionDelay: `${i * 60}ms` }} />
                  <span className="text-xs text-white/35 group-hover:text-white/70 transition-colors duration-500 flex-1" style={{ transitionDelay: `${i * 60}ms` }}>{tool.name}</span>
                  <span className="text-[9px] text-white/15 group-hover:text-white/30 transition-colors duration-500" style={{ transitionDelay: `${i * 60}ms` }}>{tool.desc}</span>
                </div>
              ))}
            </div>
          </GlowCard>

          {/* ── 7. ROI ── */}
          <GlowCard className="gs-reveal min-h-[320px] flex flex-col items-center text-center">
            <h3 className="font-heading font-bold text-lg text-white mb-4">ROI-driven focus.</h3>
            <div className="relative flex-1 w-full overflow-hidden">
              {/* Floating currency */}
              {[
                { sym: '$', x: 10, y: 20, d: 0 },
                { sym: '€', x: 75, y: 15, d: 150 },
                { sym: '£', x: 40, y: 60, d: 300 },
                { sym: '$', x: 85, y: 55, d: 450 },
                { sym: '¥', x: 25, y: 75, d: 600 },
              ].map((c, i) => (
                <span key={i} className="absolute font-heading font-black text-xl text-white/[0.03]" style={{ left: `${c.x}%`, top: `${c.y}%` }}>
                  <span className="block transition-all duration-1000 ease-out group-hover:-translate-y-8 group-hover:scale-150 group-hover:text-accent/15" style={{ transitionDelay: `${c.d}ms` }}>{c.sym}</span>
                </span>
              ))}
              {/* Center chart icon with pulse ring */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute -inset-6 rounded-full border border-white/[0.02] group-hover:border-accent/10 group-hover:scale-125 transition-all duration-1000" />
                  <BarChart3 size={44} className="text-white/[0.05] transition-all duration-700 group-hover:text-accent/20 group-hover:scale-110" />
                  <TrendingUp size={16} className="absolute -top-2 -right-3 text-white/0 group-hover:text-accent/40 transition-all duration-500 delay-200 group-hover:-translate-y-1" />
                </div>
              </div>
            </div>
          </GlowCard>

          {/* ── 8. SEO ── */}
          <GlowCard className="gs-reveal min-h-[320px]">
            <div className="absolute top-5 right-5 font-heading text-7xl font-black text-white/[0.02] leading-none transition-all duration-700 group-hover:text-accent/[0.07] group-hover:scale-110 group-hover:-translate-y-1 origin-top-right select-none">
              SEO
            </div>
            <h3 className="font-heading font-bold text-lg text-white mb-1">No more hiding.<br />Specialist SEO.</h3>
            <p className="text-[11px] text-white/25 mb-auto">Be found by the right people.</p>
            <div className="space-y-3 mt-6">
              {/* Search ranking bars */}
              {[
                { icon: Globe, label: 'Organic', target: 92, rank: '#1' },
                { icon: Send, label: 'Traffic', target: 78, rank: '#3' },
                { icon: TrendingUp, label: 'Growth', target: 85, rank: '+47%' },
              ].map((row, i) => (
                <div key={row.label} className="flex items-center gap-2">
                  <row.icon size={13} className="text-white/15 group-hover:text-accent/50 transition-colors duration-500 shrink-0" />
                  <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}>
                    <div
                      className="seo-bar h-full rounded-full transition-all ease-out"
                      style={{
                        width: '6%',
                        backgroundColor: 'rgba(249,115,22,0.2)',
                        transitionDuration: `${900 + i * 200}ms`,
                        transitionDelay: `${i * 120}ms`,
                        '--seo-w': `${row.target}%`,
                      } as React.CSSProperties}
                    />
                  </div>
                  <span className="text-[10px] text-white/15 group-hover:text-accent font-bold transition-colors duration-700 w-8 text-right" style={{ transitionDelay: `${i * 120}ms` }}>{row.rank}</span>
                </div>
              ))}
              <style>{`.group:hover .seo-bar { width: var(--seo-w) !important; background-color: rgba(249,115,22,0.5) !important; }`}</style>
            </div>
          </GlowCard>

          {/* ── 9. Experienced ── */}
          <GlowCard className="gs-reveal min-h-[260px]">
            <h3 className="font-heading font-bold text-lg text-white mb-1">Capable, diligent,<br />experienced.</h3>
            <p className="text-[11px] text-white/25 mb-4">Trusted by ambitious brands.</p>
            <div className="grid grid-cols-2 gap-2.5 mt-auto">
              {[
                { name: 'STARTUP', accent: false },
                { name: 'BRAND CO', accent: false },
                { name: 'AGENCY', accent: false },
                { name: 'CORP INC', accent: false },
              ].map((c, i) => (
                <div
                  key={c.name}
                  className="flex items-center justify-center py-5 rounded-xl border border-white/[0.04] transition-all duration-500 ease-out group-hover:border-white/10 group-hover:-translate-y-1"
                  style={{ backgroundColor: 'rgba(255,255,255,0.015)', transitionDelay: `${i * 80}ms` }}
                >
                  <span className="text-[10px] font-heading font-bold text-white/12 group-hover:text-white/30 tracking-[0.15em] transition-all duration-500" style={{ transitionDelay: `${i * 80}ms` }}>{c.name}</span>
                </div>
              ))}
            </div>
          </GlowCard>

          {/* ── 10. Single Contact ── */}
          <GlowCard className="gs-reveal min-h-[260px]">
            <h3 className="font-heading font-bold text-lg text-white mb-1">One point of contact.<br />Always.</h3>
            <p className="text-[11px] text-white/25 mb-auto">No runaround. Direct access.</p>
            <div className="mt-6 flex items-center gap-4 transition-transform duration-500 group-hover:-translate-y-1">
              <div className="relative">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-accent transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(249,115,22,0.2)]" style={{ backgroundColor: 'rgba(249,115,22,0.1)' }}>
                  S
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500/60 border-2 group-hover:bg-emerald-400 group-hover:shadow-[0_0_10px_rgba(52,211,153,0.4)] transition-all duration-500" style={{ borderColor: 'rgba(255,255,255,0.025)' }} />
              </div>
              <div>
                <p className="text-sm text-white/70 font-medium transition-colors duration-500 group-hover:text-white">Your dedicated lead</p>
                <p className="text-[11px] text-white/25">Responds in &lt;24 hours</p>
              </div>
            </div>
          </GlowCard>

          {/* ── 11. CTA ── */}
          <GlowCard className="gs-reveal min-h-[260px]">
            <Rocket size={22} className="text-accent/40 mb-4 transition-all duration-500 group-hover:-translate-y-1.5 group-hover:scale-115 group-hover:text-accent/70" />
            <h3 className="font-heading font-bold text-lg text-white mb-1">Let&apos;s launch<br />something great.</h3>
            <p className="text-[11px] text-white/25 mb-6">Ready when you are.</p>
            <a
              href="#contact"
              className="mt-auto inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs font-bold text-black bg-accent cursor-pointer transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_0_40px_rgba(249,115,22,0.25)]"
            >
              Start a project
              <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </GlowCard>

        </div>
      </div>
    </section>
  )
}
