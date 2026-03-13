# Nabrok Group — Website

A static landing page for Nabrok Group showcasing company divisions, core values, testimonials, and contact information.

## Description

This repository contains a single-page static website that demonstrates a modern, polished corporate landing layout. The site includes:
- Hero / showcase area
- Sub-company cards and dedicated showcase panels
- Core values and feature highlights
- Testimonials carousel
- Interactive contact form (client-side simulated send)
- Reveal-on-scroll animations and subtle micro-interactions



## Tech stack

- HTML5
- Tailwind CSS (via CDN)
- Iconify (`iconify-icon` component)
- Vanilla JavaScript (`script.js`) — IntersectionObserver for scroll reveals and testimonial logic
- Custom styles in `styles.css`

## Run locally

Serve the folder using a lightweight HTTP server and open the site in your browser:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Notes

- If animations or reveal-on-scroll do not run, check the browser console for JS errors — an uncaught error earlier in the script can stop subsequent code (the project uses a guarded icon init to avoid that).


