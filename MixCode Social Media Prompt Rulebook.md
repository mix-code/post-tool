---
type: inbox
item_type: note
created:
  "{ date }":
processed: false
---
# MixCode Social Media — AI Image Prompt Rulebook

## 1. Brand Colors



---

## 2. Alternation Rule (STRICT)

Posts alternate every time, no exceptions:

```
Post 1 → Style A (Dark)
Post 2 → Style B (Light)
Post 3 → Style A (Dark)
Post 4 → Style B (Light)
...
```

**Tracker:** keep a running count. Odd-numbered post = Dark. Even-numbered post = Light. 👉 Tell me the number of your last posted image and I'll tell you which style is next — or use the tracker artifact below.

---

## 3. Fixed Layout Rules (apply to every post, both styles)

1. **Top:** MIXCODE logo + wordmark, centered, top ~15% of canvas.
2. **Upper-middle:** English headline (bold, large, brand color contrasting the background) — this is the topic/hook of the post. Short and punchy, 3-6 words (e.g. "Why Web Design Matters", "The Power of Branding").
3. **Center / main body:** the visual concept — changes per post topic (see prompt template below).
4. **Footer (bottom strip, ~5% height):**
    - Left: `Mix-code.com`
    - Right: `+201055775251`
    - Thin horizontal line connecting/separating them from the image body, white or light text on brand-colored strip.

⚠️ **Reality check on AI text rendering:** English renders far more reliably than Arabic in Midjourney/DALL-E/Ideogram, but it's still not perfect — logos especially will rarely come out right, and short headlines can still have typos or odd kerning. Best practice:

- You _can_ try including the English headline directly in the AI prompt (see template below) since English text generation has gotten good.
- Always generate the logo and footer separately/overlay them — AI will not reproduce your exact MIXCODE logo correctly.
- Always double-check the generated headline text for typos before posting — AI still occasionally misspells words even in English.
- If quality is inconsistent, fall back to: AI generates the background + scene only (no text), and a template (Canva or the HTML option below) adds logo + headline + footer with 100% accuracy every time.

---

## 4. Visual Realism & Layout Rules
### Layout Overlay Template (Top to Bottom) 

1. **Top Center (~15% height):** `MIXCODE` icon + wordmark centered with high clarity. 
2. **Upper Center:** Arabic text inside a light cloud/rounded container with blue border. 
3. **Center Body:** Studio photography featuring physical hardware, neat cables, and desk setups. 
4. **Bottom Footer Bar (~5% height):** - Left: `Mix-code.com` - Center/Dividers: Thin horizontal white lines extending outward - Right: `+201055775251` 
### Realism Mandate ("Less AI" Style) 
- **Avoid:** Floating 3D gears, fake holographic symbols, glowing robotic arms, sci-fi particles, or overly saturated CGI artwork. 
- **Enforce:** Real photography aesthetic — clean server racks, organized cabling, physical glass desks, modern laptops displaying realistic code editors, soft studio lighting, and natural depth-of-field blur.

## 5. Prompt Template
Use this structure for every AI image generation. Copy, fill the `[brackets]`, paste into Midjourney/DALL-E/Ideogram.

### Style A — Dark Mode Prompt (4:5 Portrait)

```txt
Professional corporate studio photography, vertical 4:5 aspect ratio, deep navy blue background lighting (#12578F to #06304F gradient), [CENTER VISUAL CONCEPT], high-end commercial photo style, grounded real-world hardware, dark polished environment, soft studio lighting, clean composition with negative space at top center for logo and headline overlay, negative space at bottom for footer bar, no artificial floating CGI artwork, no text, no watermarks, 4k
```

### Style B — Light Mode Prompt

```
Professional corporate studio photography, vertical 4:5 aspect ratio, bright sky-blue gradient background lighting (#6DBCDA to #A6E0F6), [CENTER VISUAL CONCEPT], modern minimal tech aesthetic, clean workstation layout, soft shadows, bright studio lighting, clean composition with negative space at top center for logo and headline overlay, negative space at bottom for footer bar, no artificial floating CGI artwork, no text, no watermarks, 4k
```

> If the AI struggles to render `[HEADLINE]` cleanly, drop that line entirely and add the headline afterward in Canva/HTML template instead — background-only prompts are always more reliable.

### [CENTER VISUAL CONCEPT] and [HEADLINE] — examples by topic

|Post Topic|Headline (English)|Visual Concept to insert|
|---|---|---|
|Web design services|"Why Web Design Matters"|laptop displaying code editor and website mockup, coffee cup, floating UI panels|
|Branding/identity|"The Power of Branding"|notebook, business cards, pens, letterhead paper arranged flat-lay|
|App development|"Build Your App Right"|smartphone mockup with app UI, floating icons, laptop in background|
|SEO/marketing|"Get Found Online"|growth chart, magnifying glass over analytics dashboard, laptop|
|Social media management|"Grow Your Audience"|phone showing social feed mockups, engagement icons floating|
|E-commerce|"Sell Smarter Online"|laptop/phone showing online store UI, shopping bag icon, credit card|
|Team/company culture|"Meet the Team Behind It"|modern office desk setup, multiple devices, coffee, notebook|

---

## 5. Post-Generation Checklist (before publishing)

- [ ] Correct style (A/B) per alternation order
- [ ] Logo placed top-center, correct size, not distorted
- [ ] English headline correct, no spelling errors, brand color, good contrast against background
- [ ] Footer has website (left) + phone (right), correct contact info
- [ ] Overall canvas ratio matches platform (1080x1350 IG portrait / 1080x1080 square / 1080x1920 story)
- [ ] Colors match hex codes in Section 1 (no color drift from AI generation)
- [ ] Correct Style (A/B) applied according to post order.
- [ ] Image ratio set to vertical **4:5 (1080x1350)** for social feed.
- [ ] No fake/floating CGI art; scene looks like clean commercial studio photography.
- [ ] Logo centered at top.
- [ ] Arabic title properly encased in the cloud/rounded bubble element.
- [ ] Footer line matches format (`Mix-code.com` | `+201055775251`).
---

## 6. Suggested Next Step

Since AI models still can't reliably render your exact logo (and headline text is hit-or-miss even in English), the most "automated" real workflow is:

1. AI generates the background scene only (prompts above, optionally with the headline attempt included).
2. A fixed template (Canva brand kit, or an HTML template I build for you) drops in logo + headline + footer automatically, using your exact hex codes — so every post is 100% on-brand with zero manual design skill needed, and zero risk of typos or a broken logo.

If you want, I can build that HTML template now so you literally just paste in the English headline text and topic, and get a finished post image every time.