'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export const Footer: React.FC = () => {
  const t = useTranslations('footer');

  return (
    <footer className="border-t border-steel-gray bg-dark-obsidian mt-auto z-10 relative">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 font-sans text-sm">
          <div className="space-y-4 text-left">
            <h3 className="font-display text-base font-bold text-pure-white">
              SHREE SAI SCIENTIFIC
            </h3>
            <p className="text-text-muted leading-relaxed text-xs">
              {t('info.description')}
            </p>
            <p className="text-xs text-text-muted font-mono">
              ISO 9001:2015 Certified
            </p>
          </div>

          <div className="text-left">
            <h4 className="font-display text-xs font-semibold text-tech-orange uppercase tracking-wider mb-4">
              Products
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products/glass-reactors" className="text-text-muted hover:text-pure-white transition-colors text-xs">
                  Glass Reactor Systems
                </Link>
              </li>
              <li>
                <Link href="/products/heat-exchangers" className="text-text-muted hover:text-pure-white transition-colors text-xs">
                  Shell & Tube Exchangers
                </Link>
              </li>
              <li>
                <Link href="/products/ptfe-lined-pipes" className="text-text-muted hover:text-pure-white transition-colors text-xs">
                  PTFE Lined Piping
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-left">
            <h4 className="font-display text-xs font-semibold text-tech-orange uppercase tracking-wider mb-4">
              Technical Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/support" className="text-text-muted hover:text-pure-white transition-colors text-xs">
                  CAD / STP Drawings
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-text-muted hover:text-pure-white transition-colors text-xs">
                  Materials Compliance
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-text-muted hover:text-pure-white transition-colors text-xs">
                  Certifications Data
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3 text-left">
            <h4 className="font-display text-xs font-semibold text-tech-orange uppercase tracking-wider mb-4">
              Corporate Office
            </h4>
            <p className="text-text-muted text-xs">
              Vadodara, Gujarat, India
            </p>
            <p className="text-text-muted text-xs">
              Contact: sales@shreesaiscientific.com
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 bg-steel-gray/50 border border-steel-gray px-3 py-1.5 rounded-radius-xs text-xs font-mono text-pure-white">
                Region: Global (EN)
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-steel-gray mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-text-muted font-mono">
          <p>{t('info.copyright')}</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <Link href="/privacy" className="hover:text-pure-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-pure-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
