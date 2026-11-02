import React, { useState } from 'react';
import { 
  Sliders, 
  Layers, 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  Info, 
  ExternalLink 
} from 'lucide-react';
import { LogoConcept } from '../types';

interface ConceptCardProps {
  concept: LogoConcept;
  isSelected: boolean;
  onSelect: (concept: LogoConcept) => void;
  onOpenStudio: (concept: LogoConcept) => void;
  onOpenMockup: (concept: LogoConcept) => void;
  onQuickDownloadSvg: (concept: LogoConcept) => void;
}

export const ConceptCard: React.FC<ConceptCardProps> = ({
  concept,
  isSelected,
  onSelect,
  onOpenStudio,
  onOpenMockup,
  onQuickDownloadSvg,
}) => {
  const [copied, setCopied] = useState(false);
  const [showRationale, setShowRationale] = useState(false);

  const handleCopySvg = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(concept.svgContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={() => onSelect(concept)}
      className={`group relative rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer ${
        isSelected
          ? 'bg-slate-900/95 border-blue-500 ring-2 ring-blue-500/60 shadow-xl shadow-blue-500/10'
          : 'bg-[#0B0F19]/90 border-slate-800/90 hover:border-slate-700 hover:shadow-lg hover:shadow-black/40'
      }`}
    >
      {/* Top Header Information */}
      <div className="p-4 pb-2 flex items-center justify-between border-b border-slate-800/60">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
            {concept.styleCategory}
          </span>
          <h3 className="text-sm font-bold text-white tracking-tight truncate max-w-[190px]">
            {concept.name}
          </h3>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Quick Copy SVG Code */}
          <button
            onClick={handleCopySvg}
            title="Copy SVG XML"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          {/* Quick Download SVG */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickDownloadSvg(concept);
            }}
            title="Download SVG"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* SVG Preview Canvas Area */}
      <div className="relative w-full aspect-square p-6 flex items-center justify-center bg-gradient-to-b from-[#090D16] to-[#0D121F] overflow-hidden group-hover:scale-[1.01] transition-transform duration-300">
        {/* Subtle grid pattern background */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* SVG Container */}
        <div 
          className="w-full h-full max-w-[280px] max-h-[280px] flex items-center justify-center drop-shadow-2xl select-none"
          dangerouslySetInnerHTML={{ __html: concept.svgContent }}
        />

        {/* Floating Quick Action Overlay on Hover */}
        <div className="absolute inset-x-4 bottom-4 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-slate-950/80 backdrop-blur-md p-2 rounded-xl border border-slate-700/80">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenStudio(concept);
            }}
            className="flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Customize Studio</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenMockup(concept);
            }}
            className="py-1.5 px-3 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center gap-1"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Mockups</span>
          </button>
        </div>
      </div>

      {/* Footer Info: Colors, Typography & Rationale */}
      <div className="p-4 pt-3 bg-slate-950/80 border-t border-slate-800/80 space-y-2.5">
        <div className="flex items-center justify-between">
          {/* Color swatches */}
          <div className="flex items-center gap-1.5">
            {concept.colors.slice(0, 4).map((c, idx) => (
              <span
                key={idx}
                className="w-4 h-4 rounded-full border border-white/20 shadow-xs"
                style={{ backgroundColor: c }}
                title={c}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-medium text-slate-400">
              {concept.fontFamily}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowRationale(!showRationale);
              }}
              className="text-slate-400 hover:text-blue-400 transition-colors"
              title="Design Rationale"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Collapsible Design Theory Rationale */}
        {showRationale && (
          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 leading-relaxed animate-in fade-in">
            <span className="font-semibold text-blue-400 block mb-0.5">Design Rationale:</span>
            {concept.rationale}
          </div>
        )}
      </div>
    </div>
  );
};
