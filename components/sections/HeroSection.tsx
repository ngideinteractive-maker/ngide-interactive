'use client'

import Link from 'next/link'

export default function HeroSection() {
  return (
    <section id="hero">
      <div className="hero-content">
        <div className="logo-title fade-in">
          <img src="/img/studiopanjang2.png" alt="NGIDE Interactive" />
        </div>
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
