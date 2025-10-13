'use client'

import { useState, useEffect } from 'react'
import './admin.css'

interface Game {
  id: string
  title: string
  image: string
  platforms?: string[]
  status?: 'released' | 'development' | 'coming-soon'
}

interface News {
  id: string
  title: string
  image: string
  tag: string
  content: string
  slug: string
  date: string
}

const ADMIN_PASSWORD = 'Budibudian_17'
const IMGUR_CLIENT_ID = '546c25a59c58ad7' // Public Client ID for anonymous uploads

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  
  const [activeTab, setActiveTab] = useState<'games' | 'news'>('games')
  const [games, setGames] = useState<Game[]>([])
  const [news, setNews] = useState<News[]>([])
  
  // Game form state
  const [gameTitle, setGameTitle] = useState('')
  const [gameImage, setGameImage] = useState('')
  const [gameImagePreview, setGameImagePreview] = useState('')
  const [gamePlatforms, setGamePlatforms] = useState<string[]>([])
  const [gameStatus, setGameStatus] = useState<'released' | 'development' | 'coming-soon'>('released')
  
  // News form state
  const [newsTitle, setNewsTitle] = useState('')
  const [newsImage, setNewsImage] = useState('')
  const [newsImagePreview, setNewsImagePreview] = useState('')
  const [newsTag, setNewsTag] = useState('NEWS')
  const [newsContent, setNewsContent] = useState('')
  
  // Edit mode states
  const [editingGame, setEditingGame] = useState<Game | null>(null)
  const [editingNews, setEditingNews] = useState<News | null>(null)

  useEffect(() => {
    // Check if already authenticated in session
    const authenticated = sessionStorage.getItem('adminAuthenticated')
    if (authenticated === 'true') {
      setIsAuthenticated(true)
      loadData()
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      sessionStorage.setItem('adminAuthenticated', 'true')
      setPasswordError(false)
      loadData()
    } else {
      setPasswordError(true)
      setPasswordInput('')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('adminAuthenticated')
    setPasswordInput('')
  }

  const loadData = () => {
    // Load from localStorage
    const savedGames = localStorage.getItem('adminGames')
    const savedNews = localStorage.getItem('adminNews')
    
    if (savedGames) {
      setGames(JSON.parse(savedGames))
    }
    
    if (savedNews) {
      const parsedNews = JSON.parse(savedNews)
      // Fix old news without date/slug/content
      const fixedNews = parsedNews.map((item: any) => ({
        ...item,
        content: item.content || '',
        slug: item.slug || generateSlug(item.title),
        date: item.date || new Date().toISOString()
      }))
      setNews(fixedNews)
      // Save fixed data back
      localStorage.setItem('adminNews', JSON.stringify(fixedNews))
    }
  }

  const saveGames = (newGames: Game[]) => {
    setGames(newGames)
    localStorage.setItem('adminGames', JSON.stringify(newGames))
  }

  const saveNews = (newNews: News[]) => {
    setNews(newNews)
    localStorage.setItem('adminNews', JSON.stringify(newNews))
  }

  // Generate slug from title
  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  // Handle image URL change with preview
  const handleImageUrlChange = (value: string, type: 'game' | 'news') => {
    if (type === 'game') {
      setGameImage(value)
      setGameImagePreview(value)
    } else {
      setNewsImage(value)
      setNewsImagePreview(value)
    }
  }

  // Handle platform toggle
  const handlePlatformToggle = (platform: string) => {
    setGamePlatforms(prev => 
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    )
  }

  // Game CRUD
  const addGame = () => {
    if (!gameTitle || !gameImage) {
      alert('Please fill all fields')
      return
    }

    const newGame: Game = {
      id: Date.now().toString(),
      title: gameTitle,
      image: gameImage,
      platforms: gamePlatforms.length > 0 ? gamePlatforms : undefined,
      status: gameStatus,
    }

    saveGames([...games, newGame])
    setGameTitle('')
    setGameImage('')
    setGameImagePreview('')
    setGamePlatforms([])
    setGameStatus('released')
  }

  const deleteGame = (id: string) => {
    if (confirm('Delete this game?')) {
      saveGames(games.filter(g => g.id !== id))
    }
  }

  const startEditGame = (game: Game) => {
    setEditingGame(game)
    setGameTitle(game.title)
    setGameImage(game.image)
    setGamePlatforms(game.platforms || [])
    setGameStatus(game.status || 'released')
    setGameImagePreview(game.image)
  }

  const updateGame = () => {
    if (!editingGame || !gameTitle || !gameImage) {
      alert('Please fill all required fields')
      return
    }

    const updatedGame: Game = {
      ...editingGame,
      title: gameTitle,
      image: gameImage,
      platforms: gamePlatforms.length > 0 ? gamePlatforms : undefined,
      status: gameStatus,
    }

    saveGames(games.map(g => g.id === editingGame.id ? updatedGame : g))
    cancelEditGame()
  }

  const cancelEditGame = () => {
    setEditingGame(null)
    setGameTitle('')
    setGameImage('')
    setGameImagePreview('')
    setGamePlatforms([])
    setGameStatus('released')
  }

  // News CRUD
  const addNews = () => {
    if (!newsTitle || !newsImage || !newsContent) {
      alert('Please fill all required fields (title, image, content)')
      return
    }

    const slug = generateSlug(newsTitle)
    const date = new Date().toISOString()

    const newNewsItem: News = {
      id: Date.now().toString(),
      title: newsTitle,
      image: newsImage,
      tag: newsTag,
      content: newsContent,
      slug: slug,
      date: date,
    }

    saveNews([...news, newNewsItem])
    setNewsTitle('')
    setNewsImage('')
    setNewsImagePreview('')
    setNewsTag('NEWS')
    setNewsContent('')
  }

  const deleteNews = (id: string) => {
    if (confirm('Delete this news?')) {
      saveNews(news.filter(n => n.id !== id))
    }
  }

  const startEditNews = (newsItem: News) => {
    setEditingNews(newsItem)
    setNewsTitle(newsItem.title)
    setNewsImage(newsItem.image)
    setNewsContent(newsItem.content)
    setNewsTag(newsItem.tag)
    setNewsImagePreview(newsItem.image)
  }

  const updateNews = () => {
    if (!editingNews || !newsTitle || !newsImage || !newsContent) {
      alert('Please fill all required fields')
      return
    }

    const slug = generateSlug(newsTitle)

    const updatedNews: News = {
      ...editingNews,
      title: newsTitle,
      image: newsImage,
      content: newsContent,
      tag: newsTag,
      slug: slug,
      // Keep original date, don't update
    }

    saveNews(news.map(n => n.id === editingNews.id ? updatedNews : n))
    cancelEditNews()
  }

  const cancelEditNews = () => {
    setEditingNews(null)
    setNewsTitle('')
    setNewsImage('')
    setNewsImagePreview('')
    setNewsContent('')
    setNewsTag('NEWS')
  }

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="admin-container">
        <div className="login-container">
          <div className="login-card">
            <h1>NGIDE Admin</h1>
            <p>Enter password to access admin panel</p>
            <form onSubmit={handleLogin}>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password"
                className={passwordError ? 'error' : ''}
                autoFocus
              />
              {passwordError && (
                <p className="error-message">Incorrect password. Try again.</p>
              )}
              <button type="submit" className="login-button">
                Login
              </button>
            </form>
            <a href="/" className="back-link-login">← Back to Site</a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>NGIDE Admin Dashboard</h1>
        <div className="header-actions">
          <button onClick={handleLogout} className="logout-button">Logout</button>
          <a href="/" className="back-link">← Back to Site</a>
        </div>
      </header>

      <div className="admin-tabs">
        <button
          className={`tab ${activeTab === 'games' ? 'active' : ''}`}
          onClick={() => setActiveTab('games')}
        >
          Games Management
        </button>
        <button
          className={`tab ${activeTab === 'news' ? 'active' : ''}`}
          onClick={() => setActiveTab('news')}
        >
          News Management
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'games' && (
          <div className="section">
            <div className="form-card">
              <h2>{editingGame ? 'Edit Game' : 'Add New Game'}</h2>
              {editingGame && (
                <div className="edit-mode-banner">
                  Editing: {editingGame.title}
                  <button onClick={cancelEditGame} className="btn-cancel-edit">Cancel</button>
                </div>
              )}
              <div className="form-group">
                <label>Game Title</label>
                <input
                  type="text"
                  value={gameTitle}
                  onChange={(e) => setGameTitle(e.target.value)}
                  placeholder="e.g. Garage Go"
                />
              </div>
              
              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="url"
                  value={gameImage}
                  onChange={(e) => handleImageUrlChange(e.target.value, 'game')}
                  placeholder="https://i.imgur.com/xxxxx.png"
                  className="url-input"
                />
                {gameImagePreview && (
                  <div className="image-preview">
                    <img src={gameImagePreview} alt="Preview" />
                  </div>
                )}
                <small className="form-hint">
                  💡 Upload image to <a href="https://imgur.com" target="_blank" rel="noopener noreferrer">imgur.com</a> first, then paste URL here
                </small>
              </div>

              <div className="form-group">
                <label>Platforms</label>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={gamePlatforms.includes('windows')}
                      onChange={() => handlePlatformToggle('windows')}
                    />
                    <span>Windows</span>
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={gamePlatforms.includes('android')}
                      onChange={() => handlePlatformToggle('android')}
                    />
                    <span>Android</span>
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={gamePlatforms.includes('ios')}
                      onChange={() => handlePlatformToggle('ios')}
                    />
                    <span>iOS</span>
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={gamePlatforms.includes('web')}
                      onChange={() => handlePlatformToggle('web')}
                    />
                    <span>Web</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  value={gameStatus}
                  onChange={(e) => setGameStatus(e.target.value as any)}
                >
                  <option value="released">Released</option>
                  <option value="development">In Development</option>
                  <option value="coming-soon">Coming Soon</option>
                </select>
              </div>
              
              {editingGame ? (
                <div className="button-group">
                  <button className="btn-primary" onClick={updateGame}>
                    Update Game
                  </button>
                  <button className="btn-secondary" onClick={cancelEditGame}>
                    Cancel
                  </button>
                </div>
              ) : (
                <button className="btn-primary" onClick={addGame}>
                  Add Game
                </button>
              )}
            </div>

            <div className="list-card">
              <h2>Current Games ({games.length})</h2>
              <div className="items-grid">
                {games.map((game) => (
                  <div key={game.id} className="item-card">
                    <img src={game.image} alt={game.title} />
                    <div className="item-info">
                      <h3>{game.title}</h3>
                      {game.platforms && game.platforms.length > 0 && (
                        <div className="item-platforms">
                          {game.platforms.map(p => (
                            <span key={p} className="platform-badge">{p}</span>
                          ))}
                        </div>
                      )}
                      {game.status && (
                        <span className={`status-badge status-${game.status}`}>
                          {game.status === 'released' ? 'Released' : 
                           game.status === 'development' ? 'In Development' : 
                           'Coming Soon'}
                        </span>
                      )}
                      <div className="item-actions">
                        <button
                          className="btn-edit"
                          onClick={() => startEditGame(game)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => deleteGame(game.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {games.length === 0 && (
                  <p className="empty-state">No games yet. Add one above!</p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'news' && (
          <div className="section">
            <div className="form-card">
              <h2>{editingNews ? 'Edit News' : 'Add New News'}</h2>
              {editingNews && (
                <div className="edit-mode-banner">
                  Editing: {editingNews.title}
                  <button onClick={cancelEditNews} className="btn-cancel-edit">Cancel</button>
                </div>
              )}
              <div className="form-group">
                <label>News Title</label>
                <input
                  type="text"
                  value={newsTitle}
                  onChange={(e) => setNewsTitle(e.target.value)}
                  placeholder="e.g. Patch 6.3 Update"
                />
              </div>
              
              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="url"
                  value={newsImage}
                  onChange={(e) => handleImageUrlChange(e.target.value, 'news')}
                  placeholder="https://i.imgur.com/xxxxx.png"
                  className="url-input"
                />
                {newsImagePreview && (
                  <div className="image-preview">
                    <img src={newsImagePreview} alt="Preview" />
                  </div>
                )}
                <small className="form-hint">
                  💡 Upload image to <a href="https://imgur.com" target="_blank" rel="noopener noreferrer">imgur.com</a> first, then paste URL here
                </small>
              </div>
              
              <div className="form-group">
                <label>Content</label>
                <textarea
                  value={newsContent}
                  onChange={(e) => setNewsContent(e.target.value)}
                  placeholder="Write your news content here... (supports line breaks)"
                  rows={8}
                />
              </div>
              
              <div className="form-group">
                <label>Tag</label>
                <select
                  value={newsTag}
                  onChange={(e) => setNewsTag(e.target.value)}
                >
                  <option value="NEWS">NEWS</option>
                  <option value="UPDATE">UPDATE</option>
                  <option value="EVENT">EVENT</option>
                  <option value="ANNOUNCEMENT">ANNOUNCEMENT</option>
                </select>
              </div>
              
              {editingNews ? (
                <div className="button-group">
                  <button className="btn-primary" onClick={updateNews}>
                    Update News
                  </button>
                  <button className="btn-secondary" onClick={cancelEditNews}>
                    Cancel
                  </button>
                </div>
              ) : (
                <button className="btn-primary" onClick={addNews}>
                  Add News
                </button>
              )}
            </div>

            <div className="list-card">
              <h2>Current News ({news.length})</h2>
              <div className="items-grid">
                {news.map((item) => (
                  <div key={item.id} className="item-card">
                    <img src={item.image} alt={item.title} />
                    <div className="item-info">
                      <span className="tag">{item.tag}</span>
                      <h3>{item.title}</h3>
                      <div className="item-actions">
                        <button
                          className="btn-edit"
                          onClick={() => startEditNews(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => deleteNews(item.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {news.length === 0 && (
                  <p className="empty-state">No news yet. Add one above!</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
