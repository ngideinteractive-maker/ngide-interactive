'use client'

import { useEffect } from 'react'

export function useScrollRestoration() {
  useEffect(() => {
    // Restore scroll position
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }

    const savedScrollPosition = sessionStorage.getItem('scrollPosition')
    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition))
      sessionStorage.removeItem('scrollPosition')
    }

    const handleBeforeUnload = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString())
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])
}
