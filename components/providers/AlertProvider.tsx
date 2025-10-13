'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import CustomAlert from '@/components/ui/CustomAlert'

type AlertType = 'success' | 'error' | 'warning' | 'info'

interface AlertContextType {
  showAlert: (
    type: AlertType,
    title: string,
    message: string,
    options?: {
      onConfirm?: () => void
      onCancel?: () => void
      confirmText?: string
      cancelText?: string
      showCancel?: boolean
    }
  ) => void
}

const AlertContext = createContext<AlertContextType | null>(null)

export const useAlert = () => {
  const context = useContext(AlertContext)
  if (!context) {
    throw new Error('useAlert must be used within AlertProvider')
  }
  return context
}

interface AlertProviderProps {
  children: ReactNode
}

export function AlertProvider({ children }: AlertProviderProps) {
  const [alert, setAlert] = useState<{
    isOpen: boolean
    type: AlertType
    title: string
    message: string
    onConfirm?: () => void
    onCancel?: () => void
    confirmText?: string
    cancelText?: string
    showCancel?: boolean
  }>({
    isOpen: false,
    type: 'info',
    title: '',
    message: '',
    showCancel: false
  })

  const showAlert = (
    type: AlertType,
    title: string,
    message: string,
    options?: {
      onConfirm?: () => void
      onCancel?: () => void
      confirmText?: string
      cancelText?: string
      showCancel?: boolean
    }
  ) => {
    setAlert({
      isOpen: true,
      type,
      title,
      message,
      onConfirm: options?.onConfirm,
      onCancel: options?.onCancel,
      confirmText: options?.confirmText,
      cancelText: options?.cancelText,
      showCancel: options?.showCancel ?? false
    })
  }

  const hideAlert = () => {
    setAlert(prev => ({ ...prev, isOpen: false }))
  }

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <CustomAlert
        isOpen={alert.isOpen}
        type={alert.type}
        title={alert.title}
        message={alert.message}
        onConfirm={alert.onConfirm || hideAlert}
        onCancel={alert.onCancel || hideAlert}
        confirmText={alert.confirmText}
        cancelText={alert.cancelText}
        showCancel={alert.showCancel}
      />
    </AlertContext.Provider>
  )
}
