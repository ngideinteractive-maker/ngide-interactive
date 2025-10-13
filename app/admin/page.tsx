'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useAlert } from '@/components/providers/AlertProvider'
import * as firebaseService from '@/lib/firebaseService'
import type { Game, News } from '@/lib/firebaseService'
import './admin.css'

const ADMIN_PASSWORD = 'Budibudian_17'

export default function AdminPage() {
  const { showAlert } = useAlert()
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

  const loadData = useCallback(async () => {
    // Load from Firebase
    const [gamesData, newsData] = await Promise.all([
      firebaseService.getAllGames(),
      firebaseService.getAllNews()
    ])
    
    setGames(gamesData)
    setNews(newsData)
  }, [])

  useEffect(() => {
    // Check if already authenticated in session
    const authenticated = sessionStorage.getItem('adminAuthenticated')
    if (authenticated === 'true') {
      setIsAuthenticated(true)
      loadData()
    }
  }, [loadData])

  // No need for saveGames/saveNews - Firebase handles persistence

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
  const addGame = async () => {
    if (!gameTitle || !gameImage) {
      showAlert('error', 'Error', 'Please fill all fields')
      return
    }

    const newGame: Omit<Game, 'id'> = {
      title: gameTitle,
      image: gameImage,
      platforms: gamePlatforms.length > 0 ? gamePlatforms : undefined,
      status: gameStatus,
    }

    const id = await firebaseService.addGame(newGame)
    if (id) {
      showAlert('success', 'Success', 'Game added successfully!')
      setGameTitle('')
      setGameImage('')
      setGameImagePreview('')
      setGamePlatforms([])
      setGameStatus('released')
      loadData() // Reload data from Firebase
    } else {
      showAlert('error', 'Error', 'Failed to add game')
    }
  }

  const deleteGame = (id: string) => {
    const gameToDelete = games.find(g => g.id === id)
    showAlert(
      'warning',
      'Delete Game',
      `Are you sure you want to delete "${gameToDelete?.title}"? This action cannot be undone.`,
      {
        onConfirm: async () => {
          const success = await firebaseService.deleteGame(id)
          if (success) {
            showAlert('success', 'Deleted', 'Game deleted successfully')
            loadData()
          } else {
            showAlert('error', 'Error', 'Failed to delete game')
          }
        },
        confirmText: 'Delete',
        cancelText: 'Cancel',
        showCancel: true
      }
    )
  }

  const startEditGame = (game: Game) => {
    setEditingGame(game)
    setGameTitle(game.title)
    setGameImage(game.image)
    setGamePlatforms(game.platforms || [])
    setGameStatus(game.status || 'released')
    setGameImagePreview(game.image)
  }

  const updateGame = async () => {
    if (!editingGame || !gameTitle || !gameImage) {
      showAlert('error', 'Error', 'Please fill all required fields')
      return
    }

    const updatedData: Partial<Game> = {
      title: gameTitle,
      image: gameImage,
      platforms: gamePlatforms.length > 0 ? gamePlatforms : undefined,
      status: gameStatus,
    }

    const success = await firebaseService.updateGame(editingGame.id, updatedData)
    if (success) {
      showAlert('success', 'Updated', 'Game updated successfully')
      cancelEditGame()
      loadData()
    } else {
      showAlert('error', 'Error', 'Failed to update game')
    }
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
  const addNews = async () => {
    if (!newsTitle || !newsImage || !newsContent) {
      showAlert('error', 'Error', 'Please fill all required fields (title, image, content)')
      return
    }

    const slug = firebaseService.generateSlug(newsTitle)
    const date = new Date().toISOString()

    const newNewsItem: Omit<News, 'id'> = {
      title: newsTitle,
      image: newsImage,
      tag: newsTag,
      content: newsContent,
      slug: slug,
      date: date,
    }

    const id = await firebaseService.addNews(newNewsItem)
    if (id) {
      showAlert('success', 'Success', 'News added successfully!')
      setNewsTitle('')
      setNewsImage('')
      setNewsImagePreview('')
      setNewsTag('NEWS')
      setNewsContent('')
      loadData()
    } else {
      showAlert('error', 'Error', 'Failed to add news')
    }
  }

  const deleteNews = (id: string) => {
    const newsToDelete = news.find(n => n.id === id)
    showAlert(
      'warning',
      'Delete News',
      `Are you sure you want to delete "${newsToDelete?.title}"? This action cannot be undone.`,
      {
        onConfirm: async () => {
          const success = await firebaseService.deleteNews(id)
          if (success) {
            showAlert('success', 'Deleted', 'News deleted successfully')
            loadData()
          } else {
            showAlert('error', 'Error', 'Failed to delete news')
          }
        },
        confirmText: 'Delete',
        cancelText: 'Cancel',
        showCancel: true
      }
    )
  }

  const startEditNews = (newsItem: News) => {
    setEditingNews(newsItem)
    setNewsTitle(newsItem.title)
    setNewsImage(newsItem.image)
    setNewsContent(newsItem.content)
    setNewsTag(newsItem.tag)
    setNewsImagePreview(newsItem.image)
  }

  const updateNews = async () => {
    if (!editingNews || !newsTitle || !newsImage || !newsContent) {
      showAlert('error', 'Error', 'Please fill all required fields')
      return
    }

    const slug = firebaseService.generateSlug(newsTitle)

    const updatedData: Partial<News> = {
      title: newsTitle,
      image: newsImage,
      content: newsContent,
      tag: newsTag,
      slug: slug,
      // Keep original date, don't update
    }

    const success = await firebaseService.updateNews(editingNews.id, updatedData)
    if (success) {
      showAlert('success', 'Updated', 'News updated successfully')
      cancelEditNews()
      loadData()
    } else {
      showAlert('error', 'Error', 'Failed to update news')
    }
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
            <Link href="/" className="back-link-login">← Back to Site</Link>
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
          <Link href="/" className="back-link">← Back to Site</Link>
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
                  onChange={(e) => setGameStatus(e.target.value as 'released' | 'development' | 'coming-soon')}
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
