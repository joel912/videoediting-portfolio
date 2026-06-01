/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { 
  Play, Pause, Sliders, Monitor, Smartphone, Video, Square, RefreshCw, 
  Volume2, VolumeX, Eye, Flame, Layers, Info, Check, EyeOff, Music, Sparkles
} from 'lucide-react';
import { VideoClip } from '../types';

interface TimelinePlayerProps {
  projects: VideoClip[];
  backgroundMusicActive: boolean;
  toggleMusic: () => void;
}

const LUTS = [
  { id: 'log', name: 'LOG FLAT', className: 'contrast-75 saturate-50 brightness-110 sepia-[0.05]', desc: 'Raw camera output, flat curve' },
  { id: 'rec709', name: 'REC.709 STD', className: 'contrast-100 saturate-100 brightness-100', desc: 'Standard broadcast color space' },
  { id: 'amber', name: 'WARM CINE', className: 'sepia-[0.3] saturate-110 brightness-[0.95] contrast-[1.15] hue-rotate-[-3deg]', desc: 'Atmospheric gold hour tone' },
  { id: 'cyber', name: 'CYBER TEA/ORA', className: 'hue-rotate-[145deg] saturate-150 contrast-125 brightness-105', desc: 'Futuristic cyberpunk grade' },
  { id: 'noir', name: 'NOIR MONO', className: 'grayscale contrast-[1.3] brightness-90', desc: 'Silvery, high-contrast dark tone' }
];

const ASPECT_RATIOS = [
  { id: 'scope', name: '2.39:1 Cinema', icon: Video, childClass: 'aspect-[2.39/1] max-w-full max-h-[420px]' },
  { id: 'landscape', name: '16:9 Landscape', icon: Monitor, childClass: 'aspect-[16/9] max-w-full' },
  { id: 'vertical', name: '9:16 Vertical Reel', icon: Smartphone, childClass: 'aspect-[9/16] max-w-sm h-[500px]' },
  { id: 'square', name: '1:1 Social', icon: Square, childClass: 'aspect-square max-w-[400px]' }
];

