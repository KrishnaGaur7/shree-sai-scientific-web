'use client';

import React, { useState } from 'react';
import { Link } from '@/i18n/routing';
import { Search, Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import { MegaMenu } from './MegaMenu';
import { SearchModal } from './SearchModal';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsMenuOpen, setProductsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-sticky w-full border-b border-steel-gray bg-dark-obsidian/75 backdrop-blur-md">
      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-display text-xl font-bold tracking-tight text-pure-white">
                SHREE SAI SCIENTIFIC
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8 font-sans text-sm font-medium">
            <div 
              className="relative group"
              onMouseEnter={() => setProductsMenuOpen(true)}
              onMouseLeave={() => setProductsMenuOpen(false)}
            >
              <button className="flex items-center gap-1 text-text-muted hover:text-pure-white transition-colors py-5">
                Products
                <ChevronDown className="h-4 w-4" />
              </button>
              {productsMenuOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-screen max-w-2xl bg-dark-obsidian border border-steel-gray rounded-radius-md shadow-glass p-6">
                  <MegaMenu />
                </div>
              )}
            </div>

            <Link href="/industries" className="text-text-muted hover:text-pure-white transition-colors py-5">
              Industries
            </Link>
            <Link href="/support" className="text-text-muted hover:text-pure-white transition-colors py-5">
              Eng Support
            </Link>
            <Link href="/about" className="text-text-muted hover:text-pure-white transition-colors py-5">
              About Us
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSearchOpen(true)}
              className="text-text-muted hover:text-pure-white p-2 rounded-full hover:bg-steel-gray/50 transition-colors"
              aria-label="Open Search"
            >
              <Search className="h-5 w-5" />
            </button>

            <Link 
              href="/rfq" 
              className="hidden sm:inline-flex items-center gap-2 bg-tech-orange text-pure-white font-display text-sm font-semibold px-4 py-2 rounded-radius-sm hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              Request Quote
              <ArrowRight className="h-4 w-4" />
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-text-muted hover:text-pure-white p-2"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-b border-steel-gray bg-dark-obsidian px-4 pt-2 pb-4 space-y-2 font-sans text-base">
          <Link href="/products" className="block text-text-muted hover:text-pure-white py-2">
            Products
          </Link>
          <Link href="/industries" className="block text-text-muted hover:text-pure-white py-2">
            Industries
          </Link>
          <Link href="/support" className="block text-text-muted hover:text-pure-white py-2">
            Eng Support
          </Link>
          <Link href="/about" className="block text-text-muted hover:text-pure-white py-2">
            About Us
          </Link>
          <Link href="/rfq" className="block bg-tech-orange text-pure-white text-center font-display font-semibold py-2.5 rounded-radius-sm mt-4">
            Request Quote
          </Link>
        </div>
      )}
    </header>
  );
};
export default Header;
