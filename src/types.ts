export interface LogoConcept {
  id: string;
  name: string;
  styleCategory: string;
  rationale: string;
  colors: string[];
  fontFamily: string;
  tagline?: string;
  layoutType?: 'stacked' | 'horizontal' | 'badge' | 'icon-only';
  monogramLetters?: string;
  svgContent: string;
}

export interface BrandConfig {
  businessName: string;
  slogan: string;
  style: string;
  industry: string;
  colorPalette: {
    id: string;
    name: string;
    gradientStart: string;
    gradientEnd: string;
    accent: string;
  };
  preferredSymbol?: string;
  monogramInitials: string;
}

export interface EditorSettings {
  brandName: string;
  slogan: string;
  fontFamily: string;
  fontSize: number;
  letterSpacing: number;
  fontWeight: string;
  gradientStart: string;
  gradientEnd: string;
  accentColor: string;
  textColor: string;
  backgroundColor: string;
  bgType: 'dark' | 'light' | 'charcoal' | 'transparent';
  iconScale: number;
  iconRotation: number;
  showSparkles: boolean;
  sparkleCount: number;
  layout: 'stacked' | 'horizontal' | 'badge' | 'icon-only';
  badgeShape: 'none' | 'circle' | 'squircle' | 'shield' | 'octagon';
}

export type MockupType = 'card' | 'billboard' | 'appicon' | 'tshirt' | 'social' | 'stationery';
