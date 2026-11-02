import { LogoConcept } from '../types';

export const STYLE_OPTIONS = [
  {
    id: 'monogram',
    name: 'Monogram & Sparkle',
    description: 'Clean interlocking initials paired with creative sparkle stars and modern gradients',
    icon: 'Sparkles',
    popular: true,
  },
  {
    id: 'modern-gradient',
    name: 'Modern Tech & Gradient',
    description: 'Ultra-clean vector shapes with vibrant luminous gradients and geometric harmony',
    icon: 'Cpu',
    popular: true,
  },
  {
    id: 'luxury-serif',
    name: 'Luxury & Royal Crest',
    description: 'Timeless high-end serif typography, fine-line crests, and warm metallic accents',
    icon: 'Crown',
    popular: false,
  },
  {
    id: 'bold-geometric',
    name: 'Bold Geometric & Emblem',
    description: 'Architectural geometry, strong negative space, and impactful contemporary silhouettes',
    icon: 'Shapes',
    popular: false,
  },
  {
    id: 'abstract-organic',
    name: 'Abstract & Dynamic',
    description: 'Smooth fluid curves, orbital ribbons, and dynamic motion aesthetics',
    icon: 'Compass',
    popular: false,
  },
  {
    id: 'badge-stamp',
    name: 'Artisan Badge & Seal',
    description: 'Circular emblems, stamps, star clusters, and versatile packaging lockups',
    icon: 'Shield',
    popular: false,
  },
];

export const COLOR_PALETTES = [
  {
    id: 'signature-lc',
    name: 'Signature LC Gradient',
    gradientStart: '#2563EB', // Electric Blue
    gradientEnd: '#7C3AED',   // Royal Purple
    accent: '#38BDF8',        // Cyan Sparkle
    bgDark: '#090D16',
    tag: 'Signature',
  },
  {
    id: 'cyber-neon',
    name: 'Cyber Neon Pulse',
    gradientStart: '#06B6D4', // Cyan
    gradientEnd: '#8B5CF6',   // Violet
    accent: '#F43F5E',        // Neon Rose
    bgDark: '#080B14',
    tag: 'Tech',
  },
  {
    id: 'sunset-blaze',
    name: 'Sunset Coral & Amber',
    gradientStart: '#F43F5E', // Vivid Coral
    gradientEnd: '#FB923C',   // Radiant Orange
    accent: '#FBBF24',        // Amber
    bgDark: '#120A10',
    tag: 'Vibrant',
  },
  {
    id: 'royal-gold',
    name: 'Prestige Gold & Champagne',
    gradientStart: '#F59E0B', // Warm Gold
    gradientEnd: '#B45309',   // Deep Amber Bronze
    accent: '#FDE68A',        // Champagne Sheen
    bgDark: '#0D0E12',
    tag: 'Luxury',
  },
  {
    id: 'emerald-aurora',
    name: 'Emerald Aurora',
    gradientStart: '#059669', // Emerald
    gradientEnd: '#0D9488',   // Deep Teal
    accent: '#34D399',        // Mint Sparkle
    bgDark: '#06120F',
    tag: 'Organic',
  },
  {
    id: 'midnight-platinum',
    name: 'Midnight & Platinum',
    gradientStart: '#3B82F6', // Tech Blue
    gradientEnd: '#1E293B',   // Deep Slate
    accent: '#94A3B8',        // Platinum
    bgDark: '#070A10',
    tag: 'Minimal',
  },
  {
    id: 'cosmic-amethyst',
    name: 'Cosmic Amethyst',
    gradientStart: '#6366F1', // Indigo
    gradientEnd: '#D946EF',   // Fuchsia
    accent: '#38BDF8',        // Celestial Sky
    bgDark: '#0B0A17',
    tag: 'Futuristic',
  },
];

export const INDUSTRY_OPTIONS = [
  'Artificial Intelligence / SaaS',
  'Design Studio & Creative Agency',
  'Luxury Fashion & Apparel',
  'Modern Coffee & Artisan Food',
  'Fintech & Web3',
  'Health, Wellness & Fitness',
  'Architecture & Real Estate',
  'E-Commerce & DTC Brand',
  'Entertainment & Gaming',
  'Consulting & Professional Services',
];

export const FONT_OPTIONS = [
  { id: 'Outfit', name: 'Outfit', category: 'Modern Geometric Rounded', sample: 'Modern, balanced, tech-forward' },
  { id: 'Plus Jakarta Sans', name: 'Plus Jakarta Sans', category: 'Crisp Tech Sans', sample: 'Clean modern authority' },
  { id: 'Space Grotesk', name: 'Space Grotesk', category: 'Futuristic Monospace', sample: 'Digital & high tech' },
  { id: 'Playfair Display', name: 'Playfair Display', category: 'Editorial Serif', sample: 'Luxury heritage & grace' },
  { id: 'Cinzel', name: 'Cinzel', category: 'Classical Roman Inscription', sample: 'Prestige & timeless luxury' },
  { id: 'Syne', name: 'Syne', category: 'Avant-Garde Expressive', sample: 'Artistic, high fashion' },
  { id: 'Montserrat', name: 'Montserrat', category: 'Geometric Sans', sample: 'Urban, architectural, bold' },
  { id: 'Inter', name: 'Inter', category: 'Universal Functional', sample: 'Ultra-readable Swiss style' },
];

