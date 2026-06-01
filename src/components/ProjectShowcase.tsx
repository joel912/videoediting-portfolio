/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Play, Film, Sliders, Cpu, Info, CheckCircle, ArrowRight, X, 
  Smartphone, Monitor, Sparkles, Eye, Minimize2 
} from 'lucide-react';
import { EXQUISITE_PROJECTS } from '../data';
import { VideoClip } from '../types';

export default function ProjectShowcase() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<VideoClip | null>(null);
  const [compareGradeActiveMap, setCompareGradeActiveMap] = useState<Record<string, boolean>>({});

  // Filter project categories
  const categories = ['All', 'Commercials', 'Narrative', 'Documentaries', 'Music Videos'];
  
  const filteredProjects = activeCategory === 'All' 
    ? EXQUISITE_PROJECTS 
    : EXQUISITE_PROJECTS.filter(p => p.category === activeCategory);

  const toggleGradeCompare = (projectId: string) => {
    setCompareGradeActiveMap(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-10 bg-[#0A0A0B] text-[#E0E0E0] border-b border-white/10">
      
      {/* Absolute cosmic background blur */}
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-white/5 to-transparent blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header section with high-contrast text */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-[2px] w-8 bg-white/80" />
              <span className="font-mono text-xs uppercase tracking-widest text-white/60 font-semibold">Curated Master Cuts</span>
            </div>
            <h2 className="font-sans text-4xl sm:text-5xl font-black tracking-tight uppercase leading-none text-white">
              EDITORIAL WORK <br />
              <span className="text-zinc-500">EXPERIENCE ARCHIVE</span>
            </h2>
          </div>

          {/* Categories Tab Selector with generous borders */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10 md:border-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-sm font-mono text-[10px] uppercase font-bold tracking-wider border transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-white text-black border-white'
                    : 'bg-[#111113] border-white/5 hover:border-white/20 text-white/40 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Project Cards Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => {
            const isComparingGrade = compareGradeActiveMap[project.id] || false;
            return (
              <div 
                key={project.id}
                className="bg-[#111113] rounded-sm border border-white/10 hover:border-white/20 p-5 flex flex-col gap-5 transition-all duration-300 relative group overflow-hidden"
              >
                {/* Visual Frame Screen */}
                <div className="relative aspect-[16/9] rounded-sm overflow-hidden bg-black border border-white/5 group-hover:border-white/15 transition-colors">
                  
                  {/* Before/After imagery switch based on compare ratio */}
                  {isComparingGrade ? (
                    <div className="w-full h-full relative flex">
                      {/* Before RAW Log image on left */}
                      <div className="w-1/2 h-full overflow-hidden relative border-r border-white/50">
                        <img 
                          src={project.gradingBeforeUrl} 
                          alt="Color Grading Before LOG"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-md px-1.5 py-0.5 rounded-xs text-[8px] font-mono text-white/50 border border-white/10">
                          RAW FLAT LOG
                        </div>
                      </div>
                      
                      {/* After Graded image on right */}
                      <div className="w-1/2 h-full overflow-hidden relative">
                        <img 
                          src={project.gradingAfterUrl} 
                          alt="Color Grading After Lut"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-white text-black px-1.5 py-0.5 rounded-xs text-[8px] font-mono font-bold tracking-wider">
                          LUT GRADE REC.2020
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Default Thumbnail view
                    <>
                      <img 
                        src={project.thumbnailUrl} 
                        alt={project.title}
                        className="w-full h-full object-cover opacity-85 group-hover:scale-102 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />
                    </>
                  )}

                  {/* Play & comparison overlay controller panel buttons */}
                  <div className="absolute bottom-3 right-3 left-3 flex justify-between gap-3 items-end z-20">
                    {/* Timecode */}
                    <span className="font-mono text-[9px] bg-black/80 px-2 py-0.5 rounded-sm text-white/55 font-bold border border-white/5 leading-none self-center h-5 flex items-center justify-center">
                      ⏱️ {project.duration} MIN
                    </span>

                    <div className="space-x-1.5">
                      <button
                        onClick={() => toggleGradeCompare(project.id)}
                        className={`px-2.5 py-1.5 rounded-sm font-mono text-[9px] font-black tracking-wider transition-colors cursor-pointer border ${
                          isComparingGrade 
                            ? 'bg-white hover:bg-neutral-200 text-black border-transparent' 
                            : 'bg-[#111113] hover:bg-black text-white/80 hover:text-white border-white/10'
                        }`}
                        title="Compare Raw Camera Output vs Grade Color"
                      >
                        {isComparingGrade ? '✕ VIEW THUMB' : '🎨 COMPARE GRADE'}
                      </button>

                      <button
                        onClick={() => setSelectedProject(project)}
                        className="bg-white hover:bg-neutral-200 text-black px-3 py-1.5 rounded-sm font-mono text-[9px] font-bold tracking-wider inline-flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Play className="w-3 h-3 fill-black text-black" /> PLAY CUT
                      </button>
                    </div>
                  </div>
                </div>

                {/* Information matrix description details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 font-mono text-[10px] tracking-widest font-black uppercase">
                        {project.category}
                      </span>
                      <span className="text-white/30 font-mono text-[9px] font-bold leading-none uppercase">
                        {project.aspectRatio}
                      </span>
                    </div>

                    <h3 className="font-sans text-xl font-black uppercase tracking-tight group-hover:text-white transition-colors leading-none text-white">
                      {project.title}
                    </h3>

                    <p className="font-sans text-xs text-white/45 leading-relaxed font-normal">
                      {project.description}
                    </p>
                  </div>

                  {/* Technical Notes metadata block drawer */}
                  <div className="border-t border-white/10 mt-4 pt-3.5 space-y-2">
                    <details className="group/tech select-none">
                      <summary className="list-none font-mono text-[10px] text-zinc-400 hover:text-white font-bold tracking-wider cursor-pointer flex items-center gap-1 justify-between">
                        <span className="flex items-center gap-1">
                          <Cpu className="w-3.5 h-3.5 text-white/60" /> VIEW EDIT ROOM WORK LOG
                        </span>
                        <span className="text-zinc-500 group-open/tech:rotate-180 transition-transform">▼</span>
                      </summary>
                      
                      <div className="font-mono text-[9.5px] text-white/50 bg-black/60 border border-white/5 p-2.5 rounded-sm mt-2 leading-relaxed space-y-1.5 self-start text-left">
                        <div className="text-white font-bold block mb-1 uppercase tracking-widest text-[8px] text-white/70 flex items-center gap-1.5">
                          <Info className="w-3.5 h-3.5 text-white/70" /> editor commentary
                        </div>
                        <p className="font-sans leading-relaxed text-[10px] font-normal leading-normal text-white/75">
                          {project.editorNote}
                        </p>
                        <div className="grid grid-cols-2 gap-x-4 border-t border-white/5 mt-2 pt-2 text-[9px]">
                          <div><span className="text-white/30 font-semibold">CONTAINER:</span> <span className="text-white font-bold">{project.codec}</span></div>
                          <div><span className="text-white/30 font-semibold">MASTER FPS:</span> <span className="text-white font-bold">{project.fps} FPS</span></div>
                        </div>
                      </div>
                    </details>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Cinematic Modal overlay to watch the fully functional master cut loop */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="w-full max-w-4xl bg-[#0A0A0B] border border-white/10 rounded-sm overflow-hidden shadow-2xl relative flex flex-col justify-between">
            
            {/* Modal Navigation header */}
            <div className="bg-[#111113] px-5 py-3 border-b border-white/10 flex items-center justify-between font-mono">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-white animate-ping" />
                <span className="text-[10px] text-white/60 uppercase tracking-widest font-bold">
                  MASTER ROOM FEED: {selectedProject.title}
                </span>
              </div>
              <button 
                onClick={() => setSelectedProject(null)}
                className="text-white/60 hover:text-white p-1 rounded-sm bg-[#0A0A0B] hover:bg-white/10 border border-white/5 cursor-pointer transition-colors"
                title="Close screen"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video frame render screen inside modal */}
            <div className="aspect-[16/9] w-full bg-black flex items-center justify-center relative p-1 leading-none">
              <video 
                src={selectedProject.videoUrl}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              />
            </div>

            {/* Micro panel footer on video metadata stats */}
            <div className="bg-[#111113] px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono border-t border-white/10 text-left">
              <div>
                <span className="text-white/55 text-[9px] font-black uppercase block tracking-widest">
                  {selectedProject.software}
                </span>
                <h4 className="text-md font-sans font-black text-white leading-tight uppercase mt-0.5">
                  {selectedProject.title}
                </h4>
              </div>

              <div className="flex items-center gap-1.5 bg-[#0a0a0b] border border-white/5 rounded-sm py-1 px-3 text-[10px] text-white/50 leading-normal max-w-sm">
                <Sparkles className="w-4 h-4 text-white/80" />
                <span>Specs: {selectedProject.aspectRatio} @ {selectedProject.fps} frames per second</span>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
