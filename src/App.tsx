/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { 
  Film, Sparkles, Monitor, Smartphone, Volume2, VolumeX, Mail, 
  MapPin, Award, CheckCircle2, Sliders, ExternalLink, HelpCircle 
} from 'lucide-react';
import Header from './components/Header';
import TimelinePlayer from './components/TimelinePlayer';
import CuttingRoom from './components/CuttingRoom';
import ProjectShowcase from './components/ProjectShowcase';
import StatsWorkspace from './components/StatsWorkspace';
import ContactForm from './components/ContactForm';
import { EXQUISITE_PROJECTS } from './data';

export default function App() {
  const [backgroundMusicActive, setBackgroundMusicActive] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Scroll handler with offset support for rounded overlays
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  // Music trigger
  const toggleMusic = () => {
    if (!audioRef.current) return;
    
    if (backgroundMusicActive) {
      audioRef.current.pause();
      setBackgroundMusicActive(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setBackgroundMusicActive(true);
        })
        .catch(() => {
          alert("Ambient player was blocked. Please tap once the interface to authorize audio playback.");
        });
    }
  };

  return (
    <div className="bg-[#0A0A0B] text-[#E0E0E0] min-h-screen antialiased selection:bg-white selection:text-black font-sans overflow-x-hidden">
      
      {/* Background ambient music tag */}
      <audio 
        ref={audioRef}
        src="https://assets.mixkit.co/music/preview/mixkit-cinematic-epic-dawn-2621.mp3"
        loop
      />

      {/* Floating Navigator bar */}
      <Header 
        onScrollToSection={scrollToSection}
        backgroundMusicActive={backgroundMusicActive}
        toggleMusic={toggleMusic}
      />

      <main>
        {/* 1. HERO - Luxurious Editorial Opening */}
        <section id="hero" className="relative min-h-screen flex flex-col justify-between pt-40 pb-16 px-4 sm:px-10 overflow-hidden bg-gradient-to-b from-[#0A0A0B] via-[#0D0D10] to-[#111113]">
          
          {/* Radial decorative flare */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-white/3 to-transparent blur-[140px] pointer-events-none rounded-full" />

          {/* Interactive Top metadata rows */}
          <div className="max-w-6xl mx-auto w-full flex flex-wrap justify-between items-start gap-4 font-mono text-[9px] uppercase tracking-widest text-[#E0E0E0]/40 z-10">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              <span>ACTIVE IN ROOM SUITE 04 // RETINA MONITORS ONLINE</span>
            </div>
            
            <div className="flex gap-6">
              <span>NEW DELHI / SATELLITE SUITE</span>
              <span>• COMMISSIONS ACCESSIBLE 2026</span>
            </div>
          </div>

          {/* Epic scale editorial typography header */}
          <div className="max-w-6xl mx-auto w-full text-center my-auto relative z-10 flex flex-col items-center">
            
            {/* Overlay brief mark */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-[#111113] border border-white/10 mb-6">
              <Award className="w-3.5 h-3.5 text-white/80" />
              <span className="font-mono text-[10px] tracking-widest text-white/60 font-bold">DAVINCI RESOLVE CERTIFIED EDITOR</span>
            </div>

            <h1 className="font-sans text-[12vw] md:text-[9.5vw] font-black tracking-tighter uppercase leading-[0.8] mb-6 text-white select-none">
              ISHAN ARORA
            </h1>
            
            <h2 className="font-mono text-xs sm:text-sm tracking-[0.45em] text-white/50 font-black uppercase text-center ml-[0.45em] block">
              FILM EDITOR & COLOR GRADER
            </h2>

            <p className="font-sans text-xs sm:text-sm text-white/40 max-w-xl mx-auto mt-6 leading-relaxed font-normal">
              Aesthetic editorial pacing, precise multi-layered foley, and Flanders precision color grading for commercial brands and independent filmmakers worldwide.
            </p>

            {/* Direct action triggers */}
            <div className="flex flex-wrap gap-4 mt-8 justify-center">
              <button 
                onClick={() => scrollToSection('reel')}
                className="bg-white text-black hover:bg-neutral-200 hover:scale-[1.02] active:scale-95 px-6 py-3 rounded-xs font-mono text-[10.5px] uppercase font-black tracking-widest shadow-xl transition-all cursor-pointer"
              >
                🎥 TEST REEL EMULATOR
              </button>

              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-transparent text-white border border-white/10 hover:border-white/30 hover:bg-white/5 px-6 py-3 rounded-xs font-mono text-[10.5px] uppercase font-black tracking-widest transition-all cursor-pointer"
              >
                REQUEST PRICING LOG
              </button>
            </div>
          </div>

          {/* Lower interactive layout collage preview strip */}
          <div className="max-w-6xl mx-auto w-full z-10 pt-12">
            <div className="flex items-center justify-between text-[#E0E0E0]/30 font-mono text-[9px] uppercase pb-3 border-b border-white/10">
              <span>WORK STATION ACCENTS</span>
              <span>SCROLL DOWN TO CONFORM SPECIFICATION</span>
            </div>
          </div>
        </section>

        {/* 2. TICKER - Horizontal film strip loop */}
        <section className="bg-[#111113] border-y border-white/10 py-3.5 overflow-hidden select-none">
          <div className="ticker-container">
            <div className="animate-ticker flex whitespace-nowrap gap-16 font-mono text-[10px] tracking-[0.25em] font-bold text-white/40 uppercase">
              <span>COLOR GRADING LUT BAKE</span>
              <span>•</span>
              <span>PRORES RAW 4444</span>
              <span>•</span>
              <span>CINEMATIC PACING SYNC</span>
              <span>•</span>
              <span>SOUND DESIGN & SFX FOLEY</span>
              <span>•</span>
              <span>VERTICAL REEL CONFORMANCE</span>
              <span>•</span>
              <span>MULTI-CAMERA SOURCE INGEST</span>
              <span>•</span>
              <span>MATCH CUTTING PROTOCOLS</span>
              <span>•</span>
              <span>SIGNATURE GRADING MATRIX</span>
              <span>•</span>
              {/* Dual listing for seamless scroll */}
              <span>COLOR GRADING LUT BAKE</span>
              <span>•</span>
              <span>PRORES RAW 4444</span>
              <span>•</span>
              <span>CINEMATIC PACING SYNC</span>
              <span>•</span>
              <span>SOUND DESIGN & SFX FOLEY</span>
              <span>•</span>
              <span>VERTICAL REEL CONFORMANCE</span>
              <span>•</span>
              <span>MULTI-CAMERA SOURCE INGEST</span>
              <span>•</span>
              <span>MATCH CUTTING PROTOCOLS</span>
            </div>
          </div>
        </section>

        {/* 3. CORE TIMELINE PLAYER (Interactive Aspect Ratios, LUT Selection) */}
        <TimelinePlayer 
          projects={EXQUISITE_PROJECTS}
          backgroundMusicActive={backgroundMusicActive}
          toggleMusic={toggleMusic}
        />

        {/* 4. THE CUTTING ROOM (Interactive sequence conformer) */}
        <CuttingRoom />

        {/* 5. PROJECTS GRID & COLOR COMPARATIVE INSPECTOR */}
        <ProjectShowcase />

        {/* 6. HARDWARE & WORKSPACE TECH SPECIFICATIONS */}
        <StatsWorkspace />

        {/* 7. CONTACT & ESTIMATION FORM */}
        <ContactForm />

      </main>

      {/* FOOTER */}
      <footer className="bg-[#111113] pt-20 pb-12 px-4 sm:px-10 border-t border-white/10 relative z-20">
        <div className="max-w-6xl mx-auto">
          
          {/* Main distribution columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10 items-start text-left">
            
            {/* Columns 1-4: Biography block */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-xs" />
                <span className="font-mono text-xs uppercase tracking-widest text-white font-semibold">ISHAN ARORA</span>
              </div>
              <p className="font-sans text-xs text-white/50 leading-relaxed font-normal">
                Dedicated independent video editor crafting world-class cuts. Utilizing Flanders Scientific grade panels and Apple Silicon M2 Ultra matrix units to conform perfect deliverables.
              </p>
              <div className="text-white/30 font-mono text-[9px] uppercase tracking-widest block pt-2">
                © {new Date().getFullYear()} ISHAN ARORA. ALL RIGHTS RESERVED.
              </div>
            </div>

            {/* Columns 5-8: Workspace specifications guidelines */}
            <div className="lg:col-span-4 space-y-3 font-mono text-[10px] text-white/50">
              <h4 className="text-[11px] font-bold uppercase text-white tracking-wider">MEDIA LOGISTICS GUIDE</h4>
              <p className="font-sans leading-relaxed text-[11px] font-normal text-white/30 text-left">
                To replace mock reels with your native clips later, simply edit `/src/data.ts` to assign your personalized MP4 sources and before/after color grading JPEG references.
              </p>
              <ul className="space-y-1.5 text-white/40 font-mono text-[9.5px]">
                <li className="flex items-center gap-1.5">✓ 1. Edit EXQUISITE_PROJECTS entries</li>
                <li className="flex items-center gap-1.5">✓ 2. Replace Unsplash thumbnails with actual JPGs</li>
                <li className="flex items-center gap-1.5">✓ 3. Save files to test automatic builds</li>
              </ul>
            </div>

            {/* Columns 9-12: Contact index shortcuts */}
            <div className="lg:col-span-4 space-y-4 font-mono text-[10px]">
              <h4 className="text-[11px] font-bold uppercase text-white tracking-wider">SUITE INTERCOMS</h4>
              <div className="space-y-2">
                <div className="flex justify-between pb-1 border-b border-white/10">
                  <span className="text-white/40">DIRECT EMAIL:</span>
                  <a href="mailto:ishan@suite4.com" className="hover:text-white text-white/80 transition-colors">ishan@suite4.com</a>
                </div>
                <div className="flex justify-between pb-1 border-b border-white/10">
                  <span className="text-white/40 font-normal">FRAME.IO DIRECT:</span>
                  <span className="text-white/80">ishan_arora_room4</span>
                </div>
                <div className="flex justify-between pb-1 border-b border-white/10">
                  <span className="text-white/40">OFFICE COMMUNICATOR:</span>
                  <span className="text-white/80">+91 99824 XXXXX</span>
                </div>
              </div>
            </div>

          </div>

          {/* Lower legal / credits line */}
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 font-mono text-[9px] text-white/30 tracking-wider">
            <span>DESIGN INSPIRED BY THE MEGALITHIC LUMIO ARCHITECTURE</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">PRIVACY CODE</a>
              <a href="#" className="hover:text-white transition-colors">CONFORMANCE CONCESSION</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
