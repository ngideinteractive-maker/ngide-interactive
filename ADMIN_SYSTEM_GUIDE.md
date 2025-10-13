# 🎮 Admin System Guide

## Overview

Sistem admin untuk mengelola **Games** dan **News** tanpa merusak user view. Admin dapat menambah, melihat, dan menghapus konten yang langsung muncul di halaman user.

---

## 🚀 Quick Start

### Akses Admin Panel

```
URL: http://localhost:3000/admin
```

### Features

1. **Games Management** - Tambah/hapus game cards
2. **News Management** - Tambah/hapus news items
3. **Real-time Update** - Perubahan langsung terlihat di user view
4. **localStorage Storage** - Data tersimpan di browser

---

## 📁 File Structure

```
app/
├── admin/
│   ├── page.tsx          # Admin dashboard
│   └── admin.css         # Admin styles

components/
├── sections/
│   ├── GamesSection.tsx  # Updated: Load from admin
│   └── NewsSection.tsx   # Updated: Load from admin
└── cards/
    └── GameCard.tsx      # Updated: Support admin data
```

---

## 🎨 Admin Dashboard

### Layout

```
┌─────────────────────────────────────┐
│  NGIDE Admin Dashboard  [Back to Site] │
├─────────────────────────────────────┤
│ [Games Management] [News Management] │
├─────────────────────────────────────┤
│                                     │
│  ┌──────────────┐  ┌──────────────┐│
│  │  Add Form    │  │  Items List  ││
│  │              │  │              ││
│  │  [Title]     │  │  ┌────────┐  ││
│  │  [Image]     │  │  │ Item 1 │  ││
│  │              │  │  └────────┘  ││
│  │  [Add]       │  │  ┌────────┐  ││
│  │              │  │  │ Item 2 │  ││
│  └──────────────┘  │  └────────┘  ││
│                    └──────────────┘│
└─────────────────────────────────────┘
```

---

## 🎮 Games Management

### Add Game

1. Click **"Games Management"** tab
2. Fill form:
   - **Game Title**: Nama game (e.g., "Garage Go")
   - **Image URL**: Path gambar (e.g., "/img/garagego.png")
3. Click **"Add Game"**

### Delete Game

1. Find game card di list
2. Click **"Delete"** button
3. Confirm deletion

### Data Structure

```typescript
interface Game {
  id: string
  title: string
  image: string
}
```

### Example

```json
{
  "id": "1234567890",
  "title": "Garage Go",
  "image": "/img/garagego.png"
}
```

---

## 📰 News Management

### Add News

1. Click **"News Management"** tab
2. Fill form:
   - **News Title**: Judul berita
   - **Image URL**: URL gambar
   - **Tag**: Pilih tag (NEWS/UPDATE/EVENT/ANNOUNCEMENT)
3. Click **"Add News"**

### Delete News

1. Find news card di list
2. Click **"Delete"** button
3. Confirm deletion

### Data Structure

```typescript
interface News {
  id: string
  title: string
  image: string
  tag: string
}
```

### Example

```json
{
  "id": "1234567890",
  "title": "Patch 6.3 Update",
  "image": "https://via.placeholder.com/600x400",
  "tag": "UPDATE"
}
```

---

## 💾 Data Storage

### localStorage Keys

- **adminGames**: Array of game objects
- **adminNews**: Array of news objects

### Storage Location

Data disimpan di browser localStorage:
```
localStorage.setItem('adminGames', JSON.stringify(games))
localStorage.setItem('adminNews', JSON.stringify(news))
```

### Clear Data

```javascript
// Clear all admin data
localStorage.removeItem('adminGames')
localStorage.removeItem('adminNews')

// Or clear everything
localStorage.clear()
```

---

## 🔄 Integration with User View

### GamesSection

```typescript
// Load games from admin
useEffect(() => {
  const adminGames = localStorage.getItem('adminGames')
  if (adminGames) {
    const parsedGames = JSON.parse(adminGames)
    if (parsedGames.length > 0) {
      setGames(parsedGames)
    }
  }
}, [])
```

**Behavior**:
- Jika ada data admin → Show admin games
- Jika tidak ada → Show default games (Garage Go + Coming Soon)

### NewsSection

```typescript
// Load news from admin
useEffect(() => {
  const adminNews = localStorage.getItem('adminNews')
  if (adminNews) {
    const parsedNews = JSON.parse(adminNews)
    if (parsedNews.length > 0) {
      setNews(parsedNews)
    }
  }
}, [])
```

**Behavior**:
- Jika ada data admin → Show admin news
- Jika tidak ada → Show default news
- First item = Featured news
- Rest = News list

---

## 🎯 User Flow

### Admin Side

```
1. Open /admin
   ↓
2. Add/Delete games or news
   ↓
3. Data saved to localStorage
   ↓
4. Go back to site
```

### User Side

```
1. Open homepage
   ↓
2. GamesSection loads
   ↓
3. Check localStorage for adminGames
   ↓
4. Show admin games OR default games
   ↓
5. NewsSection loads
   ↓
6. Check localStorage for adminNews
   ↓
7. Show admin news OR default news
```

---

## 🎨 UI Features

