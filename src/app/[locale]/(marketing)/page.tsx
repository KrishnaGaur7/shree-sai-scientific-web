'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { 
  ArrowRight, 
  Cpu, 
  HardHat, 
  Layers, 
  ShieldCheck, 
  Activity, 
  Thermometer, 
  Compass, 
  Settings, 
  CheckCircle2, 
  ChevronRight, 
  Wand2, 
  Download 
} from 'lucide-react';
import { Header } from '@/components/layouts/Header';
import { Footer } from '@/components/layouts/Footer';
import { Link } from '@/i18n/routing';

const WebGLCanvas = dynamic(() => import('@/components/webgl/WebGLCanvas'), { 
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[450px] items-center justify-center border border-dashed border-steel-gray rounded-radius-md bg-dark-obsidian/30">
      <span className="text-sm font-mono text-text-muted animate-pulse">Loading 3D WebGL Engine...</span>
    </div>
  )
});

// Interactive Explorer Local Database
const EXPLORER_PRODUCTS = [
  {
    id: 'reactors',
    title: 'BGR-J Series Jacketed Reactor',
    desc: 'High-visibility process reaction system designed for complete visual monitoring of synthesis reactions up to 200°C and full vacuum conditions.',
    image: '/assets/images/jacketed-reactor.png',
    specs: [
      { label: 'Thermal Delta-T', value: '110°C continuous' },
      { label: 'Pressure Range', value: 'Full vacuum to +0.5 bar' },
      { label: 'Vessel Volume', value: '10L to 300L standard' },
      { label: 'Glass Composition', value: 'Borosilicate Glass 3.3' }
    ],
    features: [
      'Zero-contamination mechanical stirrer seal',
      'Integrated bottom flush valve with zero dead-space',
      'Dual-jacket thermal insulation barrier',
      'CE-PED pressure validation compliance'
    ],
    catalogLink: '/products/glass-reactors/jacketed-glass-reactor',
    docs: [
      { label: 'Technical Datasheet (PDF)', path: '/assets/documents/datasheets/BGR-J-Specs.pdf' },
      { label: 'STP Model Drawing (CAD)', path: '/assets/documents/cad/BGR-J100.stp' }
    ]
  },
  {
    id: 'exchangers',
    title: 'SHT Series Shell & Tube Exchanger',
    desc: 'Precision industrial heat transfer system equipped with highly inert borosilicate 3.3 tubing and corrosion-resistant PTFE tube sheets.',
    image: '/assets/images/heat-exchanger.png',
    specs: [
      { label: 'Exchange Area', value: '0.5 m² to 15.0 m²' },
      { label: 'Working Temp', value: '-50°C to +200°C' },
      { label: 'Tube Material', value: 'Borosilicate glass 3.3' },
      { label: 'Shell Material', value: 'Glass, PTFE, or Steel' }
    ],
    features: [
      'Universal chemical resistance to aggressive acids',
      'Floating tube sheet expansion design',
      'Multi-pass configuration options',
      'GMP sanitary compliance layouts'
    ],
    catalogLink: '/products/heat-exchangers/shell-tube-heat-exchanger',
    docs: [
      { label: 'Performance Matrix (PDF)', path: '/assets/documents/datasheets/SHT-Exchanger-Specs.pdf' },
      { label: 'STP Model Drawing (CAD)', path: '/assets/documents/cad/SHT-05.stp' }
    ]
  },
  {
    id: 'piping',
    title: 'PTFE Lined Piping Systems',
    desc: 'Heavy-wall virgin PTFE lined carbon steel process pipes and fittings certified to resist thermal shock and strong corrosive media.',
    image: '/assets/images/heat-exchanger.png', // Fallback
    specs: [
      { label: 'Liner Material', value: 'High-density virgin PTFE' },
      { label: 'Liner Thickness', value: '>= 3.0mm standard' },
      { label: 'ASTM Compliance', value: 'ASTM F1545 standard' },
      { label: 'Spark Test Rate', value: '10,000V spark verified' }
    ],
    features: [
      'Universal corrosion resistance',
      'Anti-static liner configurations',
      'Full vacuum service up to 150°C',
      'Custom piping layouts fabrications'
    ],
    catalogLink: '/products/ptfe-lined-pipes',
    docs: [
      { label: 'Dimension Handbook (PDF)', path: '/assets/documents/datasheets/PTFE-Pipes-Specs.pdf' },
      { label: 'STP Model Drawing (CAD)', path: '/assets/documents/cad/PTFE-PIPE-3IN.stp' }
    ]
  }
];

