/** Shape of each entry in `src/assets/data/projects.json`. */

import type { GithubLanguages } from './github';

export interface ProjectLink {
    text: string;
    url: string;
}

export interface ProjectData {
    displayName: string;
    repoName?: string;
    caption: string;
    displayDescription: string;
    startDate?: string;
    endDate?: string;
    image: string;
    links: ProjectLink[];
    technologies: string[];
}

/** Static project data merged with GitHub repo fields for display. */
export interface Project extends ProjectData {
    stargazersCount?: number;
    pushedAt?: string;
    repoLink?: string;
    languages?: GithubLanguages;
}
