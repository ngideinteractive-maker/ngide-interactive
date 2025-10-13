'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { subscribeToNews, type News } from '@/lib/firebaseService'

export default function NewsSection() {
  console.log('📰📰📰 NewsSection: FUNCTION CALLED!')
  
  const [news, setNews] = useState<News[]>([])
  const [updateKey, setUpdateKey] = useState(0)

  console.log('📰📰📰 NewsSection: States initialized')

  useEffect(() => {
    console.log('📰📰📰 NewsSection: useEffect RUNNING!')
    console.log('📰 NewsSection: Component mounted, setting up subscription...')
    console.log('📰 NewsSection: Current time:', new Date().toLocaleTimeString())
    
    // Subscribe to real-time news updates
    const unsubscribe = subscribeToNews((newsData) => {
      console.log('📰🔥 NewsSection: CALLBACK TRIGGERED!')
      console.log('📰 NewsSection: Received news update:', newsData.length, 'items')
      console.log('📰 NewsSection: News data:', newsData)
      console.log('📰 NewsSection: Time:', new Date().toLocaleTimeString())
      
      // Force complete re-render with new data
      setNews([...newsData])
      setUpdateKey(prev => prev + 1)
      
      // Additional force update after a delay to ensure DOM is updated
      setTimeout(() => {
        setUpdateKey(prev => prev + 1)
      }, 100)
    })

    console.log('📰 NewsSection: Subscription setup complete!')

    // Cleanup subscription on unmount
    return () => {
      console.log('📰 NewsSection: Component unmounting, cleaning up subscription')
      unsubscribe()
    }
  }, [])

  console.log('📰 NewsSection RENDER - news.length:', news.length)
  console.log('📰 NewsSection RENDER - updateKey:', updateKey)
  console.log('📰 NewsSection RENDER - news:', news)

  return (
    <section id="news" className="content-section" key={`news-section-${updateKey}`}>
      <div className="container">
        <div className="news-header">
          <h2 className="section-title-left animate-on-scroll">What&apos;s the latest news?</h2>
          <Link href="#" className="view-all-link">
            VIEW ALL
          </Link>
        </div>
        {news.length > 0 ? (
          <div className="news-grid" key={`news-grid-${updateKey}`}>
            {news[0] && news[0].slug && (
              <Link 
                href={`/news/${news[0].slug}`} 
                key={`featured-${news[0].id}-${updateKey}`}
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
            <div className="news-list" key={`news-list-${updateKey}`}>
              {news.slice(1).map((item, index) => (
                item.slug ? (
                  <Link href={`/news/${item.slug}`} key={`${item.id}-${updateKey}-${index}`} className="news-item animate-on-scroll">
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
                  <div key={`${item.id}-${updateKey}-${index}`} className="news-item animate-on-scroll">
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
