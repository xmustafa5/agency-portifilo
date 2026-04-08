'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { ArrowUpRight } from 'lucide-react'
import { ProjectImage } from '@/components/ProjectImage'

const projects = [
  {
    title: 'Voyager Travel',
    category: 'Web App',
    description:
      'A modern travel booking platform with real-time availability, dynamic pricing, and an immersive destination discovery experience.',
    tags: ['Next.js', 'Node.js', 'PostgreSQL'],
    hue: 25,
  },
  {
    title: 'Savoré Restaurant',
    category: 'Web + Mobile',
    description:
      'Full-stack restaurant platform with online ordering, reservation management, and a custom kitchen display system.',
    tags: ['React Native', 'Firebase', 'Stripe'],
    hue: 240,
  },
  {
    title: 'NexaRealty',
    category: 'SaaS Platform',
    description:
      'Property management SaaS with virtual tours, automated tenant communications, and AI-powered market analysis.',
    tags: ['Next.js', 'Python', 'OpenAI'],
    hue: 160,
  },
  {
    title: 'PulseClinic',
    category: 'Healthcare App',
    description:
      'HIPAA-compliant patient portal with telemedicine, appointment scheduling, and electronic health records integration.',
    tags: ['React', 'Node.js', 'FHIR'],
    hue: 330,
  },
]

export function Work() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.to('.work-label', {
        opacity: 1, y: 0, duration: 0.6,
        scrollTrigger: { trigger: '.work-label', start: 'top 90%' },
      })

      gsap.to('.work-title', {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '.work-title', start: 'top 90%' },
      })

      const isMobile = window.innerWidth < 768
      const cards = gsap.utils.toArray<HTMLElement>('.project-card')
      cards.forEach((card, i) => {
        if (isMobile) {
          gsap.to(card, {
            opacity: 1, y: 0,
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
            opacity: 1, y: 0, duration: 0.9, delay: i * 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 90%' },
          })
        }

        const img = card.querySelector('.project-img')
        if (img) {
          gsap.to(img, {
            yPercent: -8,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          })
        }
      })
    },
    { scope: containerRef }
  )

  return (
    <section ref={containerRef} id="work" className="relative py-20 sm:py-36 px-4 sm:px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div>
            <span className="work-label gs-reveal inline-block text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-5">
              Selected Work
            </span>
            <h2 className="work-title gs-reveal text-4xl md:text-5xl lg:text-6xl font-heading font-black leading-tight">
              Projects that
              <br />
              <span className="text-muted">speak volumes</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted leading-relaxed lg:text-right">
            Each project is crafted to solve real business problems with
            thoughtful design and robust engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className="project-card gs-reveal group rounded-2xl border border-border overflow-hidden cursor-pointer transition-all duration-500 hover:border-white/10"
              style={{ backgroundColor: '#111111' }}
            >
              {/* Project image */}
              <div className="relative h-56 md:h-72 overflow-hidden">
                <ProjectImage
                  title={project.title}
                  category={project.category}
                  hue={project.hue}
                  className="project-img absolute inset-[-10%] w-[120%] h-[120%] object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, #111111 0%, transparent 60%)' }}
                />

                <span className="absolute top-4 left-5 sm:top-6 sm:left-8 font-heading text-5xl sm:text-7xl font-black text-white/5">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div
                  className="absolute top-6 right-6 w-11 h-11 rounded-full flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                  style={{ backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)' }}
                >
                  <ArrowUpRight size={18} className="text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-8">
                <span className="text-[11px] text-muted uppercase tracking-widest font-medium">
                  {project.category}
                </span>

                <h3 className="mt-2 text-2xl font-heading font-bold text-white group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>

                <p className="mt-3 text-sm text-muted leading-relaxed">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
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
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
