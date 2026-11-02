import React, { useState } from 'react';
import { Sparkles, Sliders, Layers, Download, Copy, Check, Eye } from 'lucide-react';
import { SHOWCASE_LOGOS } from '../data/presets';
import { LogoConcept } from '../types';
import { downloadSvgFile } from '../utils/svgEngine';

interface ShowcaseGalleryProps {
  onSelectConcept: (concept: LogoConcept) => void;
  onOpenStudio: (concept: LogoConcept) => void;
  onOpenMockup: (concept: LogoConcept) => void;
}

export const ShowcaseGallery: React.FC<ShowcaseGalleryProps> = ({
  onSelectConcept,
  onOpenStudio,
  onOpenMockup,
}) => {
  const [filter, setFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredLogos = filter === 'all'
    ? SHOWCASE_LOGOS
    : SHOWCASE_LOGOS.filter(l => l.styleCategory.toLowerCase().includes(filter.toLowerCase()));

  const handleCopy = (concept: LogoConcept) => {
    navigator.clipboard.writeText(concept.svgContent);
    setCopiedId(concept.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white tracking-tight">
              Curated Brand Showcase
            </h2>
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-blue-900/60 text-blue-300 border border-blue-700/50">
              Flagship Collection
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Explore ready-to-use professional vector marks and monograms created with LogoCraft AI
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
          {[
            { id: 'all', label: 'All Styles' },
            { id: 'monogram', label: 'Monogram & Sparkle' },
            { id: 'gradient', label: 'Modern Gradient' },
            { id: 'luxury', label: 'Luxury Crest' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === tab.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Showcase Logos */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredLogos.map((concept) => {
          const isSignature = concept.id === 'showcase-logocraft-signature';

          return (
            <div
              key={concept.id}
              className={`group relative rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer ${
                isSignature
                  ? 'bg-gradient-to-b from-blue-950/20 via-slate-900/95 to-[#0B0F19] border-blue-500/70 ring-1 ring-blue-500/40 shadow-xl shadow-blue-500/10'
                  : 'bg-[#0B0F19]/90 border-slate-800/90 hover:border-slate-700 hover:shadow-xl'
              }`}
              onClick={() => {
                onSelectConcept(concept);
                onOpenStudio(concept);
              }}
            >
              {/* Card Header */}
              <div className="p-4 pb-2 border-b border-slate-800/60 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
                    {concept.styleCategory}
                  </span>
                  <h3 className="text-sm font-bold text-white truncate max-w-[170px]">
                    {concept.name}
                  </h3>
                </div>

                {isSignature && (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm">
                    Flagship
                  </span>
                )}
              </div>

              {/* Vector SVG Canvas */}
              <div className="relative aspect-square p-6 flex items-center justify-center bg-gradient-to-b from-[#090D16] to-[#0D121F] overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
                <div 
                  className="w-full h-full max-w-[240px] max-h-[240px] flex items-center justify-center drop-shadow-xl select-none"
                  dangerouslySetInnerHTML={{ __html: concept.svgContent }}
                />

                {/* Hover Quick Actions */}
                <div className="absolute inset-x-3 bottom-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-slate-950/90 backdrop-blur-md p-1.5 rounded-xl border border-slate-700">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectConcept(concept);
                      onOpenStudio(concept);
                    }}
                    className="flex-1 py-1 px-2 text-[11px] font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center justify-center gap-1 shadow-sm"
                  >
                    <Sliders className="w-3 h-3" />
                    <span>Customize</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectConcept(concept);
                      onOpenMockup(concept);
                    }}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg"
                    title="View Mockup"
                  >
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(concept);
                    }}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg"
                    title="Copy SVG"
                  >
                    {copiedId === concept.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadSvgFile(concept.svgContent, `${concept.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}.svg`);
                    }}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg"
                    title="Download SVG"
                  >
                    <Download className="w-3.5 h-3.5 text-blue-400" />
                  </button>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-3.5 bg-slate-950/80 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-[11px]">{concept.fontFamily}</span>
                <span className="text-[11px] text-blue-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                  Open Studio →
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
