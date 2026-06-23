export interface IndustryItem {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export const industriesDatabase: IndustryItem[] = [
  {
    id: 'pharmaceuticals',
    name: 'Pharmaceuticals',
    slug: 'pharmaceuticals',
    description: 'FDA-compliant, zero-contamination batch reactor units for active pharmaceutical ingredients (APIs) and sterile medicine production.'
  },
  {
    id: 'chemical-synthesis',
    name: 'Fine Chemical Synthesis',
    slug: 'chemical-synthesis',
    description: 'Corrosion-proof borosilicate glass reactors capable of operating with hot concentrated acids and highly aggressive organic solutions.'
  },
  {
    id: 'petrochemicals',
    name: 'Petrochemicals & Mining',
    slug: 'petrochemicals',
    description: 'Robust heat-exchangers, distillation columns, and extraction columns built for aggressive petrochemical assaying.'
  },
  {
    id: 'biotechnology',
    name: 'Biotechnology & Food',
    slug: 'biotechnology',
    description: 'Sanitary process connections, jacketed mixers, and high-performance stirring components designed for delicate enzyme and media processing.'
  }
];
