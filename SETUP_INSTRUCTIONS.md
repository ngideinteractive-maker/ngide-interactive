# 🚀 Setup Instructions - Ngide Interactive Next.js

## Quick Start (3 Steps)

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Run Development Server
```bash
npm run dev
```

### 3️⃣ Open Browser
Navigate to: **http://localhost:3000**

---

## 📦 What Gets Installed

Running `npm install` will install:
- **Next.js 15.0.3** - React framework
- **React 18.3.1** - UI library
- **TypeScript 5** - Type safety
- **ESLint** - Code quality

Total size: ~350MB (node_modules)

---

## 🎯 Available Commands

```bash
# Development (with hot reload)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

---

## 🌐 Access Points

- **Development**: http://localhost:3000
- **Production**: http://localhost:3000 (after build)

---

## ✅ Verification Checklist

After running `npm run dev`, verify:

- [ ] Page loads at localhost:3000
- [ ] Interactive space background works
- [ ] Game carousel is draggable
- [ ] All sections visible
- [ ] Form inputs work
- [ ] Footer links present
- [ ] No console errors

---

## 🐛 Common Issues & Fixes

### Issue: "npm: command not found"
**Solution**: Install Node.js from https://nodejs.org/

### Issue: Port 3000 already in use
**Solution**: 
```bash
npm run dev -- -p 3001
```

### Issue: Module not found errors
**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: TypeScript errors
**Solution**: These are warnings, site will still run. Fix them gradually.

---

## 📁 Important Files

- `app/page.tsx` - Main homepage
- `app/layout.tsx` - Root layout
- `app/globals.css` - All styles
- `components/` - All React components
- `hooks/` - Custom React hooks
- `public/` - Static assets (images, icons)

---

## 🎨 Customization Quick Guide

### Change Colors
Edit `app/globals.css`:
```css
:root {
  --bg-color: #000000;
  --primary-text-color: #F0F0F0;
}
```

### Add New Section
1. Create `components/sections/YourSection.tsx`
2. Import in `app/page.tsx`
3. Add to page

### Change Content
- Games: `components/sections/GamesSection.tsx`
- News: `components/sections/NewsSection.tsx`
- Studio: `components/sections/StudioSection.tsx`

---

## 🚀 Ready to Deploy?

### Vercel (Easiest)
```bash
npm i -g vercel
vercel
```

### Manual Deploy
```bash
npm run build
# Upload .next/ and public/ folders
```

---

**Need help? Check MIGRATION_GUIDE.md for detailed info!**
