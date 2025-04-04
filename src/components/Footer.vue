<template>
    <SectionWrapper sectionId="footer" title="" bgColor="f4f4f4">
        <footer class="footer">
            <!-- Title and footnote -->
            <div class="footer-header">
                <h2 class="footer-title">Contact Me!</h2>
                <p class="footer-subtitle">
                    {{ aboutInfo.footnote }}
                </p>
            </div>

            <!-- Body -->
            <div class="footer-body">
                <!-- Social links -->
                <p class="footer-text text-lg">
                    Contact me at
                    <a :href="aboutInfo.email" target="_blank">{{ aboutInfo.emailText }}</a>
                </p>
                <div class="icons-container">
                    <a :href="aboutInfo.linkedin" target="_blank" aria-label="LinkedIn">
                        <fa-icon icon="fab fa-linkedin" size="2x" class="social-icons" />
                    </a>
                    <a :href="aboutInfo.github" target="_blank" aria-label="GitHub">
                        <fa-icon icon="fab fa-github" size="2x" class="social-icons" />
                    </a>
                </div>

                <!-- Made with -->
                <p class="footer-text text-md">
                    Made with
                    <fa-icon icon="fas fa-mug-hot" style="color: #967259" />
                    by {{ aboutInfo.firstName }} using
                    <a href="https://vuejs.org/" target="_blank" style="color: #42b883">
                        <fa-icon icon="fab fa-vuejs" />
                    </a>
                </p>

                <!-- Source code link -->
                <p class="footer-text">
                    <a :href="aboutInfo.sourceCode" target="_blank">
                        Source Code
                        <fa-icon icon="fas fa-arrow-up-right-from-square" />
                    </a>
                </p>

                <!-- Last updated datetime and latest updates -->
                <div class="footer-updates text-sm">
                    <p class="footer-text">Last updated: {{ lastUpdatedDatetime }}</p>

                    <!-- Dropdown tab to view latest commits -->
                    <div class="footer-text">
                        <span class="dropdown-header" @click="toggleCommits">
                            Latest updates
                            <fa-icon
                                :icon="showCommits ? 'fas fa-caret-up' : 'fas fa-caret-down'"
                                size="lg"
                            />
                        </span>
                    </div>

                    <!-- Latest commits table -->
                    <div v-if="showCommits" class="commits-dropdown">
                        <table class="commits-table">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Date</th>
                                    <th>Description</th>
                                    <th>Link</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(commit, index) in commits" :key="commit.sha">
                                    <td>{{ index + 1 }}</td>
                                    <td>
                                        {{ formatDate(commit.commit.author.date) }}
                                    </td>
                                    <td>{{ commit.commit.message.split('\n')[0] }}</td>
                                    <td>
                                        <a :href="commit.html_url" target="_blank">View</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </footer>
    </SectionWrapper>
</template>

<script>
import aboutInfo from '@/assets/data/about.json';
import axios from 'axios';
import SectionWrapper from './SectionWrapper.vue';

export default {
    data() {
        return {
            aboutInfo,
            showCommits: false,
            commits: [],
        };
    },
    components: {
        SectionWrapper,
    },
    computed: {
        lastUpdatedDatetime() {
            // Use the date from the most recent commit
            if (this.commits.length) {
                return this.formatDate(this.commits[0].commit.author.date);
            }
        },
    },
    created() {
        // Fetch the 10 most recent commits once component created
        this.fetchCommits();
    },
    methods: {
        async fetchCommits() {
            try {
                const response = await axios.get(
                    `https://api.github.com/repos/${aboutInfo.repoPath}/commits`
                );
                this.commits = response.data.slice(0, 10);
            } catch (error) {
                console.error('Error fetching commits:', error);
            }
        },
        toggleCommits() {
            this.showCommits = !this.showCommits;
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            return new Intl.DateTimeFormat('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
            }).format(date);
        },
    },
};
</script>

<style scoped>
.footer {
    text-align: center;
}

.footer-header {
    margin-bottom: 20px;
}

.footer-title {
    font-size: 3em;
    color: #333;
    margin: 0;
    margin-bottom: 10px;
}

.footer-subtitle {
    font-size: 1.2em;
    color: #666;
    margin: 5px 0 15px 0;
}

.icons-container {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 10px;
}

.social-icons {
    color: rgb(94, 94, 118);
}

.footer-body {
    display: flex;
    flex-direction: column;
    gap: 5px;
    color: #555;
}

.footer-text {
    margin: 0;
}

.footer a {
    color: #42a5f5;
    text-decoration: none;
    font-weight: bold;
    border-radius: 2px;
}

.footer a:hover {
    text-decoration: underline;
}

.text-lg {
    font-size: 1.1em;
}

.text-md {
    font-size: 1em;
}

.text-sm {
    font-size: 0.9em;
}

.footer-updates {
    margin-top: 5px;
}

.dropdown-header {
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: #555;
    font-weight: bold;
}

.commits-dropdown {
    margin-top: 10px;
    overflow-x: auto;
}

.commits-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    margin: 0 auto;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.commits-table th,
.commits-table td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
}

.commits-table th {
    background: #f0f0f0;
    font-weight: bold;
}

.commits-table tr:nth-child(even) {
    background: #fafafa;
}

.commits-table tr:hover {
    background: #f1f1f1;
}
</style>
