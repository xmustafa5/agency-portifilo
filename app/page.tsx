import { Navigation } from '@/components/Navigation'
import { Hero } from '@/components/Hero'
import { Services } from '@/components/Services'
import { Work } from '@/components/Work'
import { DepthGallery } from '@/components/DepthGallery'
import { BentoGrid } from '@/components/BentoGrid'
import { About } from '@/components/About'
import { Process } from '@/components/Process'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { MagneticCursor } from '@/components/MagneticCursor'

export default function Home() {
  return (
    <>
      <MagneticCursor />
      <Navigation />
      <main>
        <Hero />
        <Services />
        <Work />
        <DepthGallery />
        <BentoGrid />
        <About />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
