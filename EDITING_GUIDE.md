# 📝 Ashour Mindset Website Editing Guide
*For Users with Zero Coding Experience*

This guide will help you easily edit your website content, replace images and videos, and customize your site without any technical knowledge. Everything is explained in simple, step-by-step instructions.

## 🎯 What You Can Edit

You can easily change:
- ✅ All text content on every page
- ✅ The hero video background
- ✅ All images throughout the website
- ✅ Contact information
- ✅ Service descriptions and pricing
- ✅ Blog posts and testimonials
- ✅ Colors and styling (basic changes)

---

## 📁 Understanding Your Website Files

Your website is organized in folders like this:
```
ashour-mindset/
├── index.html          ← Home page
├── about.html           ← About page  
├── services.html        ← Services page
├── blog.html            ← Blog page
├── testimonials.html    ← Testimonials page
├── contact.html         ← Contact page
└── assets/
    ├── videos/          ← Video files
    ├── images/          ← Image files
    └── icons/           ← Flag icons
```

**Important:** Always make a backup copy of your website folder before making changes!

---

## 📝 How to Edit Text Content

### Step 1: Open the HTML File
1. **Find the page you want to edit** (e.g., `index.html` for the home page)
2. **Right-click** on the file
3. **Select "Open with"** → **"Text Editor"** or **"Notepad"**

### Step 2: Find the Text You Want to Change
1. **Press Ctrl+F** (Windows) or **Cmd+F** (Mac) to open the search box
2. **Type a few words** from the text you want to change
3. **Press Enter** to find it in the file

### Step 3: Edit the Text
1. **Look for text between `>` and `<`** symbols
2. **Replace the old text** with your new text
3. **Keep the `>` and `<` symbols** exactly as they are

**Example:**
```html
<!-- BEFORE -->
<h1>Clarity Powers Momentum.</h1>

<!-- AFTER (your change) -->
<h1>Transform Your Mindset Today.</h1>
```

### Step 4: Save Your Changes
1. **Press Ctrl+S** (Windows) or **Cmd+S** (Mac)
2. **Keep the same file name** and location

---

## 🎬 How to Replace the Hero Video

The hero video is the background video on your home page.

### Step 1: Prepare Your New Video
1. **Video format:** MP4 (most compatible)
2. **Recommended size:** 1920x1080 (Full HD)
3. **Length:** 10-30 seconds (loops automatically)
4. **File size:** Under 50MB for fast loading

### Step 2: Replace the Video File
1. **Navigate to:** `ashour-mindset/assets/videos/`
2. **Delete or rename** the old `hero-placeholder.mp4`
3. **Copy your new video** into this folder
4. **Rename your video** to `hero-placeholder.mp4`

**That's it!** Your new video will automatically appear on the website.

### Alternative Method (Keep Original Name):
1. **Rename your video** to something like `my-hero-video.mp4`
2. **Copy it** to `ashour-mindset/assets/videos/`
3. **Open** `index.html` in a text editor
4. **Find this line:**
   ```html
   <source src="assets/videos/hero-placeholder.mp4" type="video/mp4">
   ```
5. **Change it to:**
   ```html
   <source src="assets/videos/my-hero-video.mp4" type="video/mp4">
   ```
6. **Save the file**

---

## 🖼️ How to Replace Images

### Step 1: Prepare Your New Images
1. **Image formats:** JPG, PNG, or WebP
2. **Recommended size:** 1200x800 pixels or larger
3. **File size:** Under 2MB each for fast loading

### Step 2: Replace Image Files
1. **Navigate to:** `ashour-mindset/assets/images/`
2. **See the current images:**
   - `about-placeholder.jpg` (About page photo)
   - `team-placeholder.jpg` (Team photo)
   - `client-placeholder.jpg` (Client photo)

### Step 3: Replace an Image
**Option A: Keep the Same Name (Easiest)**
1. **Delete** the old image (e.g., `about-placeholder.jpg`)
2. **Copy your new image** to the same folder
3. **Rename your new image** to the exact same name (`about-placeholder.jpg`)

