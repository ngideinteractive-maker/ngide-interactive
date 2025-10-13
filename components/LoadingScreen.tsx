'use client'

import { useState, useEffect } from 'react'
import './LoadingScreen.css'

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isExploding, setIsExploding] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsLoaded(true)
          return 100
        }
        // Random increment untuk natural loading feel
        return prev + Math.random() * 15
      })
    }, 200)

    return () => clearInterval(interval)
  }, [mounted])

  const handleStart = () => {
    setIsExploding(true)
    // Wait for explosion animation then transition
    setTimeout(() => {
      onComplete()
    }, 1500)
  }

  // Calculate square progress (perimeter of square)
  const squareSize = 170
  const perimeter = squareSize * 4
  const progressLength = (progress / 100) * perimeter

  if (!mounted) return null

  return (
    <div className={`loading-screen ${isExploding ? 'exploding' : ''}`}>
      {/* Animated background particles */}
      <div className="loading-particles">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Main loading content */}
      <div className="loading-content">
        {/* Logo with square progress */}
        <div className="logo-container">
          {/* Square progress border */}
          <svg className="progress-square" width="220" height="220" viewBox="0 0 220 220">
            {/* Background square */}
            <rect
              className="progress-square-bg"
              x="25"
              y="25"
              width={squareSize}
              height={squareSize}
              strokeWidth="3"
              fill="none"
            />
            {/* Progress square */}
            <rect
              className="progress-square-path"
              x="25"
              y="25"
              width={squareSize}
              height={squareSize}
              strokeWidth="3"
              fill="none"
              strokeDasharray={perimeter}
              strokeDashoffset={perimeter - progressLength}
            />
          </svg>

          {/* Studio Logo Image - Clickable when loaded */}
          <div 
            className={`studio-logo ${isLoaded ? 'clickable' : ''}`}
            onClick={isLoaded ? handleStart : undefined}
          >
            <img src="/img/studio.png" alt="Ngide Interactive" />
            {mounted && isLoaded && (
              <div className="click-hint">
                <span>Click to Enter</span>
              </div>
            )}
          </div>

          {/* Progress percentage */}
          <div className="progress-text">
            {Math.floor(progress)}%
          </div>
        </div>

        {/* Loading text */}
        {mounted && !isLoaded && (
          <div className="loading-text">
            <span className="loading-dots">Loading</span>
          </div>
        )}
      </div>

      {/* Explosion effect */}
      {mounted && isExploding && (
        <div className="explosion-container">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="explosion-particle"
              style={{
                '--angle': `${(360 / 30) * i}deg`,
                '--distance': `${200 + Math.random() * 300}px`,
                '--size': `${10 + Math.random() * 20}px`,
                animationDelay: `${Math.random() * 0.2}s`,
              } as React.CSSProperties}
            />
          ))}
          <div className="explosion-flash" />
        </div>
      )}
    </div>
  )
}
