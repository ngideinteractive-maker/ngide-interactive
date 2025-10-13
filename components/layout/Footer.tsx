'use client'

import Link from 'next/link'

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/ngideinteractive/',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/ngide-interactive',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    ),
  },
]

const navLinks = [
  { name: 'Games', href: '#games' },
  { name: 'News', href: '#news' },
  { name: 'Studio', href: '#studio' },
  { name: 'Technology', href: '#technology' },
  { name: 'Contact', href: '#contact' },
]

export default function Footer() {
  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer>
      <div className="footer-content">
        <div className="footer-left">
          <div className="footer-logo">
            <h2>NGIDE INTERACTIVE</h2>
          </div>
          <nav className="footer-nav">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="footer-right">
          <div className="social-links">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                aria-label={social.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Ngide Interactive. All rights reserved.</p>
        <a href="#" className="back-to-top" onClick={handleBackToTop}>
          BACK TO TOP ↑
        </a>
      </div>
    </footer>
    
  )
}
