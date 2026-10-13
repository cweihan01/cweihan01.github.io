/** Shape of each entry in `src/assets/data/projects.json`. */

export interface ProjectLink {
    text: string;
    url: string;
}

export interface ProjectData {
    displayName: string;
    repoName: string;
    caption: string;
    displayDescription: string;
    image: string;
    links: ProjectLink[];
    technologies: string[];
}
