'use client';

import React, { useEffect, useState, useRef } from 'react';
import { X, Search as SearchIcon, FileText, ArrowRight, CornerDownRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { cms } from '@/lib/cms';
import { ProductItem } from '@/data/products';
import { categoriesDatabase } from '@/data/categories';

interface SearchModalProps {
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [searching, setSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    inputRef.current?.focus();
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Query products on query changes
  useEffect(() => {
    if (query.trim().length === 0) {
      return;
    }
    
    const delayDebounce = setTimeout(async () => {
      setSearching(true);
      try {
        const results = await cms.products.find({ query });
        setProducts(results);
      } catch (err) {
        console.error('Failed searching catalog items', err);
      } finally {
        setSearching(false);
      }
    }, 150);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className="fixed inset-0 z-loader bg-dark-obsidian/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="card-glass w-full max-w-2xl overflow-hidden border border-steel-gray bg-dark-obsidian/95 p-6 shadow-glass relative">
        {/* Glow overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-glass-cyan/3 to-transparent pointer-events-none" />

        {/* Input Bar */}
        <div className="flex items-center justify-between border-b border-steel-gray pb-4 mb-4 relative z-10">
          <div className="flex items-center gap-3 w-full">
            <SearchIcon className="h-5 w-5 text-tech-orange" />
            <input 
              ref={inputRef}
              type="text"
              placeholder="Search products, specifications, drawings..."
              value={query}
              onChange={(e) => {
                const val = e.target.value;
                setQuery(val);
                if (val.trim().length === 0) {
                  setProducts([]);
                }
              }}
              className="bg-transparent border-none outline-none text-pure-white w-full font-sans text-base placeholder-text-muted"
            />
          </div>
          <button 
            onClick={onClose}
            className="text-text-muted hover:text-pure-white p-1 hover:bg-steel-gray/50 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Results Stream */}
        <div className="space-y-4 max-h-[320px] overflow-y-auto relative z-10 pr-2">
          {query.trim().length === 0 ? (
            <div className="py-6 text-left">
              <p className="text-text-muted text-xs font-mono uppercase tracking-wider mb-3">Popular Directories</p>
              <div className="flex flex-wrap gap-2">
                <Link 
                  href="/products/glass-reactors" 
                  onClick={onClose}
                  className="px-3 py-1.5 bg-steel-gray/25 border border-steel-gray text-[10px] font-mono text-pure-white hover:border-glass-cyan rounded-radius-xs transition-colors"
                >
                  Glass Reactors
                </Link>
                <Link 
                  href="/products/heat-exchangers" 
                  onClick={onClose}
                  className="px-3 py-1.5 bg-steel-gray/25 border border-steel-gray text-[10px] font-mono text-pure-white hover:border-glass-cyan rounded-radius-xs transition-colors"
                >
                  Heat Exchangers
                </Link>
                <Link 
                  href="/products/ptfe-lined-pipes" 
                  onClick={onClose}
                  className="px-3 py-1.5 bg-steel-gray/25 border border-steel-gray text-[10px] font-mono text-pure-white hover:border-glass-cyan rounded-radius-xs transition-colors"
                >
                  PTFE Lined Pipes
                </Link>
              </div>
            </div>
          ) : searching ? (
            <p className="text-text-muted text-xs font-mono animate-pulse">Running semantic scan...</p>
          ) : products.length > 0 ? (
            <div className="divide-y divide-steel-gray/50">
              {products.map(product => {
                const prodCat = categoriesDatabase.find(c => c.id === product.category);
                return (
                  <div key={product.id} className="group py-3 first:pt-0 last:pb-0 flex items-center justify-between transition-colors">
                    <Link 
                      href={`/products/${prodCat?.slug || 'catalog'}/${product.slug}`} 
                      className="flex items-center gap-3 w-full text-left" 
                      onClick={onClose}
                    >
                      <FileText className="h-4.5 w-4.5 text-glass-cyan shrink-0" />
                      <div className="truncate pr-4">
                        <span className="block text-pure-white text-sm font-medium group-hover:text-tech-orange transition-colors truncate">
                          {product.name}
                        </span>
                        <span className="flex items-center gap-1.5 text-[9px] font-mono text-text-muted uppercase tracking-wider">
                          {prodCat?.name || product.category} <CornerDownRight className="h-2.5 w-2.5" /> {product.volumeRange || 'Catalog Specs'}
                        </span>
                      </div>
                    </Link>
                    <ArrowRight className="h-4 w-4 text-text-muted group-hover:text-pure-white transition-colors opacity-0 group-hover:opacity-100 pr-1 shrink-0" />
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-text-muted text-sm font-mono py-4">No matching technical components found.</p>
          )}
        </div>
        
        {/* Footer info bar */}
        <div className="border-t border-steel-gray mt-6 pt-3 text-right relative z-10">
          <span className="text-[10px] text-text-muted font-mono uppercase tracking-wider">Press [ESC] to exit console</span>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
