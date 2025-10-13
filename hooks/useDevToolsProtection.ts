'use client'

import { useState, useEffect } from 'react'

export function useDevToolsProtection() {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const showDevToolsModal = () => {
      console.log('DevTools detected - showing modal')
      setShowModal(true)
      document.body.style.overflow = 'hidden'
    }

    // Disable right-click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      showDevToolsModal()
      return false
    }

    // Disable keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault()
        showDevToolsModal()
        return false
      }
      // Ctrl+Shift+I (Inspect)
      if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.keyCode === 73)) {
        e.preventDefault()
        showDevToolsModal()
        return false
      }
      // Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.keyCode === 74)) {
        e.preventDefault()
        showDevToolsModal()
        return false
      }
      // Ctrl+Shift+C (Inspect Element)
      if (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.keyCode === 67)) {
        e.preventDefault()
        showDevToolsModal()
        return false
      }
      // Ctrl+U (View Source)
      if (e.ctrlKey && (e.key === 'u' || e.key === 'U' || e.keyCode === 85)) {
        e.preventDefault()
        showDevToolsModal()
        return false
      }
    }

    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('keydown', handleKeyDown)

    // Detect DevTools by window size
    let devtoolsOpen = false
    const threshold = 160

    const checkDevTools = setInterval(() => {
      const widthThreshold = window.outerWidth - window.innerWidth > threshold
      const heightThreshold = window.outerHeight - window.innerHeight > threshold

      if (widthThreshold || heightThreshold) {
        if (!devtoolsOpen) {
          devtoolsOpen = true
          showDevToolsModal()
        }
      } else {
        devtoolsOpen = false
      }
    }, 500)

    // Detect debugger
    const checkDebugger = setInterval(() => {
      const before = new Date()
      debugger
      const after = new Date()
      if (after.getTime() - before.getTime() > 100) {
        showDevToolsModal()
      }
    }, 1000)

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('keydown', handleKeyDown)
      clearInterval(checkDevTools)
      clearInterval(checkDebugger)
    }
  }, [])

  return { showModal }
}
