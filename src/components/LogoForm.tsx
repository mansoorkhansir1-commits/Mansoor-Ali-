import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Wand2, 
  ChevronDown, 
  ChevronUp, 
  SlidersHorizontal, 
  Tag, 
  Building2, 
  Palette,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { STYLE_OPTIONS, COLOR_PALETTES, INDUSTRY_OPTIONS } from '../data/presets';
import { BrandConfig } from '../types';

interface LogoFormProps {
  initialConfig?: Partial<BrandConfig>;
  onGenerate: (config: BrandConfig) => Promise<void>;
  isGenerating: boolean;
  generationStep: string;
}

export const LogoForm: React.FC<LogoFormProps> = ({
  initialConfig,
  onGenerate,
  isGenerating,
  generationStep,
}) => {
  const [businessName, setBusinessName] = useState(initialConfig?.businessName || 'LogoCraft AI');
  const [slogan, setSlogan] = useState(initialConfig?.slogan || 'Next-Gen Brand Studio');
  const [style, setStyle] = useState(initialConfig?.style || 'monogram');
  const [industry, setIndustry] = useState(initialConfig?.industry || 'Artificial Intelligence / SaaS');
  const [selectedPaletteId, setSelectedPaletteId] = useState(initialConfig?.colorPalette?.id || 'signature-lc');
  const [monogramInitials, setMonogramInitials] = useState(initialConfig?.monogramInitials || 'LC');
  const [preferredSymbol, setPreferredSymbol] = useState(initialConfig?.preferredSymbol || 'clean LC monogram with creative sparkle star');
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Auto-calculate initials if not manually overridden
  useEffect(() => {
    if (!initialConfig?.monogramInitials && businessName.trim()) {
      const parts = businessName.trim().split(/\s+/);
      const computed = parts.map(p => p[0]).join('').slice(0, 3).toUpperCase();
      setMonogramInitials(computed);
    }
  }, [businessName, initialConfig]);

  // Sync external preset selection
  useEffect(() => {
    if (initialConfig?.businessName) setBusinessName(initialConfig.businessName);
    if (initialConfig?.slogan !== undefined) setSlogan(initialConfig.slogan);
    if (initialConfig?.style) setStyle(initialConfig.style);
    if (initialConfig?.monogramInitials) setMonogramInitials(initialConfig.monogramInitials);
  }, [initialConfig]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim()) return;

    const chosenPalette = COLOR_PALETTES.find(p => p.id === selectedPaletteId) || COLOR_PALETTES[0];

    const config: BrandConfig = {
      businessName: businessName.trim(),
      slogan: slogan.trim(),
      style,
      industry,
      colorPalette: {
        id: chosenPalette.id,
        name: chosenPalette.name,
        gradientStart: chosenPalette.gradientStart,
        gradientEnd: chosenPalette.gradientEnd,
        accent: chosenPalette.accent,
      },
      preferredSymbol: preferredSymbol.trim(),
      monogramInitials: monogramInitials.trim() || 'LC',
    };

    onGenerate(config);
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#0B0F19]/95 border border-slate-800 shadow-2xl p-6 sm:p-8 backdrop-blur-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Top inputs: Name & Slogan */}
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Business / Brand Name <span className="text-blue-400">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. LogoCraft AI, Vortex Cloud..."
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm font-medium transition-all"
              />
              <span className="absolute right-3 top-3 text-[11px] font-mono font-semibold text-slate-400 px-1.5 py-0.5 rounded bg-slate-800">
                Initials: {monogramInitials || 'LC'}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Slogan or Tagline <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              value={slogan}
              onChange={(e) => setSlogan(e.target.value)}
              placeholder="e.g. Next-Gen Brand Studio, Autonomous Tech..."
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm font-medium transition-all"
            />
          </div>
        </div>

        {/* Style Selection Cards */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Choose Logo Style
            </label>
            <span className="text-xs text-blue-400 font-medium">
              Vector & Typography Driven
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {STYLE_OPTIONS.map((opt) => {
              const isSelected = style === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => setStyle(opt.id)}
                  className={`relative p-3.5 rounded-xl cursor-pointer border transition-all text-left flex flex-col justify-between ${
                    isSelected
                      ? 'bg-blue-950/30 border-blue-500 ring-1 ring-blue-500/50 shadow-md shadow-blue-500/10'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/50'
                  }`}
                >
                  {opt.popular && (
                    <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      Popular
                    </span>
                  )}
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-white">{opt.name}</h4>
                    <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">
                      {opt.description}
                    </p>
                  </div>
                  <div className="mt-2.5 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">
                      {isSelected ? '✓ Selected' : 'Select'}
                    </span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Color Palette Selector */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2.5">
            Color Palette & Gradients
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
            {COLOR_PALETTES.map((pal) => {
              const isSelected = selectedPaletteId === pal.id;
              return (
                <button
                  type="button"
                  key={pal.id}
                  onClick={() => setSelectedPaletteId(pal.id)}
                  className={`flex flex-col items-center p-2 rounded-xl border text-center transition-all ${
                    isSelected
                      ? 'bg-slate-800/90 border-blue-500 shadow-md ring-1 ring-blue-500'
                      : 'bg-slate-950/70 border-slate-800/90 hover:border-slate-700'
                  }`}
                >
                  {/* Swatch circle preview */}
                  <div 
                    className="w-8 h-8 rounded-full mb-1.5 shadow-sm border border-white/20 relative flex items-center justify-center overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${pal.gradientStart}, ${pal.gradientEnd})`
                    }}
                  >
                    <span 
                      className="absolute bottom-0 right-0 w-3 h-3 rounded-full border border-slate-950"
                      style={{ backgroundColor: pal.accent }}
                    />
                  </div>
                  <span className="text-[11px] font-medium text-slate-200 truncate w-full leading-tight">
                    {pal.name.split(' ')[0]}
                  </span>
                  <span className="text-[9px] text-slate-400 uppercase font-mono">
                    {pal.tag}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Industry Selector */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Industry / Niche
            </label>
            <div className="relative">
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700/80 text-white appearance-none focus:outline-none focus:border-blue-500 text-sm font-medium"
              >
                {INDUSTRY_OPTIONS.map((ind) => (
                  <option key={ind} value={ind} className="bg-slate-900 text-white">
                    {ind}
                  </option>
                ))}
              </select>
              <Building2 className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Monogram Letters <span className="text-slate-400 font-normal">(1-3 Letters)</span>
            </label>
            <input
              type="text"
              maxLength={4}
              value={monogramInitials}
              onChange={(e) => setMonogramInitials(e.target.value.toUpperCase())}
              placeholder="e.g. LC"
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700/80 text-white uppercase tracking-widest font-mono text-sm font-bold focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Advanced Accordion Toggle */}
        <div className="border-t border-slate-800/80 pt-3">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400" />
            <span>Advanced Custom Mark & Symbol Tuning</span>
            {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showAdvanced && (
            <div className="mt-3 p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Preferred Symbol or Concept Elements
                </label>
                <input
                  type="text"
                  value={preferredSymbol}
                  onChange={(e) => setPreferredSymbol(e.target.value)}
                  placeholder="e.g. clean LC monogram with sparkle star, geometric ring, infinity loop..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs font-medium focus:outline-none focus:border-blue-500"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Gemini vector engine will incorporate these symbolic geometry cues into your logo concepts.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Submit Button & Progress State */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isGenerating || !businessName.trim()}
            className="w-full py-4 px-6 rounded-xl font-bold text-base text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 shadow-xl shadow-blue-600/25 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin text-cyan-300" />
                <span className="font-semibold tracking-wide">
                  {generationStep || 'Generating Professional Concepts...'}
                </span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-cyan-300" />
                <span>Generate Professional Logo Concepts</span>
                <span className="text-xs font-normal opacity-80 bg-black/20 px-2 py-0.5 rounded">
                  Gemini 3.8 Flash
                </span>
              </>
            )}
          </button>

          {isGenerating && (
            <div className="mt-3 space-y-1.5">
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 h-full w-full animate-pulse" />
              </div>
              <p className="text-center text-[11px] text-slate-400">
                Crafting geometric vector paths, color palettes, and typography pairings...
              </p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
