# 🌐 Ashour Mindset Website Management Guide

This guide provides step-by-step instructions for managing your Ashour Mindset website without any coding or web development background. It covers how to change videos and images, edit and delete sections, and deploy your website using Cloudflare with your own custom domain.

---

## 🎬 Section 1: Changing the Hero Video and Fallback Image

Your website uses different videos for desktop and mobile views to ensure the best experience on all devices. It also has a fallback image that appears if the video can't load or while it's loading.

### **Understanding the Files:**

*   **`hero-desktop.mp4`**: This video is shown on larger screens (desktops, laptops).
*   **`hero-mobile.mp4`**: This video is shown on smaller screens (phones, tablets).
*   **`hero-fallback-zoomed.png`**: This image is displayed when the video is loading or if a user has a slow internet connection. It's a zoomed-in version of your professional portrait.

All these files are located in the `ashour-mindset/assets/videos/` and `ashour-mindset/assets/images/` folders within your website project.

### **Step-by-Step: Changing the Videos**

1.  **Prepare Your New Videos:**
    *   Choose two new video files: one for desktop and one for mobile. Make sure they are in **MP4 format**.
    *   For the desktop video, consider a wider shot that looks good on large screens.
    *   For the mobile video, a more vertical or centered shot that fits phone screens well is ideal.
    *   **Important:** Name your new desktop video file exactly `hero-desktop.mp4` and your new mobile video file exactly `hero-mobile.mp4`.

2.  **Access Your Website Files:**
    *   You will need to access the files on your web server or where your website project is stored. This usually involves using an FTP client (like FileZilla) or a file manager provided by your hosting company.
    *   Navigate to the `ashour-mindset/assets/videos/` folder.

3.  **Replace the Video Files:**
    *   **Backup First!** Before doing anything, make a copy of the existing `hero-desktop.mp4` and `hero-mobile.mp4` files and save them somewhere safe on your computer. This way, you can always revert if something goes wrong.
    *   Upload your new `hero-desktop.mp4` file to the `ashour-mindset/assets/videos/` folder. When prompted, choose to **overwrite** the existing file.
    *   Upload your new `hero-mobile.mp4` file to the `ashour-mindset/assets/videos/` folder. Again, choose to **overwrite** the existing file.

4.  **Verify the Change:**
    *   Open your website in a web browser on both a desktop computer and a mobile device.
    *   Clear your browser's cache (or open in an Incognito/Private window) to ensure you're seeing the latest version.
    *   You should now see your new videos playing in the hero section.

### **Step-by-Step: Changing the Fallback Image**

1.  **Prepare Your New Image:**
    *   Choose a new image file that you want to use as the fallback. A high-quality **PNG or JPG format** is recommended.
    *   **Important:** For the best results, try to crop or select an image that focuses on your face and upper body, similar to the current `hero-fallback-zoomed.png`.
    *   Name your new image file exactly `hero-fallback-zoomed.png`.

2.  **Access Your Website Files:**
    *   Using your FTP client or file manager, navigate to the `ashour-mindset/assets/images/` folder.

3.  **Replace the Image File:**
    *   **Backup First!** Make a copy of the existing `hero-fallback-zoomed.png` file and save it somewhere safe on your computer.
    *   Upload your new `hero-fallback-zoomed.png` file to the `ashour-mindset/assets/images/` folder. Choose to **overwrite** the existing file.

4.  **Verify the Change:**
    *   Open your website in a web browser.
    *   To test the fallback, you might need to simulate a slow connection (some browsers have developer tools for this) or temporarily rename the video files so they don't load.
    *   Clear your browser's cache.
    *   You should now see your new fallback image displayed when the video is not playing.

---



## 🖼️ Section 2: Changing Images in Other Sections

Your website has various images used throughout different sections, such as the About section, Testimonials, and potentially blog post thumbnails. Changing these images is similar to changing the hero fallback image.

### **Understanding Image Locations:**

Most of the images on your website are located in the `ashour-mindset/assets/images/` folder. Some images might be directly linked within the HTML files (`.html` files) or referenced in the CSS (`.css` files) for background images.

### **Step-by-Step: Changing an Image**

1.  **Identify the Image You Want to Change:**
    *   Open the website in your browser.
    *   Right-click on the image you want to change and select "Inspect" (or "Inspect Element"). This will open your browser's developer tools.
    *   In the developer tools, you'll see the HTML code. Look for an `<img>` tag or a CSS property like `background-image`.
    *   You will see a `src` attribute (for `<img>` tags) or a `url()` value (for `background-image`) that points to the image file (e.g., `assets/images/ashour-about.png`). This tells you the name and location of the image file.

2.  **Prepare Your New Image:**
    *   Choose a new image file. Ensure it's in a common web format like **PNG, JPG, or WebP**.
    *   **Important:** Resize your new image to be roughly the same dimensions as the original image to avoid layout issues. You can find the dimensions of the original image by right-clicking it on the website and selecting "Open image in new tab" or by checking its properties on your computer.
    *   Name your new image file **exactly the same** as the original image file you identified in Step 1 (e.g., if the original was `ashour-about.png`, name your new image `ashour-about.png`).

