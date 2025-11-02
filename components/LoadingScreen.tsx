'use client'

import { useState, useEffect, useRef } from 'react'
import './LoadingScreen.css'

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isExploding, setIsExploding] = useState(false)
  const [isPlayingVideo, setIsPlayingVideo] = useState(false)
  const [mounted, setMounted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

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

  // Handle video playback when video state changes
  useEffect(() => {
    if (isPlayingVideo && videoRef.current && mounted) {
      const video = videoRef.current
      
      // Force video to be visible immediately - use setTimeout to ensure DOM is ready
      setTimeout(() => {
        if (video) {
          // Set all styles to ensure visibility
          video.style.cssText = `
            width: 100vw !important;
            height: 100vh !important;
            min-width: 100vw !important;
            min-height: 100vh !important;
            max-width: 100vw !important;
            max-height: 100vh !important;
            object-fit: cover !important;
            object-position: center !important;
            display: block !important;
            opacity: 1 !important;
            visibility: visible !important;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            z-index: 1000000 !important;
            background-color: #000000 !important;
          `
          
          console.log('Video element after style:', {
            width: video.offsetWidth,
            height: video.offsetHeight,
            clientWidth: video.clientWidth,
            clientHeight: video.clientHeight,
            videoWidth: video.videoWidth,
            videoHeight: video.videoHeight
          })
          
          // Ensure video is loaded and played
          const tryPlay = () => {
            if (video.readyState >= 2) { // HAVE_CURRENT_DATA or higher
              const playPromise = video.play()
              if (playPromise !== undefined) {
                playPromise.catch((err) => {
                  console.error('Error playing video:', err)
                  // If autoplay fails, try with muted (browser policy)
                  video.muted = true
                  video.play().then(() => {
                    // Unmute after playing starts
                    setTimeout(() => {
                      video.muted = false
                    }, 100)
                  }).catch((mutedErr) => {
                    console.error('Error playing muted video:', mutedErr)
                    // Skip to menu if video fails
                    onComplete()
                  })
                })
              }
            } else {
              // Wait for video to be ready
              video.addEventListener('canplay', tryPlay, { once: true })
            }
          }

          tryPlay()
        }
      }, 200)
    }
  }, [isPlayingVideo, mounted, onComplete])

  const handleStart = () => {
    setIsExploding(true)
    // After explosion animation, show video
    setTimeout(() => {
      setIsPlayingVideo(true)
    }, 1500)
  }

  const handleVideoEnded = () => {
    // After video ends, transition to main menu
    onComplete()
  }


  // Calculate square progress (perimeter of square)
  const squareSize = 170
  const perimeter = squareSize * 4
  const progressLength = (progress / 100) * perimeter

  if (!mounted) return null

  return (
    <>
      {/* Video Player - Render outside loading screen to ensure it's on top */}
      {isPlayingVideo && mounted && (
        <div 
          className="video-container" 
          key="video-container"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 999999,
            backgroundColor: '#000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 1,
            visibility: 'visible',
            pointerEvents: 'auto'
          }}
        >
          <video
            key="intro-video"
            ref={videoRef}
            className="intro-video"
            autoPlay
            playsInline
            muted={false}
            preload="auto"
            onEnded={handleVideoEnded}
            style={{
              width: '100vw',
              height: '100vh',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
              opacity: 1,
              visibility: 'visible',
              position: 'fixed',
              top: 0,
              left: 0,
              zIndex: 1000000,
              backgroundColor: '#000000'
            }}
            onCanPlay={() => {
              // Video can play, ensure it's visible and playing
              console.log('Video can play - making it visible')
              if (videoRef.current) {
                const video = videoRef.current
                // Force video to be visible with inline styles
                video.style.cssText = `
                  width: 100vw !important;
                  height: 100vh !important;
                  min-width: 100vw !important;
                  min-height: 100vh !important;
                  max-width: 100vw !important;
                  max-height: 100vh !important;
                  object-fit: cover !important;
                  object-position: center !important;
                  display: block !important;
                  opacity: 1 !important;
                  visibility: visible !important;
                  position: fixed !important;
                  top: 0 !important;
                  left: 0 !important;
                  z-index: 1000000 !important;
                  background-color: #000000 !important;
                `
                console.log('Video canPlay - style applied:', {
                  offsetWidth: video.offsetWidth,
                  offsetHeight: video.offsetHeight,
                  clientWidth: video.clientWidth,
                  clientHeight: video.clientHeight,
                  videoWidth: video.videoWidth,
                  videoHeight: video.videoHeight,
                  readyState: video.readyState,
                  paused: video.paused
                })
                video.play().catch((err) => {
                  console.error('Error playing video:', err)
                })
              }
            }}
            onLoadedMetadata={() => {
              // Video metadata loaded - check dimensions
              console.log('Video metadata loaded:', {
                videoWidth: videoRef.current?.videoWidth,
                videoHeight: videoRef.current?.videoHeight,
                duration: videoRef.current?.duration
              })
              if (videoRef.current && videoRef.current.videoWidth > 0 && videoRef.current.videoHeight > 0) {
                const video = videoRef.current
                video.style.cssText = `
                  width: 100vw !important;
                  height: 100vh !important;
                  min-width: 100vw !important;
                  min-height: 100vh !important;
                  max-width: 100vw !important;
                  max-height: 100vh !important;
                  object-fit: cover !important;
                  object-position: center !important;
                  display: block !important;
                  opacity: 1 !important;
                  visibility: visible !important;
                  position: fixed !important;
                  top: 0 !important;
                  left: 0 !important;
                  z-index: 1000000 !important;
                  background-color: #000000 !important;
                `
              }
            }}
            onLoadedData={() => {
              // Video is loaded, ensure it plays
              console.log('Video loaded - dimensions:', {
                videoWidth: videoRef.current?.videoWidth,
                videoHeight: videoRef.current?.videoHeight,
                clientWidth: videoRef.current?.clientWidth,
                clientHeight: videoRef.current?.clientHeight,
                offsetWidth: videoRef.current?.offsetWidth,
                offsetHeight: videoRef.current?.offsetHeight
              })
              if (videoRef.current) {
                const video = videoRef.current
                // Force visibility
                video.style.cssText = `
                  width: 100vw !important;
                  height: 100vh !important;
                  min-width: 100vw !important;
                  min-height: 100vh !important;
                  max-width: 100vw !important;
                  max-height: 100vh !important;
                  object-fit: cover !important;
                  object-position: center !important;
                  display: block !important;
                  opacity: 1 !important;
                  visibility: visible !important;
                  position: fixed !important;
                  top: 0 !important;
                  left: 0 !important;
                  z-index: 1000000 !important;
                  background-color: #000000 !important;
                `
                video.play().catch((err) => {
                  console.error('Error playing video:', err)
                })
              }
            }}
            onError={(e) => {
              // If video fails to load, skip directly to menu
              console.error('Video failed to load:', e)
              handleVideoEnded()
            }}
          >
            <source src="/video/intro.mp4" type="video/mp4" />
            <source src="/video/intro.webm" type="video/webm" />
            {/* Fallback: jika video tidak ada, langsung ke menu */}
          </video>
        </div>
      )}

      {/* Loading Screen - Hide when playing video */}
      <div 
        className={`loading-screen ${isExploding ? 'exploding' : ''} ${isPlayingVideo ? 'playing-video' : ''}`}
        style={{
          display: isPlayingVideo ? 'none' : 'flex',
          zIndex: isPlayingVideo ? -1 : 10000
        }}
      >
        {/* Animated background particles */}
      {!isPlayingVideo && (
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
      )}

      {/* Main loading content */}
      {!isPlayingVideo && (
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
      )}

      {/* Explosion effect */}
      {mounted && isExploding && !isPlayingVideo && (
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
    </>
  )
}
