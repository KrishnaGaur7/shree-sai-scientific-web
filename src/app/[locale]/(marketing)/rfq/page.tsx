'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, ShieldCheck, Wand2, Send, RotateCcw, AlertTriangle } from 'lucide-react';
import { Header } from '@/components/layouts/Header';
import { Footer } from '@/components/layouts/Footer';
import { parseRFQPrompt } from '@/lib/nlpParser';

const VOLUMES = ['10L', '20L', '30L', '50L', '100L', '200L', '300L'];
const JACKETS = [
  { id: 'Single Wall', name: 'Single Wall', desc: 'Immersion heating/cooling for basic lab reaction assemblies.' },
  { id: 'Jacketed', name: 'Standard Jacketed', desc: 'Thermal fluid jacket circulator flow for general synthesis.' },
  { id: 'Double Jacketed', name: 'Double Jacketed (Vacuum)', desc: 'Vacuum jacket barrier preventing thermal losses and moisture fogging.' }
];
const IMPELLERS = [
  { id: 'Anchor Impeller', name: 'PTFE Anchor Agitator', desc: 'High sweep path designed for mixing viscous media.' },
  { id: 'Pitch Blade', name: 'Pitched Blade Impeller', desc: 'Creates axial flow for rapid liquid dispersion.' },
  { id: 'Turbine', name: 'Radial Flow Turbine', desc: 'Ideal for gas-liquid emulsion synthesis.' }
];

interface RFQResponse {
  success: boolean;
  message: string;
  dispatches?: {
    crm?: string;
    whatsapp?: string;
  };
}

