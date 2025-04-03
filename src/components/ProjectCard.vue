<template>
    <div class="card">
        <div class="image-container">
            <img :src="project.image" alt="Project Image" class="project-image" />
        </div>
        <h3>{{ project.displayName }}</h3>

        <p class="caption">
            {{ project.caption }}
        </p>

        <p class="description">
            {{ project.displayDescription || project.repoDescription }}
        </p>

        <p class="date">Last updated: {{ formatDate(project.pushedAt) }}</p>

        <div class="links-container">
            <a :href="project.repoLink" target="_blank" class="btn repo-btn">
                <fa-icon icon="fab fa-github" size="lg" class="icon" /> Repo
            </a>

            <div v-for="(link, index) in project.links" :key="index">
                <a :href="link.url" target="_blank" class="btn">
                    {{ link.text }}
                </a>
            </div>
        </div>

        <div class="technologies-container">
            <div v-for="(tech, index) in project.technologies" :key="index" class="technology-box">
                {{ tech }}
            </div>
        </div>

        <div class="languages" v-if="Object.keys(languages).length">
            <div class="language-item" v-for="(percentage, lang) in languages" :key="lang">
                <div class="language-grid">
                    <span class="language-name">{{ lang }}</span>
                    <div class="progress-bar">
                        <div class="progress" :style="{ width: percentage + '%' }"></div>
                    </div>
                    <span class="percentage">{{ percentage }}%</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: ['project'],
    data() {
        return {
            languages: {},
        };
    },
    async created() {
        try {
            if (this.project.languagesUrl) {
                // console.log("Retrieving languages:" + this.project.languagesUrl);
                const response = await axios.get(this.project.languagesUrl);
                const total = Object.values(response.data).reduce((acc, val) => acc + val, 0);
                this.languages = Object.fromEntries(
                    Object.entries(response.data)
                        .map(([lang, bytes]) => [lang, ((bytes / total) * 100).toFixed(1)])
                        .slice(0, 4)
                );
            }
        } catch (error) {
            console.error('Error fetching languages:', error);
        }
    },
    methods: {
        formatDate(dateString) {
            const date = new Date(dateString);
            return new Intl.DateTimeFormat('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            }).format(date);
        },
    },
};
</script>

<style scoped>
.card {
    background: #fff;
    padding: 25px;
    border-radius: 15px;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
    text-align: left;
    align-self: start;
    width: 100%;
    max-width: 400px;
    min-height: 100%;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.2);
}

h3 {
    font-size: 1.7em;
    margin-bottom: 10px;
    color: #333;
}

.image-container {
    min-height: 150px;
    height: 240px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.project-image {
    width: 100%;
    height: auto;
    object-fit: contain;
    max-height: 100%;
    border-radius: 8px;
    margin: auto;
}

@media (max-width: 1024px) {
    .image-container {
        height: 150px;
    }
}

@media (max-width: 768px) {
    .image-container {
        height: 150px;
    }
}

.caption {
    font-size: 1.2em;
    color: #282828;
    margin-bottom: 15px;
}

.description {
    font-size: 1em;
    color: #555;
    margin-bottom: 15px;
}

.date {
    font-style: italic;
    color: #555;
}

.links-container {
    margin-top: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
}

.btn {
    display: inline-block;
    padding: 5px 10px;
    background: transparent;
    color: #333;
    text-decoration: none;
    border: 1px solid #333;
    border-radius: 8px;
    font-size: 1em;
    text-align: center;
    transition: background 0.3s ease, color 0.3s ease;
}

.btn:hover {
    background: #333;
    color: white;
}

.icon {
    margin-right: 3px;
}

.technologies-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 15px;
}

.technology-box {
    padding: 3px 7px;
    border: 1px solid #a3a3a3;
    border-radius: 4px;
    background: #f9f9f9;
    font-size: 0.9em;
    transition: background 0.3s ease, color 0.3s ease;
}

.technology-box:hover {
    background: #333;
    color: white;
}

.languages {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 15px;
}

.language-item {
    width: 100%;
}

.language-grid {
    display: grid;
    grid-template-columns: 80px 1fr 50px;
    align-items: center;
    gap: 10px;
}

.language-name {
    font-weight: bold;
    color: #333;
    text-align: left;
}

.progress-bar {
    width: 100%;
    height: 10px;
    background: #e0e0e0;
    border-radius: 5px;
    position: relative;
    overflow: hidden;
}

.progress {
    height: 100%;
    background: linear-gradient(90deg, #42a5f5, #1e88e5);
    border-radius: 5px;
    transition: width 0.4s ease;
}

.percentage {
    text-align: right;
    font-size: 0.85em;
    color: #666;
}
</style>
