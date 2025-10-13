'use client'

import { useDevToolsProtection } from '@/hooks/useDevToolsProtection'
import { useScrollRestoration } from '@/hooks/useScrollRestoration'
import DevToolsModal from '@/components/modals/DevToolsModal'

export default function ClientOnlyWrapper() {
  const { showModal } = useDevToolsProtection()
  useScrollRestoration()

  return <DevToolsModal show={showModal} />
}
