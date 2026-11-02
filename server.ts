import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = Number(process.env.PORT || 3000);
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '15mb' }));

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

interface GenerateLogoRequest {
  businessName: string;
  slogan?: string;
  style?: string;
  industry?: string;
  colorPalette?: {
    name: string;
    primary: string;
    secondary: string;
    accent: string;
    gradientStart?: string;
    gradientEnd?: string;
  };
  preferredSymbol?: string;
  monogramInitials?: string;
}

// Helper to sanitize and validate SVG
function sanitizeSvg(rawSvg: string): string {
  let cleaned = rawSvg.trim();
  // Strip code fences if present
  cleaned = cleaned.replace(/^```(xml|svg)?/gi, '').replace(/```$/g, '').trim();
  
  // Find <svg ... </svg>
  const svgStart = cleaned.indexOf('<svg');
  const svgEnd = cleaned.lastIndexOf('</svg>');
  
  if (svgStart !== -1 && svgEnd !== -1) {
    cleaned = cleaned.substring(svgStart, svgEnd + 6);
  }
  
  // Ensure xmlns and viewBox
  if (!cleaned.includes('xmlns=')) {
    cleaned = cleaned.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  if (!cleaned.includes('viewBox=')) {
    cleaned = cleaned.replace('<svg', '<svg viewBox="0 0 500 500"');
  }
  
  return cleaned;
}

// Fallback generator for instantaneous, ultra-high quality SVG logos
function createFallbackConcepts(req: GenerateLogoRequest) {
  const name = req.businessName || 'LogoCraft';
  const slogan = req.slogan || 'Next-Gen Brand Studio';
  const initials = (req.monogramInitials || name.split(/\s+/).map(w => w[0]).join('').slice(0, 2)).toUpperCase() || 'LC';
  const c1 = req.colorPalette?.gradientStart || '#2563EB';
  const c2 = req.colorPalette?.gradientEnd || '#7C3AED';
  const accent = req.colorPalette?.accent || '#38BDF8';

  return [
    {
      id: 'concept-1-signature',
      name: 'Signature LC Radiant Monogram',
      styleCategory: 'Monogram & Gradient',
      rationale: 'Clean geometric monogram intertwining the initials with an 8-point creative sparkle, illuminated by a modern blue-to-purple gradient.',
      colors: [c1, c2, accent, '#FFFFFF'],
      fontFamily: 'Outfit',
      tagline: slogan,
      layoutType: 'stacked',
      monogramLetters: initials,
      svgContent: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <linearGradient id="sigGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c1}" />
      <stop offset="100%" stop-color="${c2}" />
    </linearGradient>
    <linearGradient id="sparkleGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8" />
      <stop offset="100%" stop-color="#A855F7" />
    </linearGradient>
    <filter id="glow1" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <!-- Ambient backdrop subtle glow -->
  <circle cx="250" cy="180" r="110" fill="url(#sigGrad1)" opacity="0.12" />
  
  <!-- Modern Interlocking LC Monogram -->
  <g transform="translate(145, 70)">
    <!-- Base geometric shield/ring outline -->
    <rect x="0" y="0" width="210" height="210" rx="44" fill="none" stroke="url(#sigGrad1)" stroke-width="4" opacity="0.3" stroke-dasharray="12 8" />
    
    <!-- Outer stylized letter 'L' -->
    <path d="M 45 42 L 45 152 Q 45 168 62 168 L 135 168" 
          fill="none" stroke="url(#sigGrad1)" stroke-width="22" stroke-linecap="round" stroke-linejoin="round" />
          
    <!-- Inner dynamic letter 'C' intertwining -->
    <path d="M 165 72 Q 100 48 85 105 Q 70 162 148 165" 
          fill="none" stroke="url(#sigGrad1)" stroke-width="20" stroke-linecap="round" />
          
    <!-- Central creative sparkle star -->
    <g transform="translate(162, 55)">
      <path d="M 0 -22 Q 0 0 22 0 Q 0 0 0 22 Q 0 0 -22 0 Q 0 0 0 -22 Z" fill="url(#sparkleGrad1)" filter="url(#glow1)" />
      <circle cx="0" cy="0" r="4" fill="#FFFFFF" />
    </g>
    <!-- Secondary miniature spark -->
    <g transform="translate(42, 168) scale(0.45)">
      <path d="M 0 -20 Q 0 0 20 0 Q 0 0 0 20 Q 0 0 -20 0 Q 0 0 0 -20 Z" fill="#38BDF8" />
    </g>
  </g>

  <!-- Typography -->
  <text x="250" y="365" text-anchor="middle" font-family="'Outfit', 'Plus Jakarta Sans', sans-serif" font-size="38" font-weight="700" fill="#FFFFFF" letter-spacing="3">${name}</text>
  <text x="250" y="405" text-anchor="middle" font-family="'Inter', sans-serif" font-size="14" font-weight="600" fill="#94A3B8" letter-spacing="6">${slogan.toUpperCase()}</text>
  
  <!-- Subtle baseline accent line -->
  <line x1="200" y1="428" x2="300" y2="428" stroke="url(#sigGrad1)" stroke-width="2" stroke-linecap="round" opacity="0.6" />
</svg>`
    },
    {
      id: 'concept-2-minimal-apex',
      name: 'Geometric Nexus & Orbit',
      styleCategory: 'Modern Minimalist',
      rationale: 'Sophisticated dual-arc orbit enclosing a crisp geometric emblem with diamond star accents, symbolizing forward momentum and digital clarity.',
      colors: ['#06B6D4', '#3B82F6', '#8B5CF6', '#FFFFFF'],
      fontFamily: 'Space Grotesk',
      tagline: slogan,
      layoutType: 'stacked',
      monogramLetters: initials,
      svgContent: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <linearGradient id="nexusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#06B6D4" />
      <stop offset="50%" stop-color="#3B82F6" />
      <stop offset="100%" stop-color="#8B5CF6" />
    </linearGradient>
  </defs>
  <g transform="translate(150, 75)">
    <!-- Orbiting ring 1 -->
    <ellipse cx="100" cy="100" rx="90" ry="40" fill="none" stroke="url(#nexusGrad)" stroke-width="6" transform="rotate(-30 100 100)" stroke-linecap="round" />
    <!-- Orbiting ring 2 -->
    <ellipse cx="100" cy="100" rx="90" ry="40" fill="none" stroke="url(#nexusGrad)" stroke-width="6" transform="rotate(45 100 100)" stroke-linecap="round" opacity="0.75" />
    <!-- Center faceted diamond core -->
    <polygon points="100,50 145,100 100,150 55,100" fill="url(#nexusGrad)" opacity="0.85" />
    <polygon points="100,68 130,100 100,132 70,100" fill="#090D16" />
    <!-- Sparkle core -->
    <path d="M 100 86 Q 100 100 114 100 Q 100 100 100 114 Q 100 100 86 100 Q 100 100 100 86 Z" fill="#38BDF8" />
  </g>
  <text x="250" y="360" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="36" font-weight="700" fill="#FFFFFF" letter-spacing="2">${name}</text>
  <text x="250" y="400" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="13" font-weight="500" fill="#38BDF8" letter-spacing="5">${slogan.toUpperCase()}</text>
</svg>`
    },
    {
      id: 'concept-3-luxury-crest',
      name: 'Prestige Royal Serif Monogram',
      styleCategory: 'Luxury & Elegant',
      rationale: 'Timeless luxury seal featuring interlocking serif letters encased in a fine-line geometric frame with dual celestial stars.',
      colors: ['#F59E0B', '#D97706', '#FBBF24', '#FFFFFF'],
      fontFamily: 'Playfair Display',
      tagline: slogan,
      layoutType: 'stacked',
      monogramLetters: initials,
      svgContent: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDE68A" />
      <stop offset="40%" stop-color="#F59E0B" />
      <stop offset="100%" stop-color="#B45309" />
    </linearGradient>
  </defs>
  <g transform="translate(150, 70)">
    <!-- Fine luxury octagonal frame -->
    <polygon points="100,15 160,15 190,45 190,155 160,185 40,185 10,155 10,45 40,15" fill="none" stroke="url(#goldGrad)" stroke-width="3" opacity="0.7" />
    <polygon points="100,24 154,24 181,51 181,149 154,176 46,176 19,149 19,51 46,24" fill="none" stroke="url(#goldGrad)" stroke-width="1" opacity="0.35" />
    
    <!-- Monogram letters -->
    <text x="100" y="125" text-anchor="middle" font-family="'Playfair Display', 'Cinzel', serif" font-size="78" font-weight="700" fill="url(#goldGrad)" letter-spacing="4">${initials}</text>
    
    <!-- Top crest star -->
    <path d="M 100 24 Q 100 35 111 35 Q 100 35 100 46 Q 100 35 89 35 Q 100 35 100 24 Z" fill="url(#goldGrad)" />
    <!-- Bottom crest flourish -->
    <circle cx="100" cy="165" r="4" fill="url(#goldGrad)" />
    <line x1="60" y1="165" x2="88" y2="165" stroke="url(#goldGrad)" stroke-width="1.5" />
    <line x1="112" y1="165" x2="140" y2="165" stroke="url(#goldGrad)" stroke-width="1.5" />
  </g>
  <text x="250" y="355" text-anchor="middle" font-family="'Playfair Display', serif" font-size="34" font-weight="700" fill="#FFFFFF" letter-spacing="4">${name}</text>
  <text x="250" y="395" text-anchor="middle" font-family="'Inter', sans-serif" font-size="12" font-weight="600" fill="#FBBF24" letter-spacing="7">${slogan.toUpperCase()}</text>
</svg>`
    },
    {
      id: 'concept-4-cyber-spark',
      name: 'Dynamic Cyber Spark & Beacon',
      styleCategory: 'Bold & Creative',
      rationale: 'High-energy angled polygon silhouette paired with a hyper-saturated neon gradient, emphasizing innovation and creative speed.',
      colors: ['#4F46E5', '#9333EA', '#EC4899', '#FFFFFF'],
      fontFamily: 'Syne',
      tagline: slogan,
      layoutType: 'stacked',
      monogramLetters: initials,
      svgContent: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <linearGradient id="cyberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4F46E5" />
      <stop offset="50%" stop-color="#9333EA" />
      <stop offset="100%" stop-color="#EC4899" />
    </linearGradient>
  </defs>
  <g transform="translate(150, 70)">
    <!-- Hexagonal glowing prism -->
    <path d="M 100 15 L 175 58 L 175 142 L 100 185 L 25 142 L 25 58 Z" fill="none" stroke="url(#cyberGrad)" stroke-width="8" stroke-linejoin="round" />
    
    <!-- Central dynamic geometric lightning/spark fold -->
    <path d="M 100 45 L 75 105 L 115 105 L 85 160 L 130 95 L 98 95 Z" fill="url(#cyberGrad)" />
    
    <!-- Spark satellites -->
    <circle cx="160" cy="40" r="5" fill="#EC4899" />
    <circle cx="40" cy="160" r="4" fill="#4F46E5" />
  </g>
  <text x="250" y="360" text-anchor="middle" font-family="'Syne', 'Outfit', sans-serif" font-size="38" font-weight="800" fill="#FFFFFF" letter-spacing="3">${name}</text>
  <text x="250" y="400" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="600" fill="#EC4899" letter-spacing="5">${slogan.toUpperCase()}</text>
</svg>`
    },
    {
      id: 'concept-5-horizontal-pro',
      name: 'Corporate Horizontal Emblem',
      styleCategory: 'Modern Tech & Gradient',
      rationale: 'Clean modern horizontal lockup tailored for websites, apps, and corporate headers, balancing sleek mark geometry with prominent typography.',
      colors: [c1, c2, '#38BDF8', '#FFFFFF'],
      fontFamily: 'Plus Jakarta Sans',
      tagline: slogan,
      layoutType: 'horizontal',
      monogramLetters: initials,
      svgContent: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <linearGradient id="hzGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c1}" />
      <stop offset="100%" stop-color="${c2}" />
    </linearGradient>
  </defs>
  <g transform="translate(45, 175)">
    <!-- Squircle app icon container -->
    <rect x="0" y="0" width="145" height="145" rx="36" fill="url(#hzGrad)" />
    <!-- Monogram and star inside -->
    <text x="68" y="98" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="64" font-weight="800" fill="#FFFFFF" letter-spacing="1">${initials}</text>
    <path d="M 112 32 Q 112 44 124 44 Q 112 44 112 56 Q 112 44 100 44 Q 112 44 112 32 Z" fill="#38BDF8" />
  </g>
  <!-- Text Block -->
  <g transform="translate(215, 235)">
    <text x="0" y="0" font-family="'Plus Jakarta Sans', sans-serif" font-size="38" font-weight="800" fill="#FFFFFF" letter-spacing="1">${name}</text>
    <text x="2" y="32" font-family="'Inter', sans-serif" font-size="13" font-weight="600" fill="#94A3B8" letter-spacing="4">${slogan.toUpperCase()}</text>
  </g>
</svg>`
    },
    {
      id: 'concept-6-creative-badge',
      name: 'Creative Artisan Badge & Seal',
      styleCategory: 'Badge & Stamp',
      rationale: 'Circular stamp layout with radial micro-stars and concentric rings, offering incredible versatility on merchandise, stamps, and physical packaging.',
      colors: ['#3B82F6', '#8B5CF6', '#10B981', '#FFFFFF'],
      fontFamily: 'Montserrat',
      tagline: slogan,
      layoutType: 'badge',
      monogramLetters: initials,
      svgContent: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <linearGradient id="badgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3B82F6" />
      <stop offset="100%" stop-color="#8B5CF6" />
    </linearGradient>
  </defs>
  <g transform="translate(140, 65)">
    <!-- Double concentric circular badges -->
    <circle cx="110" cy="110" r="105" fill="none" stroke="url(#badgeGrad)" stroke-width="4" />
    <circle cx="110" cy="110" r="95" fill="none" stroke="url(#badgeGrad)" stroke-width="1.5" stroke-dasharray="6 4" />
    <circle cx="110" cy="110" r="82" fill="url(#badgeGrad)" opacity="0.1" />
    
    <!-- Central Monogram -->
    <text x="110" y="128" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="62" font-weight="900" fill="#FFFFFF" letter-spacing="2">${initials}</text>
    
    <!-- Top & bottom star accents -->
    <path d="M 110 32 Q 110 40 118 40 Q 110 40 110 48 Q 110 40 102 40 Q 110 40 110 32 Z" fill="#38BDF8" />
    <path d="M 110 172 Q 110 180 118 180 Q 110 180 110 188 Q 110 180 102 180 Q 110 180 110 172 Z" fill="#38BDF8" />
  </g>
  <text x="250" y="365" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="36" font-weight="800" fill="#FFFFFF" letter-spacing="3">${name}</text>
  <text x="250" y="405" text-anchor="middle" font-family="'Inter', sans-serif" font-size="13" font-weight="600" fill="#94A3B8" letter-spacing="6">${slogan.toUpperCase()}</text>
</svg>`
    }
  ];
}

// Route: Generate Logos
app.post('/api/generate-logos', async (req, res) => {
  const body: GenerateLogoRequest = req.body;
  const businessName = (body.businessName || 'LogoCraft').trim();
  const slogan = (body.slogan || '').trim();
  const style = body.style || 'monogram';
  const industry = body.industry || 'Technology';
  const preferredSymbol = body.preferredSymbol || 'clean LC monogram with sparkle star';
  const initials = body.monogramInitials || businessName.split(/\s+/).map(w => w[0]).join('').slice(0, 3).toUpperCase();
  const color1 = body.colorPalette?.gradientStart || '#2563EB';
  const color2 = body.colorPalette?.gradientEnd || '#7C3AED';
  const accent = body.colorPalette?.accent || '#38BDF8';

  try {
    if (!process.env.GEMINI_API_KEY) {
      // Return high quality fallback concepts immediately
      console.log('No GEMINI_API_KEY detected, using intelligent vector generator fallback');
      const fallbackConcepts = createFallbackConcepts(body);
      return res.json({ concepts: fallbackConcepts, source: 'curated-generator' });
    }

    const systemPrompt = `You are a world-renowned brand identity designer and SVG vector artist specializing in modern luxury logos, tech monograms, and creative brand systems.
Your task is to generate 4 distinct, professional logo concepts for:
Business Name: "${businessName}"
Slogan/Tagline: "${slogan || 'Innovative Brand'}"
Design Style: "${style}"
Industry/Niche: "${industry}"
Initials/Monogram: "${initials}"
Preferred Element: "${preferredSymbol}"
Primary Palette: Gradient from ${color1} to ${color2}, with highlight ${accent}.

REQUIREMENTS for each concept:
1. Valid, self-contained SVG code inside "svgContent".
2. Must have viewBox="0 0 500 500" with width="100%" height="100%".
3. Use modern vector geometry: clean paths, defs with linearGradient or radialGradient, precise strokes, rounded caps/joins.
4. If requested style is monogram/sparkle, include an intertwining monogram of "${initials}" or clever lettermark combined with a 4-point or 8-point sparkle star (<path d="M 0 -20 Q 0 0 20 0 Q 0 0 0 20 Q 0 0 -20 0 Q 0 0 0 -20 Z" />).
5. Must include typography: the brand name "${businessName}" using fonts like 'Outfit', 'Space Grotesk', 'Playfair Display', 'Syne', 'Plus Jakarta Sans', or 'Montserrat' in fill="#FFFFFF" or matching gradient, and the slogan in small tracking/letter-spacing.
6. The SVG must NOT contain any external images (<image>) or broken markdown. All shapes must be vector <path>, <circle>, <rect>, <polygon>, <g>, <text>.
7. Return a JSON array matching the schema.`;

    const prompt = `Generate 4 distinct logo concepts for "${businessName}". Style: ${style}, Industry: ${industry}. Colors: ${color1} to ${color2}, accent ${accent}. Include full vector SVG strings for viewBox 0 0 500 500.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          description: 'List of logo concepts with full vector SVGs',
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              name: { type: Type.STRING, description: 'Concept title (e.g. Radiant Apex Monogram)' },
              styleCategory: { type: Type.STRING },
              rationale: { type: Type.STRING, description: 'Why this design works for the brand' },
              colors: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Hex color codes used in the design'
              },
              fontFamily: { type: Type.STRING, description: 'Main font recommendation' },
              tagline: { type: Type.STRING },
              layoutType: { type: Type.STRING, description: 'stacked, horizontal, badge, or icon-only' },
              monogramLetters: { type: Type.STRING },
              svgContent: { type: Type.STRING, description: 'Complete, valid vector SVG XML with viewBox="0 0 500 500"' }
            },
            required: ['id', 'name', 'styleCategory', 'rationale', 'colors', 'fontFamily', 'svgContent']
          }
        }
      }
    });

    const jsonStr = (response.text || '').trim();
    let concepts = JSON.parse(jsonStr);

    if (Array.isArray(concepts) && concepts.length > 0) {
      // Clean and sanitize each concept's SVG
      concepts = concepts.map((c, i) => ({
        ...c,
        id: c.id || `ai-concept-${Date.now()}-${i}`,
        svgContent: sanitizeSvg(c.svgContent),
        colors: Array.isArray(c.colors) && c.colors.length > 0 ? c.colors : [color1, color2, accent, '#FFFFFF'],
        fontFamily: c.fontFamily || 'Outfit',
        tagline: c.tagline || slogan,
        layoutType: c.layoutType || 'stacked',
        monogramLetters: c.monogramLetters || initials
      }));

      return res.json({ concepts, source: 'gemini-3.8-flash' });
    }

    throw new Error('Empty concepts array returned from model');
  } catch (error) {
    console.error('Error generating logos with Gemini, serving fallback:', error);
    const fallbacks = createFallbackConcepts(body);
    return res.json({ concepts: fallbacks, source: 'fallback-after-error' });
  }
});

// Route: AI Refinement
app.post('/api/refine-logo', async (req, res) => {
  const { currentSvg, instruction, brandName, currentColors } = req.body;
  if (!instruction) {
    return res.status(400).json({ error: 'Instruction required' });
  }

  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        modifiedSvg: currentSvg,
        message: 'API Key not configured. You can use the visual editor tools below to customize colors, fonts, layout and shapes directly!'
      });
    }

    const refinePrompt = `You are a professional SVG logo designer. Modify this SVG logo based on this user instruction:
"${instruction}"

Current Brand Name: "${brandName || 'LogoCraft'}"
Current Colors: ${JSON.stringify(currentColors || ['#2563EB', '#7C3AED', '#38BDF8'])}
Current SVG:
${currentSvg}

Rules:
1. Return ONLY the updated SVG string.
2. Maintain valid viewBox="0 0 500 500" and width="100%" height="100%".
3. Apply the user instruction precisely (e.g. change color gradients, adjust icon thickness, add sparkle stars, switch typography, modify frame).
4. No markdown fences, no explanation outside the SVG.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: refinePrompt,
      config: {
        systemInstruction: 'Return only valid SVG XML for viewBox="0 0 500 500". No markdown.'
      }
    });

    const refinedSvg = sanitizeSvg(response.text || currentSvg);
    return res.json({ modifiedSvg: refinedSvg, message: 'Logo refined successfully!' });
  } catch (err) {
    console.error('Refinement error:', err);
    return res.status(500).json({ error: 'Failed to refine logo', original: currentSvg });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Setup Vite or static serving
async function startServer() {
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist/index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`LogoCraft AI server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
