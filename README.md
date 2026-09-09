# MixCode Social Media Post Generator

## Overview

MixCode is a lightweight, offline‑first web tool that helps you create on‑brand social‑media post images. It lets you:

- **Enter a headline** and position it (top, center, bottom).
- **Pick a headline colour** (with a colour picker) and font (Arabic & English offline fonts).
- **Choose a style** (dark or light theme) with responsive gradients.
- **Add a logo** (default MixCode logo or upload your own).
- **Add a background image** (upload or use AI‑generated image prompt).
- **Preview the final canvas** in a sticky column that stays visible while scrolling.
- **Download the final PNG**.

All assets (fonts, logo) are bundled locally, so the app works without an internet connection.

## Getting Started

1. Open `index.html` in a modern browser (no server required).
2. Fill in the fields on the left column:
   - Headline text, position, colour, and font.
   - Footer website & phone (click **Reset to default** to restore).
3. Use the middle column to craft an AI image prompt or upload a background image.
4. The right‑hand column shows a live preview. Click **Download PNG** to save.

## Offline Fonts

The project ships the following fonts (stored in `assets/fonts/` and loaded via `@font-face`):

- **Cairo** – Bold Arabic/English
- **Tajawal** – Clean modern Arabic
- **Alexandria** – Geometric punchy
- **Almarai** – Corporate professional
- **Montserrat** – English marketing
- **Inter** – Silicon‑Valley UI

These fonts are fully offline; no external CDN is required.

## Customisation

- **Headline position** – toggle **Top**, **Center**, **Bottom**.
- **Headline colour** – any hex colour via the colour picker; click **Reset** to use the theme‑aware default.
- **Font family** – select any of the bundled fonts or fall back to system fonts.
- **Style** – switch between dark (A) and light (B) themes.
- **Footer** – enable "Smooth overlay" for a gradient fade or disable for a solid colour bar.

## Technical Details

- Built with **Alpine.js** for reactive UI.
- Canvas rendering is performed in `app.js` using the HTML5 Canvas 2‑D API.
- CSS grid implements a three‑column layout:
  - Left column: controls (panels 1‑3).
  - Middle column: AI prompt & background upload (panels 4‑5).
  - Right column: sticky preview (panel 6).
- The project uses a Service Worker and `manifest.json` **only when served over http/https**; they are ignored on `file://`.

## License

---
