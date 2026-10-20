<script lang="ts">
import { defineComponent } from 'vue';
import ProjectCard from './ProjectCard.vue';
import SectionWrapper from './SectionWrapper.vue';
import { fetchReposWithLanguages } from '@/api/github';
import { projects as staticProjects, projectsGenerated } from '@/data';
import type { Project } from '@/types/project';

export default defineComponent({
    name: 'ProjectsSection',
    components: {
        ProjectCard,
        SectionWrapper,
    },
    data(): {
        projects: Project[];
    } {
        return {
            projects: [],
        };
    },
    async created() {
        try {
            const fullNames = staticProjects.map((p) => `cweihan01/${p.repoName}`);

            // Use cached data in dev; fetch from API in prod
            const githubRepos = import.meta.env.DEV
                ? projectsGenerated
                : await fetchReposWithLanguages(fullNames);

            // Combine static project data with fetched data from API
            this.projects = staticProjects.map((project, i) => {
                const gh = githubRepos[i];
                return {
                    ...project,
                    repoDescription: gh?.description || 'No description available.',
                    stargazersCount: gh?.stargazers_count,
                    pushedAt: gh?.pushed_at,
                    repoLink: gh?.html_url,
                    languages: gh?.languages,
                };
            });
        } catch (error) {
            console.error('Error fetching GitHub repository data:', error);
        }
    },
});
</script>

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