export default function TimelinePlayer({ projects, backgroundMusicActive, toggleMusic }: TimelinePlayerProps) {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const activeProject = projects[activeProjectIndex];

  const [isPlaying, setIsPlaying] = useState(false);
  const [activeRatio, setActiveRatio] = useState('scope'); // scope, landscape, vertical, square
  const [activeLUT, setActiveLUT] = useState('amber'); // amber, log, rec709, cyber, noir
  const [timelineProgress, setTimelineProgress] = useState(38); // percentage 0-100
  const [colorSplitActive, setColorSplitActive] = useState(false); // compare log vs lut in split-screen
  const [isAudioMuted, setIsAudioMuted] = useState(true);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timelineIntervalRef = useRef<number | null>(null);

  const currentRatioSpec = ASPECT_RATIOS.find(r => r.id === activeRatio) || ASPECT_RATIOS[0];
  const currentLUTSpec = LUTS.find(l => l.id === activeLUT) || LUTS[0];

  // Sync internal player state with actual HTML5 video element where appropriate
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {
          // autoplay block fallback
          setIsPlaying(false);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, activeProjectIndex]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isAudioMuted;
    }
  }, [isAudioMuted]);

  // Set up progress tracking
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration) {
        const percent = (video.currentTime / video.duration) * 100;
        setTimelineProgress(percent);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [activeProjectIndex]);

  const handleTimelineScrub = (e: ChangeEvent<HTMLInputElement>) => {
    const percent = parseFloat(e.target.value);
    setTimelineProgress(percent);
    
    if (videoRef.current && videoRef.current.duration) {
      videoRef.current.currentTime = (percent / 100) * videoRef.current.duration;
    }
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextProject = () => {
    const nextIndex = (activeProjectIndex + 1) % projects.length;
    setActiveProjectIndex(nextIndex);
    setIsPlaying(false);
    setTimelineProgress(0);
  };

  // Sound design waveform bars simulation
  const waveformBars = Array.from({ length: 48 }, (_, i) => {
    // Generate height based on sin curves + a bit of random offset to make it look audio-reactive
    const baseVal = Math.abs(Math.sin((i / 48) * Math.PI * 4));
    const randomPulse = isPlaying ? Math.random() * 0.4 + 0.6 : 0.2;
    const heightPercent = Math.min(100, Math.max(10, baseVal * 100 * randomPulse));
    return heightPercent;
  });

  return (
    <section id="reel" className="relative py-20 px-4 sm:px-10 bg-[#0A0A0B] text-white border-b border-white/10 overflow-hidden">
      
      {/* Background cinematic overlay glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-r from-white/3 to-transparent blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Indicator */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-[2px] w-8 bg-white" />
              <span className="font-mono text-xs uppercase tracking-widest text-white/50 font-semibold">The Core Showreel</span>
            </div>
            <h2 className="font-sans text-4xl sm:text-5xl font-black tracking-tight uppercase leading-none">
              DYNAMIC REEL <br />
              <span className="text-white/40">DEC DECISION LAB</span>
            </h2>
            <p className="font-mono text-xs text-white/30 mt-2">
              Interactive Color-Grading, Crop Preview, and Foley sound design testing workspace.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="flex flex-wrap gap-4 font-mono text-[11px] leading-tight">
            <div className="bg-[#111113] border border-white/10 rounded-sm p-3 min-w-[130px]">
              <span className="text-white/30 block mb-1">PROJECT FPS</span>
              <span className="text-white text-base font-bold flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-white/85" /> {activeProject.fps} fps
              </span>
            </div>
            <div className="bg-[#111113] border border-white/10 rounded-sm p-3 min-w-[130px]">
              <span className="text-white/30 block mb-1">RESOLUTION / CODEC</span>
              <span className="text-white uppercase truncate text-xs font-semibold block">{activeProject.codec}</span>
            </div>
            <div className="bg-[#111113] border border-white/10 rounded-sm p-3 min-w-[130px]">
              <span className="text-white/30 block mb-1">ORIGINAL MASTER</span>
              <span className="text-white text-xs font-semibold block uppercase truncate">{activeProject.software.split(' &')[0]}</span>
            </div>
          </div>
        </div>

        {/* The Master Control Console Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Main Visual Display Screen Area */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            
            {/* Aspect Ratio Cropped Screen Frame */}
            <div className="bg-[#0A0A0B] rounded-sm border border-white/10 shadow-2xl relative overflow-hidden flex items-center justify-center min-h-[350px] lg:min-h-[460px] p-2 select-none group/player">
              
              {/* Corner tech focus marks */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/10 pointer-events-none" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white/10 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white/10 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/10 pointer-events-none" />

              {/* REC simulation blinking red light */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded bg-black/85 border border-white/10 flex items-center gap-1.5 font-mono text-[10px] tracking-widest z-20">
                <span className={`w-2 h-2 rounded-full bg-white ${isPlaying ? 'animate-ping' : ''}`} />
                <span className="text-white/50">PLAYBACK RATE: <span className="text-white">1.0x</span></span>
              </div>

              {/* Aspect-Ratio Framing Overlay Ruler Lines (Displays when hovering or on toggle) */}
              <div className="absolute inset-x-0 top-12 bottom-12 border-y border-dashed border-white/5 pointer-events-none z-10" />
              <div className="absolute inset-y-0 left-12 right-12 border-x border-dashed border-white/5 pointer-events-none z-10" />

              {/* Cropping Container based on activeRatio */}
              <div 
                className={`relative shadow-2xl bg-black rounded-xs overflow-hidden flex items-center justify-center transition-all duration-500 ease-out z-10 ${
                  currentRatioSpec.childClass
                }`}
              >
                
                {/* Embedded HTML5 Video Player */}
                <video
                  ref={videoRef}
                  src={activeProject.videoUrl}
                  loop
                  playsInline
                  autoPlay={false}
                  className={`w-full h-full object-cover transition-all duration-300 pointer-events-none ${
                    colorSplitActive ? 'contrast-100 saturate-100' : currentLUTSpec.className
                  }`}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />

                {/* LUT Split Screen Preview Split Line Simulator */}
                {colorSplitActive && (
                  <div className="absolute inset-0 pointer-events-none flex">
                    {/* Left half - Flat RAW log */}
                    <div className="w-1/2 h-full bg-transparent overflow-hidden relative">
                      <div className="absolute inset-0 bg-zinc-950/0 backdrop-contrast-75 backdrop-saturate-50 backdrop-brightness-110" />
                      <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded font-mono text-[9px] uppercase tracking-wider text-white/60">
                        Camera RAW Log
                      </div>
                    </div>
                    {/* Split bar */}
                    <div className="w-[1.5px] h-full bg-white/40 relative flex items-center justify-center">
                      <div className="absolute w-8 h-8 rounded-full bg-[#111113] border border-white/20 text-white flex items-center justify-center font-mono text-[9px] font-bold">
                        V/S
                      </div>
                    </div>
                    {/* Right half - Graded LUT overlay */}
                    <div className="w-1/2 h-full bg-transparent overflow-hidden relative">
                      <div className="absolute inset-0 bg-transparent" />
                      <div className="absolute bottom-3 right-3 bg-white text-black font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded">
                        Graded: {currentLUTSpec.name}
                      </div>
                    </div>
                  </div>
                )}

                {/* Big Center play state toggle mask overlay */}
                {!isPlaying && (
                  <button 
                    onClick={togglePlayback}
                    className="absolute inset-0 flex items-center justify-center bg-black/45 hover:bg-black/30 transition-colors z-20 focus:outline-none cursor-pointer group"
                  >
                    <div className="w-14 h-14 rounded-xs bg-white text-black hover:bg-neutral-200 flex items-center justify-center transform group-hover:scale-105 transition-transform shadow-2xl text-black">
                      <Play className="w-6 h-6 fill-black text-black translate-x-[2px]" />
                    </div>
                  </button>
                )}
              </div>

              {/* Watermark Branding overlay inside container */}
              <div className="absolute bottom-4 space-y-1 text-center sm:text-left sm:left-6 font-mono text-[10px] text-white/30 tracking-wider z-20 pointer-events-none uppercase">
                <span>ISHAN ARORA CUTS™</span>
                <span className="hidden sm:inline"> | TIME SPACE SEQUENCE</span>
              </div>
            </div>

            {/* Editing Timeline Scrubbing Grid Console */}
            <div className="bg-[#111113] border border-white/10 rounded-sm p-4 flex flex-col gap-4 font-mono">
              <div className="flex items-center justify-between text-xs text-white/50">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-white" />
                  <span className="font-bold text-white tracking-widest text-[10px] uppercase">TIMELINE CONTROLLERS</span>
                </div>
                {/* Active time counter simulator calculated from timelineProgress */}
                <span className="text-white font-semibold text-xs tracking-wider">
                  00:{(Math.floor(timelineProgress * 0.15)).toString().padStart(2, '0')}:{(Math.floor((timelineProgress % 10) * 6)).toString().padStart(2, '0')} : <span className="text-white/30">24F</span>
                </span>
              </div>

              {/* Scrubbing bar & Timeline Ticks */}
              <div className="relative">
                {/* Micro cut markers */}
                <div className="absolute inset-x-4 top-[-6px] h-3 pointer-events-none flex justify-between">
                  <div className="w-[1.5px] h-3 bg-white" title="CUT 1: Visual Drift" />
                  <div className="w-[1.5px] h-3 bg-white/40 ml-[25%] opacity-70" title="SOUND: Brake Screech" />
                  <div className="w-[1.5px] h-3 bg-white/70 ml-[35%] opacity-80" title="CUT 2: Profile Zoom" />
                  <div className="w-[1.5px] h-3 bg-white/50 ml-[60%] opacity-90" title="MUSIC: Drum Rise" />
                  <div className="w-[1.5px] h-3 bg-white ml-[75%]" title="CUT 3: Final Flare" />
                </div>

                <input 
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  value={timelineProgress}
                  onChange={handleTimelineScrub}
                  className="w-full h-1 bg-[#0A0A0B] rounded-lg appearance-none cursor-ew-resize accent-white border-none"
                />

                {/* Visual ruler ticking lines below scrubbing bar */}
                <div className="flex justify-between text-[8px] text-white/30 mt-1 pointer-events-none select-none">
                  <span>00:00:00</span>
                  <span>00:02:12</span>
                  <span>00:04:24</span>
                  <span>00:06:36</span>
                  <span>00:08:48</span>
                  <span>00:11:00</span>
                </div>
              </div>

              {/* Real-time sound level bars simulation */}
              <div className="flex items-center gap-3">
                <span className="text-[9px] text-white/30 uppercase tracking-widest shrink-0">SOUND DES:</span>
                <div className="flex-1 flex items-end justify-between h-8 bg-black/60 rounded border border-white/5 px-2 overflow-hidden py-1">
                  {waveformBars.map((h, i) => (
                    <div 
                      key={i} 
                      className={`w-[1.5px] rounded-t-full transition-all duration-300 ${
                        isPlaying 
                          ? i % 10 === 0 
                            ? 'bg-white' 
                            : 'bg-white/40' 
                          : 'bg-white/10'
                      }`}
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
                {/* Audio activation control */}
                <button
                  onClick={() => setIsAudioMuted(!isAudioMuted)}
                  className={`w-8 h-8 rounded flex items-center justify-center transition-colors border ${
                    isAudioMuted 
                      ? 'bg-black/80 text-white/40 border-white/5' 
                      : 'bg-white text-black border-white'
                  }`}
                  title={isAudioMuted ? "Unmute Demo Audio" : "Mute Demo Audio"}
                >
                  {isAudioMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Fast Player Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-1 border-t border-white/5 font-mono text-[10px]">
                <div className="flex items-center gap-2">
                  <button
                    onClick={togglePlayback}
                    className={`px-3 py-1.5 rounded-xs font-mono font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                      isPlaying 
                        ? 'bg-[#1e1e24] text-white hover:bg-neutral-800' 
                        : 'bg-white text-black hover:bg-neutral-200'
                    }`}
                  >
                    {isPlaying ? <Pause className="w-3 h-3 fill-white" /> : <Play className="w-3 h-3 fill-black text-black" />}
                    {isPlaying ? 'PAUSE' : 'PLAY'}
                  </button>

                  <button
                    onClick={() => {
                      if (videoRef.current) videoRef.current.currentTime = 0;
                      setTimelineProgress(0);
                    }}
                    className="px-2.5 py-1.5 rounded-xs bg-[#0A0A0B] text-white/50 hover:text-white border border-white/5 hover:bg-[#111113] transition-colors"
                  >
                    RESET
                  </button>
                </div>

                {/* Color grading compare mode toggle */}
                <button
                  onClick={() => {
                    setColorSplitActive(!colorSplitActive);
                    if (!colorSplitActive) {
                      setActiveLUT('amber'); // preset for nice side-by-side contrast
                    }
                  }}
                  className={`px-3 py-1.5 rounded-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
                    colorSplitActive 
                      ? 'bg-white/10 border-white text-white' 
                      : 'bg-[#0A0A0B] border-white/5 hover:bg-[#111113] text-white/50 hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  GRADE SPLIT-SCREEN: {colorSplitActive ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>
          </div>

          {/* Right Console: Aspect-Ratio and LUT Control Desk */}
          <div className="flex flex-col gap-6">
            
            {/* Aspect Ratio Framing Preset */}
            <div className="bg-[#111113] border border-white/10 rounded-sm p-4 flex flex-col gap-4">
              <h3 className="font-mono text-xs font-bold tracking-wider text-white/40 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5" />
                <span>1. ASPECT GRID SIZE</span>
              </h3>
              
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                {ASPECT_RATIOS.map((ratio) => {
                  const IconComponent = ratio.icon;
                  const isActive = activeRatio === ratio.id;
                  return (
                    <button
                      key={ratio.id}
                      onClick={() => setActiveRatio(ratio.id)}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-xs font-mono text-left text-xs border transition-all cursor-pointer ${
                        isActive
                          ? 'bg-white/10 border-white text-white font-bold'
                          : 'bg-[#0A0A0B] border-white/5 hover:border-white/10 hover:bg-[#111113] text-white/40'
                      }`}
                    >
                      <IconComponent className={`w-4 h-4 ${isActive ? 'text-white' : 'text-white/40'}`} />
                      <div className="leading-tight">
                        <span className="block text-[11px] font-semibold">{ratio.name}</span>
                        <span className="text-[9px] text-white/30 font-normal block">Crop preview layout</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom LUT Color Grader Deck */}
            <div className="bg-[#111113] border border-white/10 rounded-sm p-4 flex flex-col gap-3">
              <h3 className="font-mono text-xs font-bold tracking-wider text-white/40 flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5" />
                <span>2. SELECT COLOR LUT</span>
              </h3>

              <div className="flex flex-col gap-1.5">
                {LUTS.map((lut) => {
                  const isActive = activeLUT === lut.id;
                  return (
                    <button
                      key={lut.id}
                      onClick={() => {
                        setActiveLUT(lut.id);
                        setColorSplitActive(false); // disable comparative if single selected
                      }}
                      className={`group flex items-center justify-between px-3 py-2 rounded-xs font-mono text-left text-xs transition-all border cursor-pointer ${
                        isActive
                          ? 'bg-white text-black border-white font-bold'
                          : 'bg-[#0A0A0B] border-white/5 hover:border-white/10 hover:bg-[#111113] text-white/45'
                      }`}
                    >
                      <div className="leading-tight">
                        <span className="block text-[11px] font-bold">{lut.name}</span>
                        <span className={`text-[8.5px] leading-none block mt-0.5 ${isActive ? 'text-black/60' : 'text-white/30'}`}>
                          {lut.desc}
                        </span>
                      </div>
                      {isActive && <Check className="w-3.5 h-3.5 text-black" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Portfolio Project quick selector card */}
            <div className="bg-[#111113] border border-white/10 rounded-sm p-4 flex flex-col gap-3 font-mono">
              <h4 className="text-[10px] text-white/30 uppercase tracking-widest font-semibold">Active Timeline Base</h4>
              <div className="bg-black/60 p-3 rounded-xs border border-white/5 relative overflow-hidden group">
                <div className="flex flex-col gap-2">
                  <span className="text-white text-[10px] tracking-widest font-bold uppercase">{activeProject.category}</span>
                  <h5 className="text-sm font-black text-white group-hover:text-white/80 transition-colors line-clamp-1">{activeProject.title}</h5>
                  <p className="text-[9.5px] text-white/45 font-normal leading-relaxed line-clamp-3">{activeProject.description}</p>
                </div>
              </div>
              
              <button
                onClick={handleNextProject}
                className="w-full bg-[#0A0A0B] hover:bg-[#161618] border border-white/10 text-white/70 hover:text-white px-3 py-2 rounded-xs font-mono text-[10px] font-semibold tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" /> LOAD NEXT EDITED CUT
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
