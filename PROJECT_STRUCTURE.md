# 📁 Project Structure - Next.js 15

## 🌳 Complete Directory Tree

```
gktauiniapa/
│
├── 📁 app/                          # Next.js App Router
│   ├── layout.tsx                   # Root layout (fonts, metadata)
│   ├── page.tsx                     # Homepage (main entry)
│   └── globals.css                  # Global styles
│
├── 📁 components/                   # React Components
│   │
│   ├── 📁 canvas/
│   │   └── SpaceCanvas.tsx          # Interactive particle background
│   │
│   ├── 📁 cards/
│   │   └── GameCard.tsx             # Individual game card
│   │
│   ├── 📁 layout/
│   │   └── Footer.tsx               # Footer with nav & social links
│   │
│   ├── 📁 modals/
│   │   └── DevToolsModal.tsx        # Security warning modal
│   │
│   └── 📁 sections/
│       ├── HeroSection.tsx          # Landing hero
│       ├── GamesSection.tsx         # Game carousel
│       ├── NewsSection.tsx          # Latest news
│       ├── StudioSection.tsx        # About studio
│       ├── TechnologySection.tsx    # Tech stack
│       └── ContactSection.tsx       # Contact form
│
├── 📁 hooks/                        # Custom React Hooks
│   ├── useDevToolsProtection.ts     # DevTools detection & blocking
│   ├── useScrollRestoration.ts      # Remember scroll position
│   └── useGameCarousel.ts           # Carousel drag & snap logic
│
├── 📁 public/                       # Static Assets
│   ├── 📁 img/                      # Images
│   │   ├── garagego.png
│   │   └── studio.png
│   │
│   └── 📁 icons/                    # Platform icons
│       ├── windows.svg
│       ├── playstation.svg
│       └── xbox.svg
│
├── 📄 package.json                  # Dependencies & scripts
├── 📄 next.config.js                # Next.js configuration
├── 📄 tsconfig.json                 # TypeScript configuration
├── 📄 .gitignore                    # Git ignore rules
├── 📄 .eslintrc.json                # ESLint configuration
│
├── 📄 README.md                     # Project documentation
├── 📄 MIGRATION_GUIDE.md            # Migration from vanilla
├── 📄 SETUP_INSTRUCTIONS.md         # Quick setup guide
├── 📄 OLD_FILES_INFO.md             # Info about old files
├── 📄 PROJECT_STRUCTURE.md          # This file
│
└── 📁 old files (to be archived)
    ├── index.html                   # Original HTML
    ├── style.css                    # Original CSS
    └── script.js                    # Original JS
```

---

## 📂 Folder Purposes

### `/app` - Next.js App Router
- **Purpose**: Core Next.js pages and layouts
- **Key Files**:
  - `layout.tsx` - Wraps all pages, loads fonts
  - `page.tsx` - Homepage, imports all sections
  - `globals.css` - All CSS styles

### `/components` - Reusable Components
- **Purpose**: Modular, reusable React components
- **Organized by type**:
  - `canvas/` - Canvas-based components
  - `cards/` - Card components
  - `layout/` - Layout components (header, footer)
  - `modals/` - Modal dialogs
  - `sections/` - Page sections

### `/hooks` - Custom React Hooks
- **Purpose**: Reusable logic & side effects
- **Examples**:
  - State management
  - Event listeners
  - Browser APIs
  - Complex interactions

### `/public` - Static Files
- **Purpose**: Images, icons, fonts (served as-is)
- **Accessible**: Via `/img/...` or `/icons/...`
- **No processing**: Files served directly

---

## 🎯 Component Hierarchy

```
page.tsx
├── SpaceCanvas
├── DevToolsModal
├── HeroSection
├── GamesSection
│   └── GameCard (multiple)
├── NewsSection
├── StudioSection
├── TechnologySection
├── ContactSection
└── Footer
```

---

## 🔄 Data Flow

```
User Interaction
      ↓
Custom Hook (logic)
      ↓
Component State
      ↓
Re-render UI
```

**Example**: Game Carousel
1. User drags → `useGameCarousel` hook
2. Hook calculates position
3. Updates scroll position
4. Component re-renders smoothly

---

## 📝 File Naming Conventions

### Components
- **Format**: `PascalCase.tsx`
- **Examples**: `HeroSection.tsx`, `GameCard.tsx`

### Hooks
- **Format**: `useCamelCase.ts`
- **Examples**: `useDevToolsProtection.ts`

### Styles
- **Format**: `lowercase.css`
- **Examples**: `globals.css`

---

## 🎨 Styling Strategy

### Global Styles (`globals.css`)
- CSS Variables for theming
- Base styles (reset, typography)
- Section-specific styles
- Utility classes

### Component Styles
- Currently: Classes in global CSS
- Future: Can migrate to CSS Modules or Tailwind

---

## 🔧 Configuration Files

### `package.json`
- Dependencies list
- NPM scripts
- Project metadata

### `next.config.js`
- Next.js settings
- Image domains
- Build options

### `tsconfig.json`
- TypeScript compiler options
- Path aliases (`@/*`)
- Type checking rules

### `.eslintrc.json`
- Code quality rules
- Next.js recommended config

---

## 📦 Dependencies

### Production
- `next` - Framework
- `react` - UI library
- `react-dom` - React renderer

### Development
- `typescript` - Type safety
- `@types/*` - Type definitions
- `eslint` - Code linting

---

## 🚀 Build Output

After `npm run build`:
```
.next/
├── cache/           # Build cache
├── server/          # Server-side code
├── static/          # Static assets
└── ...
```

---

## 💡 Best Practices

### ✅ DO
- Keep components small & focused
- Use TypeScript types
- Follow naming conventions
- Comment complex logic
- Test before deploying

### ❌ DON'T
- Put logic in components (use hooks)
- Hardcode values (use variables)
- Ignore TypeScript errors
- Mix concerns in one file

---

## 🔍 Quick Navigation

**Need to edit**:
- **Content** → `components/sections/`
- **Styles** → `app/globals.css`
- **Logic** → `hooks/`
- **Images** → `public/img/`
- **Config** → Root config files

---

**This structure follows Next.js 15 best practices and is optimized for maintainability!**
