# Migration Guide: Vanilla HTML → Next.js 15

## 📋 Overview

Project ini telah berhasil di-convert dari vanilla HTML/CSS/JS ke **Next.js 15** dengan TypeScript.

## 🗂️ File Structure Comparison

### Before (Vanilla)
```
gktauiniapa/
├── index.html          # Single HTML file
├── style.css           # Global CSS
├── script.js           # Vanilla JavaScript
└── public/
    └── img/
```

### After (Next.js 15)
```
gktauiniapa/
├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/
│   ├── canvas/
│   ├── cards/
│   ├── layout/
│   ├── modals/
│   └── sections/
├── hooks/
│   ├── useDevToolsProtection.ts
│   ├── useScrollRestoration.ts
│   └── useGameCarousel.ts
├── public/
│   ├── img/
│   └── icons/
├── package.json
├── next.config.js
└── tsconfig.json
```

## 🔄 What Changed

### 1. HTML → React Components
- `index.html` → Split into multiple React components
- Each section now has its own component file
- Better code organization and reusability

### 2. CSS → Global CSS + Component Styles
- `style.css` → `app/globals.css`
- All styles preserved, now imported in layout
- CSS variables maintained for consistency

### 3. JavaScript → TypeScript + React Hooks
- `script.js` → Custom hooks in `hooks/` folder
- Vanilla JS logic converted to React patterns
- Type-safe with TypeScript

### 4. Features Preserved
✅ Interactive space canvas background
✅ Game carousel with drag & snap
✅ DevTools protection modal
✅ Scroll position restoration
✅ Smooth scroll animations
✅ Form validation
✅ Responsive design

## 🚀 Getting Started

### Step 1: Install Dependencies
```bash
npm install
```

This will install:
- Next.js 15.0.3
- React 18.3.1
- TypeScript 5
- ESLint

### Step 2: Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Step 3: Build for Production
```bash
npm run build
npm start
```

## 📁 Old Files

Old vanilla files have been kept for reference:
- `index.html` (original)
- `style.css` (original)
- `script.js` (original)

**You can safely delete these after verifying the Next.js version works correctly.**

## 🔧 Configuration Files

### package.json
- Contains all dependencies
- Scripts for dev, build, start, lint

### next.config.js
- Next.js configuration
- Image domains configured

### tsconfig.json
- TypeScript configuration
- Path aliases set up (@/*)

## 🎯 Key Improvements

### 1. Performance
- ⚡ Server-side rendering (SSR)
- ⚡ Automatic code splitting
- ⚡ Image optimization with next/image
- ⚡ Font optimization with next/font

### 2. Developer Experience
- 🔥 Hot module replacement
- 🔥 TypeScript type safety
- 🔥 Better error messages
- 🔥 Component-based architecture

### 3. SEO
- 📈 Better meta tags management
- 📈 Automatic sitemap generation
- 📈 Server-side rendering

### 4. Maintainability
- 📦 Modular component structure
- 📦 Reusable custom hooks
- 📦 Type-safe props
- 📦 Better code organization

## 🐛 Troubleshooting

### Issue: Module not found
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

### Issue: Port already in use
```bash
# Use different port
npm run dev -- -p 3001
```

### Issue: TypeScript errors
```bash
# Check tsconfig.json
# Run type check
npm run build
```

## 📝 Component Guide

### Adding New Section
1. Create component in `components/sections/`
2. Import in `app/page.tsx`
3. Add styles in `app/globals.css`

Example:
```tsx
// components/sections/NewSection.tsx
'use client'

export default function NewSection() {
  return (
    <section id="new" className="content-section">
      <div className="container">
        <h2>New Section</h2>
      </div>
    </section>
  )
}
```

### Using Custom Hooks
```tsx
import { useDevToolsProtection } from '@/hooks/useDevToolsProtection'

export default function MyComponent() {
  const { showModal } = useDevToolsProtection()
  // ...
}
```

## 🌐 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms
1. Build: `npm run build`
2. Upload `.next` folder + `public` folder
3. Set start command: `npm start`

## ✅ Checklist

Before going live:
- [ ] Test all pages and sections
- [ ] Verify images load correctly
- [ ] Test form submissions
- [ ] Check mobile responsiveness
- [ ] Test DevTools protection
- [ ] Verify scroll animations
- [ ] Test game carousel
- [ ] Check all links
- [ ] Test on different browsers
- [ ] Run `npm run build` successfully

## 🆘 Need Help?

If you encounter issues:
1. Check console for errors
2. Verify all dependencies installed
3. Clear `.next` cache
4. Check Next.js documentation
5. Review component imports

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Migration completed successfully! 🎉**

Your website is now powered by Next.js 15 with all features preserved and enhanced.
