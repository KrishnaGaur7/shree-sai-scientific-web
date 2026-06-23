'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ArrowRight, Search, Trash2, Filter, RotateCcw, ShieldAlert } from 'lucide-react';
import { Header } from '@/components/layouts/Header';
import { Footer } from '@/components/layouts/Footer';
import { cms } from '@/lib/cms';
import { ProductItem } from '@/data/products';
import { CategoryItem } from '@/data/categories';
import { IndustryItem } from '@/data/industries';
import { Link } from '@/i18n/routing';

export default function ProductsPage() {
  const t = useTranslations('products');
  const tCommon = useTranslations('common');
  const tNav = useTranslations('navigation');

  const [products, setProducts] = useState<ProductItem[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [industries, setIndustries] = useState<IndustryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [tempLimit, setTempLimit] = useState<number>(250);
  const [pressureLimit, setPressureLimit] = useState<number>(30);

  // Fetch initial collections
  useEffect(() => {
    const initData = async () => {
      try {
        const [cats, inds] = await Promise.all([
          cms.categories.find(),
          cms.industries.find()
        ]);
        setCategories(cats);
        setIndustries(inds);
      } catch (err) {
        console.error('Failed to load catalog filters', err);
      }
    };
    initData();
  }, []);

  // Query products based on filter states
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const results = await cms.products.find({
          category: selectedCategory,
          industry: selectedIndustry,
          query: searchQuery,
          maxTemp: tempLimit,
          maxPressure: pressureLimit
        });
        setProducts(results);
      } catch (err) {
        console.error('Failed to fetch filtered products', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory, selectedIndustry, searchQuery, tempLimit, pressureLimit]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedIndustry('all');
    setSearchQuery('');
    setTempLimit(250);
    setPressureLimit(30);
  };

  return (
    <div className="flex min-h-screen flex-col bg-dark-obsidian font-sans text-text-main relative">
      {/* Decorative Grid Glow Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      <Header />

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-12 space-y-10 z-10">
        
        {/* Banner Section */}
        <div className="text-left space-y-4 border-b border-steel-gray pb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[450px] h-[150px] bg-[radial-gradient(ellipse_at_top_right,rgba(0,240,255,0.05)_0%,transparent_70%)] pointer-events-none" />
          <h1 className="font-display text-4xl font-bold tracking-tight text-pure-white sm:text-5xl">
            {t('catalog.title')}
          </h1>
          <p className="text-text-muted text-base max-w-2xl leading-relaxed">
            {t('catalog.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Filters Sidebar */}
          <aside className="lg:col-span-3 card-glass p-6 space-y-8 bg-dark-obsidian/75">
            <div className="flex items-center justify-between border-b border-steel-gray pb-4">
              <span className="flex items-center gap-2 font-display text-sm font-bold text-pure-white uppercase tracking-wider">
                <Filter className="h-4 w-4 text-tech-orange" /> {t('sidebar.title')}
              </span>
              <button 
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 font-mono text-[10px] text-text-muted hover:text-tech-orange transition-colors"
                title="Reset active queries"
              >
                <RotateCcw className="h-3 w-3" /> {t('sidebar.reset')}
              </button>
            </div>

            {/* Keyword Search */}
            <div className="space-y-2">
              <label className="block font-mono text-[11px] text-text-muted uppercase tracking-wider">{t('sidebar.search')}</label>
              <div className="relative flex items-center bg-dark-obsidian border border-steel-gray rounded-radius-xs px-3 py-2 w-full gap-2 focus-within:border-glass-cyan transition-colors">
                <Search className="h-4 w-4 text-tech-orange shrink-0" />
                <input 
                  type="text" 
                  placeholder={t('sidebar.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none text-pure-white text-xs w-full placeholder-text-muted"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="text-text-muted hover:text-pure-white">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Divisions */}
            <div className="space-y-3">
              <label className="block font-mono text-[11px] text-text-muted uppercase tracking-wider">{t('sidebar.division')}</label>
              <div className="flex flex-col gap-1.5">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`text-left text-xs font-sans px-3 py-2 rounded-radius-xs transition-colors border ${
                    selectedCategory === 'all' 
                      ? 'bg-tech-orange/15 border-tech-orange/30 text-pure-white font-semibold' 
                      : 'border-transparent text-text-muted hover:text-pure-white hover:bg-steel-gray/30'
                  }`}
                >
                  All Product Lines
                </button>
                
                {/* Division 1 */}
                <div className="pt-2">
                  <span className="block font-mono text-[9px] text-glass-cyan/70 uppercase tracking-widest px-3 mb-1">{tNav('megamenu.glassTitle')}</span>
                  {categories.filter(c => c.division === 'glass-systems').map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`w-full text-left text-xs font-sans px-3 py-1.5 rounded-radius-xs transition-colors border ${
                        selectedCategory === cat.slug 
                          ? 'bg-glass-cyan/15 border-glass-cyan/30 text-pure-white font-semibold' 
                          : 'border-transparent text-text-muted hover:text-pure-white hover:bg-steel-gray/30'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>

                {/* Division 2 */}
                <div className="pt-2">
                  <span className="block font-mono text-[9px] text-tech-orange/70 uppercase tracking-widest px-3 mb-1">{tNav('megamenu.ptfeTitle')}</span>
                  {categories.filter(c => c.division === 'fluoropolymers').map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`w-full text-left text-xs font-sans px-3 py-1.5 rounded-radius-xs transition-colors border ${
                        selectedCategory === cat.slug 
                          ? 'bg-tech-orange/15 border-tech-orange/30 text-pure-white font-semibold' 
                          : 'border-transparent text-text-muted hover:text-pure-white hover:bg-steel-gray/30'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Target Industries */}
            <div className="space-y-3">
              <label className="block font-mono text-[11px] text-text-muted uppercase tracking-wider">{t('sidebar.industry')}</label>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="w-full bg-dark-obsidian border border-steel-gray rounded-radius-xs px-3 py-2 text-xs text-pure-white focus:border-glass-cyan outline-none"
              >
                <option value="all">{t('sidebar.allIndustries')}</option>
                {industries.map(ind => (
                  <option key={ind.id} value={ind.slug}>{ind.name}</option>
                ))}
              </select>
            </div>

            {/* Threshold Ranges */}
            <div className="space-y-4 border-t border-steel-gray pt-6">
              <div className="space-y-2">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-text-muted uppercase tracking-wider">{t('sidebar.temp')}</span>
                  <span className="text-pure-white font-bold">{tempLimit}°C</span>
                </div>
                <input 
                  type="range" 
                  min="-50" 
                  max="250" 
                  step="10"
                  value={tempLimit} 
                  onChange={(e) => setTempLimit(Number(e.target.value))}
                  className="w-full h-1 bg-steel-gray rounded-lg appearance-none cursor-pointer accent-tech-orange"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-text-muted uppercase tracking-wider">{t('sidebar.pressure')}</span>
                  <span className="text-pure-white font-bold">{pressureLimit} bar</span>
                </div>
                <input 
                  type="range" 
                  min="0.5" 
                  max="30" 
                  step="0.5"
                  value={pressureLimit} 
                  onChange={(e) => setPressureLimit(Number(e.target.value))}
                  className="w-full h-1 bg-steel-gray rounded-lg appearance-none cursor-pointer accent-glass-cyan"
                />
              </div>
            </div>
          </aside>

          {/* Listings Hub */}
          <div className="lg:col-span-9 space-y-6">
            <div className="flex justify-between items-center text-xs font-mono text-text-muted">
              <span>{t('sidebar.found', { count: products.length })}</span>
              {selectedCategory !== 'all' || selectedIndustry !== 'all' || searchQuery ? (
                <span className="text-glass-cyan uppercase tracking-wider">{t('sidebar.activeFilters')}</span>
              ) : null}
            </div>

            {loading ? (
              <div className="text-center py-24 card-glass border-dashed border-steel-gray flex flex-col items-center justify-center gap-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-tech-orange" />
                <span className="font-mono text-xs text-text-muted">Querying Payload CMS Collections...</span>
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {products.map(product => {
                  const prodCat = categories.find(c => c.id === product.category);
                  return (
                    <div 
                      key={product.id} 
                      className="card-glass p-6 space-y-6 flex flex-col justify-between hover:border-steel-gray/80 transition-all duration-300 relative group overflow-hidden"
                    >
                      {/* Subtly glow hover effect */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-glass-cyan/0 via-transparent to-tech-orange/0 group-hover:from-glass-cyan/3 group-hover:to-tech-orange/3 transition-all duration-500 pointer-events-none" />

                      <div className="space-y-4">
                        {/* Image Preview Container */}
                        <div className="flex items-center justify-center p-4 bg-slate-950/45 border border-steel-gray rounded-radius-md h-[220px] overflow-hidden relative">
                          <Image 
                            src={product.imagePath} 
                            alt={product.name} 
                            width={280} 
                            height={200}
                            className="object-cover opacity-90 group-hover:scale-[1.03] transition-transform duration-500 rounded-radius-xs"
                          />
                        </div>
                        
                        {/* Details Block */}
                        <div className="text-left space-y-2.5">
                          <div className="flex flex-wrap gap-1.5">
                            <span className="text-[9px] font-mono text-glass-cyan uppercase tracking-wider bg-glass-cyan/5 border border-glass-cyan/20 px-2.5 py-0.5 rounded-full">
                              {prodCat?.name || product.category}
                            </span>
                            {product.numericalLimits.volumeMaxL && (
                              <span className="text-[9px] font-mono text-tech-orange uppercase tracking-wider bg-tech-orange/5 border border-tech-orange/20 px-2.5 py-0.5 rounded-full">
                                {product.volumeRange}
                              </span>
                            )}
                          </div>
                          
                          <h3 className="font-display text-xl font-bold text-pure-white leading-tight">
                            {product.name}
                          </h3>
                          <p className="text-text-muted text-xs leading-relaxed font-sans line-clamp-3">
                            {product.description}
                          </p>
                        </div>
                      </div>

                      {/* Technical specifications strip */}
                      <div className="flex items-center justify-between border-t border-steel-gray pt-4 mt-auto">
                        <div className="text-left text-[10px] font-mono text-text-muted space-y-0.5">
                          <div>{tCommon('units.temp')}: {product.temperatureLimits || 'N/A'}</div>
                          <div>{tCommon('units.press')}: {product.maxPressure || 'N/A'}</div>
                        </div>
                        <Link 
                          href={`/products/${prodCat?.slug || 'catalog'}/${product.slug}`}
                          className="inline-flex items-center gap-1.5 bg-steel-gray/50 hover:bg-tech-orange border border-steel-gray hover:border-tech-orange text-pure-white font-mono text-[10px] px-3.5 py-2 rounded-radius-xs transition-colors"
                        >
                          {tCommon('buttons.viewSpecs')}
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-24 card-glass border border-dashed border-steel-gray rounded-radius-md space-y-3">
                <ShieldAlert className="h-8 w-8 text-tech-orange mx-auto opacity-70" />
                <p className="text-text-muted font-mono text-xs">
                  {t('sidebar.empty')}
                </p>
                <button 
                  onClick={handleResetFilters}
                  className="text-glass-cyan hover:underline text-xs font-mono"
                >
                  {t('sidebar.clearAll')}
                </button>
              </div>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
