'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'

const stats = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '30+', label: 'Happy Clients' },
  { value: '3+', label: 'Years Experience' },
  { value: '99%', label: 'Client Satisfaction' },
]

export function About() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.to('.about-label', {
        opacity: 1, y: 0, duration: 0.6,
        scrollTrigger: { trigger: '.about-label', start: 'top 90%' },
      })

      gsap.to('.about-title', {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '.about-title', start: 'top 90%' },
      })

      const paras = gsap.utils.toArray<HTMLElement>('.about-para')
      paras.forEach((p, i) => {
        gsap.to(p, {
          opacity: 1, y: 0, duration: 0.7, delay: i * 0.1,
          scrollTrigger: { trigger: p, start: 'top 92%' },
        })
      })

      const statCards = gsap.utils.toArray<HTMLElement>('.stat-card')
      statCards.forEach((card, i) => {
        gsap.to(card, {
          opacity: 1, y: 0, duration: 0.6, delay: i * 0.1,
          scrollTrigger: { trigger: '.stats-grid', start: 'top 88%' },
        })
      })

      gsap.to('.marquee-track', {
        xPercent: -50,
        ease: 'none',
        duration: 25,
        repeat: -1,
      })
    },
    { scope: containerRef }
  )

  return (
    <section ref={containerRef} id="about" className="py-20 sm:py-36 overflow-hidden">
      {/* Marquee */}
      <div className="mb-28 border-y border-border py-5 overflow-hidden">
        <div className="marquee-track flex whitespace-nowrap">
          {[0, 1].map((idx) => (
            <div key={idx} className="flex shrink-0">
              {[
                'Web Development',
                'Mobile Apps',
                'UI/UX Design',
                'Automation',
                'SaaS',
                'Custom Software',
                'Digital Strategy',
                'Cloud Solutions',
              ].map((item) => (
                <span
                  key={`${item}-${idx}`}
                  className="mx-4 md:mx-8 font-heading text-3xl sm:text-5xl md:text-7xl font-black text-white/[0.04] uppercase select-none"
                >
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <span className="about-label gs-reveal inline-block text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-5">
              About Us
            </span>
            <h2 className="about-title gs-reveal text-4xl md:text-5xl lg:text-6xl font-heading font-black leading-tight mb-10">
              We don&apos;t just build
              <br />
              <span className="text-muted">software</span>
            </h2>

            <div className="space-y-5">
              <p className="about-para gs-reveal text-muted leading-[1.8] text-[15px]">
                We build bridges between ambition and execution. SUSPENDED. was
                founded on the belief that great software should feel invisible
                &mdash; it should work so well that users forget they&apos;re
                using technology at all.
              </p>
              <p className="about-para gs-reveal text-muted leading-[1.8] text-[15px]">
                Our team combines deep technical expertise with a design-first
                mindset. Every line of code we write serves a purpose. Every
                pixel we place tells a story.
              </p>
              <p className="about-para gs-reveal text-muted leading-[1.8] text-[15px]">
                From startups launching their first MVP to established businesses
                scaling their digital presence &mdash; we bring the same level of
                passion and precision to every project.
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="stats-grid grid grid-cols-2 gap-5 w-full">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="stat-card gs-reveal p-5 sm:p-8 border border-border rounded-2xl text-center hover:border-accent/20 transition-colors duration-300"
                  style={{ backgroundColor: '#111111' }}
                >
                  <span className="block font-heading text-3xl sm:text-4xl md:text-5xl font-black text-accent">
                    {stat.value}
                  </span>
                  <span className="block mt-3 text-sm text-muted">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
