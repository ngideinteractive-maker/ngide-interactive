# 🎮 Game Metadata System

## Overview

Admin panel sekarang bisa menambahkan **Platforms** dan **Status** untuk setiap game!

---

## ✨ New Fields

### 1. **Platforms** (Multi-select)
Pilih platform dimana game tersedia:
- ✅ Windows
- ✅ Android
- ✅ iOS
- ✅ Web

### 2. **Status** (Single-select)
Status development game:
- ✅ **Released** - Game sudah rilis
- ✅ **In Development** - Masih dalam pengembangan
- ✅ **Coming Soon** - Segera hadir

---

## 🎨 UI Preview

### Add Game Form:

```
┌─────────────────────────────┐
│ Add New Game                │
├─────────────────────────────┤
│ Game Title                  │
│ [Garage Go 2]               │
│                             │
│ Upload Image                │
│ [Choose File]               │
│ [Preview]                   │
│ [Upload to ImgBB]           │
│                             │
│ Image URL ✓                 │
│ [https://i.ibb.co/...]      │
│                             │
│ Platforms                   │
│ ☑ Windows  ☑ Android        │
│ ☐ iOS      ☐ Web            │
│                             │
│ Status                      │
│ [Released ▼]                │
│  - Released                 │
│  - In Development           │
│  - Coming Soon              │
│                             │
│ [Add Game]                  │
└─────────────────────────────┘
```

### Game Card Display:

```
┌─────────────────────────┐
│  [Game Image]           │
│                         │
│  Garage Go 2            │
│  [windows] [android]    │
│  [RELEASED]             │
│                         │
│  [Delete]               │
└─────────────────────────┘
```

---

## 🚀 How to Use

### Add Game with Metadata:

```
1. Fill game title
   ↓
2. Upload image
   ↓
3. Select platforms (check boxes)
   - Windows ✓
   - Android ✓
   ↓
4. Select status
   - Released
   ↓
5. Click "Add Game"
   ↓
6. Game added with metadata! ✓
```

---

## 📊 Data Structure

### Game Interface:

```typescript
interface Game {
  id: string
  title: string
  image: string
  platforms?: string[]  // Optional
  status?: 'released' | 'development' | 'coming-soon'
}
```

### Example Data:

```json
{
  "id": "1234567890",
  "title": "Garage Go 2",
  "image": "https://i.ibb.co/xxx/image.webp",
  "platforms": ["windows", "android"],
  "status": "released"
}
```

---

## 🎨 Visual Indicators

### Platform Badges:
```css
[windows] [android] [ios] [web]
```
- Gray background
- Rounded corners
- Capitalized text

### Status Badges:

**Released**:
```
[RELEASED]
```
- 🟢 Green color
- Indicates game is live

**In Development**:
```
[IN DEVELOPMENT]
```
- 🔵 Blue color
- Indicates work in progress

**Coming Soon**:
```
[COMING SOON]
```
- 🟡 Yellow color
- Indicates future release

---

## 💻 Technical Details

### Platform Toggle:

```typescript
const handlePlatformToggle = (platform: string) => {
  setGamePlatforms(prev => 
    prev.includes(platform)
      ? prev.filter(p => p !== platform)  // Remove
      : [...prev, platform]               // Add
  )
}
```

### Add Game with Metadata:

```typescript
const newGame: Game = {
  id: Date.now().toString(),
  title: gameTitle,
  image: gameImage,
  platforms: gamePlatforms.length > 0 ? gamePlatforms : undefined,
  status: gameStatus,
}
```

### Display Platforms:

```tsx
{game.platforms && game.platforms.length > 0 && (
  <div className="item-platforms">
    {game.platforms.map(p => (
      <span key={p} className="platform-badge">{p}</span>
    ))}
  </div>
)}
```

### Display Status:

```tsx
{game.status && (
  <span className={`status-badge status-${game.status}`}>
    {game.status === 'released' ? 'Released' : 
     game.status === 'development' ? 'In Development' : 
     'Coming Soon'}
  </span>
)}
```

---

## 🎯 Use Cases

### Example 1: Released Game

```
Title: Garage Go
Platforms: Windows, Android
Status: Released

Result:
┌─────────────────────┐
│ Garage Go           │
│ [windows] [android] │
│ [RELEASED]          │
└─────────────────────┘
```

