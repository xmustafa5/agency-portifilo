import type { Metadata } from 'next'
import { Archivo, Space_Grotesk } from 'next/font/google'
import { SmoothScroll } from '@/components/SmoothScroll'
import './globals.css'

const archivo = Archivo({
  variable: '--font-archivo',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'SUSPENDED. | Software Agency',
  description:
    'We build digital products that move. A creative software agency crafting websites, apps, and automations that suspend disbelief.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
