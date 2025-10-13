'use client'

import { useState, useEffect } from 'react'

interface CustomAlertProps {
  isOpen: boolean
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  onConfirm?: () => void
  onCancel?: () => void
  confirmText?: string
  cancelText?: string
  showCancel?: boolean
}

export default function CustomAlert({
  isOpen,
  type,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'OK',
  cancelText = 'Cancel',
  showCancel = false
}: CustomAlertProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    } else {
      setIsVisible(false)
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleConfirm = () => {
    if (onConfirm) onConfirm()
    setIsVisible(false)
  }

  const handleCancel = () => {
    if (onCancel) onCancel()
    setIsVisible(false)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && showCancel) {
      handleCancel()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className={`alert-overlay ${isVisible ? 'visible' : ''}`}
      onClick={handleBackdropClick}
    >
      <div className={`alert-modal alert-${type}`}>
        <div className="alert-header">
          <div className="alert-icon">
            {type === 'success' && (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            )}
            {type === 'error' && (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            )}
            {type === 'warning' && (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
              </svg>
            )}
            {type === 'info' && (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12,16 L12,12"/>
                <path d="M12,8 L12.01,8"/>
              </svg>
            )}
          </div>
          <h2 className="alert-title">{title}</h2>
        </div>

        <div className="alert-body">
          <p className="alert-message">{message}</p>
        </div>

        <div className="alert-footer">
          {showCancel ? (
            <div className="alert-buttons">
              <button className="alert-btn alert-btn-cancel" onClick={handleCancel}>
                {cancelText}
              </button>
              <button className="alert-btn alert-btn-confirm" onClick={handleConfirm}>
                {confirmText}
              </button>
            </div>
          ) : (
            <button className="alert-btn alert-btn-confirm" onClick={handleConfirm}>
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