function RFQPortalContent() {
  const searchParams = useSearchParams();

  // Step States: 1: Volume, 2: Jacket, 3: Stirrer, 4: Contact & Submit
  const [currentStep, setCurrentStep] = useState(1);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiSuccessMessage, setAiSuccessMessage] = useState('');

  // Form Fields
  const [volume, setVolume] = useState('100L');
  const [customVolume, setCustomVolume] = useState('');
  const [jacketType, setJacketType] = useState('Jacketed');
  const [agitatorStyle, setAgitatorStyle] = useState('Anchor Impeller');

  const [clientName, setClientName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [message, setMessage] = useState('');

  // Submission States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<RFQResponse | null>(null);
  const [submitError, setSubmitError] = useState('');

  // Visual flash effect on AI auto-fill
  const [aiFilledFields, setAiFilledFields] = useState<string[]>([]);

  // Parse search params if arriving from a product detail page
  useEffect(() => {
    const productName = searchParams.get('productName');
    const category = searchParams.get('category');
    
    if (productName) {
      Promise.resolve().then(() => {
        setMessage(`Configuring custom system matching: ${productName} (${category || ''}). `);
      });
    }
  }, [searchParams]);

  // AI NLP Prompt Submission
  const handleApplyAIPrompt = () => {
    if (!aiPrompt.trim()) return;

    const parsed = parseRFQPrompt(aiPrompt);
    const filled: string[] = [];

    if (parsed.volume) {
      if (VOLUMES.includes(parsed.volume)) {
        setVolume(parsed.volume);
      } else {
        setVolume('Custom');
        setCustomVolume(parsed.volume);
      }
      filled.push('volume');
    }

    if (parsed.jacketType) {
      setJacketType(parsed.jacketType);
      filled.push('jacketType');
    }

    if (parsed.agitatorStyle) {
      setAgitatorStyle(parsed.agitatorStyle);
      filled.push('agitatorStyle');
    }

    if (parsed.temperature || parsed.pressure) {
      let addInfo = '';
      if (parsed.temperature) addInfo += `Required Temp: ${parsed.temperature}. `;
      if (parsed.pressure) addInfo += `Required Pressure: ${parsed.pressure}. `;
      setMessage(prev => prev ? `${prev} ${addInfo}` : addInfo);
      filled.push('message');
    }

    setAiFilledFields(filled);
    setAiSuccessMessage(`AI matched ${filled.length} parameters from your description!`);

    // Remove flash effect after 1.5s
    setTimeout(() => {
      setAiFilledFields([]);
    }, 1500);
  };

  // Submit Handler
  const handleSubmitRFQ = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    const payload = {
      clientName,
      email,
      company,
      phone,
      country,
      productCategory: 'Configured Glass Reactor Assembly',
      specifications: {
        volume: volume === 'Custom' ? customVolume : volume,
        jacketType,
        agitatorStyle
      },
      message
    };

    try {
      const response = await fetch('/api/rfq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (response.ok) {
        setSubmitResult(data);
        setCurrentStep(5); // Success step
      } else {
        setSubmitError(data.error || 'Failed to submit RFQ.');
      }
    } catch (err) {
      console.error(err);
      setSubmitError('Failed to establish connection to CRM server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <main className="flex-1 mx-auto max-w-4xl w-full px-4 sm:px-6 py-12 space-y-10 z-10">
        
        {/* Banner Section */}
        <div className="text-left space-y-4 border-b border-steel-gray pb-6 relative overflow-hidden">
          <h1 className="font-display text-3xl font-bold text-pure-white sm:text-4xl">
            Interactive RFQ Portal
          </h1>
          <p className="text-text-muted text-xs sm:text-sm max-w-2xl leading-relaxed">
            Configure your custom process glass reactor system below step-by-step, or describe your system requirements to our AI assistant to instantly pre-fill all configuration options.
          </p>
        </div>

        {/* Step Indicator */}
        {currentStep <= 4 && (
          <div className="flex items-center justify-between font-mono text-xs text-text-muted border-b border-steel-gray pb-4">
            <span className={currentStep === 1 ? 'text-glass-cyan font-bold' : ''}>1. VESSEL VOLUME</span>
            <span>/</span>
            <span className={currentStep === 2 ? 'text-glass-cyan font-bold' : ''}>2. JACKET STYLE</span>
            <span>/</span>
            <span className={currentStep === 3 ? 'text-glass-cyan font-bold' : ''}>3. AGITATOR SYSTEM</span>
            <span>/</span>
            <span className={currentStep === 4 ? 'text-glass-cyan font-bold' : ''}>4. CORPORATE INFO</span>
          </div>
        )}

        {/* Dynamic AI Prompt Box (Available across configuration steps) */}
        {currentStep <= 3 && (
          <div className="card-glass p-5 space-y-3 bg-dark-obsidian/45 border-glass-cyan/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.05)_0%,transparent_70%)] pointer-events-none" />
            <div className="flex items-center gap-2">
              <Wand2 className="h-4.5 w-4.5 text-tech-orange" />
              <span className="font-display text-xs font-bold text-pure-white uppercase tracking-wider">AI Configurator Assistant</span>
            </div>
            
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="e.g. 'I need a reactor system to handle 100L of hot hydrochloric acid at 150C under vacuum'"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className="w-full bg-slate-950/60 border border-steel-gray rounded-radius-xs px-3 py-2 text-xs text-pure-white outline-none focus:border-glass-cyan"
              />
              <button 
                onClick={handleApplyAIPrompt}
                className="bg-tech-orange text-pure-white text-xs font-mono px-4 py-2 rounded-radius-xs hover:bg-tech-orange/80 shrink-0 transition-colors"
              >
                AUTO-FILL
              </button>
            </div>

            {aiSuccessMessage && (
              <p className="text-[10px] font-mono text-glass-cyan animate-pulse text-left">
                {aiSuccessMessage}
              </p>
            )}
          </div>
        )}

        {/* Dynamic Multi-Step Body */}
        <div className="card-glass p-8 min-h-[350px] flex flex-col justify-between relative bg-dark-obsidian/75">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.005)_0%,transparent_50%)] pointer-events-none" />

          {/* STEP 1: Vessel Volume */}
          {currentStep === 1 && (
            <div className={`space-y-6 text-left transition-colors duration-500 ${aiFilledFields.includes('volume') ? 'bg-glass-cyan/5 p-4 rounded border border-glass-cyan/20' : ''}`}>
              <div className="space-y-2">
                <h3 className="font-display text-lg font-bold text-pure-white">Step 1: Select Vessel Volumetric Capacity</h3>
                <p className="text-text-muted text-xs">Choose from our standard low-expansion borosilicate glass 3.3 reaction vessels, or specify a custom target volume.</p>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {VOLUMES.map((vol) => (
                  <button
                    key={vol}
                    onClick={() => { setVolume(vol); setCustomVolume(''); }}
                    className={`px-4 py-3 rounded-radius-xs font-mono text-xs border transition-colors ${
                      volume === vol 
                        ? 'bg-tech-orange border-tech-orange text-pure-white font-bold' 
                        : 'border-steel-gray text-text-muted hover:text-pure-white hover:border-glass-cyan'
                    }`}
                  >
                    {vol}
                  </button>
                ))}
                <button
                  onClick={() => setVolume('Custom')}
                  className={`px-4 py-3 rounded-radius-xs font-mono text-xs border transition-colors ${
                    volume === 'Custom' 
                      ? 'bg-tech-orange border-tech-orange text-pure-white font-bold' 
                      : 'border-steel-gray text-text-muted hover:text-pure-white hover:border-glass-cyan'
                  }`}
                >
                  Custom...
                </button>
              </div>

              {volume === 'Custom' && (
                <div className="space-y-2 animate-fadeIn">
                  <label className="block font-mono text-[10px] text-text-muted uppercase">Specify custom volume requirement</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 150L, 450 Liters, etc."
                    value={customVolume}
                    onChange={(e) => setCustomVolume(e.target.value)}
                    className="bg-slate-950/60 border border-steel-gray rounded-radius-xs px-3 py-2 text-xs text-pure-white outline-none focus:border-glass-cyan w-full max-w-xs"
                  />
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Jacket Style */}
          {currentStep === 2 && (
            <div className={`space-y-6 text-left transition-colors duration-500 ${aiFilledFields.includes('jacketType') ? 'bg-glass-cyan/5 p-4 rounded border border-glass-cyan/20' : ''}`}>
              <div className="space-y-2">
                <h3 className="font-display text-lg font-bold text-pure-white">Step 2: Select Vessel Jacket Style</h3>
                <p className="text-text-muted text-xs">Choose the jacket profile depending on the reaction thermal control and visibility needs.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {JACKETS.map((j) => (
                  <button
                    key={j.id}
                    onClick={() => setJacketType(j.id)}
                    className={`p-5 rounded-radius-md border text-left flex flex-col justify-between gap-4 transition-colors ${
                      jacketType === j.id 
                        ? 'bg-glass-cyan/10 border-glass-cyan text-pure-white' 
                        : 'border-steel-gray text-text-muted hover:border-steel-gray/80 hover:bg-steel-gray/10'
                    }`}
                  >
                    <div>
                      <span className="block font-display text-sm font-bold text-pure-white mb-2">{j.name}</span>
                      <span className="text-[11px] leading-relaxed block">{j.desc}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Stirrer Impeller */}
          {currentStep === 3 && (
            <div className={`space-y-6 text-left transition-colors duration-500 ${aiFilledFields.includes('agitatorStyle') ? 'bg-glass-cyan/5 p-4 rounded border border-glass-cyan/20' : ''}`}>
              <div className="space-y-2">
                <h3 className="font-display text-lg font-bold text-pure-white">Step 3: Select Agitator Impeller Style</h3>
                <p className="text-text-muted text-xs">Select the impeller design coating with high-purity virgin PTFE to manage process mixing dynamics.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {IMPELLERS.map((imp) => (
                  <button
                    key={imp.id}
                    onClick={() => setAgitatorStyle(imp.id)}
                    className={`p-5 rounded-radius-md border text-left flex flex-col justify-between gap-4 transition-colors ${
                      agitatorStyle === imp.id 
                        ? 'bg-glass-cyan/10 border-glass-cyan text-pure-white' 
                        : 'border-steel-gray text-text-muted hover:border-steel-gray/80 hover:bg-steel-gray/10'
                    }`}
                  >
                    <div>
                      <span className="block font-display text-sm font-bold text-pure-white mb-2">{imp.name}</span>
                      <span className="text-[11px] leading-relaxed block">{imp.desc}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Contact & Submit */}
          {currentStep === 4 && (
            <form onSubmit={handleSubmitRFQ} className="space-y-6 text-left">
              <div className="space-y-2">
                <h3 className="font-display text-lg font-bold text-pure-white">Step 4: Contact Details & Dispatch</h3>
                <p className="text-text-muted text-xs">Verify your selection specs below and provide contact details to dispatch your quote query.</p>
              </div>

              {/* Selection Summary Strip */}
              <div className="grid grid-cols-3 gap-4 bg-steel-gray/20 p-4 border border-steel-gray rounded-radius-sm text-xs font-mono">
                <div>
                  <span className="block text-text-muted">VOLUME</span>
                  <span className="text-pure-white font-bold">{volume === 'Custom' ? customVolume : volume}</span>
                </div>
                <div>
                  <span className="block text-text-muted">JACKET</span>
                  <span className="text-pure-white font-bold">{jacketType}</span>
                </div>
                <div>
                  <span className="block text-text-muted">AGITATOR</span>
                  <span className="text-pure-white font-bold">{agitatorStyle}</span>
                </div>
              </div>

              {/* Input Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-mono text-text-muted uppercase">Full Name *</label>
                  <input 
                    type="text" 
                    required
                    value={clientName} 
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-slate-950/60 border border-steel-gray rounded-radius-xs px-3 py-2 text-xs text-pure-white outline-none focus:border-glass-cyan"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="block text-[10px] font-mono text-text-muted uppercase">Corporate Email *</label>
                  <input 
                    type="email" 
                    required
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950/60 border border-steel-gray rounded-radius-xs px-3 py-2 text-xs text-pure-white outline-none focus:border-glass-cyan"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-mono text-text-muted uppercase">Company Name</label>
                  <input 
                    type="text" 
                    value={company} 
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full bg-slate-950/60 border border-steel-gray rounded-radius-xs px-3 py-2 text-xs text-pure-white outline-none focus:border-glass-cyan"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-mono text-text-muted uppercase">Phone / WhatsApp</label>
                  <input 
                    type="text" 
                    placeholder="e.g. +91 98765 43210"
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-950/60 border border-steel-gray rounded-radius-xs px-3 py-2 text-xs text-pure-white outline-none focus:border-glass-cyan"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="block text-[10px] font-mono text-text-muted uppercase">Country / Destination</label>
                  <input 
                    type="text" 
                    value={country} 
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-slate-950/60 border border-steel-gray rounded-radius-xs px-3 py-2 text-xs text-pure-white outline-none focus:border-glass-cyan"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="block text-[10px] font-mono text-text-muted uppercase">Custom Requirements Notes (Add templates, special inputs...)</label>
                  <textarea 
                    rows={3}
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-950/60 border border-steel-gray rounded-radius-xs px-3 py-2 text-xs text-pure-white outline-none focus:border-glass-cyan resize-none font-sans"
                  />
                </div>
              </div>

              {submitError && (
                <div className="bg-red-950/20 border border-red-800 text-red-400 p-3 rounded text-xs flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Submit Dispatch Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-tech-orange text-pure-white font-display text-sm font-semibold py-3.5 rounded-radius-sm hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:scale-100 transition-all shadow-glass"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-pure-white" />
                      <span>DISPATCHING LEAD TO CRM...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>DISPATCH DRAFT TO SALES DESK</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 5: Success Screen */}
          {currentStep === 5 && (
            <div className="py-8 space-y-6 text-center animate-fadeIn">
              <div className="h-16 w-16 bg-glass-cyan/15 border border-glass-cyan/30 rounded-full flex items-center justify-center mx-auto text-glass-cyan mb-4 animate-bounce">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-2xl font-bold text-pure-white">RFQ Dispatched Successfully!</h3>
                <p className="text-text-muted text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                  Your custom reactor configuration deal has been logged. Our engineering desk in Vadodara, India, is compiling structural CAD drawing matrices and will reach out to you within 24 hours.
                </p>
              </div>

              <div className="max-w-xs mx-auto p-4 border border-steel-gray rounded bg-slate-950/45 text-[10px] font-mono text-text-muted space-y-1">
                <div>CONTACT: {clientName}</div>
                <div>EMAIL: {email}</div>
                <div>CRM STATUS: {submitResult?.dispatches?.crm === 'crm_success' ? 'CONNECTED' : 'DISPATCH_MOCKED'}</div>
                <div>WHATSAPP STATUS: {submitResult?.dispatches?.whatsapp === 'whatsapp_success' ? 'SENT' : 'NOTIFIED'}</div>
              </div>

              <div>
                <button
                  onClick={() => {
                    setVolume('100L');
                    setCustomVolume('');
                    setJacketType('Jacketed');
                    setAgitatorStyle('Anchor Impeller');
                    setClientName('');
                    setEmail('');
                    setCompany('');
                    setPhone('');
                    setCountry('');
                    setMessage('');
                    setSubmitResult(null);
                    setAiPrompt('');
                    setAiSuccessMessage('');
                    setCurrentStep(1);
                  }}
                  className="inline-flex items-center gap-2 border border-steel-gray hover:border-glass-cyan text-text-muted hover:text-pure-white font-mono text-xs px-6 py-3 rounded-radius-sm transition-colors"
                >
                  <RotateCcw className="h-4 w-4" /> CONFIGURE ANOTHER SYSTEM
                </button>
              </div>
            </div>
          )}

          {/* Navigation Controls (Forward / Backward) */}
          {currentStep <= 4 && (
            <div className="flex items-center justify-between border-t border-steel-gray pt-6 mt-8">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="inline-flex items-center gap-1.5 font-mono text-xs text-text-muted hover:text-pure-white disabled:opacity-40 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" /> PREV STEP
              </button>
              
              {currentStep < 4 ? (
                <button
                  onClick={nextStep}
                  className="inline-flex items-center gap-1.5 bg-steel-gray/50 hover:bg-tech-orange border border-steel-gray hover:border-tech-orange text-pure-white font-mono text-xs px-4 py-2.5 rounded-radius-xs transition-colors"
                >
                  NEXT STEP <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <span className="text-[10px] font-mono text-text-muted">READY TO DISPATCH</span>
              )}
            </div>
          )}

        </div>

      </main>
  );
}

export default function RFQPage() {
  return (
    <div className="flex min-h-screen flex-col bg-dark-obsidian font-sans text-text-main relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      <Header />

      <Suspense fallback={
        <main className="flex-1 mx-auto max-w-4xl w-full px-4 sm:px-6 py-12 space-y-10 z-10 flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-glass-cyan" />
        </main>
      }>
        <RFQPortalContent />
      </Suspense>

      <Footer />
    </div>
  );
}
