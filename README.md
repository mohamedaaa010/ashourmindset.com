# Ashour Mindset Website

A professional multilingual website for Ashour's mindset coaching and performance optimization services.

## 🌟 Features

- **Multilingual Support**: English, German, and Arabic with RTL support
- **Responsive Design**: Mobile-first approach with optimized layouts for all devices
- **Hero Video Section**: Conditional video loading (desktop vs mobile) with fallback images
- **Interactive Elements**: Smooth scrolling, animations, and form validation
- **Accessibility**: WCAG 2.1 AA compliant with ARIA labels and keyboard navigation
- **Performance Optimized**: Fast loading with optimized assets and lazy loading

## 📁 Project Structure

```
ashour-mindset-final/
├── index.html              # Home page
├── about.html              # About page
├── services.html           # Services page
├── blog.html               # Blog page
├── testimonials.html       # Testimonials page
├── contact.html            # Contact page
├── assets/
│   ├── videos/
│   │   ├── hero-desktop.mp4    # Desktop hero video
│   │   └── hero-mobile.mp4     # Mobile hero video
│   ├── images/
│   │   ├── hero-fallback-desktop.png  # Desktop fallback image
│   │   ├── hero-fallback-mobile.png   # Mobile fallback image
│   │   └── [other images]
│   └── icons/
│       ├── uk-flag.png         # UK flag for English
│       ├── germany-flag.png    # German flag for Deutsch
│       └── egypt-flag.png      # Egypt flag for Arabic
├── i18n/
│   ├── en.json             # English translations
│   ├── de.json             # German translations
│   └── ar.json             # Arabic translations
├── src/
│   ├── main.js             # Main JavaScript functionality
│   └── style.css           # Custom CSS styles
├── tests/
│   ├── replace_location.js     # Node script for location replacement
│   └── test_address_cleaner.py # Pytest suite for address cleaner
└── tailwind.config.js      # Tailwind CSS configuration
```

## 🚀 Deployment Instructions

### Option 1: Cloudflare Pages (Recommended)

1. **Upload to GitHub:**
   - Create a new repository on GitHub
   - Upload all files from this folder to the repository

2. **Deploy to Cloudflare Pages:**
   - Go to [dash.cloudflare.com](https://dash.cloudflare.com/)
   - Navigate to Pages → Create a project
   - Connect to your GitHub repository
   - Build settings: Leave empty (static site)
   - Deploy

3. **Custom Domain (Optional):**
   - In Cloudflare Pages, go to Custom domains
   - Add your domain and follow DNS instructions

### Option 2: Traditional Web Hosting

1. Upload all files to your web server's public folder (usually `public_html` or `www`)
2. Ensure all file permissions are set correctly
3. Access your website via your domain

## 🎬 Hero Video Configuration

The website uses conditional video loading for optimal performance:

- **Desktop (screens ≥768px)**: `assets/videos/hero-desktop.mp4`
- **Mobile (screens <768px)**: `assets/videos/hero-mobile.mp4`
- **Fallback Images**: Displayed when videos can't load or for users with reduced motion preferences

## 🌍 Language Management

Text content is managed through JSON files in the `i18n/` folder:

- `en.json`: English content
- `de.json`: German content  
- `ar.json`: Arabic content

To edit text, modify the values in these JSON files without changing the keys.

## 📱 Mobile Optimization

This website prioritizes mobile experience with:

- Mobile-first responsive design
- Touch-friendly navigation
- Optimized video loading for mobile devices
- Fast loading times on slower connections

## 🛠️ Technical Stack

- **HTML5**: Semantic markup
- **Tailwind CSS**: Utility-first CSS framework
- **Vanilla JavaScript**: No external dependencies
- **Responsive Design**: Mobile-first approach
- **Accessibility**: WCAG 2.1 AA compliant

## 📦 Installation

1. Install **Node.js** (version 18 or later recommended).
2. Run `npm install` in the project root to install dependencies.
3. Copy `.env.example` to `.env` and add your OpenAI API key.
4. Use `npm run lint:translations` to verify translation files.

## 📞 Support

For technical support or customization requests, refer to the included `WEBSITE_MANAGEMENT_GUIDE.md` for detailed instructions on managing content without coding experience.

---

**Last Updated**: July 2025  
**Version**: 1.0.0

## Translation Consistency Test

```bash
# run full lint (requires OPENAI_API_KEY)
node scripts/checkTranslations.js
```

This script validates that all translation files are aligned. Ensure you have a
`.env` file with `OPENAI_API_KEY` (or set the variable in your environment) before
running it.

## Translation Quality Check

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env` and add your OpenAI API key.
3. Run `node test/checkTranslations.js`.

The script uses the OpenAI API for quality checking, so a valid API key is required.

