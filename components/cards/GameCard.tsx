'use client'

interface Game {
  id: string | number
  title: string
  image: string
  platforms?: string[]
  isComingSoon?: boolean
}

interface GameCardProps {
  game: Game
}

export default function GameCard({ game }: GameCardProps) {
  if (game.isComingSoon) {
    return (
      <div className="game-card animate-on-scroll">
        <div
          className="game-cover"
          style={{
            background: 'linear-gradient(135deg, #1a1a2e 0%, #3d3d5c 100%)',
          }}
        >
          <div className="game-placeholder">
            <h3>COMING SOON</h3>
          </div>
          <div className="game-platforms">
            <span style={{ fontSize: '0.75rem', opacity: 0.7, fontFamily: 'var(--font-title)' }}>
              COMING SOON
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="game-card animate-on-scroll">
      <div
        className="game-cover"
        style={{
          backgroundImage: `url('${game.image}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="game-platforms">
          {game.platforms?.map((platform) => (
            <img
              key={platform}
              src={`https://img.icons8.com/ios-filled/50/ffffff/${
                platform === 'windows' ? 'windows-10' : platform === 'android' ? 'android-os' : platform
              }.png`}
              alt={platform}
              className="platform-icon"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
