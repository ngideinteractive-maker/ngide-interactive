'use client'

import { useEffect, useState } from 'react'
import GameCard from '@/components/cards/GameCard'
import { useGameCarousel } from '@/hooks/useGameCarousel'
import { subscribeToGames, type Game } from '@/lib/firebaseService'

export default function GamesSection() {
  const { carouselRef, initCarousel } = useGameCarousel()
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    // Subscribe to real-time games updates
    const unsubscribe = subscribeToGames((gamesData) => {
      setGames(gamesData)
    })

    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (carouselRef.current) {
      initCarousel()
    }
  }, [games])

  return (
    <section id="games" className="content-section">
      <div className="container-full">
        <h2 className="section-title-left animate-on-scroll">Our Games</h2>
        {games.length > 0 ? (
          <div className="game-carousel" ref={carouselRef}>
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
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
