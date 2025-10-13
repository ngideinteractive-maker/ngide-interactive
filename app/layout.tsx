import type { Metadata } from 'next'
import { Orbitron, Poppins } from 'next/font/google'
import { AlertProvider } from '@/components/providers/AlertProvider'
import './globals.css'

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-orbitron',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Ngide Interactive - Where Ideas Comes to Play',
  description: 'Creating immersive gaming experiences with cutting-edge technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${orbitron.variable} ${poppins.variable}`}>
      <body>
        <AlertProvider>
          {children}
        </AlertProvider>
      </body>
    </html>
  )
}