3.  **Access Your Website Files:**
    *   Using your FTP client or file manager, navigate to the folder where the original image is located (e.g., `ashour-mindset/assets/images/`).

4.  **Replace the Image File:**
    *   **Backup First!** Make a copy of the existing image file and save it somewhere safe on your computer.
    *   Upload your new image file to the same folder. Choose to **overwrite** the existing file.

5.  **Verify the Change:**
    *   Open your website in a web browser and navigate to the page where the image is located.
    *   Clear your browser's cache (or open in an Incognito/Private window).
    *   You should now see your new image displayed.

---



## ✂️ Section 3: Deleting and Editing Sections/Parts

This section explains how to remove or modify content blocks on your website. This requires a bit more care, as you'll be directly interacting with the website's structure (HTML).

### **Important Considerations:**

*   **Backup First!** Always make a copy of the `.html` file you are editing before making any changes. This is crucial for reverting if something goes wrong.
*   **HTML Structure:** Websites are built with HTML tags (like `<section>`, `<div>`, `<p>`, `<h1>`). Each section or part of your website is typically enclosed within a pair of opening and closing tags (e.g., `<section>...</section>`).
*   **Identifying Sections:** Your website's HTML is structured with comments (like `<!-- Hero Section -->` or `<!-- What We Offer -->`) to help you identify different sections easily.

### **Step-by-Step: Editing Text Content**

Most of the text content on your website is managed through the language files (`en.json`, `de.json`, `ar.json`) located in the `ashour-mindset/i18n/` folder. This is the easiest way to edit text without touching HTML.

1.  **Access Language Files:**
    *   Using your FTP client or file manager, navigate to the `ashour-mindset/i18n/` folder.
    *   Download the language file you want to edit (e.g., `en.json` for English).

2.  **Edit the JSON File:**
    *   Open the downloaded `.json` file using a simple text editor (like Notepad on Windows, TextEdit on Mac, or any code editor).
    *   You will see content organized in a `"key": "value"` format (e.g., `"hero.headline": "Clarity Powers Momentum."`).
    *   The `key` (e.g., `hero.headline`) identifies the piece of text, and the `value` (e.g., `Clarity Powers Momentum.`) is the actual text displayed on the website.
    *   **Carefully** change only the `value` (the text within the double quotes after the colon). Do not change the `key` or any other punctuation (commas, colons, braces, brackets).
    *   For example, to change the hero headline, you would find `"hero.headline": "Clarity Powers Momentum."` and change it to `"hero.headline": "Your New Awesome Headline."`

3.  **Upload and Verify:**
    *   Save the modified `.json` file.
    *   Upload the updated `.json` file back to the `ashour-mindset/i18n/` folder, overwriting the old one.
    *   Clear your browser cache and check your website. The text should now be updated.

### **Step-by-Step: Deleting a Section (e.g., a Service or Testimonial)**

This method involves editing the HTML file directly. Be very careful with this step.

1.  **Identify the HTML File:**
    *   Most content is on `index.html`, `about.html`, `services.html`, `testimonials.html`, etc.
    *   For services, you'll edit `services.html`.
    *   For testimonials, you'll edit `testimonials.html`.

2.  **Access the HTML File:**
    *   Using your FTP client or file manager, navigate to the `ashour-mindset/` folder.
    *   Download the relevant `.html` file (e.g., `services.html`).

3.  **Open and Locate the Section:**
    *   Open the downloaded `.html` file with a text editor.
    *   Scroll through the file and look for comments that indicate the start of sections, like `<!-- What We Offer -->` for services or `<!-- What Our Clients Say -->` for testimonials.
    *   Within these sections, individual items (like a single service offering or a single testimonial) are usually enclosed in `<div>` tags with specific classes. For example, a service item might look like:

        ```html
        <div class="bg-porcelain rounded-2xl p-8 hover:border-coral border-2 border-transparent transition-all duration-300 group">
            <!-- Content of the service item -->
            <h3 class="font-head font-bold text-xl text-navy mb-4">Mindset Reset</h3>
            <p class="text-gray-600 mb-6">Break through limiting beliefs and establish a foundation for sustainable growth and clarity.</p>
            <!-- More content -->
        </div>
        ```

4.  **Delete the Entire Block:**
    *   **Carefully select** the entire `<div>...</div>` block that corresponds to the service or testimonial you want to remove. Make sure you select from the opening `<div>` tag to its corresponding closing `</div>` tag.
    *   Delete the selected block of code.

5.  **Save, Upload, and Verify:**
    *   Save the modified `.html` file.
    *   Upload the updated `.html` file back to the `ashour-mindset/` folder, overwriting the old one.
    *   Clear your browser cache and check your website. The section should now be removed.

### **Step-by-Step: Editing a Section (More Advanced)**

If you want to change the structure or add new elements within a section, it's best to consult with someone who has HTML knowledge. However, for simple edits like reordering elements or changing basic styling (which is mostly handled by Tailwind CSS classes), you can try:

1.  **Locate the Section:** Follow steps 1-3 from "Deleting a Section" to find the HTML code for the section you want to edit.

