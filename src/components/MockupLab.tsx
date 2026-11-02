import React, { useState } from 'react';
import { 
  CreditCard, 
  Building, 
  Smartphone, 
  Shirt, 
  FileText, 
  Globe, 
  Download, 
  Sliders, 
  Sparkles,
  Maximize2
} from 'lucide-react';
import { LogoConcept, EditorSettings, MockupType } from '../types';
import { synthesizeCustomSvg, downloadHighResPng } from '../utils/svgEngine';

interface MockupLabProps {
  concept: LogoConcept;
  settings: EditorSettings;
  onOpenStudio: () => void;
  onOpenExport: () => void;
}

export const MockupLab: React.FC<MockupLabProps> = ({
  concept,
  settings,
  onOpenStudio,
  onOpenExport,
}) => {
  const [selectedMockup, setSelectedMockup] = useState<MockupType>('card');
  const currentSvg = synthesizeCustomSvg(concept, settings);

  const MOCKUP_TABS = [
    { id: 'card', name: 'Luxury Business Card', icon: CreditCard, subtitle: 'Matte cotton & holographic foil' },
    { id: 'billboard', name: 'Illuminated Office Lobby', icon: Building, subtitle: 'Backlit architectural acrylic' },
    { id: 'appicon', name: 'Mobile App Icon', icon: Smartphone, subtitle: 'iOS squircle on smartphone' },
    { id: 'tshirt', name: 'Apparel & Merchandise', icon: Shirt, subtitle: 'High-density textile print' },
    { id: 'stationery', name: 'Executive Letterhead', icon: FileText, subtitle: 'Corporate stationery suite' },
    { id: 'social', name: 'Social Media Profile', icon: Globe, subtitle: 'Avatar & banner preview' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white tracking-tight">Real-World Mockup Lab</h2>
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-purple-900/60 text-purple-300 border border-purple-700/50">
              Interactive 3D Photorealism
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Preview how your {settings.brandName} mark translates across physical materials, architectural signs, and digital apps
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenStudio}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            <Sliders className="w-3.5 h-3.5 text-blue-400" />
            <span>Customize in Studio</span>
          </button>
          <button
            onClick={onOpenExport}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-md shadow-blue-600/20 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Brand Kit</span>
          </button>
        </div>
      </div>

      {/* Surface Selector Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {MOCKUP_TABS.map((tab) => {
          const Icon = tab.icon;
          const isSelected = selectedMockup === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedMockup(tab.id as MockupType)}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-blue-950/40 border-blue-500 ring-1 ring-blue-500 shadow-md text-white'
                  : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-4 h-4 ${isSelected ? 'text-blue-400' : 'text-slate-400'}`} />
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />}
              </div>
              <div>
                <div className="text-xs font-bold leading-tight truncate">{tab.name}</div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">{tab.subtitle}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Mockup Stage Area */}
      <div className="relative rounded-3xl border border-slate-800 bg-[#070A10] p-6 sm:p-12 min-h-[540px] flex items-center justify-center overflow-hidden shadow-2xl">
        {/* Ambient lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/10 via-purple-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* MOCKUP 1: Luxury Velvet Cotton Business Card */}
        {selectedMockup === 'card' && (
          <div className="relative w-full max-w-xl transition-all duration-500 hover:scale-[1.02]">
            {/* Ambient Card Shadow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-2xl opacity-60" />

            {/* Front Card */}
            <div className="relative aspect-[1.75/1] rounded-2xl bg-gradient-to-br from-[#121826] via-[#0E131F] to-[#0A0D15] border border-slate-700/80 p-8 sm:p-10 shadow-2xl flex flex-col justify-between overflow-hidden">
              {/* Subtle paper grain texture pattern */}
              <div 
                className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
              />

              {/* Holographic metallic edge accent line */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-400/20 via-purple-400/10 to-transparent pointer-events-none" />

              {/* Card Top: Logo Lockup */}
              <div className="flex items-center justify-between z-10">
                <div 
                  className="w-44 h-24 flex items-center drop-shadow-md select-none"
                  dangerouslySetInnerHTML={{ __html: currentSvg }}
                />
                <div className="text-right">
                  <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase font-bold">
                    PREMIUM EDITION
                  </span>
                </div>
              </div>

              {/* Card Bottom: Executive Details */}
              <div className="flex items-end justify-between border-t border-slate-800/80 pt-4 z-10 text-xs">
                <div>
                  <div className="font-bold text-white tracking-wide font-['Outfit']">
                    ALEXANDER VANE
                  </div>
                  <div className="text-[11px] text-slate-400 tracking-wider">
                    FOUNDER & CHIEF EXECUTIVE
                  </div>
                  <div className="text-[10px] text-blue-400/90 font-mono mt-1">
                    hello@{settings.brandName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com
                  </div>
                </div>

                <div className="text-right space-y-0.5 text-[10px] font-mono text-slate-400">
                  <div>+1 (555) 234-8900</div>
                  <div>SAN FRANCISCO, CA</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MOCKUP 2: Illuminated Office Lobby Wall Sign */}
        {selectedMockup === 'billboard' && (
          <div className="relative w-full max-w-2xl transition-all duration-500">
            {/* Concrete / Dark Slate textured architectural wall */}
            <div className="relative rounded-2xl bg-[#0C101A] border border-slate-800 p-10 sm:p-14 shadow-2xl overflow-hidden flex items-center justify-center">
              {/* Vertical panel seam lines */}
              <div className="absolute inset-y-0 left-1/3 w-px bg-slate-800/50" />
              <div className="absolute inset-y-0 right-1/3 w-px bg-slate-800/50" />

              {/* Backlit LED Ambient Glow from behind the sign */}
              <div 
                className="absolute w-80 h-80 rounded-full blur-3xl opacity-75 pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${settings.gradientStart} 0%, ${settings.gradientEnd} 60%, transparent 80%)`,
                }}
              />

              {/* Mounted Glass / Acrylic Plaque with metallic standoffs */}
              <div className="relative z-10 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/20 p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.8)] max-w-md w-full flex flex-col items-center">
                {/* 4 Metallic Standoff Screws */}
                <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-gradient-to-br from-slate-300 to-slate-500 shadow-inner border border-slate-200/50" />
                <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-gradient-to-br from-slate-300 to-slate-500 shadow-inner border border-slate-200/50" />
                <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-gradient-to-br from-slate-300 to-slate-500 shadow-inner border border-slate-200/50" />
                <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-gradient-to-br from-slate-300 to-slate-500 shadow-inner border border-slate-200/50" />

                {/* The Logo illuminated */}
                <div 
                  className="w-64 h-64 flex items-center justify-center drop-shadow-[0_10px_20px_rgba(37,99,235,0.4)]"
                  dangerouslySetInnerHTML={{ __html: currentSvg }}
                />
              </div>
            </div>
          </div>
        )}

        {/* MOCKUP 3: Mobile App Icon on Smartphone */}
        {selectedMockup === 'appicon' && (
          <div className="relative flex flex-col items-center">
            {/* Phone Silhouette Frame */}
            <div className="relative w-72 sm:w-80 rounded-[48px] bg-slate-950 border-[6px] border-slate-800 p-4 shadow-2xl shadow-black/80">
              {/* Dynamic Island / Notch */}
              <div className="w-24 h-5 rounded-full bg-black mx-auto mb-6 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-slate-800" />
              </div>

              {/* Wallpaper Grid */}
              <div className="rounded-3xl bg-gradient-to-b from-indigo-950/60 via-slate-950 to-purple-950/60 p-6 border border-slate-800/80 min-h-[360px] flex flex-col items-center justify-center">
                {/* The App Icon */}
                <div className="relative group cursor-pointer transition-transform hover:scale-105 duration-300">
                  {/* Ambient drop shadow under icon */}
                  <div 
                    className="absolute -inset-2 rounded-3xl blur-xl opacity-60 pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, ${settings.gradientStart}, ${settings.gradientEnd})`
                    }}
                  />
                  <div 
                    className="relative w-28 h-28 rounded-[28px] overflow-hidden shadow-2xl border border-white/20 p-2 flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${settings.gradientStart}, ${settings.gradientEnd})`
                    }}
                  >
                    <div 
                      className="w-full h-full flex items-center justify-center drop-shadow-md"
                      dangerouslySetInnerHTML={{ __html: currentSvg }}
                    />
                  </div>
                </div>

                <div className="mt-3 text-xs font-bold font-['Outfit'] text-white tracking-wide">
                  {settings.brandName}
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                  v2.4 Production
                </div>

                {/* Dock bar mockup at bottom */}
                <div className="mt-12 w-full p-2.5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-around">
                  <div className="w-9 h-9 rounded-xl bg-slate-800/90 border border-slate-700" />
                  <div className="w-9 h-9 rounded-xl bg-slate-800/90 border border-slate-700" />
                  <div className="w-9 h-9 rounded-xl bg-slate-800/90 border border-slate-700" />
                  <div className="w-9 h-9 rounded-xl bg-blue-600 border border-blue-400/50" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MOCKUP 4: Designer Merchandise / Apparel */}
        {selectedMockup === 'tshirt' && (
          <div className="relative w-full max-w-lg flex flex-col items-center">
            {/* T-Shirt Vector Illustration Container */}
            <div className="relative w-full aspect-[1/1] rounded-2xl bg-[#0C101A] border border-slate-800 p-8 flex items-center justify-center overflow-hidden">
              {/* T-shirt Silhouette Shape */}
              <svg viewBox="0 0 500 500" className="w-full h-full text-[#141926] drop-shadow-2xl">
                <path
                  d="M 170 50 Q 250 85 330 50 L 440 120 L 390 190 L 340 160 L 340 460 L 160 460 L 160 160 L 110 190 L 60 120 Z"
                  fill="currentColor"
                  stroke="#262F45"
                  strokeWidth="3"
                />
                {/* Collar Ribbing */}
                <path d="M 170 50 Q 250 90 330 50" fill="none" stroke="#374360" strokeWidth="6" strokeLinecap="round" />
              </svg>

              {/* Chest Screenprint Logo */}
              <div className="absolute top-[32%] w-44 h-44 flex items-center justify-center drop-shadow-md select-none opacity-95">
                <div 
                  className="w-full h-full flex items-center justify-center"
                  dangerouslySetInnerHTML={{ __html: currentSvg }}
                />
              </div>

              {/* Label Badge */}
              <div className="absolute bottom-4 left-6 text-xs text-slate-400 font-mono flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>Heavyweight 280GSM Organic Black Tee</span>
              </div>
            </div>
          </div>
        )}

        {/* MOCKUP 5: Corporate Stationery & Executive Letterhead */}
        {selectedMockup === 'stationery' && (
          <div className="relative w-full max-w-lg transition-all duration-300">
            {/* Paper Sheet */}
            <div className="aspect-[1/1.35] rounded-xl bg-white text-slate-900 p-8 sm:p-10 shadow-2xl flex flex-col justify-between border border-slate-200">
              {/* Header */}
              <div className="flex items-start justify-between border-b-2 border-slate-900 pb-6">
                <div 
                  className="w-48 h-20 flex items-center select-none"
                  dangerouslySetInnerHTML={{ __html: currentSvg }}
                />
                <div className="text-right text-[10px] font-mono text-slate-500 uppercase tracking-wider space-y-0.5">
                  <div className="font-bold text-slate-900">{settings.brandName} CORP</div>
                  <div>100 Montgomery St, Suite 2400</div>
                  <div>San Francisco, CA 94104</div>
                </div>
              </div>

              {/* Letterhead Body Text Placeholder */}
              <div className="space-y-3 text-[11px] text-slate-600 leading-relaxed font-serif pt-4 flex-1">
                <div className="font-sans font-bold text-slate-800 text-xs mb-2">
                  To our Global Partners & Clients,
                </div>
                <p>
                  We are delighted to present the official corporate visual identity and brand guidelines for {settings.brandName}. Designed to embody precision, technological forward-thinking, and enduring value.
                </p>
                <p>
                  All visual assets and vector marks contained herein conform to strict geometric alignment, mathematical balance, and international accessibility standards across physical and digital mediums.
                </p>
                <div className="pt-6">
                  <div className="w-32 border-b border-slate-400 mb-1" />
                  <div className="text-[10px] font-sans font-bold text-slate-800">Board of Directors</div>
                  <div className="text-[9px] font-sans text-slate-500">{settings.brandName} Global Holdings</div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-slate-200 pt-3 flex items-center justify-between text-[9px] font-mono text-slate-400">
                <span>CONFIDENTIAL & PROPRIETARY</span>
                <span>PAGE 01 OF 08</span>
              </div>
            </div>
          </div>
        )}

        {/* MOCKUP 6: Social Media Suite */}
        {selectedMockup === 'social' && (
          <div className="relative w-full max-w-xl space-y-4">
            {/* Social Banner */}
            <div className="rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 border border-slate-800 overflow-hidden shadow-2xl">
              {/* Header Banner */}
              <div 
                className="w-full h-32 relative flex items-center justify-center overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${settings.gradientStart} 0%, ${settings.gradientEnd} 100%)`
                }}
              >
                <div className="absolute inset-0 bg-black/20" />
                <span className="relative z-10 text-white font-['Outfit'] font-extrabold text-2xl tracking-wider drop-shadow-md">
                  {settings.brandName}
                </span>
              </div>

              {/* Profile Body */}
              <div className="px-6 pb-6 relative pt-4 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4">
                {/* Avatar overlapping banner */}
                <div className="relative -mt-16 w-24 h-24 rounded-full bg-slate-950 border-4 border-slate-950 p-1.5 shadow-2xl flex items-center justify-center">
                  <div 
                    className="w-full h-full rounded-full overflow-hidden flex items-center justify-center"
                    dangerouslySetInnerHTML={{ __html: currentSvg }}
                  />
                </div>

                <div className="text-center sm:text-left flex-1">
                  <h3 className="text-base font-bold text-white flex items-center gap-1.5 justify-center sm:justify-start">
                    {settings.brandName}
                    <span className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold">
                      ✓
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    @{settings.brandName.toLowerCase().replace(/[^a-z0-9]/g, '')}
                  </p>
                  <p className="text-xs text-slate-300 mt-1 max-w-sm">
                    {settings.slogan || 'Next-Gen Brand Studio & AI-powered creative systems.'}
                  </p>
                </div>

                <button className="px-4 py-2 rounded-xl text-xs font-bold bg-white text-slate-950 shadow-md">
                  Follow
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
