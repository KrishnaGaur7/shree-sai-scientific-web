import React from 'react';
import { Link } from '@/i18n/routing';
import { ArrowUpRight } from 'lucide-react';

export const MegaMenu: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-8 text-left">
      <div>
        <h3 className="font-display text-xs font-semibold text-tech-orange uppercase tracking-wider mb-4">
          Process Glass Systems
        </h3>
        <ul className="space-y-3 font-sans text-sm">
          <li>
            <Link href="/products/glass-reactors" className="flex items-center justify-between text-text-muted hover:text-pure-white transition-colors group">
              Glass Reactors (10L - 300L)
              <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </li>
          <li>
            <Link href="/products/heat-exchangers" className="flex items-center justify-between text-text-muted hover:text-pure-white transition-colors group">
              Shell & Tube Exchangers
              <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </li>
          <li>
            <Link href="/products/glass-columns" className="flex items-center justify-between text-text-muted hover:text-pure-white transition-colors group">
              Industrial Glass Columns
              <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="font-display text-xs font-semibold text-tech-orange uppercase tracking-wider mb-4">
          PTFE / Fluoropolymers
        </h3>
        <ul className="space-y-3 font-sans text-sm">
          <li>
            <Link href="/products/ptfe-lined-pipes" className="flex items-center justify-between text-text-muted hover:text-pure-white transition-colors group">
              PTFE-Lined Pipes & Flanges
              <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </li>
          <li>
            <Link href="/products/ptfe-stirrer" className="flex items-center justify-between text-text-muted hover:text-pure-white transition-colors group">
              Stirring Impellers & Shafts
              <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </li>
          <li>
            <Link href="/products/ptfe-seals" className="flex items-center justify-between text-text-muted hover:text-pure-white transition-colors group">
              PTFE Valve Seals & Bellows
              <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
