'use client'

import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { Globe, Smartphone, Zap, BarChart3, Code2, Palette } from 'lucide-react'

const services = [
  {
    icon: Globe,
    title: 'Web Development',
    description:
      'High-performance websites and web apps built with cutting-edge technology. Fast, responsive, and built to convert.',
    tags: ['Next.js', 'React', 'TypeScript'],
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description:
      'Native and cross-platform mobile applications that deliver seamless experiences across all devices.',
    tags: ['React Native', 'iOS', 'Android'],
  },
  {
    icon: Zap,
    title: 'Automation',
    description:
      'Streamline your business with intelligent automation workflows. Save time, reduce errors, scale faster.',
    tags: ['n8n', 'APIs', 'Integration'],
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description:
      'Interfaces that look stunning and feel intuitive. We design with purpose, balancing aesthetics with usability.',
    tags: ['Figma', 'Prototyping', 'Design Systems'],
  },
  {
    icon: Code2,
    title: 'Custom Software',
    description:
      'Bespoke solutions tailored to your unique challenges. From MVPs to enterprise platforms.',
    tags: ['SaaS', 'MVP', 'Enterprise'],
  },
  {
    icon: BarChart3,
    title: 'Digital Strategy',
    description:
      'Data-driven strategies that align technology with business goals. Build the right thing, the right way.',
    tags: ['Analytics', 'SEO', 'Growth'],
  },
]

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.to('.services-label', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        scrollTrigger: { trigger: '.services-label', start: 'top 90%' },
      })

      gsap.to('.services-title', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.services-title', start: 'top 90%' },
      })

      const isMobile = window.innerWidth < 768
      const cards = gsap.utils.toArray<HTMLElement>('.service-card')
      cards.forEach((card, i) => {
        if (isMobile) {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top 95%',
              end: 'top 65%',
              scrub: 0.4,
            },
          })
        } else {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.08,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 92%' },
          })
        }
      })
    },
    { scope: containerRef }
  )

  return (
    <section ref={containerRef} id="services" className="relative py-20 sm:py-36 px-4 sm:px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="services-label gs-reveal inline-block text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-5">
            What We Do
          </span>
          <h2 className="services-title gs-reveal text-4xl md:text-5xl lg:text-6xl font-heading font-black leading-tight">
            Services that
            <br />
            <span className="text-muted">drive results</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <div
              key={service.title}
              className="service-card gs-reveal group relative p-5 sm:p-8 rounded-2xl border border-border transition-all duration-500 hover:border-accent/30 cursor-pointer"
              style={{ backgroundColor: '#111111' }}
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ backgroundColor: '#191919' }}
              />

              <div className="relative z-10">
                <div className="mb-6 w-12 h-12 rounded-xl flex items-center justify-center text-accent transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: 'rgba(249,115,22,0.1)' }}>
                  <service.icon size={22} strokeWidth={1.5} />
                </div>

                <h3 className="text-xl font-heading font-bold mb-3 text-white">
                  {service.title}
                </h3>

                <p className="text-sm text-muted leading-relaxed mb-6">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-3 py-1 rounded-full text-muted border border-white/5"
                      style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-0 left-8 right-8 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500" style={{ background: 'linear-gradient(to right, transparent, rgba(249,115,22,0.4), transparent)' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