### Admin Dashboard

- ✅ **Dark theme** - Consistent dengan main site
- ✅ **Tab navigation** - Switch antara Games/News
- ✅ **Sticky form** - Form tetap visible saat scroll
- ✅ **Grid layout** - Responsive card grid
- ✅ **Hover effects** - Interactive feedback
- ✅ **Empty states** - Friendly messages

### Form Validation

```typescript
const addGame = () => {
  if (!gameTitle || !gameImage) {
    alert('Please fill all fields')
    return
  }
  // Add game...
}
```

### Confirmation Dialogs

```typescript
const deleteGame = (id: string) => {
  if (confirm('Delete this game?')) {
    // Delete...
  }
}
```

---

## 📱 Responsive Design

### Desktop (>1024px)
- Side-by-side layout (Form | List)
- Sticky form
- 3-column grid

### Tablet (768px - 1024px)
- Stacked layout
- 2-column grid

### Mobile (<768px)
- Single column
- Full-width cards
- Compact header

---

## 🔧 Customization

### Add New Fields

```typescript
// In admin/page.tsx
const [gameDescription, setGameDescription] = useState('')

// In form
<div className="form-group">
  <label>Description</label>
  <textarea
    value={gameDescription}
    onChange={(e) => setGameDescription(e.target.value)}
  />
</div>

// In addGame
const newGame = {
  id: Date.now().toString(),
  title: gameTitle,
  image: gameImage,
  description: gameDescription, // New field
}
```

### Add New Tags

```typescript
// In admin/page.tsx
<select value={newsTag} onChange={(e) => setNewsTag(e.target.value)}>
  <option value="NEWS">NEWS</option>
  <option value="UPDATE">UPDATE</option>
  <option value="EVENT">EVENT</option>
  <option value="ANNOUNCEMENT">ANNOUNCEMENT</option>
  <option value="PATCH">PATCH</option> {/* New tag */}
</select>
```

---

## 🐛 Troubleshooting

### Data tidak muncul di user view

**Solution**:
1. Check browser console for errors
2. Verify localStorage has data:
   ```javascript
   console.log(localStorage.getItem('adminGames'))
   console.log(localStorage.getItem('adminNews'))
   ```
3. Hard refresh user page (Ctrl+F5)

### Form tidak submit

**Solution**:
1. Check all fields terisi
2. Check browser console for errors
3. Verify localStorage tidak full

### Images tidak muncul

**Solution**:
1. Verify image URL correct
2. Check image path (relative vs absolute)
3. For local images: Use `/img/filename.png`
4. For external: Use full URL `https://...`

---

## 🚀 Future Enhancements

Potential improvements:

- [ ] **Backend API** - Replace localStorage dengan database
- [ ] **Authentication** - Login system untuk admin
- [ ] **Image Upload** - Upload gambar langsung
- [ ] **Edit Feature** - Edit existing items
- [ ] **Drag & Drop** - Reorder items
- [ ] **Search/Filter** - Find items quickly
- [ ] **Bulk Actions** - Delete multiple items
- [ ] **Preview Mode** - Preview before publish
- [ ] **Analytics** - Track views/clicks

---

## 📊 Data Limits

### localStorage Limits

- **Max size**: ~5-10MB per domain
- **Games**: Recommended max 50 items
- **News**: Recommended max 100 items

### Performance

- ✅ Fast load (localStorage is sync)
- ✅ No network requests
- ✅ Works offline
- ⚠️ Data per-browser (not synced)

---

## ✅ Testing Checklist

### Admin Panel
- [ ] Can access /admin
- [ ] Can switch tabs
- [ ] Can add game
- [ ] Can delete game
- [ ] Can add news
- [ ] Can delete news
- [ ] Form validation works
- [ ] Confirmation dialogs work

### User View
- [ ] Games show admin data
- [ ] News show admin data
- [ ] Falls back to defaults if no admin data
- [ ] Images load correctly
- [ ] Carousel works with admin games
- [ ] News grid layout correct

### Integration
- [ ] Add game → Shows on homepage
- [ ] Delete game → Removes from homepage
- [ ] Add news → Shows on homepage
- [ ] Delete news → Removes from homepage
- [ ] Refresh preserves data

---

## 🎯 Best Practices

### Image URLs

**Local images**:
```
✅ /img/garagego.png
✅ /img/studio.png
❌ img/garagego.png (missing /)
```

**External images**:
```
✅ https://via.placeholder.com/600x400
✅ https://example.com/image.jpg
❌ //example.com/image.jpg (protocol missing)
```

### Titles

- Keep concise (max 60 characters)
- Use proper capitalization
- Avoid special characters

### Tags

- Use consistent tags
- Uppercase for visibility
- Max 15 characters

---

## 📝 Summary

**Admin system yang simple tapi powerful:**

- ✅ **Easy to use** - Intuitive UI
- ✅ **No backend needed** - localStorage only
- ✅ **Real-time updates** - Instant reflection
- ✅ **No user impact** - Separate admin view
- ✅ **Responsive** - Works on all devices
- ✅ **Extensible** - Easy to add features

**Access**: `http://localhost:3000/admin`

**Status**: ✅ Ready to use!
