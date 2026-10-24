<script lang="ts">
import { defineComponent } from 'vue';
import ProjectCard from './ProjectCard.vue';
import SectionWrapper from './SectionWrapper.vue';
import { fetchReposWithLanguages } from '@/api/github';
import { projects as staticProjects, projectsGenerated } from '@/data';
import type { GithubRepoWithLanguages } from '@/types/github';
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
            const githubProjects = staticProjects.filter((p) => p.repoName);
            const fullNames = githubProjects.map((p) => `cweihan01/${p.repoName}`);

            // Use cached data in dev; fetch from API in prod.
            // Cache order matches projects that have a repoName, not the GitHub `name` field.
            const githubRepos = import.meta.env.DEV
                ? projectsGenerated
                : await fetchReposWithLanguages(fullNames);

            const githubByRepoName = new Map<string, GithubRepoWithLanguages | null>(
                githubProjects.map((project, i) => [project.repoName as string, githubRepos[i] ?? null]),
            );

            // Combine static project data with fetched data from API
            this.projects = staticProjects.map((project) => {
                const gh = project.repoName ? githubByRepoName.get(project.repoName) : undefined;
                return {
                    ...project,
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
