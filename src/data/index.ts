/** Typed re-exports of static JSON under `src/assets/data`. */

import aboutJson from '@/assets/data/about.json';
import experiencesJson from '@/assets/data/experiences.json';
import projectsJson from '@/assets/data/projects.json';
import skillsJson from '@/assets/data/skills.json';

import type { AboutInfo } from '@/types/about';
import type { Experience } from '@/types/experience';
import type { ProjectData } from '@/types/project';
import type { SkillsData } from '@/types/skill';

export const about = aboutJson as AboutInfo;
export const experiences = experiencesJson as Experience[];
export const projects = projectsJson as ProjectData[];
export const skills = skillsJson as SkillsData;
