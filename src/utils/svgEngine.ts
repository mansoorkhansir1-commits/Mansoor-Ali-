import { LogoConcept, EditorSettings } from '../types';

/**
 * Dynamically synthesizes an updated SVG string based on EditorSettings.
 */
export function synthesizeCustomSvg(
  concept: LogoConcept,
  settings: EditorSettings
): string {
  const {
    brandName,
    slogan,
    fontFamily,
    fontSize,
    letterSpacing,
    fontWeight,
    gradientStart,
    gradientEnd,
    accentColor,
    textColor,
    iconScale,
    layout,
    showSparkles,
    sparkleCount,
    badgeShape,
  } = settings;

  const initials = (concept.monogramLetters || brandName.slice(0, 2) || 'LC').toUpperCase();

  // Pick stroke and font weights
  const strokeW = fontWeight === '800' ? 22 : fontWeight === '700' ? 20 : 16;
  const fontW = fontWeight || '700';

  // Gradient IDs
  const gradId = `studioGrad_${concept.id.replace(/[^a-zA-Z0-9]/g, '_')}`;
  const sparkId = `studioSpark_${concept.id.replace(/[^a-zA-Z0-9]/g, '_')}`;

  // Sparkle Elements
  const renderSparkles = () => {
    if (!showSparkles) return '';
    if (sparkleCount === 1) {
      return `
        <g transform="translate(162, 54)">
          <path d="M 0 -22 Q 0 0 22 0 Q 0 0 0 22 Q 0 0 -22 0 Q 0 0 0 -22 Z" fill="url(#${sparkId})" />
          <circle cx="0" cy="0" r="3.5" fill="#FFFFFF" />
        </g>
      `;
    }
    if (sparkleCount >= 2) {
      return `
        <g transform="translate(162, 54)">
          <path d="M 0 -22 Q 0 0 22 0 Q 0 0 0 22 Q 0 0 -22 0 Q 0 0 0 -22 Z" fill="url(#${sparkId})" />
          <circle cx="0" cy="0" r="3.5" fill="#FFFFFF" />
        </g>
        <g transform="translate(44, 166) scale(0.48)">
          <path d="M 0 -20 Q 0 0 20 0 Q 0 0 0 20 Q 0 0 -20 0 Q 0 0 0 -20 Z" fill="${accentColor}" />
        </g>
        ${sparkleCount >= 3 ? `<circle cx="188" cy="138" r="4" fill="${accentColor}" opacity="0.9" />` : ''}
        ${sparkleCount >= 4 ? `<circle cx="28" cy="80" r="3" fill="#FFFFFF" opacity="0.75" />` : ''}
      `;
    }
    return '';
  };

  // Badge Shapes
  const renderBadge = () => {
    if (badgeShape === 'circle') {
      return `<circle cx="250" cy="175" r="120" fill="none" stroke="url(#${gradId})" stroke-width="3" stroke-dasharray="8 6" opacity="0.5" />`;
    }
    if (badgeShape === 'squircle') {
      return `<rect x="135" y="60" width="230" height="230" rx="48" fill="none" stroke="url(#${gradId})" stroke-width="3.5" opacity="0.45" />`;
    }
    if (badgeShape === 'shield') {
      return `<path d="M 140 70 L 360 70 L 360 170 Q 360 270 250 300 Q 140 270 140 170 Z" fill="none" stroke="url(#${gradId})" stroke-width="3" opacity="0.4" />`;
    }
    if (badgeShape === 'octagon') {
      return `<polygon points="180,60 320,60 370,110 370,240 320,290 180,290 130,240 130,110" fill="none" stroke="url(#${gradId})" stroke-width="3" opacity="0.5" />`;
    }
    return '';
  };

  // Stacked Layout
  if (layout === 'stacked') {
    const scale = iconScale;
    const iconTranslateX = 250 - 105 * scale;
    const iconTranslateY = 175 - 105 * scale;

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${gradientStart}" />
      <stop offset="100%" stop-color="${gradientEnd}" />
    </linearGradient>
    <linearGradient id="${sparkId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${accentColor}" />
      <stop offset="100%" stop-color="${gradientEnd}" />
    </linearGradient>
  </defs>

  <!-- Ambient light aura -->
  <circle cx="250" cy="175" r="${110 * scale}" fill="url(#${gradId})" opacity="0.14" />
  
  ${renderBadge()}

  <!-- Icon Mark -->
  <g transform="translate(${iconTranslateX}, ${iconTranslateY}) scale(${scale})">
    <rect x="0" y="0" width="210" height="210" rx="46" fill="none" stroke="url(#${gradId})" stroke-width="3" opacity="0.3" stroke-dasharray="14 10" />
    
    <!-- Stylized Monogram L -->
    <path d="M 52 46 L 52 148 Q 52 165 69 165 L 140 165" 
          fill="none" stroke="url(#${gradId})" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round" />
          
    <!-- Stylized Monogram C -->
    <path d="M 166 74 Q 96 48 85 106 Q 74 164 148 165" 
          fill="none" stroke="url(#${gradId})" stroke-width="${strokeW - 2}" stroke-linecap="round" />
          
    ${renderSparkles()}
  </g>

  <!-- Typography -->
  <text x="250" y="370" text-anchor="middle" font-family="'${fontFamily}', sans-serif" font-size="${fontSize}" font-weight="${fontW}" fill="${textColor}" letter-spacing="${letterSpacing}">${brandName}</text>
  ${slogan ? `<text x="250" y="410" text-anchor="middle" font-family="'Inter', sans-serif" font-size="13" font-weight="600" fill="${accentColor}" letter-spacing="6">${slogan.toUpperCase()}</text>` : ''}
  
  <!-- Subtle accent divider -->
  <line x1="205" y1="432" x2="295" y2="432" stroke="url(#${gradId})" stroke-width="2" stroke-linecap="round" opacity="0.6" />
</svg>`;
  }

  // Horizontal Layout
  if (layout === 'horizontal') {
    const scale = iconScale * 0.85;

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${gradientStart}" />
      <stop offset="100%" stop-color="${gradientEnd}" />
    </linearGradient>
    <linearGradient id="${sparkId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${accentColor}" />
      <stop offset="100%" stop-color="${gradientEnd}" />
    </linearGradient>
  </defs>

  <!-- Icon Mark Left -->
  <g transform="translate(45, 160) scale(${scale})">
    <rect x="0" y="0" width="180" height="180" rx="42" fill="url(#${gradId})" />
    <text x="86" y="118" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="76" font-weight="800" fill="#FFFFFF" letter-spacing="2">${initials}</text>
    <g transform="translate(138, 42)">
      <path d="M 0 -16 Q 0 0 16 0 Q 0 0 0 16 Q 0 0 -16 0 Q 0 0 0 -16 Z" fill="${accentColor}" />
    </g>
  </g>

  <!-- Typography Right -->
  <g transform="translate(225, 235)">
    <text x="0" y="0" font-family="'${fontFamily}', sans-serif" font-size="${fontSize * 0.95}" font-weight="${fontW}" fill="${textColor}" letter-spacing="${letterSpacing}">${brandName}</text>
    ${slogan ? `<text x="2" y="34" font-family="'Inter', sans-serif" font-size="13" font-weight="600" fill="${accentColor}" letter-spacing="4">${slogan.toUpperCase()}</text>` : ''}
  </g>
</svg>`;
  }

  // Badge / Seal Layout
  if (layout === 'badge') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${gradientStart}" />
      <stop offset="100%" stop-color="${gradientEnd}" />
    </linearGradient>
    <linearGradient id="${sparkId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${accentColor}" />
      <stop offset="100%" stop-color="${gradientEnd}" />
    </linearGradient>
  </defs>

  <g transform="translate(135, 65)">
    <circle cx="115" cy="115" r="110" fill="none" stroke="url(#${gradId})" stroke-width="4.5" />
    <circle cx="115" cy="115" r="98" fill="none" stroke="url(#${gradId})" stroke-width="1.5" stroke-dasharray="6 4" />
    <circle cx="115" cy="115" r="85" fill="url(#${gradId})" opacity="0.12" />
    
    <text x="115" y="136" text-anchor="middle" font-family="'${fontFamily}', sans-serif" font-size="68" font-weight="900" fill="${textColor}" letter-spacing="2">${initials}</text>
    
    <!-- Top & bottom star accents -->
    <path d="M 115 34 Q 115 42 123 42 Q 115 42 115 50 Q 115 42 107 42 Q 115 42 115 34 Z" fill="${accentColor}" />
    <path d="M 115 178 Q 115 186 123 186 Q 115 186 115 194 Q 115 186 107 186 Q 115 186 115 178 Z" fill="${accentColor}" />
  </g>

  <text x="250" y="370" text-anchor="middle" font-family="'${fontFamily}', sans-serif" font-size="${fontSize}" font-weight="${fontW}" fill="${textColor}" letter-spacing="${letterSpacing}">${brandName}</text>
  ${slogan ? `<text x="250" y="410" text-anchor="middle" font-family="'Inter', sans-serif" font-size="13" font-weight="600" fill="${accentColor}" letter-spacing="6">${slogan.toUpperCase()}</text>` : ''}
</svg>`;
  }

  // Icon Only (App Icon / Favicon)
  if (layout === 'icon-only') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${gradientStart}" />
      <stop offset="100%" stop-color="${gradientEnd}" />
    </linearGradient>
    <linearGradient id="${sparkId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${accentColor}" />
      <stop offset="100%" stop-color="${gradientEnd}" />
    </linearGradient>
  </defs>

  <g transform="translate(100, 100)">
    <rect x="0" y="0" width="300" height="300" rx="72" fill="url(#${gradId})" />
    <circle cx="150" cy="150" r="120" fill="#090D16" opacity="0.3" />
    
    <!-- Stylized Monogram L & C -->
    <path d="M 90 76 L 90 205 Q 90 225 110 225 L 205 225" 
          fill="none" stroke="#FFFFFF" stroke-width="26" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 235 110 Q 148 76 135 152 Q 120 228 215 225" 
          fill="none" stroke="#FFFFFF" stroke-width="24" stroke-linecap="round" />
          
    <g transform="translate(230, 80)">
      <path d="M 0 -28 Q 0 0 28 0 Q 0 0 0 28 Q 0 0 -28 0 Q 0 0 0 -28 Z" fill="${accentColor}" />
      <circle cx="0" cy="0" r="4.5" fill="#FFFFFF" />
    </g>
  </g>
</svg>`;
  }

  return concept.svgContent;
}

