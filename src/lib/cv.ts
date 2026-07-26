import { parse } from 'yaml';
import cvSource from '../data/cv.yaml?raw';

export interface CvEntry {
  period: string;
  highlights: string[];
}

export interface EducationEntry extends CvEntry {
  institution: string;
  location: string;
  degree: string;
}

export interface ExperienceEntry extends CvEntry {
  role: string;
  organization: string;
}

export interface ProjectEntry {
  title: string;
  highlights: string[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface LanguageEntry {
  name: string;
  level: string;
}

export interface Cv {
  name: string;
  tagline: string;
  summary: string;
  contact: {
    email: string;
    phone: string;
    location: string;
    linkedin: string;
  };
  education: EducationEntry[];
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  skills: SkillGroup[];
  languages: LanguageEntry[];
}

export const cv: Cv = parse(cvSource);
