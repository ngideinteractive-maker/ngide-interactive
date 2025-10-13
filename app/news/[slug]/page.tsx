'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAlert } from '@/components/providers/AlertProvider'
import './news-detail.css'

interface News {
  id: string
  title: string
  image: string
  tag: string
  content: string
  slug: string
  date: string
}

export default function NewsDetailPage() {
  const { showAlert } = useAlert()
  const params = useParams()
  const slug = params.slug as string
  
  const [news, setNews] = useState<News | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load news from localStorage
    const savedNews = localStorage.getItem('adminNews')
    if (savedNews) {
      const allNews: News[] = JSON.parse(savedNews)
      const foundNews = allNews.find(n => n.slug === slug)
      
      if (foundNews) {
        setNews(foundNews)
      }
    }
    setLoading(false)
  }, [slug])

  if (loading) {
    return (
      <div className="news-detail-container">
        <div className="loading">Loading...</div>
      </div>
    )
  }

  if (!news) {
    return (
      <div className="news-detail-container">
        <div className="not-found">
          <h1>News Not Found</h1>
          <p>The news article you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/" className="back-button">
            ← Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return 'No date'
    
    const date = new Date(dateString)
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return 'No date'
    }
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="news-detail-container">
      <article className="news-article">
        {/* Back Button */}
        <Link href="/" className="back-button">
          ← Back to Home
        </Link>

        {/* Featured Image */}
        <div className="article-image">
          <img src={news.image} alt={news.title} />
        </div>

        {/* Article Header */}
        <header className="article-header">
          <span className={`article-tag tag-${news.tag.toLowerCase()}`}>
            {news.tag}
          </span>
          <h1 className="article-title">{news.title}</h1>
          <div className="article-meta">
            <time dateTime={news.date}>{formatDate(news.date)}</time>
          </div>
        </header>

        {/* Article Content */}
        <div className="article-content">
          {news.content.split('\n').map((paragraph, index) => (
            paragraph.trim() && <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Share Section */}
        <div className="article-share">
          <span>Share this article:</span>
          <div className="share-buttons">
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href)
                showAlert('success', 'Link Copied!', 'Article link has been copied to clipboard')
              }}
              className="share-btn"
            >
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              Copy Link
            </button>
          </div>
        </div>
      </article>
    </div>
  )
}