**Option B: Use a New Name**
1. **Copy your new image** to `ashour-mindset/assets/images/`
2. **Open the HTML file** where the image appears
3. **Find the image reference:**
   ```html
   <img src="assets/images/about-placeholder.jpg" alt="About Ashour">
   ```
4. **Change the filename:**
   ```html
   <img src="assets/images/your-new-image.jpg" alt="About Ashour">
   ```
5. **Save the file**

### Common Image Locations:
- **Home page (`index.html`):** About section image
- **About page (`about.html`):** Personal photo, team photo
- **Services page (`services.html`):** Service-related images
- **Testimonials page (`testimonials.html`):** Client photos
- **Blog page (`blog.html`):** Article images

---

## 📞 How to Edit Contact Information

### Step 1: Open the Contact Page
1. **Open** `contact.html` in a text editor

### Step 2: Find and Update Contact Details
**Look for these sections and update with your information:**

**Email Address:**
```html
<!-- Find this -->
<a href="mailto:info@ashourmindset.com">info@ashourmindset.com</a>

<!-- Change to your email -->
<a href="mailto:your-email@example.com">your-email@example.com</a>
```

**Phone Number:**
```html
<!-- Find this -->
<a href="tel:+15551234567">+1 (555) 123-4567</a>

<!-- Change to your phone -->
<a href="tel:+1234567890">+1 (234) 567-8900</a>
```

**Address:**
```html
<!-- Find this -->
<p>123 Mindset Avenue, Suite 456<br>Dubai, UAE</p>

<!-- Change to your address -->
<p>Your Street Address<br>Your City, State ZIP</p>
```

**Business Hours:**
```html
<!-- Find this -->
<p>Monday-Friday: 9:00 AM - 6:00 PM EST</p>

<!-- Change to your hours -->
<p>Monday-Friday: 8:00 AM - 5:00 PM PST</p>
```

---

## 💼 How to Edit Services and Pricing

### Step 1: Open the Services Page
1. **Open** `services.html` in a text editor

### Step 2: Edit Service Information
**Find service sections that look like this:**
```html
<div class="bg-white rounded-lg shadow-lg p-8">
    <h3 class="text-2xl font-bold mb-4">Mindset Reset</h3>
    <p class="text-gray-600 mb-6">Break through limiting beliefs...</p>
    <div class="text-3xl font-bold text-coral mb-4">$297</div>
</div>
```

**To change:**
- **Service name:** Replace text between `<h3>` and `</h3>`
- **Description:** Replace text between `<p>` and `</p>`
- **Price:** Replace the number between `<div class="text-3xl...">` and `</div>`

### Step 3: Add or Remove Services
**To add a new service:**
1. **Copy an entire service block** (from `<div class="bg-white...">` to its closing `</div>`)
2. **Paste it** where you want the new service
3. **Edit the content** as described above

**To remove a service:**
1. **Find the service block** you want to remove
2. **Delete everything** from `<div class="bg-white...">` to its matching `</div>`

---

## 💬 How to Edit Testimonials

### Step 1: Open the Testimonials Page
1. **Open** `testimonials.html` in a text editor

### Step 2: Edit Existing Testimonials
**Find testimonial sections that look like this:**
```html
<div class="bg-white rounded-lg shadow-lg p-8">
    <div class="flex items-center mb-4">
        <img src="assets/images/client-placeholder.jpg" alt="Sarah Johnson" class="w-16 h-16 rounded-full mr-4">
        <div>
            <h4 class="font-bold">Sarah Johnson</h4>
            <p class="text-gray-600">CEO, TechStart</p>
        </div>
    </div>
    <p class="text-gray-700">"Ashour's coaching completely transformed..."</p>
</div>
```

**To change:**
- **Client photo:** Replace the image file (see image replacement section)
- **Client name:** Replace text between the first `<h4>` and `</h4>`
- **Client title:** Replace text between `<p class="text-gray-600">` and `</p>`
- **Testimonial text:** Replace text between the quotes in the last `<p>` section

