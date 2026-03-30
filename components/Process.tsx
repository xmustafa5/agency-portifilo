'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { MessageSquare, PenTool, Code2, Rocket } from 'lucide-react'

const steps = [
  {
    icon: MessageSquare,
    number: '01',
    title: 'Discovery',
    description:
      'We start by understanding your business, your audience, and your goals. Deep research and strategic alignment before a single line of code.',
  },
  {
    icon: PenTool,
    number: '02',
    title: 'Design',
    description:
      'Wireframes, prototypes, and polished designs. We iterate with you until every screen feels right and every interaction makes sense.',
  },
  {
    icon: Code2,
    number: '03',
    title: 'Development',
    description:
      'Clean, tested, production-ready code. We build with modern technologies and best practices that ensure performance and scalability.',
  },
  {
    icon: Rocket,
    number: '04',
    title: 'Launch & Support',
    description:
      "Deployment, monitoring, and continuous improvement. We don't disappear after launch — we're in it for the long run.",
  },
]

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.to('.process-label', {
        opacity: 1, y: 0, duration: 0.6,
        scrollTrigger: { trigger: '.process-label', start: 'top 90%' },
      })

      gsap.to('.process-title', {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '.process-title', start: 'top 90%' },
      })

      gsap.from('.process-line-fill', {
        scaleY: 0,
        transformOrigin: 'top',
        ease: 'none',
        scrollTrigger: {
          trigger: '.process-steps',
          start: 'top 70%',
          end: 'bottom 60%',
          scrub: true,
        },
      })

      const stepEls = gsap.utils.toArray<HTMLElement>('.process-step')
      stepEls.forEach((step, i) => {
        gsap.to(step, {
          opacity: 1, y: 0, duration: 0.7, delay: i * 0.05,
          ease: 'power2.out',
          scrollTrigger: { trigger: step, start: 'top 88%' },
        })
      })
    },
    { scope: containerRef }
  )

  return (
    <section ref={containerRef} id="process" className="py-36 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <span className="process-label gs-reveal inline-block text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-5">
            Our Process
          </span>
          <h2 className="process-title gs-reveal text-4xl md:text-5xl lg:text-6xl font-heading font-black leading-tight">
            How we bring
            <br />
            <span className="text-muted">ideas to life</span>
          </h2>
        </div>

        <div className="process-steps relative">
          <div className="absolute left-7 top-0 bottom-0 w-px bg-border hidden md:block" />
          <div className="process-line-fill absolute left-7 top-0 bottom-0 w-px bg-accent/40 hidden md:block" />

          <div className="space-y-12">
            {steps.map((step, i) => (
              <div key={step.number} className="process-step gs-reveal relative flex gap-8 md:gap-12 items-start">
                <div className="relative shrink-0 flex flex-col items-center">
                  <div className="w-14 h-14 rounded-2xl border border-border flex items-center justify-center text-accent z-10 relative" style={{ backgroundColor: '#111111' }}>
                    <step.icon size={22} strokeWidth={1.5} />
                  </div>
                </div>

                <div className="pt-2 pb-2">
                  <span className="text-[11px] font-bold tracking-widest text-accent uppercase">
                    Step {step.number}
                  </span>
                  <h3 className="mt-2 text-2xl font-heading font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted leading-relaxed max-w-lg">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