2.  **Make Small Changes:**
    *   **Reordering:** You can cut and paste entire `<div>...</div>` blocks within a section to change their order.
    *   **Visibility:** To temporarily hide a section without deleting it, you can add `hidden` class to its main `<div>` or `<section>` tag. For example, `<section class="hidden">...</section>`.

3.  **Save, Upload, and Verify:**
    *   Save the modified `.html` file.
    *   Upload the updated `.html` file back to the `ashour-mindset/` folder, overwriting the old one.
    *   Clear your browser cache and check your website.

---



## ☁️ Section 4: Deploying on Cloudflare and Attaching Your Own Domain

This section will guide you through deploying your website on Cloudflare Pages and connecting it to your custom domain. Cloudflare Pages is a free hosting service that is excellent for static websites like yours, offering fast performance and global reach.

### **What You Need:**

1.  **Your Website Files:** The entire `ashour-mindset` folder containing all your HTML, CSS, JavaScript, and asset files.
2.  **A GitHub Account:** Cloudflare Pages integrates directly with GitHub for deployment.
3.  **A Custom Domain:** A domain name you already own (e.g., `yourwebsite.com`).
4.  **A Cloudflare Account:** If you don't have one, you'll need to create a free account.

### **Step-by-Step: Deploying Your Website to GitHub**

Cloudflare Pages deploys directly from a GitHub repository. So, the first step is to get your website files onto GitHub.

1.  **Create a New GitHub Repository:**
    *   Go to [github.com](https://github.com/) and log in to your account.
    *   Click the "+" sign in the top right corner and select "New repository."
    *   Give your repository a name (e.g., `ashour-mindset-website`).
    *   Choose "Public" or "Private" (Public is fine for a website).
    *   **Do NOT** initialize with a README, .gitignore, or license.
    *   Click "Create repository."

2.  **Upload Your Website Files to GitHub:**
    *   After creating the repository, GitHub will show you instructions. Look for the section that says "…or upload an existing file."
    *   Click on the link "upload an existing file."
    *   Drag and drop your entire `ashour-mindset` folder (or all its contents) into the upload area.
    *   Scroll down and click "Commit changes." This will upload all your website files to the repository.

### **Step-by-Step: Deploying to Cloudflare Pages**

1.  **Log in to Cloudflare:**
    *   Go to [dash.cloudflare.com](https://dash.cloudflare.com/) and log in.

2.  **Navigate to Pages:**
    *   On the Cloudflare dashboard, look for "Pages" in the left-hand navigation menu and click it.

3.  **Create a New Project:**
    *   Click "Create a project."
    *   Select "Connect to Git."
    *   Choose "GitHub" and authorize Cloudflare to access your GitHub account if you haven't already.

4.  **Select Your Repository:**
    *   From the list of repositories, select the GitHub repository you created for your website (e.g., `ashour-mindset-website`).
    *   Click "Begin setup."

5.  **Configure Build Settings:**
    *   **Project name:** (Optional) Give your project a name (e.g., `ashour-mindset`).
    *   **Production branch:** `main` (or `master`, depending on your GitHub setup).
    *   **Build command:** Leave empty (your website is static HTML/CSS/JS).
    *   **Build output directory:** Leave empty (or enter `/` if it asks for one).
    *   Click "Save and Deploy."

6.  **Deployment Process:**
    *   Cloudflare will now fetch your code from GitHub and deploy your website. This usually takes a few minutes.
    *   Once deployed, you will see a unique Cloudflare Pages URL (e.g., `your-project-name.pages.dev`). Your website is now live on this URL!

### **Step-by-Step: Attaching Your Custom Domain**

1.  **Add Your Domain to Cloudflare:**
    *   If your domain is not already managed by Cloudflare, you will need to add it. From the Cloudflare dashboard, click "Add a Site" and follow the instructions to add your domain and update your nameservers at your domain registrar.

2.  **Go to Custom Domains in Pages:**
    *   In your Cloudflare Pages project dashboard, click on the "Custom domains" tab.

3.  **Set up Your Domain:**
    *   Click "Set up a custom domain."
    *   Enter your custom domain (e.g., `yourwebsite.com`).
    *   Follow the instructions to add the necessary DNS records (usually a CNAME record for `www` and an A record for the root domain). Cloudflare will guide you through this process.

4.  **Verify and Activate:**
    *   Cloudflare will verify the DNS settings. This can take a few minutes to a few hours for DNS changes to propagate globally.
    *   Once verified, your custom domain will be active, and your website will be accessible via `yourwebsite.com`!

### **Updating Your Website After Deployment:**

*   **Make Changes Locally:** Edit your website files on your computer using the instructions in Sections 1, 2, and 3 of this guide.
*   **Commit to GitHub:** After making changes, you need to upload the updated files to your GitHub repository. If you are using the GitHub website, you can drag and drop the changed files and commit them.
*   **Automatic Deployment:** Cloudflare Pages is set up to automatically detect changes in your GitHub repository. Once you commit your changes to GitHub, Cloudflare Pages will automatically rebuild and redeploy your website, usually within a few minutes.

This means you only need to make changes to your files on your computer and push them to GitHub, and Cloudflare will handle the rest!

