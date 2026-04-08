'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { Mail, MapPin, ArrowUpRight } from 'lucide-react'

export function Contact() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.from('.contact-big span', {
        yPercent: 100,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.02,
        scrollTrigger: { trigger: '.contact-big', start: 'top 80%' },
      })

      gsap.to('.contact-info-item', {
        opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: '.contact-info', start: 'top 85%' },
      })

      gsap.to('.contact-form', {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '.contact-form', start: 'top 85%' },
      })
    },
    { scope: containerRef }
  )

  return (
    <section ref={containerRef} id="contact" className="py-20 sm:py-36 px-4 sm:px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="contact-big overflow-hidden mb-12 sm:mb-24">
          <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-black leading-[0.95]">
            <span className="block overflow-hidden">
              {"Let's build".split('').map((char, i) => (
                <span key={i} className="inline-block">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </span>
            <span className="block overflow-hidden text-muted">
              {'something'.split('').map((char, i) => (
                <span key={i} className="inline-block">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </span>
            <span className="block overflow-hidden text-accent">
              {'extraordinary.'.split('').map((char, i) => (
                <span key={i} className="inline-block">{char}</span>
              ))}
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="contact-info space-y-8">
            <div className="contact-info-item gs-reveal">
              <span className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-4">
                Get in Touch
              </span>
              <p className="text-lg text-muted leading-relaxed max-w-md">
                Have a project in mind? We&apos;d love to hear about it. Drop us
                a line and we&apos;ll get back to you within 24 hours.
              </p>
            </div>

            <div className="space-y-4">
              <a href="mailto:hello@suspended.studio" className="contact-info-item gs-reveal flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-xl border border-border flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black group-hover:border-accent transition-all duration-300" style={{ backgroundColor: '#111111' }}>
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs text-muted mb-0.5">Email us</p>
                  <p className="text-sm font-medium text-white group-hover:text-accent transition-colors duration-300">
                    hello@suspended.studio
                  </p>
                </div>
              </a>

              <div className="contact-info-item gs-reveal flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl border border-border flex items-center justify-center text-accent" style={{ backgroundColor: '#111111' }}>
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs text-muted mb-0.5">Location</p>
                  <p className="text-sm font-medium text-white">Remote-first, Worldwide</p>
                </div>
              </div>
            </div>

            <div className="contact-info-item gs-reveal flex flex-wrap gap-3 pt-4">
              {['LinkedIn', 'Twitter', 'GitHub', 'Dribbble'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="px-5 py-2.5 border border-border rounded-full text-xs text-muted hover:text-white hover:border-accent transition-all duration-300 cursor-pointer inline-flex items-center gap-1.5"
                >
                  {social}
                  <ArrowUpRight size={11} />
                </a>
              ))}
            </div>
          </div>

          <form className="contact-form gs-reveal space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-xs text-muted mb-2 font-medium">Name</label>
                <input id="name" type="text" placeholder="Your name" className="w-full px-5 py-4 border border-border rounded-xl text-sm text-white placeholder:text-white/20 outline-none focus:border-accent transition-colors duration-300" style={{ backgroundColor: '#111111' }} />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs text-muted mb-2 font-medium">Email</label>
                <input id="email" type="email" placeholder="your@email.com" className="w-full px-5 py-4 border border-border rounded-xl text-sm text-white placeholder:text-white/20 outline-none focus:border-accent transition-colors duration-300" style={{ backgroundColor: '#111111' }} />
              </div>
            </div>

            <div>
              <label htmlFor="project-type" className="block text-xs text-muted mb-2 font-medium">Project Type</label>
              <select
                id="project-type"
                className="w-full px-5 py-4 border border-border rounded-xl text-sm text-muted outline-none focus:border-accent transition-colors duration-300 cursor-pointer appearance-none"
                style={{
                  backgroundColor: '#111111',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 16px center',
                }}
              >
                <option value="">Select a project type</option>
                <option value="web">Web Development</option>
                <option value="mobile">Mobile App</option>
                <option value="design">UI/UX Design</option>
                <option value="automation">Automation</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-xs text-muted mb-2 font-medium">Message</label>
              <textarea id="message" rows={6} placeholder="Tell us about your project..." className="w-full px-5 py-4 border border-border rounded-xl text-sm text-white placeholder:text-white/20 outline-none focus:border-accent transition-colors duration-300 resize-none" style={{ backgroundColor: '#111111' }} />
            </div>

            <button type="submit" className="w-full py-4 bg-accent text-black font-heading font-bold text-sm uppercase tracking-widest rounded-xl cursor-pointer transition-all duration-300 hover:bg-accent-hover hover:scale-[1.01] active:scale-[0.99]">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