// Curated Showcase Logos (with the signature LogoCraft LC logo prominently displayed)
export const SHOWCASE_LOGOS: LogoConcept[] = [
  {
    id: 'showcase-logocraft-signature',
    name: 'LogoCraft AI Signature Mark',
    styleCategory: 'Monogram & Sparkle',
    rationale: 'The signature LogoCraft identity: clean interlocking LC monogram combined with an 8-point creative sparkle star, rendered in a radiant blue-to-purple gradient with modern rounded typography.',
    colors: ['#2563EB', '#7C3AED', '#38BDF8', '#FFFFFF'],
    fontFamily: 'Outfit',
    tagline: 'NEXT-GEN LOGO STUDIO',
    layoutType: 'stacked',
    monogramLetters: 'LC',
    svgContent: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <linearGradient id="sigGradShowcase" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2563EB" />
      <stop offset="100%" stop-color="#7C3AED" />
    </linearGradient>
    <linearGradient id="sparkleGradShowcase" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8" />
      <stop offset="100%" stop-color="#C084FC" />
    </linearGradient>
    <filter id="softGlowShowcase" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="10" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <!-- Ambient backdrop aura -->
  <circle cx="250" cy="180" r="120" fill="url(#sigGradShowcase)" opacity="0.14" />
  
  <g transform="translate(145, 68)">
    <!-- Elegant rounded outer container border -->
    <rect x="0" y="0" width="210" height="210" rx="48" fill="none" stroke="url(#sigGradShowcase)" stroke-width="3" opacity="0.4" stroke-dasharray="14 10" />
    
    <!-- Bold Stylized Letter 'L' -->
    <path d="M 52 46 L 52 148 Q 52 165 69 165 L 140 165" 
          fill="none" stroke="url(#sigGradShowcase)" stroke-width="22" stroke-linecap="round" stroke-linejoin="round" />
          
    <!-- Stylized Interlocking Letter 'C' -->
    <path d="M 166 74 Q 96 48 85 106 Q 74 164 148 165" 
          fill="none" stroke="url(#sigGradShowcase)" stroke-width="20" stroke-linecap="round" />
          
    <!-- Primary Creative Sparkle Star -->
    <g transform="translate(162, 54)">
      <path d="M 0 -24 Q 0 0 24 0 Q 0 0 0 24 Q 0 0 -24 0 Q 0 0 0 -24 Z" fill="url(#sparkleGradShowcase)" filter="url(#softGlowShowcase)" />
      <circle cx="0" cy="0" r="4.5" fill="#FFFFFF" />
    </g>
    
    <!-- Secondary Mini Sparkle -->
    <g transform="translate(44, 168) scale(0.45)">
      <path d="M 0 -20 Q 0 0 20 0 Q 0 0 0 20 Q 0 0 -20 0 Q 0 0 0 -20 Z" fill="#38BDF8" />
    </g>
    <!-- Micro orbital star -->
    <circle cx="186" cy="142" r="3.5" fill="#38BDF8" opacity="0.8" />
  </g>

  <!-- Modern Rounded Typography -->
  <text x="250" y="365" text-anchor="middle" font-family="'Outfit', 'Plus Jakarta Sans', sans-serif" font-size="38" font-weight="700" fill="#FFFFFF" letter-spacing="2">LogoCraft AI</text>
  <text x="250" y="405" text-anchor="middle" font-family="'Inter', sans-serif" font-size="13" font-weight="600" fill="#94A3B8" letter-spacing="6">NEXT-GEN BRAND STUDIO</text>
  
  <!-- Subtle accent divider -->
  <line x1="205" y1="428" x2="295" y2="428" stroke="url(#sigGradShowcase)" stroke-width="2.5" stroke-linecap="round" opacity="0.7" />
</svg>`
  },
  {
    id: 'showcase-nova-ai',
    name: 'Nova Quantum Systems',
    styleCategory: 'Modern Tech & Gradient',
    rationale: 'Faceted quantum star enclosed in continuous mathematical orbital curves, rendered in electric cyan and violet.',
    colors: ['#06B6D4', '#3B82F6', '#8B5CF6', '#FFFFFF'],
    fontFamily: 'Space Grotesk',
    tagline: 'AUTONOMOUS COGNITION',
    layoutType: 'stacked',
    monogramLetters: 'NQ',
    svgContent: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <linearGradient id="novaGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#06B6D4" />
      <stop offset="50%" stop-color="#3B82F6" />
      <stop offset="100%" stop-color="#8B5CF6" />
    </linearGradient>
  </defs>
  <g transform="translate(150, 75)">
    <ellipse cx="100" cy="100" rx="90" ry="38" fill="none" stroke="url(#novaGrad1)" stroke-width="5" transform="rotate(-30 100 100)" stroke-linecap="round" />
    <ellipse cx="100" cy="100" rx="90" ry="38" fill="none" stroke="url(#novaGrad1)" stroke-width="5" transform="rotate(45 100 100)" stroke-linecap="round" opacity="0.75" />
    <polygon points="100,50 145,100 100,150 55,100" fill="url(#novaGrad1)" opacity="0.85" />
    <polygon points="100,68 130,100 100,132 70,100" fill="#090D16" />
    <path d="M 100 86 Q 100 100 114 100 Q 100 100 100 114 Q 100 100 86 100 Q 100 100 100 86 Z" fill="#38BDF8" />
  </g>
  <text x="250" y="360" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="36" font-weight="700" fill="#FFFFFF" letter-spacing="2">Nova Systems</text>
  <text x="250" y="400" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="13" font-weight="500" fill="#38BDF8" letter-spacing="5">AUTONOMOUS COGNITION</text>
</svg>`
  },
  {
    id: 'showcase-lumina-luxe',
    name: 'Aurelia Haute Horlogerie',
    styleCategory: 'Luxury & Royal Crest',
    rationale: 'Timeless Roman-inspired monogram crest flanked by celestial symmetry and hand-drawn gold geometry.',
    colors: ['#F59E0B', '#D97706', '#FBBF24', '#FFFFFF'],
    fontFamily: 'Playfair Display',
    tagline: 'GENÈVE 1894',
    layoutType: 'stacked',
    monogramLetters: 'AH',
    svgContent: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <linearGradient id="aureliaGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDE68A" />
      <stop offset="40%" stop-color="#F59E0B" />
      <stop offset="100%" stop-color="#B45309" />
    </linearGradient>
  </defs>
  <g transform="translate(150, 70)">
    <polygon points="100,15 160,15 190,45 190,155 160,185 40,185 10,155 10,45 40,15" fill="none" stroke="url(#aureliaGold)" stroke-width="3" opacity="0.7" />
    <polygon points="100,24 154,24 181,51 181,149 154,176 46,176 19,149 19,51 46,24" fill="none" stroke="url(#aureliaGold)" stroke-width="1" opacity="0.35" />
    <text x="100" y="125" text-anchor="middle" font-family="'Playfair Display', 'Cinzel', serif" font-size="78" font-weight="700" fill="url(#aureliaGold)" letter-spacing="4">AH</text>
    <path d="M 100 24 Q 100 35 111 35 Q 100 35 100 46 Q 100 35 89 35 Q 100 35 100 24 Z" fill="url(#aureliaGold)" />
    <circle cx="100" cy="165" r="4" fill="url(#aureliaGold)" />
    <line x1="60" y1="165" x2="88" y2="165" stroke="url(#aureliaGold)" stroke-width="1.5" />
    <line x1="112" y1="165" x2="140" y2="165" stroke="url(#aureliaGold)" stroke-width="1.5" />
  </g>
  <text x="250" y="355" text-anchor="middle" font-family="'Playfair Display', serif" font-size="34" font-weight="700" fill="#FFFFFF" letter-spacing="4">Aurelia</text>
  <text x="250" y="395" text-anchor="middle" font-family="'Inter', sans-serif" font-size="12" font-weight="600" fill="#FBBF24" letter-spacing="7">GENÈVE 1894</text>
</svg>`
  },
  {
    id: 'showcase-solaris-creative',
    name: 'Solaris Creative Studio',
    styleCategory: 'Bold & Creative',
    rationale: 'Prismatic radiant sun with 12 kinetic facets, paired with expressive avant-garde typography in vivid magenta and indigo.',
    colors: ['#4F46E5', '#9333EA', '#EC4899', '#FFFFFF'],
    fontFamily: 'Syne',
    tagline: 'VISUAL ARCHITECTURE',
    layoutType: 'stacked',
    monogramLetters: 'SC',
    svgContent: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <linearGradient id="solarisGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4F46E5" />
      <stop offset="50%" stop-color="#9333EA" />
      <stop offset="100%" stop-color="#EC4899" />
    </linearGradient>
  </defs>
  <g transform="translate(150, 70)">
    <path d="M 100 15 L 175 58 L 175 142 L 100 185 L 25 142 L 25 58 Z" fill="none" stroke="url(#solarisGrad)" stroke-width="8" stroke-linejoin="round" />
    <path d="M 100 45 L 75 105 L 115 105 L 85 160 L 130 95 L 98 95 Z" fill="url(#solarisGrad)" />
    <circle cx="160" cy="40" r="5" fill="#EC4899" />
    <circle cx="40" cy="160" r="4" fill="#4F46E5" />
  </g>
  <text x="250" y="360" text-anchor="middle" font-family="'Syne', 'Outfit', sans-serif" font-size="38" font-weight="800" fill="#FFFFFF" letter-spacing="3">Solaris</text>
  <text x="250" y="400" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="600" fill="#EC4899" letter-spacing="5">VISUAL ARCHITECTURE</text>
</svg>`
  }
];
