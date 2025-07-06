<template>
    <SectionWrapper sectionId="projects" title="Projects" bgColor="#f2f2f2">
        <div class="projects-container">
            <ProjectCard
                v-for="(project, index) in projects"
                :key="index"
                :project="project"
                :index="index"
            />
        </div>
    </SectionWrapper>
</template>

<script>
import ProjectCard from './ProjectCard.vue';
import SectionWrapper from './SectionWrapper.vue';
import projectsData from '@/assets/data/projects.json';
import githubCache from '@/assets/data/projects.generated.json';
import { fetchReposWithLanguages } from '@/api/github.js';

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
            const fullNames = projectsData.map((p) => `cweihan01/${p.repoName}`);

            // Use cached data in dev; fetch from API in prod
            const githubRepos = import.meta.env.DEV
                ? githubCache
                : await fetchReposWithLanguages(fullNames);

            // Combine static project data with fetched data from API
            this.projects = projectsData.map((project, i) => {
                const gh = githubRepos[i] || {};
                return {
                    ...project, // keep original custom project data
                    repoDescription: gh.description || 'No description available.',
                    stargazersCount: gh.stargazers_count,
                    pushedAt: gh.pushed_at,
                    repoLink: gh.html_url,
                    languages: gh.languages,
                };
            });
        } catch (error) {
            console.error('Error fetching GitHub repository data:', error);
        }
    },
};
</script>

<style scoped>
.projects-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    width: 100%;
    flex-direction: column;
    gap: 50px;
}
</style>
