# 🌌 NGIDE - Game Development Studio Website

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC.svg)](https://tailwindcss.com/)

> **NGIDE** is a modern, responsive website for showcasing indie games and studio updates. Built with Next.js 15, React 18, and TypeScript, featuring a dark space-themed design with smooth animations and an intuitive admin panel.

## ✨ Features

### 🎮 **Game Showcase**
- **Interactive Game Carousel** - Smooth momentum-based scrolling with physics
- **Game Cards** - Beautiful hover effects with image zoom and responsive layout
- **Platform Badges** - Windows, Android, iOS, Web indicators
- **Status Indicators** - Released, In Development, Coming Soon with color coding

### 📰 **News & Updates**
- **Featured News Section** - Large hero news cards with image zoom effects
- **News List** - Compact news items with thumbnails and tags
- **Dynamic News Pages** - SEO-friendly URLs with rich content support
- **Tag System** - NEWS, UPDATE, EVENT, ANNOUNCEMENT with color coding

### 🛠️ **Admin Panel**
- **Game Management** - Add, edit, delete games with image preview
- **News Management** - Create and manage news articles with content editor
- **Direct URL Integration** - Paste Imgur URLs directly (no API needed)
- **Real-time Preview** - See changes instantly with live image preview

### 🎨 **Design & UX**
- **Dark Space Theme** - Modern black/gray color scheme with glow effects
- **Animated Background** - Interactive particle system with mouse response
- **Responsive Design** - Works perfectly on all device sizes
- **Smooth Animations** - Hover effects, transitions, and loading animations
- **Modern Typography** - Orbitron for headers, Poppins for body text

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18.x or higher
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ngide-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

### 🔑 **Admin Access**
- Go to `/admin`
- Password: `Budibudian_17`

## 📁 Project Structure

```
ngide-website/
├── app/                          # Next.js 15 App Router
│   ├── admin/                   # Admin panel pages
│   │   ├── page.tsx            # Admin dashboard
│   │   └── admin.css           # Admin styling
│   ├── globals.css             # Global styles & variables
│   ├── layout.tsx              # Root layout with metadata
│   ├── page.tsx                # Homepage
│   └── news/[slug]/            # Dynamic news pages
│       ├── page.tsx           # News detail page
│       └── news-detail.css    # News styling
├── components/                 # Reusable React components
│   ├── cards/                 # Card components
│   │   ├── GameCard.tsx       # Game display card
│   │   └── NewsCard.tsx       # News display card
│   ├── sections/              # Homepage sections
│   │   ├── HeroSection.tsx    # Landing hero
│   │   ├── GamesSection.tsx   # Games carousel
│   │   ├── NewsSection.tsx    # Featured news & list
│   │   ├── StudioSection.tsx  # Studio info & stats
│   │   └── ContactSection.tsx # Contact form
│   └── ui/                    # UI components
│       └── ClientOnlyWrapper.tsx # SSR wrapper
├── hooks/                     # Custom React hooks
│   ├── useGameCarousel.ts     # Game carousel logic with momentum
│   └── useScrollRestoration.ts # Scroll position memory
├── public/                    # Static assets
│   ├── img/                  # Game and news images
│   └── icons/                # Platform and UI icons
├── types/                    # TypeScript definitions
│   └── index.ts              # Game & News type definitions
└── package.json              # Dependencies & scripts
```

## 🛠️ Technology Stack

### **Frontend**
- **Next.js 15** - React framework with App Router
- **React 18** - UI library with hooks and concurrent features
- **TypeScript 5** - Type-safe JavaScript
- **CSS3** - Custom styling with CSS variables

### **Key Libraries**
- **Custom Canvas API** - Interactive particle background
- **Intersection Observer** - Scroll-triggered animations
- **LocalStorage API** - Client-side data persistence

### **Development Tools**
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## 🎯 Key Features Deep Dive

### **Game Carousel System**
- **Momentum Scrolling** - Physics-based drag behavior
- **Snap-to-Center** - Automatically centers on nearest card
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Touch Support** - Native mobile touch interactions
- **Center Detection** - Highlights center card

### **Admin Panel**
- **CRUD Operations** - Full create, read, update, delete for games and news
- **Image Management** - Direct URL paste from Imgur with preview
- **Form Validation** - Client-side validation with helpful hints
- **Edit Mode** - In-place editing with visual indicators
- **Real-time Updates** - Instant preview and feedback

### **News System**
- **Dynamic Routing** - SEO-friendly URLs (`/news/article-slug`)
- **Rich Content** - Support for multiple paragraphs and formatting
- **Tag Organization** - Color-coded categories (NEWS, UPDATE, EVENT, etc.)
- **Date Display** - Proper date formatting with fallback handling
- **Share Functionality** - Copy link feature with icons

## 🎨 Design System

### **Color Palette**
```css
:root {
  --bg-color: #000000;           /* Pure black background */
  --primary-text-color: #F0F0F0; /* Off-white text */
  --secondary-text-color: #A0A0A0; /* Light gray */
  --accent-glow: rgba(255, 255, 255, 0.7); /* Glow effect */
}
```

### **Typography**
- **Headers**: Orbitron (sci-fi gaming font)
- **Body**: Poppins (clean, readable sans-serif)
- **Responsive sizing** with rem units

### **Animations**
- **Hover Effects** - Card lift, image zoom, shadow
- **Smooth Transitions** - 0.3s-0.5s CSS transitions
- **Transform Animations** - translateY, scale effects
- **Loading Animations** - Fade-in with staggered timing

## 📊 Performance Features

- **Static Generation** - Fast initial page loads with Next.js
- **Image Optimization** - Responsive images with proper sizing
- **Code Splitting** - Automatic route-based code splitting
- **Caching Strategy** - Efficient browser caching
- **Bundle Optimization** - Minimal JavaScript bundle size

## 🔧 Configuration

### **Build Commands**
```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

### **No Environment Variables Required**
- **Zero configuration** needed for basic setup
- **Client-side only** - No server dependencies
- **Static export ready** - Can be deployed anywhere

## 🚢 Deployment Options

### **Vercel (Recommended)**
```bash
# Deploy to Vercel
vercel --prod
```

### **Netlify**
```bash
# Build settings:
# Build command: npm run build
# Publish directory: .next
```

### **Manual Hosting**
```bash
# Build for production
npm run build

# Serve the .next folder
npm start
```

## 📈 SEO & Accessibility

- **Meta Tags** - Proper title, description, and Open Graph
- **Semantic HTML** - Proper heading hierarchy (h1-h6)
- **Keyboard Navigation** - Full keyboard accessibility
- **Screen Reader Support** - ARIA labels and descriptions
- **Responsive Images** - Proper alt text and loading
- **Performance** - Fast loading for better SEO scores

## 🔒 Security Features

- **Admin Authentication** - Password-protected admin panel
- **Input Validation** - Client-side form validation
- **XSS Protection** - Sanitized content rendering
- **CSRF Protection** - Secure form handling

## 🧪 Content Management

### **Games Management**
- Add new games with title, image, platforms, and status
- Edit existing games in-place
- Delete games with confirmation
- Image preview before saving

### **News Management**
- Create news with title, image, content, and tags
- Rich text content with line break support
- Edit existing news with auto-population
- Tag-based organization

### **Image Workflow**
1. Upload image to [imgur.com](https://imgur.com)
2. Copy image URL
3. Paste URL in admin form
4. Preview shows automatically
5. Save with confidence

## 📚 API Reference

### **Admin Endpoints**
- `GET /admin` - Admin dashboard (protected)
- `POST /admin/login` - Admin authentication

### **Public Endpoints**
- `GET /` - Homepage
- `GET /news` - News listing page
- `GET /news/[slug]` - Individual news article

### **Data Storage**
- **localStorage** - Client-side data persistence
- **JSON format** - Human-readable data structure
- **Real-time updates** - Instant UI updates

## 🤝 Development Guidelines

### **Code Style**
- **TypeScript Strict** - Full type safety
- **ESLint Config** - Consistent code formatting
- **Component Structure** - Functional components with hooks
- **CSS Organization** - Modular stylesheets

### **Best Practices**
- **Responsive First** - Mobile-first development approach
- **Performance Focused** - Optimized animations and loading
- **Accessibility Minded** - WCAG compliance considerations
- **SEO Optimized** - Search engine friendly structure

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - Amazing React framework
- **Imgur** - Reliable image hosting service
- **Google Fonts** - Beautiful typography
- **Open Source Community** - Tools and inspiration

## 📞 Support & Contact

- **Admin Panel**: `/admin` (password: `Budibudian_17`)
- **Issues**: GitHub Issues
- **Documentation**: See `/SIMPLE_URL_UPLOAD_GUIDE.md` for image management

---

**⭐ Star this repo if you found it helpful!**

*Built with ❤️ by the NGIDE team*

