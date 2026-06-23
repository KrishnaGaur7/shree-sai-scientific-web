'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { ArrowRight, Cpu, HardHat, Layers } from 'lucide-react';
import { Header } from '@/components/layouts/Header';
import { Footer } from '@/components/layouts/Footer';
import { Link } from '@/i18n/routing';

const WebGLCanvas = dynamic(() => import('@/components/webgl/WebGLCanvas'), { 
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[450px] items-center justify-center border border-dashed border-steel-gray rounded-radius-md">
      <span className="text-sm font-mono text-text-muted">Loading 3D WebGL Engine...</span>
    </div>
  )
});

export default function Home() {
  const t = useTranslations('homepage');
  const tCommon = useTranslations('common');

  return (
    <div className="flex min-h-screen flex-col bg-dark-obsidian font-sans text-text-main relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      <Header />

      <main className="flex-1 flex flex-col z-10">
        <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-b border-steel-gray">
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-steel-gray/60 border border-steel-gray rounded-full text-xs font-mono text-pure-white">
              <span className="h-2 w-2 rounded-full bg-tech-orange animate-pulse" />
              {t('hero.tag')}
            </span>
            
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-pure-white leading-tight">
              Engineering Zero-Contamination <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-glass-cyan to-tech-orange">
                Process Glass & PTFE Systems
              </span>
            </h1>

            <p className="text-text-muted font-sans text-base sm:text-lg leading-relaxed max-w-xl">
              {t('hero.desc')}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link 
                href="/rfq" 
                className="inline-flex items-center gap-2 bg-tech-orange text-pure-white font-display text-sm font-semibold px-6 py-3 rounded-radius-sm hover:scale-[1.02] active:scale-[0.98] transition-transform"
              >
                {tCommon('buttons.inquiry')}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link 
                href="/products" 
                className="inline-flex items-center justify-center bg-transparent border border-steel-gray text-text-muted hover:text-pure-white hover:border-glass-cyan font-mono text-xs px-6 py-3 rounded-radius-sm transition-colors"
              >
                {tCommon('buttons.viewCatalog')}
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 w-full h-full relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-glass-cyan/5 to-tech-orange/5 blur-3xl pointer-events-none rounded-full" />
            <WebGLCanvas />
            
            <div className="absolute bottom-4 right-4 bg-dark-obsidian/80 border border-steel-gray rounded-radius-sm p-3 font-mono text-[10px] text-text-muted select-none">
              <span>CANVAS_STATUS: RUNNING_60FPS</span> <br />
              <span>MODEL: BGR-J100_JACKETED</span>
            </div>
          </div>
        </section>

        <section className="border-b border-steel-gray bg-dark-obsidian/30 py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <span className="block font-mono text-2xl sm:text-3xl font-bold text-tech-orange">24+</span>
                <span className="text-xs text-text-muted font-sans uppercase tracking-wider">{t('stats.years')}</span>
              </div>
              <div>
                <span className="block font-mono text-2xl sm:text-3xl font-bold text-tech-orange">40+</span>
                <span className="text-xs text-text-muted font-sans uppercase tracking-wider">{t('stats.countries')}</span>
              </div>
              <div>
                <span className="block font-mono text-2xl sm:text-3xl font-bold text-tech-orange">1,500+</span>
                <span className="text-xs text-text-muted font-sans uppercase tracking-wider">{t('stats.plants')}</span>
              </div>
              <div>
                <span className="block font-mono text-2xl sm:text-3xl font-bold text-tech-orange">ISO 9001</span>
                <span className="text-xs text-text-muted font-sans uppercase tracking-wider">{t('stats.facilities')}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 border-b border-steel-gray">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <h2 className="font-display text-3xl font-bold text-pure-white">
              {t('divisions.title')}
            </h2>
            <p className="text-text-muted text-sm font-sans">
              {t('divisions.desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-glass p-6 space-y-4 flex flex-col">
              <div className="h-12 w-12 rounded-radius-md bg-glass-cyan/10 border border-glass-cyan/30 flex items-center justify-center text-glass-cyan mb-2">
                <Layers className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-pure-white">{t('divisions.glassTitle')}</h3>
              <p className="text-text-muted text-sm font-sans flex-1">
                {t('divisions.glassDesc')}
              </p>
              <Link href="/products/glass-reactors" className="inline-flex items-center gap-1.5 text-xs font-mono text-tech-orange hover:text-pure-white transition-colors">
                {tCommon('buttons.viewGlass')} <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="card-glass p-6 space-y-4 flex flex-col">
              <div className="h-12 w-12 rounded-radius-md bg-tech-orange/10 border border-tech-orange/30 flex items-center justify-center text-tech-orange mb-2">
                <Cpu className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-pure-white">{t('divisions.ptfeTitle')}</h3>
              <p className="text-text-muted text-sm font-sans flex-1">
                {t('divisions.ptfeDesc')}
              </p>
              <Link href="/products/ptfe-lined-pipes" className="inline-flex items-center gap-1.5 text-xs font-mono text-tech-orange hover:text-pure-white transition-colors">
                {tCommon('buttons.viewPtfe')} <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="card-glass p-6 space-y-4 flex flex-col">
              <div className="h-12 w-12 rounded-radius-md bg-pure-white/10 border border-pure-white/30 flex items-center justify-center text-pure-white mb-2">
                <HardHat className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-pure-white">{t('divisions.turnkeyTitle')}</h3>
              <p className="text-text-muted text-sm font-sans flex-1">
                {t('divisions.turnkeyDesc')}
              </p>
              <Link href="/products" className="inline-flex items-center gap-1.5 text-xs font-mono text-tech-orange hover:text-pure-white transition-colors">
                {tCommon('buttons.viewTurnkey')} <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
