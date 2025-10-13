'use client'

import Link from 'next/link'

export default function HeroSection() {
  return (
    <section id="hero">
      <div className="hero-content">
        <h1 className="logo-title fade-in">NGIDE INTERACTIVE</h1>
        <p className="tagline fade-in">Where Ideas Comes to Play</p>
      </div>
      <Link href="#games" className="scroll-down">
        <div className="chevron"></div>
        <div className="chevron"></div>
        <div className="chevron"></div>
      </Link>
    </section>
  )
}
