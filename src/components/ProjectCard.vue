<template>
    <div class="card">
        <div :class="['card-inner', { reverse: index % 2 === 1 }]">
            <!-- Image side: contains image, technologies, languages -->
            <div class="image-container">
                <img :src="project.image" alt="Project Image" class="project-image" />

                <!-- Tech badges (desktop) -->
                <div class="techs-container desktop-only">
                    <span v-for="(tech, i) in project.technologies" :key="i" class="tech-badge">
                        {{ tech }}
                    </span>
                </div>

                <!-- Languages progress bars (desktop) -->
                <div
                    class="languages-container desktop-only"
                    v-if="Object.keys(langPercentages).length"
                >
                    <div
                        class="language-item"
                        v-for="(percentage, lang) in langPercentages"
                        :key="lang"
                    >
                        <span class="language-name">{{ lang }}</span>
                        <div class="progress-bar">
                            <div class="progress" :style="{ width: percentage + '%' }"></div>
                        </div>
                        <span class="percentage">{{ percentage }}%</span>
                    </div>
                </div>
            </div>

            <!-- Text side: title, caption, description, last updated, links -->
            <div class="text-container">
                <h3 class="title">{{ project.displayName }}</h3>

                <p class="caption">{{ project.caption }}</p>

                <p class="description">
                    {{ project.displayDescription || project.repoDescription }}
                </p>

                <p class="date">Last updated: {{ formatDate(project.pushedAt) }}</p>

                <div class="links-container">
                    <a :href="project.repoLink" target="_blank" class="btn repo-btn">
                        <fa-icon icon="fab fa-github" size="lg" class="icon" /> Repo
                    </a>
                    <div v-for="(link, idx) in project.links" :key="idx">
                        <a :href="link.url" target="_blank" class="btn">
                            {{ link.text }}
                        </a>
                    </div>
                </div>

                <!-- Bottom of card on mobile, hidden on desktop -->
                <div class="techs-container mobile-only">
                    <span v-for="(tech, i) in project.technologies" :key="i" class="tech-badge">
                        {{ tech }}
                    </span>
                </div>

                <div
                    class="languages-container mobile-only"
                    v-if="Object.keys(langPercentages).length"
                >
                    <div
                        class="language-item"
                        v-for="(percentage, lang) in langPercentages"
                        :key="lang"
                    >
                        <span class="language-name">{{ lang }}</span>
                        <div class="progress-bar">
                            <div class="progress" :style="{ width: percentage + '%' }"></div>
                        </div>
                        <span class="percentage">{{ percentage }}%</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['project', 'index'],
    computed: {
        /** Turn languages (in bytes) to percentages (only keep top 4). */
        langPercentages() {
            const raw = this.project.languages || {};
            const entries = Object.entries(raw);
            const total = entries.reduce((sum, [, b]) => sum + b, 0);
            return Object.fromEntries(
                entries
                    .map(([lang, bytes]) => [lang, ((bytes / total) * 100).toFixed(1)])
                    .slice(0, 3)
            );
        },
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
    width: 100%;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card:hover {
    transform: translateY(-5px);
    box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.2);
}

.card-inner {
    display: flex;
    align-items: flex-start;
    gap: 30px;
}
.card-inner.reverse {
    flex-direction: row-reverse;
}

.image-container {
    flex: 1 1 40%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.project-image {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 8px;
    max-height: 220px;
}

.techs-container {
    margin-top: 12px;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
}
.tech-badge {
    background: #f9f9f9;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.85em;
    border: 1px solid #ccc;
}

.languages-container {
    margin-top: 12px;
    width: 100%;
}
.language-item {
    display: grid;
    grid-template-columns: 80px 1fr 50px;
    align-items: center;
    gap: 10px;
    margin-bottom: 6px;
}
.language-name {
    font-weight: bold;
    color: #333;
}
.progress-bar {
    width: 100%;
    height: 10px;
    background: #e0e0e0;
    border-radius: 5px;
    overflow: hidden;
}
.progress {
    height: 100%;
    background: linear-gradient(90deg, #42a5f5, #1e88e5);
    transition: width 0.4s ease;
}
.percentage {
    text-align: right;
    font-size: 0.85em;
    color: #666;
}

.text-container {
    flex: 1 1 60%;
}
.title {
    font-size: 1.7em;
    margin-bottom: 8px;
    color: #333;
}
.caption {
    font-size: 1.1em;
    color: #282828;
    margin-bottom: 12px;
}
.description {
    font-size: 1em;
    color: #555;
    margin-bottom: 15px;
}
.date {
    font-style: italic;
    color: #555;
    margin-bottom: 15px;
}

.links-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}
.btn {
    padding: 6px 12px;
    border: 1px solid #333;
    background: transparent;
    color: #333;
    border-radius: 8px;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: background 0.3s ease, color 0.3s ease;
}
.btn:hover {
    background: #333;
    color: #fff;
}
.icon {
    margin-right: 3px;
}

.mobile-only {
    display: none;
}

@media (max-width: 768px) {
    /* Restrict image height smaller on mobile */
    .image-container {
        align-items: center;
        justify-content: center;
        display: flex;
        width: 100%;
    }
    .project-image {
        max-height: 200px;
        max-width: 100%;
        margin: auto;
        object-fit: contain;
    }

    /* Single-column on mobile */
    .card-inner {
        flex-direction: column !important;
    }
    .text-container {
        flex: 1 1 100%;
    }

    /* Hide desktop overlays */
    .desktop-only {
        display: none;
    }

    /* Show mobile overlays at bottom */
    .mobile-only {
        display: block;
        margin-top: 20px;
    }
}
</style>
