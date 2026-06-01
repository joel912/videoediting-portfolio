/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { 
  Send, Sparkles, Sliders, HardDrive, Calculator, CheckCircle2, 
  Clock, DollarSign, Calendar, RefreshCcw, Mail, HelpCircle, FileVideo 
} from 'lucide-react';
import { EDITORIAL_PACKAGES } from '../data';

export default function ContactForm() {
  // Calculator Stats
  const [projectCategory, setProjectCategory] = useState<string>('commercial');
  const [durationValue, setDurationValue] = useState<number>(1); // minutes
  const [rawFootageValue, setRawFootageValue] = useState<number>(200); // gigabytes
  const [speedDelivery, setSpeedDelivery] = useState<boolean>(false);
  const [fileAttached, setFileAttached] = useState<boolean>(false);

  // Client Details Form
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [briefDetails, setBriefDetails] = useState<string>('');
  
  // Submission State
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Calculate live price based on sliders
  const calculateLivePrice = () => {
    let basePrice = 800;
    
    // category multiplier
    if (projectCategory === 'commercial') {
      basePrice = 1100 + durationValue * 150 + Math.floor(rawFootageValue * 0.5);
    } else if (projectCategory === 'narrative') {
      basePrice = 2200 + durationValue * 120 + Math.floor(rawFootageValue * 0.4);
    } else {
      // grading and sound only
      basePrice = 600 + durationValue * 100 + Math.floor(rawFootageValue * 0.3);
    }

    if (speedDelivery) {
      basePrice = Math.floor(basePrice * 1.35); // 35% express surcharge
    }

    const minPrice = Math.floor(basePrice * 0.9);
    const maxPrice = Math.round(basePrice * 1.15);

    return { min: minPrice, max: maxPrice };
  };

  const estimatedPrice = calculateLivePrice();

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) {
      alert('Please fill out your Name and Email address so Ishan can follow up.');
      return;
    }
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const resetForm = () => {
    setClientName('');
    setClientEmail('');
    setBriefDetails('');
    setFileAttached(false);
    setIsSubmitted(false);
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-10 bg-[#0A0A0B] text-white border-b border-white/10 overflow-hidden">
      
      {/* Background cinematic mesh glow */}
      <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-[600px] h-[250px] bg-white/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-[#111113] border border-white/10 mb-4">
            <Mail className="w-3.5 h-3.5 text-white/80" />
            <span className="font-mono text-[10px] text-white/60 uppercase tracking-widest font-bold">Booking inquiry</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-5xl font-black tracking-tight uppercase leading-none text-white font-sans">
            START A SEQUENCE
          </h2>
          <p className="font-mono text-xs text-white/30 mt-3 max-w-xs sm:max-w-md mx-auto leading-relaxed">
            Estimate your video project with the interactive form below, or send custom logs directly to book studio suite space.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Side (5 Columns): Dynamic Budget Calculator Desk */}
          <div className="lg:col-span-12 bg-zinc-900/60 rounded-2xl border border-zinc-850 p-5 sm:p-6 font-mono flex flex-col justify-between" style={{ display: 'none' }}>
            <div className="space-y-6 text-left">
              <div className="flex items-center gap-2 pb-3 border-b border-zinc-800/80">
                <Calculator className="w-4 h-4 text-[#FF4A1C]" />
                <span className="text-xs font-bold text-white uppercase tracking-widest">PROJECT ESTIMATION MATRIX</span>
              </div>
            </div>
          </div>

          {/* Actual Left Side (5 Columns) under theme */}
          <div className="lg:col-span-5 bg-[#111113] rounded-sm border border-white/10 p-5 sm:p-6 font-mono flex flex-col justify-between">
            <div className="space-y-6 text-left">
              <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                <Calculator className="w-4 h-4 text-white" />
                <span className="text-xs font-bold text-white uppercase tracking-widest">PROJECT ESTIMATION MATRIX</span>
              </div>

              {/* 1. Category Switch */}
              <div className="space-y-2">
                <label className="text-[10px] text-white/45 font-bold uppercase tracking-wider block">1. Video Cut Layout</label>
                <div className="grid grid-cols-1 gap-1.5 font-mono text-xs">
                  {EDITORIAL_PACKAGES.map((pkg) => {
                    const isActive = projectCategory === pkg.id;
                    return (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => setProjectCategory(pkg.id)}
                        className={`px-3 py-2.5 rounded-sm text-left border transition-all cursor-pointer ${
                          isActive 
                            ? 'bg-black border-white text-white font-bold' 
                            : 'bg-black/40 border-white/5 text-white/40 hover:border-white/20'
                        }`}
                      >
                        <span className={`block font-bold text-[11px] ${isActive ? 'text-white' : 'text-zinc-300'}`}>{pkg.title}</span>
                        <span className="text-[8.5px] text-white/40 font-normal leading-tight block mt-0.5">{pkg.description.slice(0, 90)}...</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Duration Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider">
                  <span className="text-white/45">2. Target Cut Duration</span>
                  <span className="text-white font-bold">{durationValue} {durationValue === 20 ? '20+ Mins' : `${durationValue} Min`}</span>
                </div>
                <input 
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={durationValue}
                  onChange={(e) => setDurationValue(parseInt(e.target.value))}
                  className="w-full h-1 bg-black rounded appearance-none cursor-ew-resize accent-white"
                />
                <div className="flex justify-between text-[8px] text-[#E0E0E0]/30 font-bold font-mono">
                  <span>30 SECS</span>
                  <span>10 MINS</span>
                  <span>20+ MINS</span>
                </div>
              </div>

              {/* 3. Footage sizing details */}
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider">
                  <span className="text-white/45">3. Source RAW Footages</span>
                  <span className="text-white font-bold flex items-center gap-1">
                    <HardDrive className="w-3.5 h-3.5 text-white/40" /> {rawFootageValue} GB
                  </span>
                </div>
                <input 
                  type="range"
                  min="50"
                  max="1500"
                  step="50"
                  value={rawFootageValue}
                  onChange={(e) => setRawFootageValue(parseInt(e.target.value))}
                  className="w-full h-1 bg-black appearance-none cursor-ew-resize accent-white rounded"
                />
                <div className="flex justify-between text-[8px] text-[#E0E0E0]/30 font-bold font-mono">
                  <span>50 GB</span>
                  <span>500 GB</span>
                  <span>1.5 TB+ RAW</span>
                </div>
              </div>

              {/* 4. Express modifier Switch */}
              <div className="flex items-center justify-between p-3 bg-black rounded-sm border border-white/5 text-xs">
                <div className="text-left font-mono pr-2">
                  <span className="text-white font-bold block text-[10px] uppercase tracking-wider">⚡ EXPRESS 48-HR delivery?</span>
                  <span className="text-[9px] text-white/40 font-normal leading-tight block mt-0.5">Bumps sequence to active rendering priorities</span>
                </div>
                
                <button
                  type="button"
                  onClick={() => setSpeedDelivery(!speedDelivery)}
                  className={`w-10 h-6 rounded-full p-1 transition-colors outline-none cursor-pointer ${
                    speedDelivery ? 'bg-white' : 'bg-white/10'
                  }`}
                >
                  <div className={`w-4 h-4 bg-black rounded-full transition-transform ${
                    speedDelivery ? 'translate-x-4' : 'translate-x-0'
                  }`} />
                </button>
              </div>

            </div>

            {/* Generated results calculator summary */}
            <div className="bg-black p-4 border border-white/5 rounded-sm mt-6 text-left relative overflow-hidden group">
              <span className="text-[9px] text-white/40 uppercase tracking-wider block font-bold mb-1">
                Estimated Suite Quote Budget
              </span>
              <div className="text-2xl sm:text-3xl font-sans font-black text-white leading-none tracking-tight block">
                ${estimatedPrice.min.toLocaleString()} - ${estimatedPrice.max.toLocaleString()}
                <span className="text-xs font-mono text-white/50 font-bold tracking-normal ml-1.5 uppercase">USD</span>
              </div>
              <p className="font-mono text-[9px] text-white/30 leading-normal mt-2 select-none">
                *Subject to complexity of visual effects and audio multitracks. Deliverables conformed to global theatrical and social standards.
              </p>
            </div>
          </div>

          {/* Right Side (7 Columns): Booking interactive form */}
          <div className="lg:col-span-7 bg-[#111113]/80 rounded-sm border border-white/10 p-5 sm:p-8 flex flex-col justify-between">
            {isSubmitted ? (
              // Success submit sequenceconformance state
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-zinc-50">
                <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white mb-4 animate-bounce">
                  <CheckCircle2 className="w-7 h-7 text-white" />
                </div>
                <h4 className="font-sans text-xl font-black uppercase tracking-tight text-white font-sans">TRANSMISSION CONFORMED!</h4>
                <p className="font-mono text-xs text-white/60 max-w-sm mt-3 leading-relaxed">
                  Ishan's room editing buffer has cached your specs. A conformed sequence pitch log will be dispatched to <span className="text-white font-bold tracking-wide">{clientEmail}</span> shortly.
                </p>
                <div className="bg-black p-3.5 border border-white/5 rounded-sm mt-6 font-mono text-[10px] text-white/40 max-w-xs">
                  ⏰ ESTIMATED TURNAROUND: <span className="text-white font-bold">under 4 hours</span>
                </div>
                
                <button
                  onClick={resetForm}
                  className="mt-8 font-mono text-[10px] font-bold tracking-widest text-white/80 uppercase border-b border-white/20 pb-0.5 hover:text-white transition-all cursor-pointer flex items-center gap-1"
                >
                  <RefreshCcw className="w-3.5 h-3.5 text-white/80" /> Start New Sequence Form
                </button>
              </div>
            ) : (
              // Interactive Form
              <form onSubmit={handleFormSubmit} className="space-y-5 text-left flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-mono text-[10.5px] text-white/55 uppercase font-semibold">Your Name</label>
                      <input 
                        type="text" 
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-black border border-white/5 rounded-sm px-4 py-2.5 font-mono text-xs text-white focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-mono text-[10.5px] text-white/55 uppercase font-semibold">Email Address</label>
                      <input 
                        type="email" 
                        required
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="john@studio.com"
                        className="w-full bg-black border border-white/5 rounded-sm px-4 py-2.5 font-mono text-xs text-white focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[10.5px] text-white/55 uppercase font-semibold">Project brief & Cut style notes</label>
                    <textarea 
                      rows={5}
                      value={briefDetails}
                      onChange={(e) => setBriefDetails(e.target.value)}
                      placeholder="Detail pacing goals, cinematic influences (e.g. moody cyberpunk, fast kinetic ramps), musical score rhythm files details, or reference links..."
                      className="w-full bg-black border border-white/5 rounded-sm px-4 py-3 font-mono text-xs text-white focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white transition-colors resize-none leading-relaxed"
                    />
                  </div>

                  {/* Drag and drop raw-cut links file selection */}
                  <div className="space-y-2">
                    <label className="font-mono text-[10.5px] text-white/55 uppercase font-semibold">Footage Folders & Rough-cut XMLs</label>
                    <div 
                      onClick={() => setFileAttached(true)}
                      className={`border border-dashed rounded-sm p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center ${
                        fileAttached 
                          ? 'border-white/30 bg-white/5' 
                          : 'border-white/5 hover:border-white/25 bg-black'
                      }`}
                    >
                      <FileVideo className={`w-6 h-6 mb-2 ${fileAttached ? 'text-white' : 'text-zinc-600'}`} />
                      
                      {fileAttached ? (
                        <div>
                          <span className="font-mono text-[10px] text-white font-bold uppercase tracking-wider block">
                            ✓ Folder Conformed
                          </span>
                          <span className="font-sans text-[11px] text-white/45 block mt-1">
                            Mock raw folder attached securely.
                          </span>
                        </div>
                      ) : (
                        <div>
                          <span className="font-mono text-[10px] text-white/80 font-bold uppercase tracking-wider block">
                            Drop Google Drive / Frame.io links
                          </span>
                          <span className="font-sans text-[11px] text-white/35 block mt-1">
                            Accepts .fcpxml, .edl, .xml, or raw folder attachments
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4.5 bg-white hover:bg-neutral-200 hover:scale-[1.01] active:scale-95 text-black font-mono text-xs uppercase tracking-widest font-black rounded-sm cursor-pointer shadow-lg transition-all flex items-center justify-center gap-2 mt-6"
                >
                  <Send className="w-4 h-4 text-black" />
                  {isSubmitting ? 'DISPATCHING TO SUITE BUFFER...' : '🎬 TRANSMIT EDIT BRIEF'}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
