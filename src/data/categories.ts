export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  division: 'glass-systems' | 'fluoropolymers';
}

export const categoriesDatabase: CategoryItem[] = [
  {
    id: 'glass-reactors',
    name: 'Glass Reactors',
    slug: 'glass-reactors',
    description: 'Corrosion-resistant visual glass reaction assemblies optimized for batch reactions and distillation.',
    division: 'glass-systems'
  },
  {
    id: 'heat-exchangers',
    name: 'Heat Exchangers',
    slug: 'heat-exchangers',
    description: 'High-efficiency shell-and-tube or coil glass condensators and thermal exchangers.',
    division: 'glass-systems'
  },
  {
    id: 'glass-columns',
    name: 'Glass Columns',
    slug: 'glass-columns',
    description: 'Modular fractionating and absorption columns for high-purity distillation systems.',
    division: 'glass-systems'
  },
  {
    id: 'ptfe-lined-pipes',
    name: 'PTFE-Lined Pipes',
    slug: 'ptfe-lined-pipes',
    description: 'Aggressive-media piping assemblies featuring heavy-duty carbon steel shells and thick fluoropolymer liners.',
    division: 'fluoropolymers'
  },
  {
    id: 'ptfe-stirrer',
    name: 'PTFE Stirring Shafts',
    slug: 'ptfe-stirrer',
    description: 'High-torque agitator systems coated with virgin PTFE to eliminate metal contamination.',
    division: 'fluoropolymers'
  },
  {
    id: 'ptfe-seals',
    name: 'PTFE Valve Seals',
    slug: 'ptfe-seals',
    description: 'Zero-leak sealing rings, bellows, and custom gland packs for industrial instrumentation protection.',
    division: 'fluoropolymers'
  }
];
