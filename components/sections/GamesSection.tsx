'use client'

import { useEffect, useState } from 'react'
import GameCard from '@/components/cards/GameCard'
import { useGameCarousel } from '@/hooks/useGameCarousel'
import { subscribeToGames, type Game } from '@/lib/firebaseService'

export default function GamesSection() {
  console.log('🎮🎮🎮 GamesSection: FUNCTION CALLED!')
  
  const { carouselRef, initCarousel } = useGameCarousel()
  const [games, setGames] = useState<Game[]>([])
  const [isInitialized, setIsInitialized] = useState(false)
  const [renderKey, setRenderKey] = useState(0)

  console.log('🎮🎮🎮 GamesSection: States initialized')

  useEffect(() => {
    console.log('🎮🎮🎮 GamesSection: useEffect RUNNING!')
    console.log('🎮 GamesSection: Component mounted, setting up subscription...')
    console.log('🎮 GamesSection: Current time:', new Date().toLocaleTimeString())
    
    // Subscribe to real-time games updates
    const unsubscribe = subscribeToGames((gamesData) => {
      console.log('🎮🔥 GamesSection: CALLBACK TRIGGERED!')
      console.log('🎮 GamesSection: Received games update:', gamesData.length, 'items')
      console.log('🎮 GamesSection: Games data:', gamesData)
      console.log('🎮 GamesSection: Time:', new Date().toLocaleTimeString())
      
      // Force complete re-render
      setGames([...gamesData]) // New array reference
      setIsInitialized(false) // Reset initialization
      setRenderKey(prev => prev + 1) // Force re-render
      
      console.log('🎮 GamesSection: State updated, renderKey:', renderKey + 1)
    })

    console.log('🎮 GamesSection: Subscription setup complete!')

    // Cleanup subscription on unmount
    return () => {
      console.log('🎮 GamesSection: Component unmounting, cleaning up subscription')
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (carouselRef.current && games.length > 0 && !isInitialized) {
      console.log('GamesSection: Initializing carousel with', games.length, 'games')
      
      // Wait for DOM to update with new games
      const timer = setTimeout(() => {
        initCarousel()
        setIsInitialized(true)
        
        // Force update center card highlighting
        const updateHighlight = () => {
          const cards = carouselRef.current?.querySelectorAll('.game-card')
          if (cards && cards.length > 0) {
            cards.forEach(card => card.classList.remove('center'))
            cards[0].classList.add('center')
          }
        }
        
        setTimeout(updateHighlight, 300)
      }, 200)
      
      return () => clearTimeout(timer)
    }
  }, [games, initCarousel, isInitialized])

  console.log('🎮 GamesSection RENDER - games.length:', games.length)
  console.log('🎮 GamesSection RENDER - isInitialized:', isInitialized)
  console.log('🎮 GamesSection RENDER - renderKey:', renderKey)

  return (
    <section id="games" className="content-section" key={`games-${renderKey}`}>
      <div className="container-full">
        <h2 className="section-title-left animate-on-scroll">Our Games</h2>
        {games.length > 0 ? (
          <div className="game-carousel" ref={carouselRef} key={`carousel-${renderKey}`}>
            {games.map((game, index) => {
              console.log('🎮 Rendering game:', game.id, game.title)
              return <GameCard key={`${game.id}-${renderKey}-${index}`} game={game} />
            })}
          </div>
        ) : (
          <div className="empty-state">
            <p>No games available yet.</p>
          </div>
        )}
      </div>
    </section>
  )
}
