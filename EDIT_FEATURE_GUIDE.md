# ✏️ Edit Feature Guide

## Overview

Admin panel sekarang punya **Edit functionality**! Tidak perlu hapus dan upload ulang lagi!

---

## ✨ Features

### 1. **Edit Games**
- Click "Edit" button
- Form auto-filled dengan data game
- Update dan save

### 2. **Edit News**
- Click "Edit" button
- Form auto-filled dengan data news
- Update dan save

### 3. **Edit Mode Indicator**
- Blue banner showing "Editing: [title]"
- Form title changes to "Edit Game/News"
- Cancel button to exit edit mode

---

## 🎨 UI Preview

### Before Edit:
```
┌─────────────────────────┐
│ Add New Game            │
├─────────────────────────┤
│ [Form fields...]        │
│ [Add Game]              │
└─────────────────────────┘

Game Cards:
┌──────────────┐
│ [Image]      │
│ Garage Go    │
│ [Edit][Delete]│
└──────────────┘
```

### During Edit:
```
┌─────────────────────────────────┐
│ Edit Game                       │
│ ┌─────────────────────────────┐ │
│ │ Editing: Garage Go [Cancel] │ │
│ └─────────────────────────────┘ │
├─────────────────────────────────┤
│ [Form auto-filled...]           │
│ [Update Game] [Cancel]          │
└─────────────────────────────────┘
```

---

## 🚀 How to Use

### Edit Game:

```
1. Go to admin panel
   ↓
2. Find game card
   ↓
3. Click "Edit" button
   ↓
4. Form auto-fills with:
   - Title
   - Image URL
   - Platforms (checked)
   - Status
   ↓
5. Make changes
   ↓
6. Click "Update Game"
   ↓
7. Done! ✓
```

### Edit News:

```
1. Go to admin panel
   ↓
2. Click "News Management"
   ↓
3. Find news card
   ↓
4. Click "Edit" button
   ↓
5. Form auto-fills with:
   - Title
   - Image URL
   - Content
   - Tag
   ↓
6. Make changes
   ↓
7. Click "Update News"
   ↓
8. Done! ✓
```

---

## 💻 Technical Details

### Edit Game Flow:

```typescript
const startEditGame = (game: Game) => {
  setEditingGame(game)
  setGameTitle(game.title)
  setGameImage(game.image)
  setGamePlatforms(game.platforms || [])
  setGameStatus(game.status || 'released')
  setGameImagePreview(game.image)
}

const updateGame = () => {
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
```

### Edit News Flow:

```typescript
const startEditNews = (newsItem: News) => {
  setEditingNews(newsItem)
  setNewsTitle(newsItem.title)
  setNewsImage(newsItem.image)
  setNewsContent(newsItem.content)
  setNewsTag(newsItem.tag)
  setNewsImagePreview(newsItem.image)
}

const updateNews = () => {
  const slug = generateSlug(newsTitle)
  
  const updatedNews: News = {
    ...editingNews,
    title: newsTitle,
    image: newsImage,
    content: newsContent,
    tag: newsTag,
    slug: slug,
    // Keep original date
  }
  
  saveNews(news.map(n => n.id === editingNews.id ? updatedNews : n))
  cancelEditNews()
}
```

---

## 🎨 UI Components

### Edit Mode Banner:
```css
.edit-mode-banner {
  background: rgba(59, 130, 246, 0.2);
  border: 1px solid rgba(59, 130, 246, 0.5);
  color: rgb(96, 165, 250);
}
```
- Blue color
- Shows editing item
- Cancel button

### Button Group:
```tsx
<div className="button-group">
  <button className="btn-primary" onClick={updateGame}>
    Update Game
  </button>
  <button className="btn-secondary" onClick={cancelEditGame}>
    Cancel
  </button>
</div>
```
- Side-by-side buttons
- Primary (Update) + Secondary (Cancel)

### Item Actions:
```tsx
<div className="item-actions">
  <button className="btn-edit" onClick={() => startEditGame(game)}>
    Edit
  </button>
  <button className="btn-delete" onClick={() => deleteGame(game.id)}>
    Delete
  </button>
</div>
```
- Edit (Blue) + Delete (Red)
- Equal width
- Hover effects

---

## ✅ Features Breakdown

### Edit Button:
- ✅ Blue color
- ✅ Hover effect
- ✅ Loads data to form

### Edit Mode:
- ✅ Banner indicator
- ✅ Form title changes
- ✅ Auto-fill all fields
- ✅ Image preview shows

### Update Button:
- ✅ Replaces "Add" button
- ✅ Saves changes
- ✅ Exits edit mode

### Cancel Button:
- ✅ In banner
- ✅ In button group
- ✅ Clears form
- ✅ Exits edit mode

---

## 🔄 Edit vs Add Mode

