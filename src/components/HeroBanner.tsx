import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Palette, Cpu, Zap } from 'lucide-react';

interface HeroBannerProps {
  onSelectPrompt: (brandName: string, slogan: string, style: string, initials?: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onSelectPrompt }) => {
  return (
    <div className="relative overflow-hidden pt-8 pb-10 border-b border-slate-800/80 bg-gradient-to-b from-[#0B0F19] via-[#090D16] to-[#090D16]">
      {/* Decorative ambient gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Heading and value propositions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 shadow-inner">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-xs font-semibold text-slate-300">
                Vector Precision & Scalable SVG Generator
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-['Outfit'] leading-[1.12]">
              Craft iconic logos with{' '}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                generative intelligence
              </span>
              .
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-light leading-relaxed">
              Transform your business name and style into bespoke vector monograms, sparkling insignia, and complete brand identities. Fully editable, infinite resolution, and export-ready.
            </p>

            {/* Quick Inspiration Pills */}
            <div className="space-y-2.5 pt-1">
              <div className="text-xs font-medium text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>Instant Inspiration: Click to Try</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onSelectPrompt('LogoCraft AI', 'Next-Gen Brand Studio', 'monogram', 'LC')}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-950/40 hover:bg-blue-900/50 border border-blue-700/50 text-blue-200 transition-all hover:scale-102 flex items-center gap-1.5 shadow-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  LogoCraft AI (LC Monogram & Sparkle)
                </button>
                <button
                  onClick={() => onSelectPrompt('Vortex Cloud', 'Autonomous Infrastructure', 'modern-gradient', 'VC')}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300 transition-all hover:scale-102 flex items-center gap-1.5"
                >
                  Vortex Cloud (Tech Orbit)
                </button>
                <button
                  onClick={() => onSelectPrompt('Aurelia Haute', 'Haute Joaillerie Paris', 'luxury-serif', 'AH')}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-950/30 hover:bg-amber-900/40 border border-amber-700/40 text-amber-200 transition-all hover:scale-102 flex items-center gap-1.5"
                >
                  Aurelia Haute (Royal Gold Crest)
                </button>
                <button
                  onClick={() => onSelectPrompt('Nova Pulse', 'Human Performance Lab', 'bold-geometric', 'NP')}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-purple-950/30 hover:bg-purple-900/40 border border-purple-700/40 text-purple-200 transition-all hover:scale-102 flex items-center gap-1.5"
                >
                  Nova Pulse (Geometric Mark)
                </button>
              </div>
            </div>

            {/* Badges / Guarantees */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-800/60 max-w-lg">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Cpu className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Pure Vector SVG</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Palette className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Live Studio Editor</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Commercial Ready</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Featured Card showcasing the signature LC Monogram */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm rounded-2xl p-1 bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-transparent shadow-2xl shadow-blue-900/20">
              <div className="rounded-xl bg-[#0B0F19] border border-slate-800/90 p-6 flex flex-col items-center text-center">
                {/* Signature Tag */}
                <div className="w-full flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Signature Concept
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-900/50 text-purple-200 border border-purple-700/40">
                    Blue-to-Purple
                  </span>
                </div>

                {/* Signature Emblem Container */}
                <div className="w-48 h-48 relative flex items-center justify-center rounded-2xl bg-gradient-to-b from-slate-900 to-[#0F1422] border border-slate-800 shadow-inner group transition-all duration-300 hover:border-blue-500/50">
                  <svg viewBox="0 0 200 200" className="w-40 h-40 drop-shadow-xl">
                    <defs>
                      <linearGradient id="heroSigGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#2563EB" />
                        <stop offset="100%" stopColor="#7C3AED" />
                      </linearGradient>
                      <linearGradient id="heroSparkleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#38BDF8" />
                        <stop offset="100%" stopColor="#C084FC" />
                      </linearGradient>
                    </defs>

                    {/* Ambient Glow */}
                    <circle cx="100" cy="100" r="60" fill="url(#heroSigGrad)" opacity="0.16" />

                    {/* Squircle frame */}
                    <rect x="20" y="20" width="160" height="160" rx="36" fill="none" stroke="url(#heroSigGrad)" strokeWidth="3" opacity="0.4" strokeDasharray="10 8" />

                    {/* Monogram L */}
                    <path d="M 60 52 L 60 134 Q 60 148 74 148 L 134 148" fill="none" stroke="url(#heroSigGrad)" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />

                    {/* Monogram C */}
                    <path d="M 152 74 Q 96 52 86 100 Q 76 148 136 148" fill="none" stroke="url(#heroSigGrad)" strokeWidth="16" strokeLinecap="round" />

                    {/* Sparkle Star */}
                    <g transform="translate(150, 58)">
                      <path d="M 0 -20 Q 0 0 20 0 Q 0 0 0 20 Q 0 0 -20 0 Q 0 0 0 -20 Z" fill="url(#heroSparkleGrad)" />
                      <circle cx="0" cy="0" r="3.5" fill="#FFFFFF" />
                    </g>
                    <g transform="translate(52, 148) scale(0.4)">
                      <path d="M 0 -16 Q 0 0 16 0 Q 0 0 0 16 Q 0 0 -16 0 Q 0 0 0 -16 Z" fill="#38BDF8" />
                    </g>
                  </svg>
                </div>

                {/* Typography specs */}
                <div className="mt-5 space-y-1">
                  <h3 className="text-xl font-bold font-['Outfit'] text-white">LogoCraft AI</h3>
                  <p className="text-xs font-medium text-slate-400 tracking-[0.2em] uppercase font-['Inter']">
                    NEXT-GEN BRAND STUDIO
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800/80 w-full flex items-center justify-between text-xs text-slate-400">
                  <span>LC Monogram + Creative Star</span>
                  <button
                    onClick={() => onSelectPrompt('LogoCraft AI', 'Next-Gen Brand Studio', 'monogram', 'LC')}
                    className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
                  >
                    Load <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
