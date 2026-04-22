# Gonasell — Production Studio Website

## Project
One-page website for Gonasell, a Lithuanian production studio specializing in e-commerce photography, social media content, weddings, and music videos.

## Stack
- Pure HTML/CSS/JS (no frameworks)
- Fonts: Bebas Neue (Google Fonts) + General Sans (Fontshare)
- All images in WebP format (80% quality)

## Design Source
Figma: https://www.figma.com/design/VWksrX92jjo5Ubtr6PXumI/Gonasell?node-id=1-224

## Colors
- Red: `#FF371E`
- Black: `#0A0A0A`
- White: `#FFFFFF`
- Grey: `#CCCCCC`
- Dark Grey: `#929292`
- Grey 3: `#7E7E7E`

## Structure
```
index.html          — Full page (header, hero, logos, services, team, footer)
css/style.css       — All styles + responsive (768px, 1024px breakpoints)
js/main.js          — Hero slider, mobile menu, service accordion, image carousel
images/             — All assets in WebP (heroes, team, services, logos, icons as SVG)
```

## Sections
1. **Header** — Fixed nav, logo, SERVICES/TEAM links, red CTA, mobile MENU toggle
2. **Hero Slider** — 5 slides, 5s auto-play, numbered pagination with progress bar
3. **Logo Bar** — 7 client logos, horizontal scroll on mobile
4. **Services** — Accordion (E-Commerce expanded by default with image carousel, Social Media, Weddings, Music Videos)
5. **Team** — 3 cards: Nedas (videographer), Lukas (photographer), Gabrielė (visual director)
6. **Footer** — Contact CTA, email/phone, social icons, giant GONASELL brand, copyright

## Deployment
- Production: https://www.gonasell.com (primary; `gonasell.com` redirects to www)
- Netlify project: glowing-fenglisu-4f7592 (free `nf_team_dev` plan)
- DNS registrar: Interneto Vizija (apex A → 75.2.60.5 + 99.83.190.102, www CNAME → glowing-fenglisu-4f7592.netlify.app)
- Deploy command: `netlify deploy --prod --dir=.`
