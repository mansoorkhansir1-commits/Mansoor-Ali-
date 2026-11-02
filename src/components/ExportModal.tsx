import React, { useState } from 'react';
import { 
  X, 
  Download, 
  FileCode, 
  Image as ImageIcon, 
  Package, 
  Check, 
  Copy, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { LogoConcept, EditorSettings } from '../types';
import { 
  synthesizeCustomSvg, 
  downloadHighResPng, 
  downloadSvgFile, 
  downloadBrandKitJson 
} from '../utils/svgEngine';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  concept: LogoConcept;
  settings: EditorSettings;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  concept,
  settings,
}) => {
  const [copiedSvg, setCopiedSvg] = useState(false);
  const [copiedCss, setCopiedCss] = useState(false);
  const [isExportingPng, setIsExportingPng] = useState(false);

  if (!isOpen) return null;

  const currentSvg = synthesizeCustomSvg(concept, settings);
  const brandSlug = settings.brandName.toLowerCase().replace(/[^a-z0-9]/g, '-');

  const cssTokens = `
/* Brand Design Tokens for ${settings.brandName} */
:root {
  --brand-primary: ${settings.gradientStart};
  --brand-secondary: ${settings.gradientEnd};
  --brand-accent: ${settings.accentColor};
  --brand-text: ${settings.textColor};
  --brand-font: '${settings.fontFamily}', sans-serif;
}
  `.trim();

  const handleCopySvg = () => {
    navigator.clipboard.writeText(currentSvg);
    setCopiedSvg(true);
    setTimeout(() => setCopiedSvg(false), 2000);
  };

  const handleCopyCss = () => {
    navigator.clipboard.writeText(cssTokens);
    setCopiedCss(true);
    setTimeout(() => setCopiedCss(false), 2000);
  };

  const handleDownloadPng = async (bg: string | null, label: string) => {
    try {
      setIsExportingPng(true);
      await downloadHighResPng(
        currentSvg,
        `${brandSlug}-logo-${label}-2000px.png`,
        bg,
        2000
      );
    } catch (err) {
      console.error('PNG export error:', err);
    } finally {
      setIsExportingPng(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#0B0F19] border border-slate-800 shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Export Brand & Logo Suite
              </h3>
              <p className="text-xs text-slate-400">
                Production-ready vector assets, high-res raster exports, and brand tokens
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors border border-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Logo Summary Preview Bar */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 flex items-center gap-4">
            <div 
              className="w-16 h-16 rounded-xl bg-slate-900 border border-slate-800 p-2 shrink-0 flex items-center justify-center select-none"
              dangerouslySetInnerHTML={{ __html: currentSvg }}
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-white truncate font-['Outfit']">
                {settings.brandName}
              </h4>
              <p className="text-xs text-slate-400 truncate">
                {settings.slogan || 'Vector Brand Identity'}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                  {settings.fontFamily}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                  {settings.gradientStart} → {settings.gradientEnd}
                </span>
              </div>
            </div>
          </div>

          {/* Export Options Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {/* 1. Vector SVG */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                <FileCode className="w-4 h-4 text-blue-400" />
                <span>Vector SVG File</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Infinite scalability without quality loss. Perfect for websites, software icons, and print media.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => downloadSvgFile(currentSvg, `${brandSlug}-vector-logo.svg`)}
                  className="flex-1 py-2 px-3 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .SVG</span>
                </button>
                <button
                  onClick={handleCopySvg}
                  className="py-2 px-3 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1 transition-colors"
                >
                  {copiedSvg ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSvg ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* 2. Brand Kit JSON */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                <Package className="w-4 h-4 text-purple-400" />
                <span>Brand Identity Package</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Includes SVG code, exact color palette hex codes, Google Font links, design tokens, and rationale.
              </p>
              <button
                onClick={() => downloadBrandKitJson(concept, settings)}
                className="w-full py-2 px-3 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center gap-1.5 shadow-sm transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Brand Kit (.JSON)</span>
              </button>
            </div>

            {/* 3. High-Res PNG (Transparent) */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                <ImageIcon className="w-4 h-4 text-cyan-400" />
                <span>High-Res PNG (Transparent)</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Rendered at 2000 × 2000 pixels with transparent alpha channel for overlays and merchandise.
              </p>
              <button
                disabled={isExportingPng}
                onClick={() => handleDownloadPng(null, 'transparent')}
                className="w-full py-2 px-3 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span>Download 2000px Transparent</span>
              </button>
            </div>

            {/* 4. High-Res PNG (Solid Dark / Light) */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                <ImageIcon className="w-4 h-4 text-emerald-400" />
                <span>High-Res PNG (Solid Background)</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Crisp 2000 × 2000 pixels on signature dark `#090D16` or pure white for presentation decks.
              </p>
              <div className="flex items-center gap-2">
                <button
                  disabled={isExportingPng}
                  onClick={() => handleDownloadPng('#090D16', 'dark')}
                  className="flex-1 py-2 px-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                >
                  Dark BG
                </button>
                <button
                  disabled={isExportingPng}
                  onClick={() => handleDownloadPng('#FFFFFF', 'light')}
                  className="flex-1 py-2 px-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                >
                  Light BG
                </button>
              </div>
            </div>
          </div>

          {/* CSS Design Tokens Snippet */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                CSS Variables & Design Tokens
              </span>
              <button
                onClick={handleCopyCss}
                className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1"
              >
                {copiedCss ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCss ? 'Copied' : 'Copy CSS'}</span>
              </button>
            </div>
            <pre className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto">
              {cssTokens}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
