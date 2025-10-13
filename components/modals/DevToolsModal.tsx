'use client'

import { useEffect, useState } from 'react'

interface DevToolsModalProps {
  show: boolean
}

export default function DevToolsModal({ show }: DevToolsModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleReload = () => {
    if (typeof window !== 'undefined') {
      window.location.reload()
    }
  }

  if (!mounted || !show) return null

  return (
    <div id="devtools-modal" className={`modal ${show ? 'show' : ''}`}>
      <div className="modal-content">
        <div className="modal-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
        <h2>RESTRICTED AREA</h2>
        <p>Developer Tools have been detected.</p>
        <p className="modal-subtitle">
          This action has been logged for security purposes.
        </p>
        <button className="modal-button" onClick={handleReload}>
          CLOSE & RELOAD
        </button>
      </div>
    </div>
  )
}