### Add Mode:
```
Form Title: "Add New Game"
Button: "Add Game"
Banner: None
Behavior: Creates new item
```

### Edit Mode:
```
Form Title: "Edit Game"
Button: "Update Game" + "Cancel"
Banner: "Editing: [title]"
Behavior: Updates existing item
```

---

## 🎯 Use Cases

### Example 1: Fix Typo

```
Game: "Garag Go" (typo!)
↓
Click "Edit"
↓
Change title: "Garage Go"
↓
Click "Update Game"
↓
Fixed! ✓
```

### Example 2: Change Image

```
Game: Old image URL
↓
Click "Edit"
↓
Upload new image
↓
URL auto-fills
↓
Click "Update Game"
↓
New image! ✓
```

### Example 3: Update Status

```
Game: Status = "In Development"
↓
Click "Edit"
↓
Change status: "Released"
↓
Click "Update Game"
↓
Status updated! ✓
```

### Example 4: Edit News Content

```
News: Short content
↓
Click "Edit"
↓
Add more paragraphs
↓
Click "Update News"
↓
Full article! ✓
```

---

## 🐛 Error Handling

### Validation:
```typescript
if (!editingGame || !gameTitle || !gameImage) {
  alert('Please fill all required fields')
  return
}
```
- Checks required fields
- Shows alert if missing

### Cancel Behavior:
```typescript
const cancelEditGame = () => {
  setEditingGame(null)
  setGameTitle('')
  setGameImage('')
  setGameImageFile(null)
  setGameImagePreview('')
  setGamePlatforms([])
  setGameStatus('released')
}
```
- Clears all form fields
- Resets to add mode
- Removes edit state

---

## 🎨 CSS Styling

### Edit Button:
```css
.btn-edit {
  color: rgb(96, 165, 250);
  border: 1px solid rgba(96, 165, 250, 0.5);
}

.btn-edit:hover {
  background: rgba(96, 165, 250, 0.1);
  border-color: rgb(96, 165, 250);
}
```

### Secondary Button:
```css
.btn-secondary {
  background: transparent;
  color: #ffffff;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: #ffffff;
}
```

### Item Actions:
```css
.item-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-edit,
.btn-delete {
  flex: 1;
}
```

---

## 📝 Best Practices

### When to Edit:
- ✅ Fix typos
- ✅ Update images
- ✅ Change status
- ✅ Modify content
- ✅ Update platforms

### When to Delete & Re-add:
- ⚠️ Major restructure
- ⚠️ Complete rewrite
- ⚠️ Different game/news

### Tips:
- ✅ Always preview changes
- ✅ Use cancel if unsure
- ✅ Check image URL before updating
- ✅ Verify all fields filled

---

## 🧪 Testing

### Test Edit Game:

```bash
# 1. Add a game
Title: Test Game
Image: /img/test.png
Platforms: Windows
Status: Released

# 2. Click "Edit"
Expected: Form fills with data

# 3. Change title
New title: Test Game Updated

# 4. Click "Update Game"
Expected: Title changes in card

# 5. Verify
Homepage shows: "Test Game Updated"
```

### Test Edit News:

```bash
# 1. Add news
Title: Test News
Content: Short content
Tag: NEWS

# 2. Click "Edit"
Expected: Form fills with data

# 3. Add more content
New content: Short content\n\nMore paragraphs...

# 4. Click "Update News"
Expected: Content updates

# 5. Verify
Detail page shows new content
```

### Test Cancel:

```bash
# 1. Click "Edit"
# 2. Make changes
# 3. Click "Cancel"
Expected:
- Form clears
- Edit mode exits
- No changes saved
```

---

## 📁 Files Modified

1. ✅ `app/admin/page.tsx` - Edit logic
2. ✅ `app/admin/admin.css` - Edit styles

### Changes:
- Added edit state variables
- Added `startEditGame/News` functions
- Added `updateGame/News` functions
- Added `cancelEditGame/News` functions
- Added edit mode UI
- Added edit/cancel buttons
- Added button group styles
- Added edit mode banner

---

## 📝 Summary

### What's Added:
- ✅ **Edit button** - On each card
- ✅ **Edit mode** - Visual indicator
- ✅ **Auto-fill** - Form populates
- ✅ **Update button** - Save changes
- ✅ **Cancel button** - Exit edit mode
- ✅ **Validation** - Required fields

### Benefits:
- ✅ **No re-upload** - Edit in place
- ✅ **Faster workflow** - Quick updates
- ✅ **Less errors** - No data loss
- ✅ **Better UX** - Intuitive

### Tech:
- React state management
- Conditional rendering
- Form auto-fill
- Array map/filter

---

**Status**: ✅ Edit feature ready!

**Test it**: Edit a game or news now! ✏️✨
