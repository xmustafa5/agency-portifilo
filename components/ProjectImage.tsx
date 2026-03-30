'use client'

/**
 * Generates a rich SVG placeholder image for projects.
 * Replace with real images later by swapping `src` to actual URLs.
 */
export function ProjectImage({
  title,
  category,
  hue,
  className = '',
}: {
  title: string
  category: string
  hue: number
  className?: string
}) {
  const hue2 = (hue + 50) % 360
  const hue3 = (hue + 120) % 360

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
  <defs>
    <linearGradient id="bg-${hue}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="hsl(${hue}, 65%, 35%)"/>
      <stop offset="50%" stop-color="hsl(${hue2}, 55%, 25%)"/>
      <stop offset="100%" stop-color="hsl(${hue3}, 50%, 18%)"/>
    </linearGradient>
    <pattern id="grid-${hue}" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
    </pattern>
    <radialGradient id="glow-${hue}" cx="30%" cy="30%" r="60%">
      <stop offset="0%" stop-color="hsl(${hue}, 80%, 60%)" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="transparent" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="shine-${hue}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.08)"/>
      <stop offset="50%" stop-color="rgba(255,255,255,0)"/>
      <stop offset="100%" stop-color="rgba(255,255,255,0.03)"/>
    </linearGradient>
  </defs>
  <!-- Background -->
  <rect width="800" height="500" fill="url(#bg-${hue})"/>
  <rect width="800" height="500" fill="url(#grid-${hue})"/>
  <rect width="800" height="500" fill="url(#glow-${hue})"/>
  <!-- Decorative shapes -->
  <circle cx="600" cy="120" r="180" fill="hsl(${hue}, 60%, 40%)" opacity="0.08"/>
  <circle cx="200" cy="400" r="120" fill="hsl(${hue2}, 50%, 45%)" opacity="0.06"/>
  <rect x="50" y="80" width="2" height="340" rx="1" fill="rgba(255,255,255,0.06)"/>
  <rect x="80" y="80" width="350" height="1" fill="rgba(255,255,255,0.06)"/>
  <!-- Mockup elements -->
  <rect x="100" y="140" width="260" height="16" rx="8" fill="rgba(255,255,255,0.12)"/>
  <rect x="100" y="175" width="180" height="10" rx="5" fill="rgba(255,255,255,0.06)"/>
  <rect x="100" y="210" width="220" height="10" rx="5" fill="rgba(255,255,255,0.04)"/>
  <rect x="100" y="260" width="100" height="36" rx="18" fill="hsl(${hue}, 70%, 55%)" opacity="0.3"/>
  <rect x="220" y="260" width="80" height="36" rx="18" fill="rgba(255,255,255,0.08)"/>
  <!-- Browser mockup frame -->
  <rect x="440" y="130" width="300" height="200" rx="8" fill="rgba(0,0,0,0.3)"/>
  <rect x="440" y="130" width="300" height="24" rx="8" fill="rgba(0,0,0,0.4)"/>
  <circle cx="456" cy="142" r="4" fill="#ff5f57"/>
  <circle cx="470" cy="142" r="4" fill="#ffbd2e"/>
  <circle cx="484" cy="142" r="4" fill="#28c840"/>
  <rect x="456" y="168" width="268" height="80" rx="4" fill="rgba(255,255,255,0.04)"/>
  <rect x="456" y="260" width="120" height="8" rx="4" fill="rgba(255,255,255,0.06)"/>
  <rect x="456" y="276" width="180" height="6" rx="3" fill="rgba(255,255,255,0.03)"/>
  <rect x="456" y="290" width="140" height="6" rx="3" fill="rgba(255,255,255,0.03)"/>
  <!-- Phone mockup -->
  <rect x="620" y="200" width="90" height="160" rx="12" fill="rgba(0,0,0,0.35)"/>
  <rect x="620" y="200" width="90" height="160" rx="12" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
  <rect x="630" y="218" width="70" height="100" rx="4" fill="rgba(255,255,255,0.04)"/>
  <rect x="650" y="208" width="30" height="4" rx="2" fill="rgba(255,255,255,0.08)"/>
  <!-- Shine overlay -->
  <rect width="800" height="500" fill="url(#shine-${hue})"/>
  <!-- Category + Title -->
  <text x="100" y="430" font-family="system-ui,sans-serif" font-size="11" font-weight="600" fill="hsl(${hue}, 80%, 65%)" letter-spacing="3" text-transform="uppercase">${category.toUpperCase()}</text>
  <text x="100" y="462" font-family="system-ui,sans-serif" font-size="26" font-weight="800" fill="rgba(255,255,255,0.9)">${title}</text>
</svg>`.trim()

  const dataUri = `data:image/svg+xml,${encodeURIComponent(svg)}`

  return (
    <img
      src={dataUri}
      alt={`${title} - ${category} project`}
      className={className}
      loading="lazy"
      draggable={false}
    />
  )
}
