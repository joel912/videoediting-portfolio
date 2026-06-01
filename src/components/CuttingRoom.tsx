/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { 
  Menu, Play, Pause, ChevronUp, ChevronDown, ListOrdered, Film, 
  Sparkles, Layers, Sliders, Music, Check, Settings2, HelpCircle 
} from 'lucide-react';
import { MOCK_EDITING_ROOM_CLIPS } from '../data';
import { EditingClip } from '../types';

export default function CuttingRoom() {
  const [playlist, setPlaylist] = useState<EditingClip[]>(MOCK_EDITING_ROOM_CLIPS);
  const [isRendering, setIsRendering] = useState(false);
  const [renderProgress, setRenderProgress] = useState(0);
  const [renderStatusText, setRenderStatusText] = useState('');
  
  const [isPlayingSequence, setIsPlayingSequence] = useState(false);
  const [currentClipIndex, setCurrentClipIndex] = useState(0);
  const [clipSecondsRemaining, setClipSecondsRemaining] = useState(3);

  const videoTimelinePlayRef = useRef<HTMLVideoElement | null>(null);
  const playbackTimerRef = useRef<number | null>(null);

  // Reorder functions
  const moveClip = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= playlist.length) return;
    
    const updated = [...playlist];
    const temp = updated[index];
    updated[index] = updated[newIndex];
    updated[newIndex] = temp;
    
    setPlaylist(updated);
    // stop playing sequence if changes made
    setIsPlayingSequence(false);
  };

  const handleStartRender = () => {
    setIsPlayingSequence(false);
    setIsRendering(true);
    setRenderProgress(0);
    setRenderStatusText('Initializing timeline cache...');
  };

  // Render Simulation Timeline
  useEffect(() => {
    if (!isRendering) return;

    const statusTexts = [
      'Conforming multi-cam tracks...',
      'Matching audio sample latency...',
      'Applying LUT film emulation mapping...',
      'Baking foley sound layers...',
      'Exporting ProRes 422 master format...'
    ];

    const timer = setInterval(() => {
      setRenderProgress((prev) => {
        const next = prev + 8;
        
        // update status texts based on progress levels
        const statusIdx = Math.min(
          statusTexts.length - 1, 
          Math.floor((next / 100) * statusTexts.length)
        );
        setRenderStatusText(statusTexts[statusIdx]);

        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsRendering(false);
            setIsPlayingSequence(true);
            setCurrentClipIndex(0);
            setClipSecondsRemaining(3);
          }, 600);
          return 100;
        }
        return next;
      });
    }, 120);

    return () => clearInterval(timer);
  }, [isRendering]);

  // Played sequence loop controller
  useEffect(() => {
    if (!isPlayingSequence) return;

    const interval = setInterval(() => {
      setClipSecondsRemaining((prev) => {
        if (prev <= 1) {
          // transition to next clip
          setCurrentClipIndex((currIndex) => {
            const nextIdx = (currIndex + 1) % playlist.length;
            return nextIdx;
          });
          return 3; // reset 3s per clip
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlayingSequence, playlist.length]);

  const activePlayingClip = playlist[currentClipIndex];

  return (
    <section id="cutting-room" className="relative py-24 px-4 sm:px-10 bg-[#0A0A0B] text-[#E0E0E0] border-b border-white/10 overflow-hidden">
      
      {/* Decorative timeline coordinates */}
      <div className="absolute top-10 left-10 font-mono text-[9px] text-[#E0E0E0]/25 uppercase tracking-wider hidden lg:block">
        GRID CODE: AREA-CUT4 // SOURCE BIN MATRIX
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Title Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-[#111113] border border-white/10 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-white/80 animate-spin" />
            <span className="font-mono text-[10px] text-white/60 uppercase tracking-widest font-bold">Cutting Room Simulator</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-5xl font-black tracking-tight uppercase leading-none text-white">
            THE CUTTING MATRIX
          </h2>
          <p className="font-mono text-xs text-white/30 mt-3 max-w-lg mx-auto">
            Drag, prioritize, and re-order Ishan's raw footage blocks below, then render compilation to inspect spatial pacing.
          </p>
        </div>

        {/* Dynamic Multi-column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side (5 Columns): Playlist sequence builder desk */}
          <div className="lg:col-span-5 bg-[#111113] rounded-sm border border-white/10 p-5 font-mono">
            
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <div className="flex items-center gap-2">
                <ListOrdered className="w-4 h-4 text-white" />
                <span className="text-xs font-bold text-white uppercase tracking-widest">TIMELINE SEQUENCE BIN</span>
              </div>
              <span className="text-[10px] text-white/30">{playlist.length} CLIPS REGISTERED</span>
            </div>

            {/* List of draggable clips */}
            <div className="space-y-3">
              {playlist.map((clip, index) => (
                <div 
                  key={clip.id}
                  className="bg-[#0A0A0B] rounded-xs p-3 border border-white/5 flex items-center justify-between group hover:border-white/25 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="flex items-center gap-3">
                    {/* Visual miniature timeline thumbnail placeholder */}
                    <div className="relative w-12 h-12 rounded overflow-hidden bg-black border border-white/5 shrink-0">
                      <img 
                        src={clip.thumbnailUrl} 
                        alt={clip.title} 
                        className="w-full h-full object-cover opacity-80"
                      />
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute bottom-1 right-1 font-mono text-[8px] bg-black/80 px-1 py-[1px] rounded text-white/50">
                        {clip.duration}s
                      </div>
                    </div>

                    <div className="text-left font-mono">
                      <div className="flex items-center gap-1.5">
                        <span className="text-white text-[10px] font-bold">#{index + 1}</span>
                        <span className="text-white text-xs font-bold font-sans tracking-tight">{clip.title}</span>
                      </div>
                      <span className="text-[9px] text-white/45 block font-semibold uppercase mt-0.5 mt-1">
                        FOLEY: {clip.foleyType.split(' &')[0]}
                      </span>
                    </div>
                  </div>

                  {/* Move action priority controls */}
                  <div className="flex flex-col items-center gap-1">
                    <button
                      onClick={() => moveClip(index, 'up')}
                      disabled={index === 0}
                      className={`p-1 rounded bg-[#0A0A0B] border border-white/5 hover:text-white transition-colors ${
                        index === 0 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'
                      }`}
                      title="Move Up in sequence"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => moveClip(index, 'down')}
                      disabled={index === playlist.length - 1}
                      className={`p-1 rounded bg-[#0A0A0B] border border-white/5 hover:text-white transition-colors ${
                        index === playlist.length - 1 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'
                      }`}
                      title="Move Down in sequence"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Instruction tooltip note panel */}
            <div className="bg-black/60 rounded-xs p-3.5 border border-white/5 mt-6 flex gap-3 text-[10px] leading-relaxed text-white/40 font-sans">
              <Settings2 className="w-5 h-5 text-white/30 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-white font-mono tracking-wider mb-0.5 text-[9px] uppercase">HOW CONFORMING WORKS</p>
                Assembling tracks in different sequences alters the visual narrative. Select render sequence and watch the transition timeline sync automatically with matching soundscapes.
              </div>
            </div>

            {/* Execution action triggers */}
            <button
              onClick={handleStartRender}
              disabled={isRendering}
              className={`w-full mt-6 py-3.5 rounded-xs font-mono text-xs tracking-widest font-bold uppercase transition-all duration-300 relative overflow-hidden flex items-center justify-center gap-2 ${
                isRendering 
                  ? 'bg-zinc-850 text-white/40 cursor-not-allowed' 
                  : 'bg-white text-black hover:bg-neutral-200 hover:scale-[1.01] active:scale-95 cursor-pointer shadow-lg'
              }`}
            >
              <Film className="w-4 h-4 text-black" />
              {isRendering ? 'ENCODING CUT MATRIX...' : '🎥 RENDER TIMELINE SELECTION'}
            </button>

          </div>

          {/* Right Side (7 Columns): Simulated Video editing player */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/* Display Monitor Box */}
            <div className="bg-[#0A0A0B] rounded-sm border border-white/10 shadow-2xl relative overflow-hidden aspect-[16/9] flex flex-col items-center justify-center p-2">
              
              {/* If compiling, show progress layout */}
              {isRendering ? (
                <div className="absolute inset-0 bg-[#0A0A0B]/95 flex flex-col items-center justify-center p-6 z-30 font-mono text-center">
                  {/* Neon radial visual ring */}
                  <div className="relative w-16 h-16 rounded-xs border border-white/10 flex items-center justify-center mb-6">
                    <span className="text-white text-sm font-bold">{renderProgress}%</span>
                    <div 
                      className="absolute inset-0 rounded-xs border border-t-white animate-spin"
                      style={{ animationDuration: '0.8s' }}
                    />
                  </div>
                  
                  <span className="text-white text-xs tracking-widest uppercase font-semibold mb-2 block font-mono">
                    COMPILING CUSTOM EDIT
                  </span>
                  <p className="text-white/60 text-[10px] font-semibold block animate-pulse font-mono uppercase">
                    {renderStatusText}
                  </p>
                  
                  {/* Linear render progression bar strip */}
                  <div className="w-full max-w-xs bg-black border border-white/5 rounded-xs h-1 mt-4 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-white/40 to-white transition-all duration-300"
                      style={{ width: `${renderProgress}%` }}
                    />
                  </div>
                </div>
              ) : isPlayingSequence ? (
                // Sequence Active playing state content
                <div className="relative w-full h-full rounded-xs overflow-hidden flex items-center justify-center bg-black">
                  
                  {/* HTML5 video loop */}
                  <video 
                    ref={videoTimelinePlayRef}
                    src={activePlayingClip.videoUrl}
                    loop
                    muted
                    autoPlay
                    playsInline
                    className={`w-full h-full object-cover transition-all duration-700 ${activePlayingClip.colorGradeClass}`}
                  />

                  {/* Corner indicator banner */}
                  <div className="absolute top-4 left-4 bg-[#111113]/90 backdrop-blur-md px-3 py-1.5 rounded-sm border border-white/10 flex items-center gap-2 font-mono text-[9px] tracking-wider z-20">
                    <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                    <span className="text-white uppercase font-bold text-[8.5px]">SEQUENCE PREVIEW LIVE</span>
                  </div>

                  {/* Active clip timing overlay wheel indicator */}
                  <div className="absolute top-4 right-4 bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-sm border border-white/10 flex items-center gap-1.5 font-mono text-[9.5px] z-10 text-white">
                    <span className="text-white/40">CLIP TIME:</span>
                    <span className="text-white font-black">{clipSecondsRemaining}s left</span>
                  </div>

                  {/* Sound theme description lower HUD overlay */}
                  <div className="absolute bottom-4 inset-x-4 bg-black/90 backdrop-blur-md px-4 py-3 rounded-xs border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 z-10 text-left">
                    <div className="font-mono">
                      <span className="text-[9px] text-white/50 font-semibold uppercase tracking-widest block">
                        FOLEY LAYER SYNCED
                      </span>
                      <h5 className="text-xs font-bold text-white leading-tight mt-0.5">
                        {activePlayingClip.foleyType}
                      </h5>
                    </div>
                    
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 border border-white/15 font-mono text-[9px] text-white/90 uppercase font-black tracking-wider self-start sm:self-center">
                      <Sparkles className="w-3 h-3 text-white/95" /> {activePlayingClip.sceneTheme}
                    </div>
                  </div>

                </div>
              ) : (
                // Standby offline layout
                <div className="absolute inset-0 bg-[#0A0A0B] flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-14 h-14 rounded-xs bg-[#111113] border border-white/5 flex items-center justify-center text-white/40 mb-4">
                    <Film className="w-6 h-6" />
                  </div>
                  <h4 className="font-sans text-base font-bold text-white uppercase tracking-tight">Timeline Standby Mode</h4>
                  <p className="font-mono text-[10px] text-white/30 max-w-sm mt-1.5 leading-relaxed">
                    Choose your video segment priorities inside the Source Bin, then hit 'Render Sequence' to preview seamless foley sound transitions.
                  </p>
                </div>
              )}
            </div>

            {/* Sequence controller bar stats panel */}
            {isPlayingSequence && (
              <div className="bg-[#111113] border border-white/10 rounded-sm p-4 flex flex-col gap-3 font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-widest uppercase text-white/50 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-white" /> ACTIVE SEQUENCE STEMS
                  </span>
                  <button 
                    onClick={() => setIsPlayingSequence(false)}
                    className="text-[10px] text-white/70 hover:text-white font-bold tracking-wider uppercase border border-white/20 px-2.5 py-0.5 rounded-xs cursor-pointer transition-colors"
                  >
                    HALT PLAYER
                  </button>
                </div>

                {/* Simulated playback sequence steps highlights */}
                <div className="grid grid-cols-3 gap-2.5 pt-1">
                  {playlist.map((clip, idx) => {
                    const isActive = currentClipIndex === idx;
                    return (
                      <div 
                        key={clip.id}
                        className={`p-2.5 rounded-xs border text-left transition-all ${
                          isActive 
                            ? 'bg-white/15 border-white text-white' 
                            : 'bg-black/40 border-white/5 opacity-40 text-white/30'
                        }`}
                      >
                        <span className="text-[8.5px] block font-bold text-white/40">SHOT 0{idx + 1}</span>
                        <div className="text-[10.5px] font-sans font-bold leading-tight truncate mt-0.5">{clip.title.split(' (')[0]}</div>
                        {isActive && (
                          <div className="w-full bg-black h-1 rounded-full mt-2 overflow-hidden">
                            <div 
                              className="h-full bg-white" 
                              style={{ width: `${(clipSecondsRemaining / 3) * 100}%` }}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
