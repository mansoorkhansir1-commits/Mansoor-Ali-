import React, { useState } from 'react';
import { 
  Type, 
  Palette, 
  Layout, 
  Sparkles, 
  Wand2, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Download, 
  Copy, 
  Check, 
  Layers, 
  Eye, 
  Sun, 
  Moon, 
  Grid,
  Send,
  RefreshCw
} from 'lucide-react';
import { LogoConcept, EditorSettings } from '../types';
import { FONT_OPTIONS, COLOR_PALETTES } from '../data/presets';
import { synthesizeCustomSvg, downloadSvgFile } from '../utils/svgEngine';

interface LogoStudioProps {
  concept: LogoConcept;
  settings: EditorSettings;
  onUpdateSettings: (settings: EditorSettings) => void;
  onOpenMockups: () => void;
  onOpenExport: () => void;
  onRefineWithAi: (instruction: string) => Promise<void>;
  isRefining: boolean;
}

export const LogoStudio: React.FC<LogoStudioProps> = ({
  concept,
  settings,
  onUpdateSettings,
  onOpenMockups,
  onOpenExport,
  onRefineWithAi,
  isRefining,
}) => {
  const [activePanel, setActivePanel] = useState<'type' | 'color' | 'layout' | 'ai'>('type');
  const [zoom, setZoom] = useState(1);
  const [copied, setCopied] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');

  // Generate current customized SVG string
  const currentSvg = synthesizeCustomSvg(concept, settings);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSvg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAiRefineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim() || isRefining) return;
    onRefineWithAi(aiPrompt.trim());
    setAiPrompt('');
  };

  // Helper to get background styling for canvas
  const getCanvasBackground = () => {
    switch (settings.bgType) {
      case 'light':
        return 'bg-white';
      case 'charcoal':
        return 'bg-[#18181B]';
      case 'transparent':
        return 'bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] bg-[#090D16]';
      case 'dark':
      default:
        return 'bg-[#090D16]';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Studio Top Control Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white tracking-tight">Logo Studio</h2>
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-blue-900/60 text-blue-300 border border-blue-700/50">
                Vector Editor
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Live vector customization, typography tweaking, and real-time palette refinement
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied SVG' : 'Copy SVG'}</span>
          </button>

          <button
            onClick={() => downloadSvgFile(currentSvg, `${settings.brandName.toLowerCase()}-logo.svg`)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>Download SVG</span>
          </button>

          <button
            onClick={onOpenMockups}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Mockups</span>
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

      {/* Main Studio Grid: Left Canvas, Right Controls */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Central Live Canvas Area (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative rounded-2xl border border-slate-800/90 shadow-2xl overflow-hidden bg-slate-950 flex flex-col">
            {/* Canvas Toolbar */}
            <div className="p-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
              {/* Background Color Switcher */}
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-medium mr-1 text-slate-400">Background:</span>
                <button
                  onClick={() => onUpdateSettings({ ...settings, bgType: 'dark', textColor: '#FFFFFF' })}
                  title="Dark Background"
                  className={`p-1.5 rounded-lg border transition-all ${
                    settings.bgType === 'dark'
                      ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                      : 'bg-slate-800 border-slate-700 hover:text-white'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onUpdateSettings({ ...settings, bgType: 'light', textColor: '#0F172A' })}
                  title="Light Background"
                  className={`p-1.5 rounded-lg border transition-all ${
                    settings.bgType === 'light'
                      ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                      : 'bg-slate-800 border-slate-700 hover:text-white'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onUpdateSettings({ ...settings, bgType: 'charcoal', textColor: '#FFFFFF' })}
                  title="Matte Charcoal"
                  className={`p-1.5 rounded-lg border transition-all ${
                    settings.bgType === 'charcoal'
                      ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                      : 'bg-slate-800 border-slate-700 hover:text-white'
                  }`}
                >
                  <span className="w-3.5 h-3.5 rounded bg-zinc-800 block border border-zinc-600" />
                </button>
                <button
                  onClick={() => onUpdateSettings({ ...settings, bgType: 'transparent', textColor: '#FFFFFF' })}
                  title="Transparent Checkered"
                  className={`p-1.5 rounded-lg border transition-all ${
                    settings.bgType === 'transparent'
                      ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                      : 'bg-slate-800 border-slate-700 hover:text-white'
                  }`}
                >
                  <Grid className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setZoom(Math.max(0.6, zoom - 0.15))}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-mono px-1.5">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  onClick={() => setZoom(Math.min(1.8, zoom + 0.15))}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setZoom(1)}
                  title="Reset Zoom"
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white ml-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Live Interactive SVG Canvas Viewport */}
            <div 
              className={`w-full aspect-square flex items-center justify-center p-8 transition-colors duration-300 overflow-hidden relative ${getCanvasBackground()}`}
            >
              <div 
                className="w-full h-full max-w-[420px] max-h-[420px] flex items-center justify-center transition-transform duration-200 drop-shadow-2xl select-none"
                style={{ transform: `scale(${zoom})` }}
                dangerouslySetInnerHTML={{ __html: currentSvg }}
              />

              {/* Watermark badge in editor */}
              <div className="absolute bottom-3 right-3 text-[10px] font-mono text-slate-500/60 uppercase tracking-widest pointer-events-none">
                500 × 500 Vector Canvas
              </div>
            </div>
          </div>
        </div>

        {/* Right Editor Controls (5 Cols) */}
        <div className="lg:col-span-5 rounded-2xl bg-slate-900/95 border border-slate-800 shadow-2xl p-5 space-y-5 backdrop-blur-md">
          {/* Panel Selector Tabs */}
          <div className="grid grid-cols-4 gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800">
            <button
              onClick={() => setActivePanel('type')}
              className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                activePanel === 'type'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Type className="w-3.5 h-3.5" />
              <span>Fonts</span>
            </button>

            <button
              onClick={() => setActivePanel('color')}
              className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                activePanel === 'color'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Colors</span>
            </button>

            <button
              onClick={() => setActivePanel('layout')}
              className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                activePanel === 'layout'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Layout className="w-3.5 h-3.5" />
              <span>Layout</span>
            </button>

            <button
              onClick={() => setActivePanel('ai')}
              className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                activePanel === 'ai'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>AI Refine</span>
            </button>
          </div>

          {/* TAB 1: Typography & Text */}
          {activePanel === 'type' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Brand Name Text
                </label>
                <input
                  type="text"
                  value={settings.brandName}
                  onChange={(e) => onUpdateSettings({ ...settings, brandName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm font-semibold focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Slogan / Tagline
                </label>
                <input
                  type="text"
                  value={settings.slogan}
                  onChange={(e) => onUpdateSettings({ ...settings, slogan: e.target.value })}
                  placeholder="Optional tagline..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Font Family
                </label>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                  {FONT_OPTIONS.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => onUpdateSettings({ ...settings, fontFamily: f.id })}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        settings.fontFamily === f.id
                          ? 'bg-blue-950/40 border-blue-500 text-white shadow-sm'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-sm font-semibold truncate" style={{ fontFamily: `'${f.id}', sans-serif` }}>
                        {f.name}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate mt-0.5">
                        {f.category}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sliders for Size and Spacing */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1 font-medium">
                    <span>Font Size</span>
                    <span className="font-mono text-blue-400">{settings.fontSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="24"
                    max="52"
                    value={settings.fontSize}
                    onChange={(e) => onUpdateSettings({ ...settings, fontSize: Number(e.target.value) })}
                    className="w-full accent-blue-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1 font-medium">
                    <span>Letter Spacing (Tracking)</span>
                    <span className="font-mono text-blue-400">{settings.letterSpacing}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={settings.letterSpacing}
                    onChange={(e) => onUpdateSettings({ ...settings, letterSpacing: Number(e.target.value) })}
                    className="w-full accent-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Colors & Gradients */}
          {activePanel === 'color' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  1-Click Designer Themes
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {COLOR_PALETTES.map((pal) => (
                    <button
                      key={pal.id}
                      type="button"
                      onClick={() =>
                        onUpdateSettings({
                          ...settings,
                          gradientStart: pal.gradientStart,
                          gradientEnd: pal.gradientEnd,
                          accentColor: pal.accent,
                        })
                      }
                      className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 flex items-center gap-2.5 text-left transition-all"
                    >
                      <div
                        className="w-6 h-6 rounded-full shrink-0 border border-white/20"
                        style={{
                          background: `linear-gradient(135deg, ${pal.gradientStart}, ${pal.gradientEnd})`,
                        }}
                      />
                      <div className="truncate">
                        <div className="text-xs font-semibold text-slate-200 truncate">{pal.name}</div>
                        <div className="text-[10px] text-slate-400">{pal.tag}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Gradient Controls */}
              <div className="space-y-3 pt-3 border-t border-slate-800">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Custom Colors & Gradients
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Gradient Start</label>
                    <div className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-950 border border-slate-800">
                      <input
                        type="color"
                        value={settings.gradientStart}
                        onChange={(e) => onUpdateSettings({ ...settings, gradientStart: e.target.value })}
                        className="w-7 h-7 rounded border-0 cursor-pointer bg-transparent"
                      />
                      <span className="text-xs font-mono text-slate-300">{settings.gradientStart}</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Gradient End</label>
                    <div className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-950 border border-slate-800">
                      <input
                        type="color"
                        value={settings.gradientEnd}
                        onChange={(e) => onUpdateSettings({ ...settings, gradientEnd: e.target.value })}
                        className="w-7 h-7 rounded border-0 cursor-pointer bg-transparent"
                      />
                      <span className="text-xs font-mono text-slate-300">{settings.gradientEnd}</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Sparkle & Accent</label>
                    <div className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-950 border border-slate-800">
                      <input
                        type="color"
                        value={settings.accentColor}
                        onChange={(e) => onUpdateSettings({ ...settings, accentColor: e.target.value })}
                        className="w-7 h-7 rounded border-0 cursor-pointer bg-transparent"
                      />
                      <span className="text-xs font-mono text-slate-300">{settings.accentColor}</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Text Color</label>
                    <div className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-950 border border-slate-800">
                      <input
                        type="color"
                        value={settings.textColor}
                        onChange={(e) => onUpdateSettings({ ...settings, textColor: e.target.value })}
                        className="w-7 h-7 rounded border-0 cursor-pointer bg-transparent"
                      />
                      <span className="text-xs font-mono text-slate-300">{settings.textColor}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Layout & Composition */}
          {activePanel === 'layout' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Composition Layout
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'stacked', name: 'Stacked (Icon Top)' },
                    { id: 'horizontal', name: 'Horizontal (Icon Left)' },
                    { id: 'badge', name: 'Artisan Badge / Seal' },
                    { id: 'icon-only', name: 'Icon / App Symbol' },
                  ].map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => onUpdateSettings({ ...settings, layout: l.id as any })}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                        settings.layout === l.id
                          ? 'bg-blue-950/40 border-blue-500 text-white shadow-sm'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {l.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Icon Scale Slider */}
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1 font-medium">
                  <span>Icon Mark Scale</span>
                  <span className="font-mono text-blue-400">{Math.round(settings.iconScale * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.6"
                  max="1.4"
                  step="0.05"
                  value={settings.iconScale}
                  onChange={(e) => onUpdateSettings({ ...settings, iconScale: Number(e.target.value) })}
                  className="w-full accent-blue-500"
                />
              </div>

              {/* Sparkles & Star Toggle */}
              <div className="pt-2 border-t border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Creative Sparkle Stars</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Geometric sparkle star accents
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.showSparkles}
                    onChange={(e) => onUpdateSettings({ ...settings, showSparkles: e.target.checked })}
                    className="w-4 h-4 accent-blue-500 rounded cursor-pointer"
                  />
                </div>

                {settings.showSparkles && (
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1.5">Sparkle Intensity</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 4].map((cnt) => (
                        <button
                          key={cnt}
                          type="button"
                          onClick={() => onUpdateSettings({ ...settings, sparkleCount: cnt })}
                          className={`py-1.5 rounded-lg text-xs font-medium border ${
                            settings.sparkleCount === cnt
                              ? 'bg-blue-600 text-white border-blue-500'
                              : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-900'
                          }`}
                        >
                          {cnt === 1 ? 'Single Spark' : cnt === 2 ? 'Dual Sparks' : 'Galaxy Spark'}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Optional Outer Badge Shape */}
              <div className="pt-2 border-t border-slate-800">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Emblem Outer Frame
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['none', 'circle', 'squircle', 'shield', 'octagon'].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => onUpdateSettings({ ...settings, badgeShape: b as any })}
                      className={`py-1.5 px-2 rounded-lg text-xs font-medium border capitalize ${
                        settings.badgeShape === b
                          ? 'bg-blue-600 text-white border-blue-500'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: AI Refine Assistant */}
          {activePanel === 'ai' && (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-800/40 text-xs text-blue-200">
                <span className="font-semibold block mb-1">Gemini 3.8 Flash Vector Co-Pilot:</span>
                Tell the AI what you want to modify (e.g. &quot;Make the lines bolder&quot;, &quot;Add a circular crown crest&quot;, &quot;Switch to cyber emerald neon&quot;).
              </div>

              <form onSubmit={handleAiRefineSubmit} className="space-y-3">
                <textarea
                  rows={3}
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="e.g. Add an interlocking ribbon curve around the letters, and make the creative star 20% larger with glowing cyan aura..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none font-medium"
                />

                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Make the monogram lines bolder',
                    'Add a subtle geometric outer shield',
                    'Increase the sparkle star size',
                    'Make it ultra minimalist',
                  ].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setAiPrompt(preset)}
                      className="px-2 py-1 rounded-md text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                    >
                      + {preset}
                    </button>
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={isRefining || !aiPrompt.trim()}
                  className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-md shadow-blue-600/20 disabled:opacity-50 flex items-center justify-center gap-2 transition-all"
                >
                  {isRefining ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-300" />
                      <span>Refining SVG with Gemini...</span>
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-3.5 h-3.5 text-cyan-300" />
                      <span>Refine Vector Logo with AI</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