/**
 * Downloads high resolution PNG (2000x2000px, 300 DPI)
 */
export async function downloadHighResPng(
  svgString: string,
  filename: string = 'logo.png',
  backgroundColor: string | null = null,
  size: number = 2000
): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const img = new Image();
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const URL = window.URL || window.webkitURL || window;
      const blobURL = URL.createObjectURL(svgBlob);

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }

        // If background requested (e.g. solid dark or light)
        if (backgroundColor && backgroundColor !== 'transparent') {
          ctx.fillStyle = backgroundColor;
          ctx.fillRect(0, 0, size, size);
        }

        // Draw image crisp
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, size, size);

        canvas.toBlob((pngBlob) => {
          if (!pngBlob) {
            reject(new Error('Failed to generate PNG blob'));
            return;
          }
          const pngUrl = URL.createObjectURL(pngBlob);
          const link = document.createElement('a');
          link.href = pngUrl;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(pngUrl);
          URL.revokeObjectURL(blobURL);
          resolve();
        }, 'image/png');
      };

      img.onerror = (err) => {
        URL.revokeObjectURL(blobURL);
        reject(err);
      };

      img.src = blobURL;
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Download vector SVG file
 */
export function downloadSvgFile(svgString: string, filename: string = 'logo.svg') {
  const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Download complete Brand Kit package JSON
 */
export function downloadBrandKitJson(concept: LogoConcept, settings: EditorSettings) {
  const brandKit = {
    brandName: settings.brandName,
    tagline: settings.slogan,
    generatedWith: 'LogoCraft AI (Gemini 3.8 Flash Vector Engine)',
    createdDate: new Date().toISOString(),
    typography: {
      primaryFont: settings.fontFamily,
      taglineFont: 'Inter',
      fontWeight: settings.fontWeight,
      letterSpacing: `${settings.letterSpacing}px`,
      googleFontsUrl: `https://fonts.google.com/specimen/${settings.fontFamily.replace(/\s+/g, '+')}`,
    },
    colorPalette: {
      gradientStart: settings.gradientStart,
      gradientEnd: settings.gradientEnd,
      accent: settings.accentColor,
      textColor: settings.textColor,
      backgroundColorDark: '#090D16',
      backgroundColorLight: '#FFFFFF',
    },
    cssVariables: `
:root {
  --brand-primary: ${settings.gradientStart};
  --brand-secondary: ${settings.gradientEnd};
  --brand-accent: ${settings.accentColor};
  --brand-font: '${settings.fontFamily}', sans-serif;
}
    `.trim(),
    vectorSvg: synthesizeCustomSvg(concept, settings),
    rationale: concept.rationale,
  };

  const jsonBlob = new Blob([JSON.stringify(brandKit, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(jsonBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${settings.brandName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-brand-kit.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
