'use client'

import { useEffect, useState } from 'react'
import GameCard from '@/components/cards/GameCard'
import { useGameCarousel } from '@/hooks/useGameCarousel'

interface Game {
  id: string | number
  title: string
  image: string
  platforms?: string[]
  isComingSoon?: boolean
}

export default function GamesSection() {
  const { carouselRef, initCarousel } = useGameCarousel()
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    // Load games from admin (localStorage)
    const adminGames = localStorage.getItem('adminGames')
    if (adminGames) {
      const parsedGames = JSON.parse(adminGames)
      setGames(parsedGames)
    }
  }, [])

  useEffect(() => {
    if (carouselRef.current) {
      initCarousel()
    }
  }, [initCarousel, games])

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
