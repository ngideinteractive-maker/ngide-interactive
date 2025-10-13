import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  query,
  orderBy,
  Timestamp,
  onSnapshot
} from 'firebase/firestore'
import { db } from './firebase'

// Types
export interface Game {
  id: string
  title: string
  image: string
  platforms?: string[]
  status?: 'released' | 'development' | 'coming-soon'
  createdAt?: Date
}

export interface News {
  id: string
  title: string
  image: string
  tag: string
  content: string
  slug: string
  date: string
  createdAt?: Date
}

// Collections
const GAMES_COLLECTION = 'games'
const NEWS_COLLECTION = 'news'

// ==================== GAMES ====================

export const getAllGames = async (): Promise<Game[]> => {
  try {
    const gamesRef = collection(db, GAMES_COLLECTION)
    const q = query(gamesRef, orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Game))
  } catch (error) {
    console.error('Error getting games:', error)
    return []
  }
}

export const addGame = async (game: Omit<Game, 'id'>): Promise<string | null> => {
  try {
    const docRef = await addDoc(collection(db, GAMES_COLLECTION), {
      ...game,
      createdAt: Timestamp.now()
    })
    return docRef.id
  } catch (error) {
    console.error('Error adding game:', error)
    return null
  }
}

export const updateGame = async (id: string, game: Partial<Game>): Promise<boolean> => {
  try {
    const gameRef = doc(db, GAMES_COLLECTION, id)
    await updateDoc(gameRef, game)
    return true
  } catch (error) {
    console.error('Error updating game:', error)
    return false
  }
}

export const deleteGame = async (id: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, GAMES_COLLECTION, id))
    return true
  } catch (error) {
    console.error('Error deleting game:', error)
    return false
  }
}

// ==================== NEWS ====================

export const getAllNews = async (): Promise<News[]> => {
  try {
    const newsRef = collection(db, NEWS_COLLECTION)
    const q = query(newsRef, orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as News))
  } catch (error) {
    console.error('Error getting news:', error)
    return []
  }
}

export const addNews = async (news: Omit<News, 'id'>): Promise<string | null> => {
  try {
    const docRef = await addDoc(collection(db, NEWS_COLLECTION), {
      ...news,
      createdAt: Timestamp.now()
    })
    return docRef.id
  } catch (error) {
    console.error('Error adding news:', error)
    return null
  }
}

export const updateNews = async (id: string, news: Partial<News>): Promise<boolean> => {
  try {
    const newsRef = doc(db, NEWS_COLLECTION, id)
    await updateDoc(newsRef, news)
    return true
  } catch (error) {
    console.error('Error updating news:', error)
    return false
  }
}

export const deleteNews = async (id: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, NEWS_COLLECTION, id))
    return true
  } catch (error) {
    console.error('Error deleting news:', error)
    return false
  }
}

// ==================== UTILITY ====================

export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// ==================== REAL-TIME LISTENERS ====================

export const subscribeToGames = (callback: (games: Game[]) => void) => {
  const gamesRef = collection(db, GAMES_COLLECTION)
  const q = query(gamesRef, orderBy('createdAt', 'desc'))
  
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const games = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Game))
    callback(games)
  }, (error) => {
    console.error('Error subscribing to games:', error)
  })
  
  return unsubscribe
}

export const subscribeToNews = (callback: (news: News[]) => void) => {
  const newsRef = collection(db, NEWS_COLLECTION)
  const q = query(newsRef, orderBy('createdAt', 'desc'))
  
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const news = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as News))
    callback(news)
  }, (error) => {
    console.error('Error subscribing to news:', error)
  })
  
  return unsubscribe
}
