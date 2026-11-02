import React from 'react';
import { SignatureLogo } from './SignatureLogo';
import { Sparkles, Sliders, Layers, Eye, Download, Zap } from 'lucide-react';
import { LogoConcept } from '../types';

interface NavbarProps {
  activeTab: 'generator' | 'studio' | 'mockups' | 'showcase';
  setActiveTab: (tab: 'generator' | 'studio' | 'mockups' | 'showcase') => void;
  selectedConcept: LogoConcept | null;
  onOpenExport: () => void;
  onStartNew: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedConcept,
  onOpenExport,
  onStartNew,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#090D16]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand identity lockup */}
        <div 
          onClick={() => setActiveTab('generator')} 
          className="cursor-pointer transition-opacity hover:opacity-95"
        >
          <SignatureLogo size="md" />
        </div>

        {/* Center Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 p-1 bg-slate-900/90 border border-slate-800 rounded-xl shadow-inner">
          <button
            onClick={() => setActiveTab('generator')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'generator'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Generator</span>
          </button>

          <button
            onClick={() => setActiveTab('studio')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'studio'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Logo Studio</span>
            {selectedConcept && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('mockups')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'mockups'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Mockup Lab</span>
          </button>

          <button
            onClick={() => setActiveTab('showcase')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'showcase'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Showcase</span>
          </button>
        </nav>

        {/* Right Action buttons */}
        <div className="flex items-center gap-2.5">
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-950/40 border border-blue-800/40 text-[11px] font-medium text-blue-300">
            <Zap className="w-3 h-3 text-cyan-400" />
            <span>Gemini 3.8 Flash Vector Engine</span>
          </div>

          {selectedConcept && (
            <button
              onClick={onOpenExport}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              <span>Export Kit</span>
            </button>
          )}

          <button
            onClick={onStartNew}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-md shadow-blue-600/20 transition-all hover:shadow-blue-500/30"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Create Logo</span>
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="flex md:hidden border-t border-slate-800/60 bg-slate-900/90 px-4 py-2 gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('generator')}
          className={`px-3 py-1 text-xs font-medium rounded-lg whitespace-nowrap ${
            activeTab === 'generator' ? 'bg-blue-600 text-white' : 'text-slate-400'
          }`}
        >
          Generator
        </button>
        <button
          onClick={() => setActiveTab('studio')}
          className={`px-3 py-1 text-xs font-medium rounded-lg whitespace-nowrap ${
            activeTab === 'studio' ? 'bg-blue-600 text-white' : 'text-slate-400'
          }`}
        >
          Studio
        </button>
        <button
          onClick={() => setActiveTab('mockups')}
          className={`px-3 py-1 text-xs font-medium rounded-lg whitespace-nowrap ${
            activeTab === 'mockups' ? 'bg-blue-600 text-white' : 'text-slate-400'
          }`}
        >
          Mockups
        </button>
        <button
          onClick={() => setActiveTab('showcase')}
          className={`px-3 py-1 text-xs font-medium rounded-lg whitespace-nowrap ${
            activeTab === 'showcase' ? 'bg-blue-600 text-white' : 'text-slate-400'
          }`}
        >
          Showcase
        </button>
      </div>
    </header>
  );
};
