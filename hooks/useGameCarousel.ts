'use client'

import { useRef, useCallback, useEffect } from 'react'

export function useGameCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null)

  const initCarousel = useCallback(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    let isDown = false
    let startX: number
    let scrollLeft: number
    let velocity = 0
    let momentumID: number

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true
      carousel.style.cursor = 'grabbing'
      startX = e.pageX - carousel.offsetLeft
      scrollLeft = carousel.scrollLeft
      cancelMomentumTracking()
    }

    const handleMouseLeave = () => {
      isDown = false
      carousel.style.cursor = 'grab'
    }

    const handleMouseUp = () => {
      isDown = false
      carousel.style.cursor = 'grab'
      beginMomentumTracking()
      snapToNearestCard()
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - carousel.offsetLeft
      const walk = (x - startX) * 1.5
      const prevScrollLeft = carousel.scrollLeft
      carousel.scrollLeft = scrollLeft - walk
      velocity = carousel.scrollLeft - prevScrollLeft
    }

    function beginMomentumTracking() {
      cancelMomentumTracking()
      momentumID = requestAnimationFrame(momentumLoop)
    }

    function cancelMomentumTracking() {
      cancelAnimationFrame(momentumID)
    }

    function momentumLoop() {
      if (!carousel) return
      carousel.scrollLeft += velocity
      velocity *= 0.92
      if (Math.abs(velocity) > 0.5) {
        momentumID = requestAnimationFrame(momentumLoop)
      } else {
        snapToNearestCard()
      }
    }

    function snapToNearestCard() {
      if (!carousel) return
      const cards = carousel.querySelectorAll('.game-card')
      const carouselRect = carousel.getBoundingClientRect()
      const carouselCenter = carouselRect.left + carouselRect.width / 2

      let closestCard: HTMLElement | null = null
      let closestDistance = Infinity

      cards.forEach((card) => {
        const cardRect = (card as HTMLElement).getBoundingClientRect()
        const cardCenter = cardRect.left + cardRect.width / 2
        const distance = Math.abs(carouselCenter - cardCenter)

        if (distance < closestDistance) {
          closestDistance = distance
          closestCard = card as HTMLElement
        }
      })

      if (closestCard) {
        const cardRect = (closestCard as HTMLElement).getBoundingClientRect()
        const cardCenter = cardRect.left + cardRect.width / 2
        const scrollAmount = cardCenter - carouselCenter

        carousel.scrollBy({
          left: scrollAmount,
          behavior: 'smooth',
        })
      }
    }

    function updateCenterCard() {
      if (!carousel) return
      const cards = carousel.querySelectorAll('.game-card')
      const carouselRect = carousel.getBoundingClientRect()
      const carouselCenter = carouselRect.left + carouselRect.width / 2

      let closestCard: HTMLElement | null = null
      let closestDistance = Infinity

      cards.forEach((card) => {
        const cardRect = (card as HTMLElement).getBoundingClientRect()
        const cardCenter = cardRect.left + cardRect.width / 2
        const distance = Math.abs(carouselCenter - cardCenter)

        if (distance < closestDistance) {
          closestDistance = distance
          closestCard = card as HTMLElement
        }
      })

      cards.forEach((card) => {
        (card as HTMLElement).classList.remove('center')
      })

      if (closestCard) {
        (closestCard as HTMLElement).classList.add('center')
      }
    }

    let scrollEndTimeout: NodeJS.Timeout
    const handleScroll = () => {
      updateCenterCard()

      clearTimeout(scrollEndTimeout)
      scrollEndTimeout = setTimeout(() => {
        if (!isDown) {
          snapToNearestCard()
        }
      }, 150)
    }

    carousel.addEventListener('mousedown', handleMouseDown)
    carousel.addEventListener('mouseleave', handleMouseLeave)
    carousel.addEventListener('mouseup', handleMouseUp)
    carousel.addEventListener('mousemove', handleMouseMove)
    carousel.addEventListener('scroll', handleScroll, { passive: true })

    // Initial update
    setTimeout(() => {
      updateCenterCard()
      const firstCard = carousel.querySelector('.game-card')
      if (firstCard) {
        const cardRect = (firstCard as HTMLElement).getBoundingClientRect()
        const carouselRect = carousel.getBoundingClientRect()
        const cardCenter = cardRect.left + cardRect.width / 2
        const carouselCenter = carouselRect.left + carouselRect.width / 2
        const scrollAmount = cardCenter - carouselCenter

        carousel.scrollBy({
          left: scrollAmount,
          behavior: 'smooth',
        })
      }
    }, 100)

    return () => {
      carousel.removeEventListener('mousedown', handleMouseDown)
      carousel.removeEventListener('mouseleave', handleMouseLeave)
      carousel.removeEventListener('mouseup', handleMouseUp)
      carousel.removeEventListener('mousemove', handleMouseMove)
      carousel.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    // Animate on scroll observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    // Wait for DOM to be ready
    setTimeout(() => {
      const animateElements = document.querySelectorAll('.animate-on-scroll')
      animateElements.forEach((el) => observer.observe(el))
    }, 100)

    return () => {
      const animateElements = document.querySelectorAll('.animate-on-scroll')
      animateElements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return { carouselRef, initCarousel }
}
