// ============================================================
// MixCode Post Generator — Alpine.js component
//
// Everything the page needs lives in one object below.
// Alpine binds HTML elements straight to these properties
// (via x-model, x-text, @click, etc. in index.html) so there
// is no manual getElementById / addEventListener wiring here.
// ============================================================

// Brand constants — not reactive, so they live outside the component.
const BRAND = {
  darkGradA: '#12578F',
  darkGradB: '#06304F',
  lightGradA: '#6DBCDA',
  lightGradB: '#A6E0F6',
  footerDark: '#06304F',
  footerLight: '#12578F',
};

const DEFAULT_WEBSITE = 'mix-code.com';
const DEFAULT_PHONE = '+201055775251';

function mixcodeApp() {
  return {
    // ---------------- Reactive state ----------------
    style: 'A',               // 'A' = Dark, 'B' = Light
    headline: '',              // single headline field — English or Arabic
    postContent: '',           // your own post text — merged directly into the AI prompt, verbatim
    useCloudBubble: false,     // optional: draw the headline inside a rounded bubble
    smoothFooter: true,        // optional: translucent fade-in footer vs. solid bar
    headlinePosition: 'center', // 'top' | 'center' | 'bottom'
    headlineColor: '',          // empty = use theme default; otherwise a CSS hex color
    headlineFont: 'Cairo',      // 'Cairo' | 'Tajawal' | 'Alexandria' | 'Almarai' | 'Inter' | 'Montserrat' | 'System'
    footerWebsite: DEFAULT_WEBSITE,
    footerPhone: DEFAULT_PHONE,
    copyLabel: 'Copy prompt',

    // Images are not reactive data (Alpine can't usefully track
    // HTMLImageElement mutation) — kept as plain instance properties.
    bgImage: null,
    logoWhiteImg: null,
    customLogoImg: null,       // set if the user uploads their own logo

    // ---------------- Lifecycle ----------------
    init() {
      this.logoWhiteImg = new Image();
      this.logoWhiteImg.src = typeof LOGO_WHITE_BASE64 !== 'undefined' ? LOGO_WHITE_BASE64 : 'assets/logo-white.png';

      // Redraw once each logo finishes loading.
      this.logoWhiteImg.onload = () => this.render();

      // Redraw when custom fonts are ready
      if (document.fonts) {
        document.fonts.ready.then(() => {
          this.render();
        });
      }

      // Canvas 2D context, grabbed once.
      this.canvas = this.$refs.canvas;
      this.ctx = this.canvas.getContext('2d');

      this.render();
    },

    // ---------------- Derived helpers ----------------
    get isDark() {
      return this.style === 'A';
    },

    // ---------------- User actions ----------------
    setStyle(s) {
      this.style = s;
      this.render();
    },

    resetFooter() {
      this.footerWebsite = DEFAULT_WEBSITE;
      this.footerPhone = DEFAULT_PHONE;
      this.render();
    },

    resetLogo() {
      this.customLogoImg = null;
      this.render();
    },

    onLogoUpload(event) {
      const file = event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          this.customLogoImg = img;
          this.render();
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    onBackgroundUpload(event) {
      const file = event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          this.bgImage = img;
          this.render();
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    // ---------------- AI prompt text ----------------
    // Merges your own post content directly into the prompt (verbatim,
    // not rewritten) so the image is grounded in what your post is
    // actually about, not a generic placeholder line.
    buildPrompt() {
      const content = this.postContent.trim();
      const contentLine = content
        ? `\n\nThe image should visually reflect this post content — use it to inform the scene, objects and mood (do not render this text as words in the image):\n"${content}"`
        : '\n\n[Add your post content on the left so the scene reflects it]';

      if (this.isDark) {
        return `Professional corporate studio photography, vertical 4:5 aspect ratio, deep navy blue background lighting (#12578F to #06304F gradient), high-end commercial photo style, grounded real-world hardware, dark polished environment, soft studio lighting, clean composition with negative space at top center for logo and headline overlay, negative space at bottom for footer bar, no artificial floating CGI artwork, no text, no watermarks, 4k${contentLine}`;
      }
      return `Professional corporate studio photography, vertical 4:5 aspect ratio, bright sky-blue gradient background lighting (#6DBCDA to #A6E0F6), modern minimal tech aesthetic, clean workstation layout, soft shadows, bright studio lighting, clean composition with negative space at top center for logo and headline overlay, negative space at bottom for footer bar, no artificial floating CGI artwork, no text, no watermarks, 4k${contentLine}`;
    },

    copyPrompt() {
      navigator.clipboard.writeText(this.buildPrompt()).then(() => {
        this.copyLabel = 'Copied!';
        setTimeout(() => { this.copyLabel = 'Copy prompt'; }, 1400);
      });
    },

    // ---------------- Download ----------------
    downloadPng() {
      const link = document.createElement('a');
      link.download = `mixcode-post-style${this.style}.png`;
      link.href = this.canvas.toDataURL('image/png');
      link.click();
    },

    // ---------------- Canvas drawing ----------------
    // Each drawX() function owns one visual layer. render() just
    // calls them in stacking order: background -> logo -> headline -> footer.
    render() {
      const ctx = this.ctx;
      const W = this.canvas.width;
      const H = this.canvas.height;
      ctx.clearRect(0, 0, W, H);

      this.drawBackground(ctx, W, H);
      this.drawLogo(ctx, W, H);
      this.drawHeadline(ctx, W, H);
      this.drawFooter(ctx, W, H);
    },

    drawBackground(ctx, W, H) {
      if (this.bgImage) {
        const img = this.bgImage;
        const scale = Math.max(W / img.width, H / img.height);
        const sw = W / scale, sh = H / scale;
        const sx = (img.width - sw) / 2, sy = (img.height - sh) / 2;
        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, W, H);

        // Subtle top scrim so the headline stays legible over a photo.
        const topGrad = ctx.createLinearGradient(0, 0, 0, 260);
        topGrad.addColorStop(0, this.isDark ? 'rgba(6,48,79,0.55)' : 'rgba(255,255,255,0.45)');
        topGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = topGrad;
        ctx.fillRect(0, 0, W, 260);
        return;
      }

      // No upload yet — show a brand-colored gradient placeholder.
      const g = ctx.createLinearGradient(0, 0, 0, H);
      if (this.isDark) {
        g.addColorStop(0, BRAND.darkGradA);
        g.addColorStop(1, BRAND.darkGradB);
      } else {
        g.addColorStop(0, BRAND.lightGradA);
        g.addColorStop(1, BRAND.lightGradB);
      }
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    },

    drawLogo(ctx, W, H) {
      const logo = this.customLogoImg ? this.customLogoImg : this.logoWhiteImg;

      if (!logo || !logo.complete || logo.naturalWidth === 0) return;

      const targetH = H * 0.11;
      const ratio = logo.naturalWidth / logo.naturalHeight;
      const targetW = targetH * ratio;
      const x = (W - targetW) / 2;
      const y = H * 0.035;
      ctx.drawImage(logo, x, y, targetW, targetH);
    },

    // Draws the single headline field either as plain bold text, or —
    // if "Cloud bubble" is checked — inside a rounded bubble outline.
    drawHeadline(ctx, W, H) {
      const text = this.headline.trim();
      if (!text) return;

      if (this.useCloudBubble) {
        this.drawHeadlineBubble(ctx, W, H, text);
      } else {
        this.drawHeadlinePlain(ctx, W, H, text);
      }
    },

    // Returns the Y centre for the headline based on the headlinePosition setting.
    // 'top'    → just below the logo zone  (~18 % from top)
    // 'center' → true vertical centre of the image
    // 'bottom' → just above the footer zone (~80 % from top)
    headlineY(H) {
      switch (this.headlinePosition) {
        case 'top': return H * 0.185;
        case 'bottom': return H * 0.80;
        default: return H * 0.50;   // 'center'
      }
    },

    // Returns the colour to use for the headline text.
    // If the user picked a custom colour it takes priority; otherwise
    // we fall back to the per-theme default.
    headlineTextColor() {
      if (this.headlineColor) return this.headlineColor;
      return this.isDark ? '#FFFFFF' : '#06304F';
    },

    // Returns the active font family stack for the headline
    getFontFamilyString() {
      const font = this.headlineFont || 'Cairo';
      if (font === 'System') {
        return '-apple-system, "Segoe UI", Arial, sans-serif';
      }
      return `"${font}", -apple-system, "Segoe UI", Arial, sans-serif`;
    },

    drawHeadlinePlain(ctx, W, H, text) {
      ctx.save();
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const fontSize = 52;
      const fontFam = this.getFontFamilyString();
      ctx.font = `800 ${fontSize}px ${fontFam}`;
      ctx.fillStyle = this.headlineTextColor();
      const y = this.headlineY(H);
      const maxWidth = W * 0.86;
      this.wrapText(ctx, text.toUpperCase(), W / 2, y, maxWidth, fontSize * 1.15);
      ctx.restore();
    },

    drawHeadlineBubble(ctx, W, H, text) {
      ctx.save();
      const fontFam = this.getFontFamilyString();
      ctx.font = `700 40px ${fontFam}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const paddingX = 36;
      const metrics = ctx.measureText(text);
      const bw = Math.min(metrics.width + paddingX * 2, W * 0.86);
      const bh = 70;
      const bx = (W - bw) / 2;
      // Centre the bubble vertically around the position chosen by the user.
      const by = this.headlineY(H) - bh / 2;

      ctx.fillStyle = this.isDark ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.85)';
      ctx.strokeStyle = this.isDark ? BRAND.lightGradA : BRAND.darkGradA;
      ctx.lineWidth = 3;
      this.roundRect(ctx, bx, by, bw, bh, bh / 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = this.headlineTextColor();
      ctx.fillText(text, W / 2, by + bh / 2 + 2);
      ctx.restore();
    },

    // Small text-wrapping helper shared by drawHeadlinePlain.
    wrapText(ctx, text, cx, cy, maxWidth, lineHeight) {
      const words = text.split(' ');
      const lines = [];
      let current = '';
      for (const w of words) {
        const test = current ? current + ' ' + w : w;
        if (ctx.measureText(test).width > maxWidth && current) {
          lines.push(current);
          current = w;
        } else {
          current = test;
        }
      }
      if (current) lines.push(current);

      const totalH = lines.length * lineHeight;
      const startY = cy - totalH / 2 + lineHeight / 2;
      lines.forEach((line, i) => ctx.fillText(line, cx, startY + i * lineHeight));
    },

    // Small rounded-rectangle helper shared by drawHeadlineBubble.
    roundRect(ctx, x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    },

    // Footer has two looks, both selectable via the "Smooth overlay"
    // checkbox: a soft gradient fade (matching the header scrim look),
    // or a solid brand-colored bar like a classic footer strip.
    drawFooter(ctx, W, H) {
      const barH = H * 0.064;
      const y = H - barH;
      const websiteText = this.footerWebsite.trim() || DEFAULT_WEBSITE;
      const phoneText = this.footerPhone.trim() || DEFAULT_PHONE;

      if (this.smoothFooter) {
        this.drawFooterSmooth(ctx, W, H, y, barH);
      } else {
        this.drawFooterSolid(ctx, W, H, y, barH);
      }

      ctx.font = '600 28px -apple-system, "Segoe UI", Arial, sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.textBaseline = 'middle';

      ctx.textAlign = 'left';
      ctx.fillText(websiteText, W * 0.065, y + barH / 2);

      ctx.textAlign = 'right';
      ctx.fillText(phoneText, W * 0.935, y + barH / 2);

      // Divider line, repositioned based on how wide each text is.
      const websiteWidth = ctx.measureText(websiteText).width;
      const phoneWidth = ctx.measureText(phoneText).width;
      const lineStartX = W * 0.065 + websiteWidth + 34;
      const lineEndX = W * 0.935 - phoneWidth - 34;

      if (lineEndX > lineStartX) {
        ctx.strokeStyle = 'rgba(255,255,255,0.55)';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(lineStartX, y + barH / 2);
        ctx.lineTo(lineEndX, y + barH / 2);
        ctx.stroke();
      }
    },

    // Smooth: a soft gradient that fades in from transparent, sitting
    // ON TOP of the background — same treatment as the top header scrim.
    drawFooterSmooth(ctx, W, H, y, barH) {
      const overlayColor = this.isDark ? '6, 48, 79' : '18, 87, 143';
      const fadeStart = y - H * 0.12; // long, gentle fade-in zone

      const grad = ctx.createLinearGradient(0, fadeStart, 0, H);
      grad.addColorStop(0, `rgba(${overlayColor}, 0.0)`);
      grad.addColorStop(0.55, `rgba(${overlayColor}, 0.45)`);
      grad.addColorStop(1, `rgba(${overlayColor}, 0.70)`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, fadeStart, W, H - fadeStart);
    },

    // Solid: a flat brand-colored bar, same as a classic footer strip.
    drawFooterSolid(ctx, W, H, y, barH) {
      ctx.fillStyle = this.isDark ? BRAND.footerDark : BRAND.footerLight;
      ctx.fillRect(0, y, W, barH);

      ctx.strokeStyle = this.isDark ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.35)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    },
  };
}