export default function Home() {
  const t = useTranslations('homepage');
  const tCommon = useTranslations('common');
  const [activeTab, setActiveTab] = useState('reactors');
  const [quickPrompt, setQuickPrompt] = useState('');

  const currentProduct = EXPLORER_PRODUCTS.find(p => p.id === activeTab) || EXPLORER_PRODUCTS[0];

  return (
    <div className="flex min-h-screen flex-col bg-dark-obsidian font-sans text-text-main relative overflow-hidden">
      {/* Immersive background grids & glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-[10%] left-[-15%] w-[450px] h-[450px] bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.07)_0%,transparent_60%)] blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-[20%] right-[-15%] w-[450px] h-[450px] bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.06)_0%,transparent_60%)] blur-3xl pointer-events-none rounded-full" />

      <Header />

      <main className="flex-1 flex flex-col z-10">
        
        {/* HERO SECTION */}
        <section className="relative mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-b border-steel-gray">
          
          {/* Hero copy */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-950/60 border border-steel-gray rounded-full text-[10px] font-mono tracking-wider text-pure-white uppercase">
              <span className="h-2 w-2 rounded-full bg-tech-orange animate-pulse" />
              {t('hero.tag')}
            </div>
            
            <div className="space-y-4">
              <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-pure-white leading-tight">
                Engineering <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-glass-cyan via-pure-white to-tech-orange">
                  Zero-Contamination
                </span> <br />
                Process Glass Systems
              </h1>

              <p className="text-text-muted font-sans text-sm sm:text-base leading-relaxed max-w-xl">
                {t('hero.desc')}
              </p>
            </div>

            {/* Spec tags strip */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              <span className="px-3 py-1.5 bg-steel-gray/30 border border-steel-gray text-[10px] font-mono text-glass-cyan rounded-radius-xs">
                BOROSILICATE 3.3
              </span>
              <span className="px-3 py-1.5 bg-steel-gray/30 border border-steel-gray text-[10px] font-mono text-tech-orange rounded-radius-xs">
                VIRGIN PTFE LINED
              </span>
              <span className="px-3 py-1.5 bg-steel-gray/30 border border-steel-gray text-[10px] font-mono text-pure-white rounded-radius-xs">
                ISO 9001:2015 CERTIFIED
              </span>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link 
                href="/rfq" 
                className="inline-flex items-center gap-2 bg-tech-orange text-pure-white font-display text-sm font-semibold px-7 py-3.5 rounded-radius-sm hover:scale-[1.03] hover:shadow-glow active:scale-[0.97] transition-all"
              >
                {tCommon('buttons.inquiry')}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link 
                href="/products" 
                className="inline-flex items-center justify-center bg-transparent border border-steel-gray text-text-muted hover:text-pure-white hover:border-glass-cyan font-mono text-xs px-7 py-3.5 rounded-radius-sm hover:bg-steel-gray/20 transition-all"
              >
                {tCommon('buttons.viewCatalog')}
              </Link>
            </div>
          </div>

          {/* Hero 3D telemetry display console */}
          <div className="lg:col-span-6 w-full relative flex items-center justify-center">
            
            <div className="relative w-full border border-glass-cyan/30 rounded-radius-lg p-6 bg-dark-obsidian/75 backdrop-blur-md overflow-hidden group shadow-glow min-h-[480px] flex flex-col justify-between">
              
              {/* Sci-Fi HUD markings */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.04)_0%,transparent_60%)] pointer-events-none" />
              
              <div className="flex items-center justify-between border-b border-steel-gray pb-3 relative z-10">
                <div className="flex items-center gap-1.5 font-mono text-[9px] text-glass-cyan tracking-widest uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-glass-cyan animate-ping" />
                  SYSTEM_TELEMETRY: ACTIVE_60FPS
                </div>
                <div className="font-mono text-[9px] text-text-muted">
                  MATRIX_REV_V0.9
                </div>
              </div>

              {/* 3D Canvas */}
              <div className="w-full h-[320px] relative z-10 flex items-center justify-center">
                <WebGLCanvas />
              </div>

              {/* Interactive Telemetry HUD values */}
              <div className="grid grid-cols-3 gap-2 border-t border-steel-gray pt-4 font-mono text-[9px] text-text-muted relative z-10 text-left bg-slate-950/45 p-3 rounded">
                <div>
                  <span className="block text-glass-cyan uppercase font-bold">MODEL TYPE</span>
                  <span className="text-pure-white font-medium">BGR-J100_FLANGE</span>
                </div>
                <div>
                  <span className="block text-tech-orange uppercase font-bold">TEMP ENVELOPE</span>
                  <span className="text-pure-white font-medium">-80°C TO +200°C</span>
                </div>
                <div>
                  <span className="block text-pure-white uppercase font-bold">SEAL INDEX</span>
                  <span className="text-pure-white font-medium">FULL_VACUUM</span>
                </div>
              </div>

              {/* Corner crosshairs targets */}
              <div className="absolute top-1/2 left-4 h-4 w-0.5 bg-glass-cyan/30 -translate-y-1/2" />
              <div className="absolute top-1/2 right-4 h-4 w-0.5 bg-glass-cyan/30 -translate-y-1/2" />
              <div className="absolute bottom-16 left-1/2 w-4 h-0.5 bg-glass-cyan/30 -translate-x-1/2" />
              <div className="absolute top-16 left-1/2 w-4 h-0.5 bg-glass-cyan/30 -translate-x-1/2" />

            </div>
          </div>
        </section>

        {/* STATISTICS STRIP */}
        <section className="border-b border-steel-gray bg-dark-obsidian/30 py-10 relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
              <div className="space-y-1">
                <span className="block font-mono text-3xl sm:text-4xl font-bold text-tech-orange">24+</span>
                <span className="text-[10px] text-text-muted font-sans uppercase tracking-widest font-semibold block">{t('stats.years')}</span>
              </div>
              <div className="space-y-1">
                <span className="block font-mono text-3xl sm:text-4xl font-bold text-tech-orange">40+</span>
                <span className="text-[10px] text-text-muted font-sans uppercase tracking-widest font-semibold block">{t('stats.countries')}</span>
              </div>
              <div className="space-y-1">
                <span className="block font-mono text-3xl sm:text-4xl font-bold text-tech-orange">1,500+</span>
                <span className="text-[10px] text-text-muted font-sans uppercase tracking-widest font-semibold block">{t('stats.plants')}</span>
              </div>
              <div className="space-y-1">
                <span className="block font-mono text-3xl sm:text-4xl font-bold text-tech-orange">ISO 9001</span>
                <span className="text-[10px] text-text-muted font-sans uppercase tracking-widest font-semibold block">{t('stats.facilities')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* DYNAMIC CATALOG EXPLORER CONSOLE (AWWWARDS SECTION) */}
        <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-20 border-b border-steel-gray">
          
          <div className="text-left space-y-4 max-w-xl border-l-2 border-glass-cyan pl-6 mb-16">
            <span className="font-mono text-xs text-glass-cyan uppercase tracking-wider block font-bold">Engineering Database Scan</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-pure-white tracking-tight">
              Interactive Component Explorer
            </h2>
            <p className="text-text-muted text-xs sm:text-sm font-sans leading-relaxed">
              Scan through detailed drawings, physical parameters tolerances, and CAD datasheets for our principal chemical engineering products divisions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left selector console column */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-4">
              <div className="space-y-2">
                <span className="block font-mono text-[9px] text-text-muted uppercase tracking-widest">Select Product Catalog</span>
                <div className="flex flex-col gap-3">
                  {EXPLORER_PRODUCTS.map((prod) => (
                    <button
                      key={prod.id}
                      onClick={() => setActiveTab(prod.id)}
                      className={`w-full p-4 rounded-radius-md border text-left flex items-center justify-between transition-all duration-300 ${
                        activeTab === prod.id
                          ? 'bg-glass-cyan/10 border-glass-cyan text-pure-white shadow-glow'
                          : 'border-steel-gray text-text-muted hover:border-steel-gray/80 hover:bg-steel-gray/10'
                      }`}
                    >
                      <div>
                        <span className="block font-display text-sm font-bold">{prod.title.split(' ')[0] + ' ' + prod.title.split(' ')[1]}</span>
                        <span className="text-[10px] font-mono text-text-muted opacity-80">{prod.id.toUpperCase()} CAT_REF</span>
                      </div>
                      <ChevronRight className={`h-4.5 w-4.5 transition-transform ${activeTab === prod.id ? 'translate-x-1 text-glass-cyan' : ''}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Action trigger portal card */}
              <div className="card-glass p-5 space-y-4 bg-slate-950/40 relative overflow-hidden border-dashed">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4.5 w-4.5 text-tech-orange" />
                  <span className="font-mono text-[9px] text-pure-white uppercase tracking-wider font-bold">Standard Integrity Guaranteed</span>
                </div>
                <p className="text-[11px] leading-relaxed text-text-muted text-left">
                  All components conform strictly to global ASTM, CE-PED pressure limits, and FDA glass-safety standards.
                </p>
              </div>
            </div>

            {/* Right detailed specifications console window */}
            <div className="lg:col-span-8 card-glass p-6 sm:p-8 flex flex-col justify-between bg-dark-obsidian/75 relative">
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.03)_0%,transparent_70%)] pointer-events-none" />

              <div className="space-y-6">
                
                {/* Header info */}
                <div className="border-b border-steel-gray pb-4 space-y-2 text-left">
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-pure-white">
                    {currentProduct.title}
                  </h3>
                  <p className="text-text-muted text-xs sm:text-sm leading-relaxed">
                    {currentProduct.desc}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  
                  {/* Specs parameters lists */}
                  <div className="space-y-4">
                    <span className="block font-mono text-[9px] text-text-muted uppercase tracking-widest">Mechanical Parameters</span>
                    <div className="space-y-2 font-mono text-xs">
                      {currentProduct.specs.map((s, idx) => (
                        <div key={idx} className="flex justify-between border-b border-steel-gray/45 pb-1">
                          <span className="text-text-muted">{s.label}:</span>
                          <span className="text-pure-white font-bold">{s.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Highlights features bullets */}
                  <div className="space-y-4">
                    <span className="block font-mono text-[9px] text-text-muted uppercase tracking-widest">Engineering Highlights</span>
                    <ul className="space-y-2 text-xs">
                      {currentProduct.features.map((f, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-text-muted">
                          <CheckCircle2 className="h-4 w-4 text-glass-cyan shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>

              {/* Downloads & Handoff attachments links footer */}
              <div className="border-t border-steel-gray pt-6 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  {currentProduct.docs.map((doc, idx) => (
                    <a
                      key={idx}
                      href={doc.path}
                      download
                      className="inline-flex items-center gap-1.5 text-[10px] font-mono text-text-muted hover:text-glass-cyan bg-steel-gray/25 border border-steel-gray/60 px-3 py-1.5 rounded transition-colors"
                    >
                      <Download className="h-3 w-3" /> {doc.label}
                    </a>
                  ))}
                </div>

                <Link
                  href={currentProduct.catalogLink}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-tech-orange text-pure-white font-mono text-xs px-5 py-2.5 rounded-radius-xs hover:bg-tech-orange/90 transition-colors"
                >
                  VIEW SPECS SHEET <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

            </div>

          </div>

        </section>

        {/* CORE PRODUCT DIVISIONS */}
        <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-20 border-b border-steel-gray relative">
          
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="font-mono text-xs text-tech-orange uppercase tracking-widest font-bold">Process Architecture</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-pure-white tracking-tight">
              {t('divisions.title')}
            </h2>
            <p className="text-text-muted text-xs sm:text-sm font-sans leading-relaxed max-w-md mx-auto">
              {t('divisions.desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Division 1: Glass */}
            <div className="card-glass p-8 space-y-6 flex flex-col justify-between hover:scale-[1.02] hover:-translate-y-1.5 transition-all duration-300 relative bg-dark-obsidian/45">
              <div className="absolute inset-0 bg-gradient-to-b from-glass-cyan/3 to-transparent pointer-events-none" />
              <div className="space-y-4 text-left">
                <div className="h-12 w-12 rounded-radius-md bg-glass-cyan/10 border border-glass-cyan/30 flex items-center justify-center text-glass-cyan mb-2">
                  <Layers className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-pure-white">{t('divisions.glassTitle')}</h3>
                <p className="text-text-muted text-xs sm:text-sm leading-relaxed">
                  {t('divisions.glassDesc')}
                </p>
              </div>
              <div className="pt-4 border-t border-steel-gray/60 flex items-center justify-between">
                <Link href="/products/glass-reactors" className="inline-flex items-center gap-1.5 text-xs font-mono text-tech-orange hover:text-pure-white transition-colors">
                  {tCommon('buttons.viewGlass')} <ArrowRight className="h-3 w-3" />
                </Link>
                <span className="font-mono text-[9px] text-text-muted uppercase">SYS_REF_GL</span>
              </div>
            </div>

            {/* Division 2: PTFE */}
            <div className="card-glass p-8 space-y-6 flex flex-col justify-between hover:scale-[1.02] hover:-translate-y-1.5 transition-all duration-300 relative bg-dark-obsidian/45">
              <div className="absolute inset-0 bg-gradient-to-b from-tech-orange/3 to-transparent pointer-events-none" />
              <div className="space-y-4 text-left">
                <div className="h-12 w-12 rounded-radius-md bg-tech-orange/10 border border-tech-orange/30 flex items-center justify-center text-tech-orange mb-2">
                  <Cpu className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-pure-white">{t('divisions.ptfeTitle')}</h3>
                <p className="text-text-muted text-xs sm:text-sm leading-relaxed">
                  {t('divisions.ptfeDesc')}
                </p>
              </div>
              <div className="pt-4 border-t border-steel-gray/60 flex items-center justify-between">
                <Link href="/products/ptfe-lined-pipes" className="inline-flex items-center gap-1.5 text-xs font-mono text-tech-orange hover:text-pure-white transition-colors">
                  {tCommon('buttons.viewPtfe')} <ArrowRight className="h-3 w-3" />
                </Link>
                <span className="font-mono text-[9px] text-text-muted uppercase">SYS_REF_PT</span>
              </div>
            </div>

            {/* Division 3: Turnkey */}
            <div className="card-glass p-8 space-y-6 flex flex-col justify-between hover:scale-[1.02] hover:-translate-y-1.5 transition-all duration-300 relative bg-dark-obsidian/45">
              <div className="absolute inset-0 bg-gradient-to-b from-pure-white/2 to-transparent pointer-events-none" />
              <div className="space-y-4 text-left">
                <div className="h-12 w-12 rounded-radius-md bg-pure-white/10 border border-pure-white/30 flex items-center justify-center text-pure-white mb-2">
                  <HardHat className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-pure-white">{t('divisions.turnkeyTitle')}</h3>
                <p className="text-text-muted text-xs sm:text-sm leading-relaxed">
                  {t('divisions.turnkeyDesc')}
                </p>
              </div>
              <div className="pt-4 border-t border-steel-gray/60 flex items-center justify-between">
                <Link href="/products" className="inline-flex items-center gap-1.5 text-xs font-mono text-tech-orange hover:text-pure-white transition-colors">
                  {tCommon('buttons.viewTurnkey')} <ArrowRight className="h-3 w-3" />
                </Link>
                <span className="font-mono text-[9px] text-text-muted uppercase">SYS_REF_TK</span>
              </div>
            </div>

          </div>
        </section>

        {/* INDUSTRIAL ENGINEERING COMPLIANCE & SPECS MATRIX (NEW SECTION) */}
        <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-20 border-b border-steel-gray relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left copy columns */}
            <div className="lg:col-span-5 text-left space-y-6">
              <span className="font-mono text-xs text-glass-cyan uppercase tracking-wider font-bold">Standard Engineering Thresholds</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-pure-white tracking-tight leading-tight">
                Designed to Endure Harsh Process Conditions
              </h2>
              <p className="text-text-muted text-xs sm:text-sm leading-relaxed">
                Chemical processing facilities require complete reliability. Our systems are engineered to withstand massive delta-temperatures, complete vacuum seals, and aggressive acids without structural wear.
              </p>
              <div className="border-t border-steel-gray pt-6 grid grid-cols-2 gap-4 font-mono text-[10px] text-text-muted">
                <div>
                  <span className="block text-glass-cyan uppercase font-bold text-xs mb-1">0%</span>
                  <span>CONTAMINATION RATE</span>
                </div>
                <div>
                  <span className="block text-tech-orange uppercase font-bold text-xs mb-1">10,000V</span>
                  <span>SPARK VOLT TESTED</span>
                </div>
              </div>
            </div>

            {/* Right compliance metric cards list */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              
              <div className="p-6 border border-steel-gray rounded bg-slate-950/45 space-y-3">
                <Thermometer className="h-5 w-5 text-tech-orange" />
                <h4 className="font-display font-bold text-pure-white text-sm">Cryogenic Operation</h4>
                <p className="text-xs text-text-muted leading-relaxed">
                  Engineered vessel materials support synthesis down to -80°C and up to +200°C without mechanical failure.
                </p>
              </div>

              <div className="p-6 border border-steel-gray rounded bg-slate-950/45 space-y-3">
                <Activity className="h-5 w-5 text-glass-cyan" />
                <h4 className="font-display font-bold text-pure-white text-sm">Full Vacuum Integrity</h4>
                <p className="text-xs text-text-muted leading-relaxed">
                  PTFE envelope gaskets and precision-ground glass valves maintain strict vacuum seal indexes during active distillation.
                </p>
              </div>

              <div className="p-6 border border-steel-gray rounded bg-slate-950/45 space-y-3">
                <Compass className="h-5 w-5 text-glass-cyan" />
                <h4 className="font-display font-bold text-pure-white text-sm">Corrosion Immunity</h4>
                <p className="text-xs text-text-muted leading-relaxed">
                  Low-expansion borosilicate 3.3 glass is universally immune to aggressive mineral acids, halogens, and organics.
                </p>
              </div>

              <div className="p-6 border border-steel-gray rounded bg-slate-950/45 space-y-3">
                <Settings className="h-5 w-5 text-tech-orange" />
                <h4 className="font-display font-bold text-pure-white text-sm">Turnkey skid Automation</h4>
                <p className="text-xs text-text-muted leading-relaxed">
                  Optional temperature monitoring sensors and automation flow control systems are fully integrated in support structures.
                </p>
              </div>

            </div>

          </div>

        </section>

        {/* INTERACTIVE COMPOSER CTA (AI SHAPE-WAND SHORTCUT) */}
        <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-20">
          
          <div className="card-glass p-8 sm:p-12 relative overflow-hidden bg-slate-950/65 border border-glass-cyan/35 text-center space-y-8 shadow-glow">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.06)_0%,transparent_60%)] pointer-events-none animate-pulse" />
            
            <div className="max-w-2xl mx-auto space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-glass-cyan/15 border border-glass-cyan/30 rounded-full text-[10px] font-mono text-glass-cyan uppercase tracking-wider">
                <Wand2 className="h-3 w-3 animate-spin" /> AI Quick Quote Dispatcher
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-pure-white tracking-tight">
                Ready to configure your synthesis system?
              </h2>
              <p className="text-text-muted text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
                Type your specifications below (e.g. *100L standard jacketed reactor with anchor impeller*) to instantly pre-fill all configuration options in our RFQ portal.
              </p>
            </div>

            {/* Quick config search bar */}
            <div className="max-w-lg mx-auto flex gap-3 relative z-10">
              <input
                type="text"
                placeholder="Describe your process glassware or reactor spec..."
                value={quickPrompt}
                onChange={(e) => setQuickPrompt(e.target.value)}
                className="w-full bg-slate-950/80 border border-steel-gray rounded px-4 py-3 text-xs sm:text-sm text-pure-white outline-none focus:border-glass-cyan shadow-raised"
              />
              <Link
                href={`/rfq?productName=${encodeURIComponent(quickPrompt)}`}
                className="bg-tech-orange text-pure-white text-xs font-mono font-bold px-6 py-3 rounded hover:bg-tech-orange/90 flex items-center justify-center shrink-0 transition-colors shadow-raised"
              >
                INITIALIZE
              </Link>
            </div>

            <div className="pt-2">
              <Link 
                href="/rfq"
                className="font-mono text-xs text-text-muted hover:text-pure-white inline-flex items-center gap-1.5 transition-colors"
              >
                Or configure step-by-step manually <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

          </div>

        </section>

      </main>

      <Footer />
    </div>
  );
}
