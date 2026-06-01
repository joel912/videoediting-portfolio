/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Cpu, HardDrive, Monitor, ShieldCheck, Flame, Users, Calendar, Award } from 'lucide-react';
import { WORKSPACE_GEAR } from '../data';

export default function StatsWorkspace() {
  const stats = [
    { label: 'Views Generated', val: '52M+', desc: 'Direct client retention growth metrics', icon: Flame },
    { label: 'Completed Cuts', val: '140+', desc: 'Across commercial ad & narrative formats', icon: Award },
    { label: 'Active Experience', val: '6+ Yrs', desc: 'Working with directors worldwide', icon: Calendar },
    { label: 'On-Time Export', val: '98.5%', desc: 'ProRes masters conformed ahead of schedule', icon: ShieldCheck },
  ];

  return (
    <section id="workspace" className="relative py-24 px-4 sm:px-10 bg-[#0A0A0B] text-white border-b border-white/10 overflow-hidden">
      
      {/* Dynamic blurred amber mesh in the corner */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[350px] h-[350px] bg-white/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Core numbers metrics panel */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-20">
          {stats.map((stat, i) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={i}
                className="bg-[#111113] border border-white/10 rounded-sm p-5 sm:p-6 text-left relative overflow-hidden group hover:border-white/20 transition-colors"
              >
                <div className="absolute top-4 right-4 text-zinc-700 group-hover:text-white/20 transition-colors">
                  <IconComponent className="w-8 h-8" />
                </div>
                
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-bold block mb-1">
                  {stat.label}
                </span>

                <h3 className="font-sans text-3xl sm:text-4xl font-black text-white uppercase leading-none tracking-tight block">
                  {stat.val}
                </h3>

                <p className="font-sans text-[11px] text-zinc-400 mt-2 leading-relaxed">
                  {stat.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Studio rig gear specifications */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Rig Introduction column */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <div className="flex items-center gap-2">
              <span className="h-[2px] w-6 bg-white/80" />
              <span className="font-mono text-xs uppercase tracking-widest text-white/60 font-semibold">The Core rig</span>
            </div>
            
            <h2 className="font-sans text-3xl sm:text-4xl font-black uppercase tracking-tight leading-none text-white font-sans">
              STUDIO SUITE & <br />
              <span className="text-zinc-500">GRADING DECK</span>
            </h2>

            <p className="font-sans text-xs text-white/40 leading-relaxed font-normal">
              High-end cinematic grading and sound synchronization require specialized, pristine monitoring suites. My workstation is calibrated on a weekly basis to guarantee exact broadcast and theatrical color metrics.
            </p>

            <div className="p-4 bg-[#111113] border border-white/10 rounded-sm flex items-center gap-3.5 text-xs text-white/80 font-mono leading-relaxed">
              <Monitor className="w-6 h-6 text-white/70 shrink-0" />
              <div>
                <span className="text-white font-bold block text-[10px] uppercase tracking-wider mb-0.5">REFERENCE COLOR STANDARDS</span>
                Calibrated to Rec.709, Rec.2020 & DCI-P3 specifications to preserve exact skin-tones.
              </div>
            </div>
          </div>

          {/* Rig specs list (8 columns) */}
          <div className="lg:col-span-8 bg-[#111113] border border-white/10 rounded-sm p-6 sm:p-8 font-mono">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2 mb-6 ml-1">
              <Cpu className="w-4 h-4 text-white/80" /> TECHNICAL EQUIPMENT PORTFOLIO
            </h3>

            <div className="space-y-6 text-left">
              {WORKSPACE_GEAR.map((cat, idx) => (
                <div key={idx} className="space-y-3">
                  <h4 className="text-[10px] text-white/45 font-bold uppercase tracking-widest pb-1 border-b border-white/10">
                    {cat.category}
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 font-mono">
                    {cat.items.map((item, itemIdx) => (
                      <div 
                        key={itemIdx}
                        className="p-3 bg-[#0A0A0B] rounded-sm border border-white/5 flex flex-col justify-between hover:border-white/15 transition-colors"
                      >
                        <span className="text-white text-xs font-bold font-sans tracking-tight block">
                          {item.name}
                        </span>
                        <span className="text-[9.5px] text-white/40 leading-relaxed block mt-1.5 leading-normal">
                          {item.spec}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
