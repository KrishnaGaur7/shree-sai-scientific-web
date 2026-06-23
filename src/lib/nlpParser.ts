export interface ParsedRFQSpecs {
  volume?: string;
  jacketType?: 'Single Wall' | 'Jacketed' | 'Double Jacketed';
  agitatorStyle?: 'Anchor Impeller' | 'Pitch Blade' | 'Turbine';
  temperature?: string;
  pressure?: string;
}

export function parseRFQPrompt(prompt: string): ParsedRFQSpecs {
  const lowercase = prompt.toLowerCase();
  const specs: ParsedRFQSpecs = {};

  // 1. Volume Extraction (e.g. 100L, 50 liters, 20L, etc.)
  const volumeRegex = /(\d+)\s*(?:l|L|liters|Liters|litre|litres|Litres|Litre)/;
  const volMatch = lowercase.match(volumeRegex);
  if (volMatch) {
    const volNum = parseInt(volMatch[1], 10);
    // Bind to available categories if close
    if (volNum >= 10 && volNum <= 300) {
      specs.volume = `${volNum}L`;
    } else {
      specs.volume = `${volNum}L (Custom Size)`;
    }
  }

  // 2. Jacket Type Extraction
  if (
    lowercase.includes('double jacketed') || 
    lowercase.includes('double-jacket') || 
    lowercase.includes('vacuum jacket') || 
    lowercase.includes('vacuum-jacket')
  ) {
    specs.jacketType = 'Double Jacketed';
  } else if (
    lowercase.includes('single wall') || 
    lowercase.includes('single-wall') || 
    lowercase.includes('immersion')
  ) {
    specs.jacketType = 'Single Wall';
  } else if (
    lowercase.includes('jacketed') || 
    lowercase.includes('jacket')
  ) {
    specs.jacketType = 'Jacketed';
  }

  // 3. Agitator Style Extraction
  if (lowercase.includes('anchor')) {
    specs.agitatorStyle = 'Anchor Impeller';
  } else if (
    lowercase.includes('pitch blade') || 
    lowercase.includes('pitch-blade') || 
    lowercase.includes('pitched')
  ) {
    specs.agitatorStyle = 'Pitch Blade';
  } else if (lowercase.includes('turbine')) {
    specs.agitatorStyle = 'Turbine';
  }

  // 4. Temperature Limits Extraction (e.g. 150°C, -50 C)
  const tempRegex = /(-?\d+)\s*(?:°c|°c|c|celsius|celsius)/;
  const tempMatch = lowercase.match(tempRegex);
  if (tempMatch) {
    specs.temperature = `${tempMatch[1]}°C`;
  }

  // 5. Pressure Extraction (e.g. 0.5 bar, 6 bars)
  const pressureRegex = /(\d+(?:\.\d+)?)\s*(?:bar|bars)/;
  const pressMatch = lowercase.match(pressureRegex);
  if (pressMatch) {
    specs.pressure = `${pressMatch[1]} bar`;
  }

  return specs;
}
