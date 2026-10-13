/** Shape of `src/assets/data/skills.json`. */

export interface Skill {
    name: string;
    icon: string;
    category: string;
    proficiency: number;
}

export interface Category {
    name: string;
    label: string;
    icon: string;
}

export interface SkillsData {
    categories: Category[];
    skills: Skill[];
}
