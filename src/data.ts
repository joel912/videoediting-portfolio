/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { VideoClip, EditingClip, Testimonial, EditorialPackage } from './types';

export const EXQUISITE_PROJECTS: VideoClip[] = [
  {
    id: 'midnight-drift',
    title: 'THE MIDNIGHT DRIFT',
    category: 'Commercials',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-sports-car-drifting-on-a-sharp-curve-40114-large.mp4',
    duration: '0:45',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=600&auto=format&fit=crop',
    description: 'A high-octane director\'s cut for a performance sports car. This edit prioritizes aggressive visual pacing, dynamic speed ramping, and heavy, multi-layered industrial sound design.',
    editorNote: 'Crafted with over 45 custom sound layers. Synced rapid macro cuts to the low-end vibrations of the synth track to emphasize power and adrenaline.',
    fps: 24,
    aspectRatio: '2.39:1 Anamorphic',
    codec: 'ProRes 4444 XQ',
    software: 'Adobe Premiere Pro & After Effects',
    gradingBeforeUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop', // LOG flat
    gradingAfterUrl: 'https://images.unsplash.com/photo-1618005198143-d3663a940287?q=80&w=500&auto=format&fit=crop',  // Color graded
  },
  {
    id: 'subway-reverie',
    title: 'SUBWAY REVERIE',
    category: 'Narrative',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-subway-station-with-neon-lights-43936-large.mp4',
    duration: '1:30',
    thumbnailUrl: 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=600&auto=format&fit=crop',
    description: 'A moody, atmospheric science fiction sequence of a lone traveler waiting in a neo-brutalist train station. Focuses heavily on tension, environmental sound design, and isolated lighting.',
    editorNote: 'Emphasized heavy negative space in audio and picture. Kept shots lingering to heighten tension, utilizing DaVinci DaVinci Resolve\'s magic mask for targeted color adjustments.',
    fps: 24,
    aspectRatio: '2.40:1 Cinema Scope',
    codec: 'REDCODE RAW (8:1)',
    software: 'DaVinci Resolve Studio',
    gradingBeforeUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=500&auto=format&fit=crop',
    gradingAfterUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: 'eonian-peaks',
    title: 'EONIAN PEAKS',
    category: 'Documentaries',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-mysterious-mountain-landscape-with-fog-and-pines-42407-large.mp4',
    duration: '1:00',
    thumbnailUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop',
    description: 'A vertical, cinematic documentary edit detailing a high-altitude expedition across remote foggy ranges. Explores the raw relationship between the climber and the silence of nature.',
    editorNote: 'Edited in a native vertical 9:16 grid. Re-framed high-altitude anamorphic plates into modern mobile frames without losing the sense of epic, intimidating scale.',
    fps: 23.976,
    aspectRatio: '9:16 Vertical UHD',
    codec: 'Apple ProRes 422 HQ',
    software: 'Premiere Pro & Lumis LUT-pack',
    gradingBeforeUrl: 'https://images.unsplash.com/photo-1548263541-118f6738dfbf?q=80&w=500&auto=format&fit=crop',
    gradingAfterUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: 'chromatic-reverb',
    title: 'CHROMATIC REVERB',
    category: 'Music Videos',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-liquid-gradient-under-a-microscope-42211-large.mp4',
    duration: '2:15',
    thumbnailUrl: 'https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=600&auto=format&fit=crop',
    description: 'An abstract visual companion piece for a classic ambient/synthwave track. Relies on micro fluid dynamics and temporal speed manipulation to sync organic flow with digital delay lines.',
    editorNote: 'Leveraged optical flow and frame blending plugins to create incredibly smooth speed ramps from 1000% speed down to 10% speed, emphasizing the sound design accents.',
    fps: 60,
    aspectRatio: '16:9 Digital Flat',
    codec: 'DNxHR HQX',
    software: 'After Effects & DaVinci Resolve',
    gradingBeforeUrl: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=500&auto=format&fit=crop',
    gradingAfterUrl: 'https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=500&auto=format&fit=crop',
  }
];

export const MOCK_EDITING_ROOM_CLIPS: EditingClip[] = [
  {
    id: 'source-1',
    title: 'Drone Rise (Cliffs)',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-mysterious-mountain-landscape-with-fog-and-pines-42407-large.mp4',
    duration: 4,
    thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=300&auto=format&fit=crop',
    foleyType: 'Wind Swoosh & Sub Bass',
    sceneTheme: 'Majestic & Spacious',
    colorGradeClass: 'saturate-50 contrast-125 sepia-[0.1]'
  },
  {
    id: 'source-2',
    title: 'Neon Drift (Vehicle)',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-sports-car-drifting-on-a-sharp-curve-40114-large.mp4',
    duration: 3,
    thumbnailUrl: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=300&auto=format&fit=crop',
    foleyType: 'Tire Screech & Turbo Flutter',
    sceneTheme: 'Kinetic & Industrial',
    colorGradeClass: 'hue-rotate-[180deg] saturate-150 contrast-125'
  },
  {
    id: 'source-3',
    title: 'Future Portal (Subway)',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-subway-station-with-neon-lights-43936-large.mp4',
    duration: 3,
    thumbnailUrl: 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=300&auto=format&fit=crop',
    foleyType: 'Deep Resonance & Drone',
    sceneTheme: 'Cyberpunk & Desolate',
    colorGradeClass: 'brightness-110 saturate-[1.7] hue-rotate-[45deg]'
  }
];

