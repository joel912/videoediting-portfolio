/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface VideoClip {
  id: string;
  title: string;
  category: string;
  videoUrl: string;
  duration: string;
  thumbnailUrl: string;
  description: string;
  editorNote: string;
  fps: number;
  aspectRatio: string;
  codec: string;
  software: string;
  gradingBeforeUrl: string; // before color grade thumbnail
  gradingAfterUrl: string;  // after color grade thumbnail
}

export interface TimelineMark {
  timeCode: string;
  label: string;
  type: 'cut' | 'foley' | 'music' | 'sfx';
}

export interface EditingClip {
  id: string;
  title: string;
  videoUrl: string;
  duration: number; // in seconds
  thumbnailUrl: string;
  foleyType: string;
  sceneTheme: string;
  colorGradeClass: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarUrl: string;
}

export interface EditorialPackage {
  id: string;
  title: string;
  description: string;
  priceEstimate: string;
  turnaround: string;
  features: string[];
}
