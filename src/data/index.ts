/** Typed re-exports of JSON under `src/assets/data`. */

import aboutJson from '@/assets/data/about.json';
import experiencesJson from '@/assets/data/experiences.json';
import projectsJson from '@/assets/data/projects.json';
import projectsGeneratedJson from '@/assets/data/projects.generated.json';
import skillsJson from '@/assets/data/skills.json';

import type { AboutInfo } from '@/types/about';
import type { Experience } from '@/types/experience';
import type { GithubRepoWithLanguages } from '@/types/github';
import type { ProjectData } from '@/types/project';
import type { SkillsData } from '@/types/skill';

export const about = aboutJson as AboutInfo;
export const experiences = experiencesJson as Experience[];
export const projects = projectsJson as ProjectData[];
// JSON inference doesn't overlap the full OpenAPI repo shape
export const projectsGenerated = projectsGeneratedJson as unknown as (GithubRepoWithLanguages | null)[];
export const skills = skillsJson as SkillsData;
