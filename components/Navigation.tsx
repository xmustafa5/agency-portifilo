'use client'

import { useRef, useState, useEffect } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { useLenis } from 'lenis/react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

export function Navigation() {
  const navRef = useRef<HTMLElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const lenis = useLenis()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useGSAP(
    () => {
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: 1.8,
      })
    },
    { scope: navRef }
  )

  const handleClick = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el && lenis) {
      lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.5 })
    }
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-dark/80 backdrop-blur-2xl border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleClick('#home') }}
            className="font-heading font-black text-xl tracking-tight cursor-pointer text-white"
          >
            SUSPENDED<span className="text-accent">.</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleClick(link.href) }}
                className="text-sm text-muted hover:text-white transition-colors duration-300 cursor-pointer"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleClick('#contact') }}
              className="px-6 py-2.5 bg-accent text-black font-heading font-bold text-xs uppercase tracking-wider rounded-full cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]"
            >
              Start a Project
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white cursor-pointer p-2"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-dark flex flex-col items-center justify-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleClick(link.href) }}
              className="font-heading text-4xl font-bold text-white cursor-pointer hover:text-accent transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  )
}