export const CLIENT_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    quote: 'Ishan has an incredible sense of rhythm. He doesn\'t just cut footage; he builds dynamic pacing that makes the viewer feel every second. Our commercial saw a 42% lift in viewer retention after his cut.',
    author: 'Elena Rostova',
    role: 'Creative Director',
    company: 'Apex Digital Agency',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 't2',
    quote: 'We gave Ishan 4TB of chaotic narrative footage with vague guidelines. He curated it into a tight, emotion-driven story, delivering a rough cut that was 90% of the way to locking the picture.',
    author: 'Marcus Vance',
    role: 'Independent Filmmaker',
    company: 'Vance Pictures',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 't3',
    quote: 'His horizontal-to-vertical conversion skills are outstanding. The vertical content he crafted for our global brand campaign drove over 8.4M views, preserving cinema proportions beautifully.',
    author: 'Aarav Mehta',
    role: 'Head of Social',
    company: 'Revive Sports Inc',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150&auto=format&fit=crop'
  }
];

export const WORKSPACE_GEAR = [
  { category: 'HARDWARE WORKSTATION', items: [
    { name: 'Mac Studio (M2 Ultra)', spec: '192GB Unified Memory, 24-Core CPU, 60-Core GPU, 8TB SSD' },
    { name: 'Storage Matrix', spec: '128TB OWC ThunderBay RAID-5 (Thunderbolt 3)' },
    { name: 'Color Grading Panel', spec: 'Blackmagic Design DaVinci Resolve Micro Panel' },
    { name: 'Audio Monitoring', spec: 'Genelec 8030C Studio Monitors + Sennheiser HD600 Reference Open-back' }
  ]},
  { category: 'MONITORING MATRIX', items: [
    { name: 'Reference Display', spec: 'Flanders Scientific DM241 Precision Color Grade Monitor' },
    { name: 'Canvas Display', spec: 'BenQ SW321C 32" 4K IPS HDR Photo/Video Editing Monitor' }
  ]},
  { category: 'SOFTWARE & CONTROL', items: [
    { name: 'Creative Suits', spec: 'DaVinci Resolve Studio 18.6, Adobe Creative Cloud 2024' },
    { name: 'Audio Tools', spec: 'iZotope RX 10 Advanced (Restoration), Reaper (Sound FX Foley design)' },
    { name: 'LUT Systems', spec: 'Custom Cine-Arri Emulator LUT Collection + FilmConvert Nitrate' }
  ]}
];

export const EDITORIAL_PACKAGES: EditorialPackage[] = [
  {
    id: 'commercial',
    title: 'CINEMATIC AD CUT',
    description: 'Perfect for commercial brands, social ad campaigns, or startup launch videos needing explosive engagement.',
    priceEstimate: '$1,200 - $2,500',
    turnaround: '3 - 5 Days',
    features: [
      'Up to 60-Second Final Master Cut',
      'Advanced Kinetic Speed Ramping',
      'Professional Multi-layer Foley & SFX Sound Design',
      'High-End Premium Color Grading (LUT Customization)',
      'Deliverables: 16:9 Landscape & 9:16 Vertical formats'
    ]
  },
  {
    id: 'narrative',
    title: 'DOCUMENTARY & SHORTS',
    description: 'For short films, YouTube narrative documentaries, or corporate storytelling projects that require emotional pacing.',
    priceEstimate: '$2,500 - $5,000',
    turnaround: '7 - 14 Days',
    features: [
      'Up to 15-Minute Narrative Editing',
      'Multi-source footage organization & Syncing',
      'Audio leveling, noise removal, and dialogue restoration',
      'Scene transitions, title cards & end credits',
      '2 Rounds of comprehensive Editorial revisions'
    ]
  },
  {
    id: 'retouch',
    title: 'RAW GRADE & SOUND ONLY',
    description: 'Already have a locked cut and need professional industry color grading & robust atmospheric foley design?',
    priceEstimate: '$800 - $1,500',
    turnaround: '2 - 4 Days',
    features: [
      'Professional Flanders precision color grading',
      'Exposure/white balance shot matching & skin tone recovery',
      'Deep sub-bass environmental foley adding',
      'Commercial broadcast licensing assistance'
    ]
  }
];
