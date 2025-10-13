'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { subscribeToNews, type News } from '@/lib/firebaseService'

export default function NewsSection() {
  const [news, setNews] = useState<News[]>([])
  const [, forceUpdate] = useState({})

  useEffect(() => {
    console.log('NewsSection: Component mounted, setting up subscription...')
    
    // Subscribe to real-time news updates
    const unsubscribe = subscribeToNews((newsData) => {
      console.log('NewsSection: Received news update:', newsData.length, 'items')
      setNews(newsData)
      // Force re-render to ensure UI updates
      forceUpdate({})
    })

    // Cleanup subscription on unmount
    return () => {
      console.log('NewsSection: Component unmounting, cleaning up subscription')
      unsubscribe()
    }
  }, [])

  return (
    <section id="news" className="content-section">
      <div className="container">
        <div className="news-header">
          <h2 className="section-title-left animate-on-scroll">What&apos;s the latest news?</h2>
          <Link href="#" className="view-all-link">
            VIEW ALL
          </Link>
        </div>
        {news.length > 0 ? (
          <div className="news-grid">
            {news[0] && news[0].slug && (
              <Link 
                href={`/news/${news[0].slug}`} 
                key={`featured-${news[0].id}`}
                className="news-featured animate-on-scroll"
              >
                <div className="news-image" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)' }}>
                  <img src={news[0].image} alt="Featured News" />
                </div>
                <div className="news-content">
                  <h3>{news[0].title}</h3>
                  <div className="news-meta">
                    <span className="news-tag">{news[0].tag}</span>
                  </div>
                </div>
              </Link>
            )}
            <div className="news-list">
              {news.slice(1).map((item) => (
                item.slug ? (
                  <Link href={`/news/${item.slug}`} key={item.id} className="news-item animate-on-scroll">
                    <div className="news-item-content">
                      <h4>{item.title}</h4>
                      <div className="news-meta">
                        <span className="news-tag">{item.tag}</span>
                      </div>
                    </div>
                    <div className="news-item-image">
                      <img src={item.image} alt="News" />
                    </div>
                  </Link>
                ) : (
                  <div key={item.id} className="news-item animate-on-scroll">
                    <div className="news-item-content">
                      <h4>{item.title}</h4>
                      <div className="news-meta">
                        <span className="news-tag">{item.tag}</span>
                      </div>
                    </div>
                    <div className="news-item-image">
                      <img src={item.image} alt="News" />
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <p>No news available yet.</p>
          </div>
        )}
      </div>
    </section>
  )
}
