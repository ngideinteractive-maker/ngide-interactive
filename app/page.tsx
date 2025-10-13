'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import HeroSection from '@/components/sections/HeroSection'
import GamesSection from '@/components/sections/GamesSection'
import NewsSection from '@/components/sections/NewsSection'
import StudioSection from '@/components/sections/StudioSection'
import TechnologySection from '@/components/sections/TechnologySection'
import ContactSection from '@/components/sections/ContactSection'
import Footer from '@/components/layout/Footer'

// Load client-only components without SSR
const SpaceCanvas = dynamic(() => import('@/components/canvas/SpaceCanvas'), {
  ssr: false,
})

const ClientOnlyWrapper = dynamic(() => import('@/components/ClientOnlyWrapper'), {
  ssr: false,
})

const LoadingScreen = dynamic(() => import('@/components/LoadingScreen'), {
  ssr: false,
})

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Check if user has already seen loading screen in this session
    const hasSeenLoading = sessionStorage.getItem('hasSeenLoading')
    if (hasSeenLoading) {
      setIsLoading(false)
      setShowContent(true)
    }
  }, [])

  const handleLoadingComplete = () => {
    sessionStorage.setItem('hasSeenLoading', 'true')
    setIsLoading(false)
    // Delay content appearance for smooth transition
    setTimeout(() => {
      setShowContent(true)
    }, 100)
  }

  // Always render main content, just hide it visually during loading
  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <main style={{ opacity: showContent ? 1 : 0, transition: 'opacity 0.3s' }}>
        <SpaceCanvas />
        <ClientOnlyWrapper />
        <HeroSection />
        <GamesSection />
        <NewsSection />
        <StudioSection />
        <TechnologySection />
        <ContactSection />
        <Footer />
      </main>
    </>
  )
}
