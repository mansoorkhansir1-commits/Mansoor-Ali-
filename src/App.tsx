import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { LogoForm } from './components/LogoForm';
import { ConceptCard } from './components/ConceptCard';
import { LogoStudio } from './components/LogoStudio';
import { MockupLab } from './components/MockupLab';
import { ShowcaseGallery } from './components/ShowcaseGallery';
import { ExportModal } from './components/ExportModal';
import { SignatureLogo } from './components/SignatureLogo';
import { LogoConcept, BrandConfig, EditorSettings } from './types';
import { SHOWCASE_LOGOS, COLOR_PALETTES } from './data/presets';
import { downloadSvgFile } from './utils/svgEngine';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'generator' | 'studio' | 'mockups' | 'showcase'>('generator');
  const [concepts, setConcepts] = useState<LogoConcept[]>(SHOWCASE_LOGOS);
  const [selectedConcept, setSelectedConcept] = useState<LogoConcept>(SHOWCASE_LOGOS[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');
  const [isRefining, setIsRefining] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Initial Brand Form config
  const [brandConfig, setBrandConfig] = useState<BrandConfig>({
    businessName: 'LogoCraft AI',
    slogan: 'Next-Gen Brand Studio',
    style: 'monogram',
    industry: 'Artificial Intelligence / SaaS',
    colorPalette: {
      id: COLOR_PALETTES[0].id,
      name: COLOR_PALETTES[0].name,
      gradientStart: COLOR_PALETTES[0].gradientStart,
      gradientEnd: COLOR_PALETTES[0].gradientEnd,
      accent: COLOR_PALETTES[0].accent,
    },
    monogramInitials: 'LC',
    preferredSymbol: 'clean LC monogram combined with a small sparkle creative-star icon',
  });

  // Editor Settings state synchronized with selected concept
  const [editorSettings, setEditorSettings] = useState<EditorSettings>({
    brandName: SHOWCASE_LOGOS[0].name,
    slogan: SHOWCASE_LOGOS[0].tagline || 'NEXT-GEN BRAND STUDIO',
    fontFamily: SHOWCASE_LOGOS[0].fontFamily || 'Outfit',
    fontSize: 38,
    letterSpacing: 2,
    fontWeight: '700',
    gradientStart: SHOWCASE_LOGOS[0].colors[0] || '#2563EB',
    gradientEnd: SHOWCASE_LOGOS[0].colors[1] || '#7C3AED',
    accentColor: SHOWCASE_LOGOS[0].colors[2] || '#38BDF8',
    textColor: '#FFFFFF',
    backgroundColor: '#090D16',
    bgType: 'dark',
    iconScale: 1,
    iconRotation: 0,
    showSparkles: true,
    sparkleCount: 2,
    layout: (SHOWCASE_LOGOS[0].layoutType as any) || 'stacked',
    badgeShape: 'none',
  });

  // Handler: Select a concept and sync settings
  const handleSelectConcept = (concept: LogoConcept) => {
    setSelectedConcept(concept);
    setEditorSettings((prev) => ({
      ...prev,
      brandName: concept.name.split(' ')[0] === 'LogoCraft' ? 'LogoCraft AI' : concept.name,
      slogan: concept.tagline || brandConfig.slogan || 'NEXT-GEN BRAND STUDIO',
      fontFamily: concept.fontFamily || 'Outfit',
      gradientStart: concept.colors[0] || prev.gradientStart,
      gradientEnd: concept.colors[1] || prev.gradientEnd,
      accentColor: concept.colors[2] || prev.accentColor,
      layout: (concept.layoutType as any) || 'stacked',
    }));
  };

  // Handler: Open Studio with specific concept
  const handleOpenStudio = (concept: LogoConcept) => {
    handleSelectConcept(concept);
    setActiveTab('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler: Open Mockups with specific concept
  const handleOpenMockup = (concept: LogoConcept) => {
    handleSelectConcept(concept);
    setActiveTab('mockups');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler: Quick SVG download
  const handleQuickDownloadSvg = (concept: LogoConcept) => {
    const slug = concept.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    downloadSvgFile(concept.svgContent, `${slug}-vector.svg`);
  };

  // Handler: Select a prompt chip from Hero Banner
  const handleSelectPrompt = async (
    name: string,
    slogan: string,
    style: string,
    initials?: string
  ) => {
    const newConfig: BrandConfig = {
      ...brandConfig,
      businessName: name,
      slogan,
      style,
      monogramInitials: initials || name.slice(0, 2).toUpperCase(),
    };
    setBrandConfig(newConfig);
    await handleGenerate(newConfig);
  };

  // Handler: Generate Logos via /api/generate-logos
  const handleGenerate = async (config: BrandConfig) => {
    setIsGenerating(true);
    setGenerationStep('Analyzing Brand DNA & Aesthetics...');

    try {
      setTimeout(() => setGenerationStep('Synthesizing Geometric Vector Paths...'), 800);
      setTimeout(() => setGenerationStep('Pairing Modern Typography & Gradients...'), 1600);

      const response = await fetch('/api/generate-logos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      const data = await response.json();

      if (data.concepts && Array.isArray(data.concepts) && data.concepts.length > 0) {
        setConcepts(data.concepts);
        handleSelectConcept(data.concepts[0]);
        setActiveTab('generator');
        // Scroll to results
        setTimeout(() => {
          const el = document.getElementById('concepts-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        throw new Error('No concepts returned');
      }
    } catch (err) {
      console.error('Generation error:', err);
    } finally {
      setIsGenerating(false);
      setGenerationStep('');
    }
  };

  // Handler: AI Refinement via /api/refine-logo
  const handleRefineWithAi = async (instruction: string) => {
    if (!selectedConcept) return;
    setIsRefining(true);

    try {
      const response = await fetch('/api/refine-logo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentSvg: selectedConcept.svgContent,
          instruction,
          brandName: editorSettings.brandName,
          currentColors: [
            editorSettings.gradientStart,
            editorSettings.gradientEnd,
            editorSettings.accentColor,
          ],
        }),
      });

      const data = await response.json();
      if (data.modifiedSvg) {
        const updated: LogoConcept = {
          ...selectedConcept,
          svgContent: data.modifiedSvg,
        };
        setSelectedConcept(updated);
        // Also update in concepts list
        setConcepts((prev) =>
          prev.map((c) => (c.id === selectedConcept.id ? updated : c))
        );
      }
    } catch (err) {
      console.error('Refinement failed:', err);
    } finally {
      setIsRefining(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col selection:bg-blue-600/30 selection:text-blue-200">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedConcept={selectedConcept}
        onOpenExport={() => setIsExportModalOpen(true)}
        onStartNew={() => {
          setActiveTab('generator');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Content Area based on Tab */}
      <main className="flex-1">
        {activeTab === 'generator' && (
          <div className="space-y-12 pb-16">
            {/* Hero Banner with value propositions and signature LC concept */}
            <HeroBanner onSelectPrompt={handleSelectPrompt} />

            {/* Logo Configuration Form */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <LogoForm
                initialConfig={brandConfig}
                onGenerate={handleGenerate}
                isGenerating={isGenerating}
                generationStep={generationStep}
              />
            </div>

            {/* Generated Concepts Section */}
            <div id="concepts-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-extrabold text-white font-['Outfit'] tracking-tight">
                      Generated Concepts for{' '}
                      <span className="text-blue-400">{brandConfig.businessName}</span>
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-950 text-blue-300 border border-blue-800">
                      {concepts.length} Vectors
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Select any concept to open in the interactive Logo Studio, test real-world mockups, or download production assets.
                  </p>
                </div>

                {selectedConcept && (
                  <button
                    onClick={() => setActiveTab('studio')}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20 transition-all"
                  >
                    <span>Customize in Studio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Grid of Concept Cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {concepts.map((concept) => (
                  <ConceptCard
                    key={concept.id}
                    concept={concept}
                    isSelected={selectedConcept?.id === concept.id}
                    onSelect={handleSelectConcept}
                    onOpenStudio={handleOpenStudio}
                    onOpenMockup={handleOpenMockup}
                    onQuickDownloadSvg={handleQuickDownloadSvg}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Logo Studio */}
        {activeTab === 'studio' && selectedConcept && (
          <LogoStudio
            concept={selectedConcept}
            settings={editorSettings}
            onUpdateSettings={setEditorSettings}
            onOpenMockups={() => setActiveTab('mockups')}
            onOpenExport={() => setIsExportModalOpen(true)}
            onRefineWithAi={handleRefineWithAi}
            isRefining={isRefining}
          />
        )}

        {/* Tab 3: Real-World Mockups */}
        {activeTab === 'mockups' && selectedConcept && (
          <MockupLab
            concept={selectedConcept}
            settings={editorSettings}
            onOpenStudio={() => setActiveTab('studio')}
            onOpenExport={() => setIsExportModalOpen(true)}
          />
        )}

        {/* Tab 4: Showcase Gallery */}
        {activeTab === 'showcase' && (
          <ShowcaseGallery
            onSelectConcept={handleSelectConcept}
            onOpenStudio={handleOpenStudio}
            onOpenMockup={handleOpenMockup}
          />
        )}
      </main>

      {/* Export Suite Modal */}
      {selectedConcept && (
        <ExportModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          concept={selectedConcept}
          settings={editorSettings}
        />
      )}

      {/* Global Footer */}
      <footer className="border-t border-slate-800/80 bg-[#070A10] py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <SignatureLogo size="sm" />
            <span className="text-slate-400">
              © {new Date().getFullYear()} LogoCraft AI. Scalable generative vector marks.
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% Commercial Vector SVG
            </span>
            <span className="text-slate-700">•</span>
            <span className="text-slate-400">
              Powered by <span className="text-blue-400 font-semibold">Gemini 3.8 Flash</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