### Step 3: Add New Testimonials
1. **Copy an entire testimonial block**
2. **Paste it** where you want the new testimonial
3. **Edit all the content** as described above
4. **Add a new client photo** to the `assets/images/` folder

---

## 📰 How to Edit Blog Posts

### Step 1: Open the Blog Page
1. **Open** `blog.html` in a text editor

### Step 2: Edit Existing Blog Posts
**Find blog post sections that look like this:**
```html
<article class="bg-white rounded-lg shadow-lg overflow-hidden">
    <img src="assets/images/blog-placeholder.jpg" alt="Blog post" class="w-full h-48 object-cover">
    <div class="p-6">
        <h3 class="text-xl font-bold mb-2">The Power of Mental Clarity</h3>
        <p class="text-gray-600 mb-4">Learn how mental clarity can transform...</p>
        <div class="flex justify-between text-sm text-gray-500">
            <span>5 min read</span>
            <span>Dec 15, 2024</span>
        </div>
    </div>
</article>
```

**To change:**
- **Blog image:** Replace the image file
- **Blog title:** Replace text between `<h3>` and `</h3>`
- **Blog excerpt:** Replace text between `<p class="text-gray-600...">` and `</p>`
- **Reading time:** Replace "5 min read" with your estimate
- **Date:** Replace "Dec 15, 2024" with your date

---

## 🎨 How to Change Colors (Basic)

### Step 1: Understanding the Color System
Your website uses these main colors:
- **Navy Blue:** `#243044` (headers, text)
- **Coral:** `#FF6A4D` (buttons, accents)
- **Teal:** `#3FD0C9` (secondary accents)
- **Light Gray:** `#FAF7F3` (backgrounds)

### Step 2: Change the Accent Color
1. **Open any HTML file** in a text editor
2. **Press Ctrl+F** and search for `#FF6A4D`
3. **Replace all instances** with your new color code
4. **Repeat for all HTML files**

**Popular color codes:**
- Red: `#E53E3E`
- Blue: `#3182CE`
- Green: `#38A169`
- Purple: `#805AD5`
- Orange: `#DD6B20`

---

## ⚠️ Important Tips and Warnings

### ✅ DO:
- **Always make a backup** before editing
- **Test your changes** by opening the HTML file in a web browser
- **Keep the same file structure** and folder organization
- **Use the same image formats** (JPG, PNG)
- **Save files with the same names** when replacing

### ❌ DON'T:
- **Don't delete** the `<` and `>` symbols
- **Don't change** file extensions (keep .html, .jpg, .mp4)
- **Don't move files** to different folders
- **Don't edit** the `src/main.js` file unless you know JavaScript
- **Don't change** the folder structure

### 🔧 If Something Breaks:
1. **Restore from your backup**
2. **Check for missing `<` or `>` symbols**
3. **Make sure file names match exactly**
4. **Verify images are in the correct folder**

---

## 🚀 Testing Your Changes

### Step 1: Preview Locally
1. **Double-click** on `index.html`
2. **It should open** in your web browser
3. **Navigate through all pages** to test
4. **Check that images and videos load**

### Step 2: Check on Mobile
1. **Press F12** in your browser (opens developer tools)
2. **Click the mobile icon** (usually top-left)
3. **Test different screen sizes**

### Step 3: Deploy Your Changes
Once you're happy with your changes:
1. **Upload your entire `ashour-mindset` folder** to your web hosting
2. **Or contact your web developer** to deploy the changes

---

## 📞 Need Help?

If you get stuck or need assistance:

1. **Make sure you have a backup** of your original files
2. **Try the change on a single page first** before applying to all pages
3. **Use the browser's "View Source"** to see how other websites structure their content
4. **Consider hiring a web developer** for complex changes

Remember: Small changes are safer than big ones. Make one change at a time and test it before moving on to the next change.

---

*This guide covers the most common editing tasks. For advanced customization, consider working with a web developer.*

