/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Film, Volume2, VolumeX, Flame, Mail, Award, Cpu, Sparkles } from 'lucide-react';

interface HeaderProps {
  onScrollToSection: (sectionId: string) => void;
  backgroundMusicActive: boolean;
  toggleMusic: () => void;
}

export default function Header({ onScrollToSection, backgroundMusicActive, toggleMusic }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex items-center justify-center px-4 w-full pointer-events-none transition-all duration-300">
      <div 
        className={`pointer-events-auto w-full max-w-4xl flex items-center justify-between rounded-lg px-5 py-2.5 transition-all duration-500 border ${
          scrolled 
            ? 'bg-[#0A0A0B]/90 backdrop-blur-md shadow-2xl border-white/10' 
            : 'bg-[#111113]/40 backdrop-blur-xs border-white/5'
        }`}
      >
        <div className="flex items-center gap-4">
          {/* Logo / Maker Mark */}
          <button 
            onClick={() => onScrollToSection('hero')}
            className="flex items-center gap-3 group cursor-pointer focus:outline-none text-left"
          >
            <div className="w-8 h-8 bg-white flex items-center justify-center rounded-xs transition-transform group-hover:scale-105">
              <span className="text-black font-sans font-black text-sm tracking-tighter">IA</span>
            </div>
            <div className="text-left hidden xs:block">
              <span className="font-sans font-bold text-xs tracking-tight text-white block">ISHAN ARORA</span>
              <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block">PORTFOLIO</span>
            </div>
          </button>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-5 ml-6 pl-6 border-l border-white/10">
            <button 
              onClick={() => onScrollToSection('reel')} 
              className="text-xs font-mono tracking-widest text-white/50 hover:text-white uppercase transition-colors"
            >
              Reel
            </button>
            <button 
              onClick={() => onScrollToSection('projects')} 
              className="text-xs font-mono tracking-widest text-white/50 hover:text-white uppercase transition-colors"
            >
              Works
            </button>
            <button 
              onClick={() => onScrollToSection('cutting-room')} 
              className="text-xs font-mono tracking-widest text-white/50 hover:text-white uppercase transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-white/75 animate-pulse" /> Customize Cut
            </button>
            <button 
              onClick={() => onScrollToSection('workspace')} 
              className="text-xs font-mono tracking-widest text-white/50 hover:text-white uppercase transition-colors"
            >
              Rig Specs
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {/* Sound Mood Player Indicator */}
          <button
            onClick={toggleMusic}
            className="w-9 h-9 rounded-md bg-[#161618] hover:bg-[#222225] flex items-center justify-center text-white/60 hover:text-white border border-white/5 transition-colors focus:outline-none"
            title={backgroundMusicActive ? "Mute Ambient Foley SFX" : "Unmute Ambient Foley SFX"}
          >
            {backgroundMusicActive ? (
              <div className="flex items-end gap-[2px] h-3 px-1">
                <span className="w-[2px] bg-white rounded-full animate-[bounce_1s_infinite_100ms] h-full" />
                <span className="w-[2px] bg-white rounded-full animate-[bounce_1.2s_infinite_400ms] h-1/2" />
                <span className="w-[2px] bg-white rounded-full animate-[bounce_0.8s_infinite_200ms] h-3/4" />
                <span className="w-[2px] bg-white rounded-full animate-[bounce_1.1s_infinite_650ms] h-full" />
              </div>
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          {/* Book Session Call To Action */}
          <button 
            onClick={() => onScrollToSection('contact')}
            className="bg-white text-black hover:bg-neutral-200 hover:scale-[1.02] active:scale-95 text-[10px] font-mono uppercase tracking-wider px-4 py-2 rounded-xs font-bold transition-all duration-300 shrink-0 cursor-pointer flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Contact Ishan</span>
            <span className="sm:hidden">Contact</span>
          </button>
        </div>
      </div>
    </header>
  );
}
