export interface ProductSpecification {
  label: string;
  value: string;
}

export interface ProductDocument {
  id: string;
  label: string;
  type: 'pdf' | 'cad' | 'certificate';
  path: string;
}

export interface ProductNumericalLimits {
  volumeMaxL?: number;
  tempMinC: number;
  tempMaxC: number;
  pressureMaxBar: number;
}

export interface ProductItem {
  id: string;
  name: string;
  slug: string;
  category: string; // matches CategoryItem.id
  industries: string[]; // matches IndustryItem.id[]
  description: string;
  volumeRange?: string;
  temperatureLimits?: string;
  maxPressure?: string;
  numericalLimits: ProductNumericalLimits;
  specifications: ProductSpecification[];
  imagePath: string;
  documents: ProductDocument[];
  cadFiles?: {
    step?: string;
    dwg?: string;
  };
}

export const productsDatabase: ProductItem[] = [
  {
    id: 'bgr-j100',
    name: 'Jacketed Glass Reactor (Series BGR-J)',
    slug: 'jacketed-glass-reactor',
    category: 'glass-reactors',
    industries: ['pharmaceuticals', 'chemical-synthesis', 'biotechnology'],
    description: 'Double-jacketed borosilicate glass 3.3 reaction system offering zero-contamination visual process monitoring for high-purity chemical and pharmaceutical synthesis.',
    volumeRange: '10L - 300L',
    temperatureLimits: '-50°C to +200°C',
    maxPressure: '-1.0 bar to +0.5 bar',
    numericalLimits: {
      volumeMaxL: 300,
      tempMinC: -50,
      tempMaxC: 200,
      pressureMaxBar: 0.5
    },
    specifications: [
      { label: 'Material Composition', value: 'Borosilicate Glass 3.3 (DIN ISO 3585)' },
      { label: 'Thermal Shock Resistance', value: 'ΔT = 120 K' },
      { label: 'Sealing Material', value: 'USP Class VI FDA-compliant PTFE Gaskets' },
      { label: 'Bottom Outlet Valve', value: 'Zero-dead-space PTFE flush valve' },
      { label: 'Baffle Setup', value: 'Removable PTFE baffle arrays with thermal sensor wells' }
    ],
    imagePath: '/assets/images/jacketed-reactor.png',
    documents: [
      { id: 'bgr-spec', label: 'BGR-J Series Technical Specifications Datasheet', type: 'pdf', path: '/assets/documents/datasheets/BGR-J-Specs.pdf' },
      { id: 'bgr-iso', label: 'ISO 9001:2015 Material Conformity Certificate', type: 'certificate', path: '/assets/documents/certs/Material-Conformity-BGR.pdf' },
      { id: 'bgr-fda', label: 'PTFE USP Class VI Gaskets Certification', type: 'certificate', path: '/assets/documents/certs/PTFE-FDA-Conformity.pdf' }
    ],
    cadFiles: {
      step: '/assets/documents/cad/BGR-J100.stp',
      dwg: '/assets/documents/cad/BGR-J100.dwg'
    }
  },
  {
    id: 'shte-05',
    name: 'Shell & Tube Heat Exchanger (Series SHT)',
    slug: 'shell-tube-heat-exchanger',
    category: 'heat-exchangers',
    industries: ['chemical-synthesis', 'petrochemicals'],
    description: 'High-efficiency thermal condensation unit utilizing parallel borosilicate glass tubes bundled inside a glass shell container, designed for aggressive organic acid processing.',
    volumeRange: '0.1 m² - 10 m² Exchange Area',
    temperatureLimits: '-40°C to +180°C',
    maxPressure: 'Shell: 3.0 bar / Tubes: 0.5 bar',
    numericalLimits: {
      tempMinC: -40,
      tempMaxC: 180,
      pressureMaxBar: 3.0
    },
    specifications: [
      { label: 'Tube Material', value: 'Borosilicate Glass 3.3 tubes' },
      { label: 'Shell Material', value: 'Heavy-wall borosilicate glass shell' },
      { label: 'Baffle Plates', value: 'PTFE anti-vibration baffles' },
      { label: 'Flanges Standard', value: 'ANSI 150 / DIN EN 1092-1 Collars' }
    ],
    imagePath: '/assets/images/heat-exchanger.png',
    documents: [
      { id: 'sht-spec', label: 'SHT Heat Exchangers Performance Calculations Matrix', type: 'pdf', path: '/assets/documents/datasheets/SHT-Exchanger-Specs.pdf' },
      { id: 'sht-cert', label: 'CE Pressure Equipment Directive Compliance (PED 2014/68/EU)', type: 'certificate', path: '/assets/documents/certs/CE-PED-SHT.pdf' }
    ],
    cadFiles: {
      step: '/assets/documents/cad/SHT-05.stp',
      dwg: '/assets/documents/cad/SHT-05.dwg'
    }
  },
  {
    id: 'igc-column',
    name: 'Industrial Fractionation Glass Columns',
    slug: 'industrial-glass-column',
    category: 'glass-columns',
    industries: ['petrochemicals', 'chemical-synthesis'],
    description: 'Modular low-thermal-expansion fractionating columns engineered for vacuum distillation and industrial concentration processes under clean operating conditions.',
    volumeRange: 'DN50 - DN600 Nominal Widths',
    temperatureLimits: '-20°C to +200°C',
    maxPressure: '-1.0 bar to +1.0 bar',
    numericalLimits: {
      tempMinC: -20,
      tempMaxC: 200,
      pressureMaxBar: 1.0
    },
    specifications: [
      { label: 'Column Packings', value: 'Borosilicate Rashig rings / Ceramic structured packing' },
      { label: 'Nominal Diameters', value: '50mm to 600mm' },
      { label: 'Gasket Sealing', value: 'Envelope-type PTFE seals with Viton core' },
      { label: 'Support Trays', value: 'Heavy-load PTFE slotted grid plates' }
    ],
    imagePath: '/assets/images/jacketed-reactor.png', // Fallback to existing reactor image
    documents: [
      { id: 'igc-spec', label: 'Fractionation Column System Engineering Guide', type: 'pdf', path: '/assets/documents/datasheets/Columns-Tech-Data.pdf' }
    ],
    cadFiles: {
      step: '/assets/documents/cad/IGC-DN100.stp',
      dwg: '/assets/documents/cad/IGC-DN100.dwg'
    }
  },
  {
    id: 'ptfe-pipe-lined',
    name: 'Heavy-Duty PTFE Lined Steel Pipes',
    slug: 'ptfe-lined-pipe',
    category: 'ptfe-lined-pipes',
    industries: ['petrochemicals', 'chemical-synthesis', 'pharmaceuticals'],
    description: 'Seamless virgin PTFE lining chemically locked inside high-tensile carbon steel or stainless steel housings, providing lifetime corrosion protection.',
    volumeRange: '0.5" - 12" Diameter Spools',
    temperatureLimits: '-30°C to +230°C',
    maxPressure: '10.0 bar to 25.0 bar',
    numericalLimits: {
      tempMinC: -30,
      tempMaxC: 230,
      pressureMaxBar: 25.0
    },
    specifications: [
      { label: 'Lining Material', value: 'High-density Isostatically Molded Virgin PTFE' },
      { label: 'Housing Options', value: 'Carbon Steel ASTM A106 Gr. B / Stainless Steel 316L' },
      { label: 'Liner Thickness', value: '3.0mm to 6.5mm depending on nominal size' },
      { label: 'Spark Test Compliance', value: '100% electrostatic spark tested at 25 kV' }
    ],
    imagePath: '/assets/images/heat-exchanger.png', // Fallback to existing exchanger image
    documents: [
      { id: 'ptfe-pipe-spec', label: 'PTFE Lined Piping Engineering Dimension Book', type: 'pdf', path: '/assets/documents/datasheets/PTFE-Pipes-Specs.pdf' },
      { id: 'ptfe-spark-cert', label: 'ASTM F1545 Spark Test Standard Verification Report', type: 'certificate', path: '/assets/documents/certs/Spark-Test-Conformity.pdf' }
    ],
    cadFiles: {
      step: '/assets/documents/cad/PTFE-PIPE-3IN.stp',
      dwg: '/assets/documents/cad/PTFE-PIPE-3IN.dwg'
    }
  },
  {
    id: 'ptfe-stirrer-shaft',
    name: 'PTFE Coated Stirring Agitator',
    slug: 'ptfe-stirrer-shaft',
    category: 'ptfe-stirrer',
    industries: ['pharmaceuticals', 'biotechnology', 'chemical-synthesis'],
    description: 'Precision mechanical stirring shaft featuring a solid stainless steel inner core encapsulated in a uniform, non-porous jacket of molded PTFE.',
    volumeRange: 'Shaft Lengths 400mm - 2200mm',
    temperatureLimits: '-40°C to +180°C',
    maxPressure: 'Vessel Max (Hermetic mechanical seal support)',
    numericalLimits: {
      tempMinC: -40,
      tempMaxC: 180,
      pressureMaxBar: 6.0
    },
    specifications: [
      { label: 'Core Material', value: 'Stainless Steel AISI 316L (EN 1.4404)' },
      { label: 'Sheath Encapsulation', value: 'Hot-pressed dense PTFE sleeve' },
      { label: 'Impeller Styles', value: 'Anchor, Turbine, Propeller, or Pitch-blade configurations' },
      { label: 'Runout Tolerance', value: 'Stirrer shaft runout ≤ 0.05 mm' }
    ],
    imagePath: '/assets/images/jacketed-reactor.png',
    documents: [
      { id: 'ptfe-stir-spec', label: 'Impeller Mixing Dynamics & Drag Coefficients', type: 'pdf', path: '/assets/documents/datasheets/Agitators-Stirrers.pdf' }
    ],
    cadFiles: {
      step: '/assets/documents/cad/PTFE-STIR-A600.stp',
      dwg: '/assets/documents/cad/PTFE-STIR-A600.dwg'
    }
  },
  {
    id: 'ptfe-seals-bellows',
    name: 'Hermetic PTFE Expansion Bellows & Seals',
    slug: 'ptfe-bellows-seal',
    category: 'ptfe-seals',
    industries: ['pharmaceuticals', 'chemical-synthesis', 'biotechnology'],
    description: 'High-flexibility virgin PTFE bellows designed to isolate glass process pipelines from mechanical vibrations, thermal growth, and load stresses.',
    volumeRange: 'DN25 - DN400 Pipeline Widths',
    temperatureLimits: '-50°C to +200°C',
    maxPressure: '1.0 bar to 6.0 bar depending on convolutions',
    numericalLimits: {
      tempMinC: -50,
      tempMaxC: 200,
      pressureMaxBar: 6.0
    },
    specifications: [
      { label: 'Convolution Count', value: '3-convolution / 5-convolution standard profiles' },
      { label: 'Reinforcement Rings', value: 'Seamless Stainless Steel 304 limit rings' },
      { label: 'Vacuum Support', value: 'PTFE internal vacuum spiral insert available' },
      { label: 'Flange Drilling', value: 'ANSI B16.5 / DIN PN10/PN16 split flange collars' }
    ],
    imagePath: '/assets/images/heat-exchanger.png',
    documents: [
      { id: 'ptfe-bellows-spec', label: 'PTFE Expansion Joints Installation Manual', type: 'pdf', path: '/assets/documents/datasheets/Bellows-Joints-Specs.pdf' },
      { id: 'ptfe-cycle-cert', label: 'Tension/Compression Fatigue Cycling Test Certificate', type: 'certificate', path: '/assets/documents/certs/Fatigue-Test-Report.pdf' }
    ],
    cadFiles: {
      step: '/assets/documents/cad/PTFE-BELL-DN100.stp',
      dwg: '/assets/documents/cad/PTFE-BELL-DN100.dwg'
    }
  }
];
