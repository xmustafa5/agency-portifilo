'use client'

export function Footer() {
  return (
    <footer className="border-t border-border py-8 sm:py-12 px-4 sm:px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="font-heading font-black text-lg text-white">
          SUSPENDED<span className="text-accent">.</span>
        </span>

        <p className="text-xs text-muted">
          &copy; {new Date().getFullYear()} SUSPENDED. All rights reserved.
        </p>

        <div className="flex gap-6">
          {['Privacy', 'Terms', 'Cookies'].map((link) => (
            <a
              key={link}
              href="#"
              className="text-xs text-muted hover:text-white transition-colors duration-300 cursor-pointer"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