### Example 2: Game in Development

```
Title: Space Explorer
Platforms: Windows, iOS, Web
Status: In Development

Result:
┌─────────────────────────────┐
│ Space Explorer              │
│ [windows] [ios] [web]       │
│ [IN DEVELOPMENT]            │
└─────────────────────────────┘
```

### Example 3: Coming Soon

```
Title: Mystery Game
Platforms: (none selected)
Status: Coming Soon

Result:
┌─────────────────────┐
│ Mystery Game        │
│ [COMING SOON]       │
└─────────────────────┘
```

---

## 🎨 CSS Styling

### Checkbox Group:

```css
.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}
```

### Platform Badge:

```css
.platform-badge {
  padding: 0.25rem 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  font-size: 0.75rem;
  text-transform: capitalize;
}
```

### Status Badges:

```css
.status-released {
  background: rgba(34, 197, 94, 0.2);
  border: 1px solid rgba(34, 197, 94, 0.5);
  color: rgb(74, 222, 128);
}

.status-development {
  background: rgba(59, 130, 246, 0.2);
  border: 1px solid rgba(59, 130, 246, 0.5);
  color: rgb(96, 165, 250);
}

.status-coming-soon {
  background: rgba(251, 191, 36, 0.2);
  border: 1px solid rgba(251, 191, 36, 0.5);
  color: rgb(252, 211, 77);
}
```

---

## ✅ Features

### Platforms:
- ✅ Multi-select checkboxes
- ✅ Optional field
- ✅ Visual badges in list
- ✅ Flexible (can add more platforms)

### Status:
- ✅ Dropdown select
- ✅ Default: "Released"
- ✅ Color-coded badges
- ✅ Clear visual indicators

---

## 🔄 Backward Compatibility

### Old Games (without metadata):
```json
{
  "id": "123",
  "title": "Old Game",
  "image": "/img/game.png"
}
```
- Still works! ✅
- No platforms shown
- No status shown
- No errors

### New Games (with metadata):
```json
{
  "id": "456",
  "title": "New Game",
  "image": "https://i.ibb.co/xxx.webp",
  "platforms": ["windows", "android"],
  "status": "released"
}
```
- Full metadata displayed ✅
- Platform badges shown
- Status badge shown

---

## 🧪 Testing

### Test Scenarios:

**1. Add game with all platforms**
```
Title: Test Game 1
Platforms: Windows, Android, iOS, Web
Status: Released
Expected: All 4 platform badges + green status
```

**2. Add game with no platforms**
```
Title: Test Game 2
Platforms: (none)
Status: In Development
Expected: No platform badges + blue status
```

**3. Add game with mixed platforms**
```
Title: Test Game 3
Platforms: Windows, Android
Status: Coming Soon
Expected: 2 platform badges + yellow status
```

---

## 📝 Best Practices

### Platforms:
- ✅ Select all applicable platforms
- ✅ Don't select if not available
- ✅ Update when new platforms added

### Status:
- ✅ Use "Released" for live games
- ✅ Use "In Development" for WIP
- ✅ Use "Coming Soon" for announced games
- ✅ Update status when game releases

---

## 🚀 Future Enhancements

Potential additions:

- [ ] **Release Date** - Show when game released
- [ ] **Download Links** - Per-platform links
- [ ] **Game Description** - Short description
- [ ] **Screenshots** - Multiple images
- [ ] **Tags** - Genre, multiplayer, etc.
- [ ] **Rating** - User ratings
- [ ] **Price** - Free/Paid indicator

---

## 📊 Summary

### What's Added:
- ✅ **Platforms field** - Multi-select checkboxes
- ✅ **Status field** - Dropdown select
- ✅ **Visual badges** - Color-coded indicators
- ✅ **Backward compatible** - Old data still works

### Benefits:
- ✅ **More info** - Users know platform availability
- ✅ **Clear status** - Users know if game is released
- ✅ **Professional** - Better admin panel
- ✅ **Flexible** - Easy to extend

### Files Modified:
1. ✅ `app/admin/page.tsx` - Added fields & logic
2. ✅ `app/admin/admin.css` - Added badge styles

---

**Status**: ✅ Game metadata system ready!

**Test it**: Add a game with platforms and status! 🎮
