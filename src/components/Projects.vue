<template>
    <SectionWrapper sectionId="projects" title="Projects" bgColor="#f2f2f2">
        <div class="projects">
            <div class="grid">
                <ProjectCard v-for="(project, index) in projects" :key="index" :project="project" />
            </div>
        </div>
    </SectionWrapper>
</template>

<script>
import axios from 'axios';
import ProjectCard from './ProjectCard.vue';
import SectionWrapper from './SectionWrapper.vue';
import projectsData from '@/assets/data/projects.json';
import githubCache from '@/assets/data/projects.generated.json';

export default {
    data() {
        return {
            projects: [],
        };
    },
    components: {
        ProjectCard,
        SectionWrapper,
    },
    async created() {
        try {
            let githubRepos;
            if (import.meta.env.DEV) {
                // Use cached data in dev mode
                githubRepos = githubCache;
            } else {
                // Fetch data for each project from GitHub API
                githubRepos = await Promise.all(
                    projectsData.map(async ({ repoName }) => {
                        try {
                            const { data } = await axios.get(
                                `https://api.github.com/repos/cweihan01/${repoName}`
                            );
                            return data;
                        } catch {
                            return null;
                        }
                    })
                );
            }
            this.projects = projectsData.map((project, i) => {
                const gh = githubRepos[i] || {};
                return {
                    ...project, // Keep original custom project data
                    repoDescription: gh.description || 'No description available.',
                    stargazersCount: gh.stargazers_count,
                    pushedAt: gh.pushed_at,
                    languagesUrl: gh.languages_url,
                    repoLink: gh.html_url,
                };
            });
        } catch (error) {
            console.error('Error fetching GitHub repository data:', error);
        }
    },
};
</script>

<style scoped>
.projects {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    width: 100%;
}
.grid {
    display: grid;
    /* grid-template-columns: repeat(3, 1fr); */
    grid-template-columns: repeat(2, 1fr);
    gap: 50px;
    justify-items: center;
    /* align-items: center; */
    /* align-items: stretch; */
    margin: auto;
}

/* @media (max-width: 1024px) {
    .grid {
        grid-template-columns: repeat(2, 1fr);
    }
} */

@media (max-width: 768px) {
    .grid {
        grid-template-columns: 1fr;
        gap: 30px;
    }
}
</style>
