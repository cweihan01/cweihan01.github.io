<template>
    <SectionWrapper title="Projects" bgColor="#f2f2f2">
        <div class="projects">
            <div class="grid">
                <ProjectCard v-for="(project, index) in projects" :key="index" :value="project" />
            </div>
        </div>
    </SectionWrapper>
</template>

<script>
import axios from 'axios';
import ProjectCard from './ProjectCard.vue';
import remembrallImage from '@/assets/remembrall.png'; // Correct path to the image
import SectionWrapper from './SectionWrapper.vue';

export default {
    components: {
        ProjectCard,
        SectionWrapper,
    },
    data() {
        return {
            projects: [],
        };
    },
    async created() {
        try {
            const customProjects = [
                {
                    name: 'remembrall', // Custom project (name)
                    image: remembrallImage, // Local image (replace with your actual image path)
                    links: [], // Empty links array initially
                },
                {
                    name: 'pillpro', // Another custom project (name)
                    image: remembrallImage, // Local image (replace with your actual image path)
                    links: [
                        {
                            text: 'Devpost',
                            url: 'https://devpost.com/software/pill-ai',
                        },
                        {
                            text: 'Devpost',
                            url: 'https://devpost.com/software/pill-ai',
                        },
                    ], // Empty links array initially
                },
                // {
                //     name: 'website', // Another custom project (name)
                //     image: remembrallImage, // Local image (replace with your actual image path)
                //     links: [
                //         {
                //             text: 'Devpost',
                //             url: 'https://devpost.com/software/pill-ai',
                //         },
                //     ], // Empty links array initially
                // },
            ];

            const mockGithubData = {
                remembrall: {
                    description: 'Remembrall is a project to help people remember things.',
                    stargazers_count: 42,
                    pushed_at: '2024-04-21T16:16:43Z',
                    languages_url: 'https://api.github.com/repos/cweihan01/remembrall/languages',
                    repoLink: 'https://github.com/cweihan01/remembrall',
                },
                pillpro: {
                    description: 'PillPro helps you manage your prescriptions and medication.',
                    stargazers_count: 27,
                    pushed_at: '2022-12-15T00:03:00Z',
                    languages_url: 'https://api.github.com/repos/cweihan01/pillpro/languages',
                    repoLink: 'https://github.com/cweihan01/pillpro',
                },
                website: {
                    description: 'PillPro helps you manage your prescriptions and medication.',
                    stargazers_count: 27,
                    pushed_at: '2022-12-15T01:00:00Z',
                    languages_url: 'https://api.github.com/repos/cweihan01/pillpro/languages',
                    repoLink: 'https://github.com/cweihan01/pillpro',
                },
            };

            // Fetch additional data for each project from GitHub API
            const projectsWithGithubData = await Promise.all(
                customProjects.map(async (project) => {
                    const githubRepo = await axios.get(
                        `https://api.github.com/repos/cweihan01/${project.name}`
                    );
                    const updatedProject = {
                        ...project, // Keep original custom project data
                        description: githubRepo.data.description || 'No description available.',
                        stargazers_count: githubRepo.data.stargazers_count,
                        pushed_at: githubRepo.data.pushed_at,
                        languagesUrl: githubRepo.data.languages_url,
                        repoLink: githubRepo.data.html_url,
                    };
                    return updatedProject;
                })
            );

            // const projectsWithGithubData = customProjects.map((project) => {
            //     const githubRepo = mockGithubData[project.name];
            //     const updatedProject = {
            //         ...project, // Keep original custom project data
            //         description: githubRepo.description || 'No description available.',
            //         stargazers_count: githubRepo.stargazers_count,
            //         pushed_at: githubRepo.pushed_at,
            //         languagesUrl: githubRepo.languages_url,
            //         repoLink: githubRepo.html_url,
            //     };
            //     return updatedProject;
            // });

            console.log(projectsWithGithubData);
            this.projects = projectsWithGithubData;
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
    grid-template-columns: repeat(3, 1fr); /* Two columns */
    gap: 50px;
    justify-items: center;
    align-items: center;
    margin: auto;
}
@media (max-width: 1024px) {
    .grid {
        grid-template-columns: repeat(2, 1fr); /* Single column layout */
    }
}
@media (max-width: 768px) {
    .grid {
        grid-template-columns: 1fr; /* Single column layout */
    }
}
</style>
