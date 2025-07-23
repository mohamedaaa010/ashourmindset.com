# Booking Widget Guide

## Quick Start
1. Install **Node.js** (v18 or newer).
2. Run `npm install` in the repository root.
3. Build the widget with `npm run build:widget` (outputs to `dist/booking-widget.js`).

## HTML Embed Snippet
```html
<script src="/dist/booking-widget.js"
        data-locale="en"
        data-accent="#FF6A4D"
        data-bg="#243044"
        data-booking-url="https://your-booking-service.com"></script>
```
Override any of the `data-*` attributes to customize the widget.

## Required Environment Variables
Create a `.env` file with:
```
OPENAI_API_KEY=YOUR_KEY_HERE
BOOKING_API_URL=https://your-booking-service.com/api
BOOKING_API_KEY=YOUR_BOOKING_KEY
```

## Brand Compliance
The palette is defined in `src/style.css`:
```css
--clr-navy  : #243044;
--clr-coral : #FF6A4D;
--clr-aqua  : #3FD0C9;
--clr-white : #FAF7F3;
```
- Keep coral usage under roughly 15% of any page to preserve contrast.
- Stick to one accent color (coral) across the interface.

## Staging Deployment
Deploy the widget to a staging site (e.g., via Cloudflare Pages) so stakeholders can review changes before production. Share the staging URL with reviewers for feedback.
