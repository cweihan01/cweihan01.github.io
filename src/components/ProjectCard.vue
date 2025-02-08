<template>
    <div class="card">
        <img :src="value.image" alt="Project Image" class="project-image" />
        <h3>{{ value.name }}</h3>
        <p class="description">{{ value.description }}</p>
        
        <span class="date">{{ formatDate(value.pushed_at) }}</span>
        
        <div class="links-container">
            <div v-for="(link, index) in value.links" :key="index">
                <a :href="link.url" target="_blank" class="btn">
                    {{ link.text }}
                </a>
            </div>
            
            <a :href="value.repoLink" target="_blank" class="btn repo-btn">
                <fa-icon icon="fa-brands fa-github" size="lg" class="icon" /> Repo
            </a>
        </div>

        <div class="details">
            <div class="languages" v-if="Object.keys(languages).length">
                <div v-for="(percentage, lang) in languages" :key="lang" class="language-item">
                <span class="language-name">{{ lang }}</span>
                <div class="progress-bar">
                    <div class="progress" :style="{ width: percentage + '%' }"></div>
                </div>
                <span class="percentage">{{ percentage }}%</span>
                </div>
            </div>
        </div>

        <!-- <div class="details">
            <span class="languages" v-if="Object.keys(languages).length">
                <span v-for="(percentage, lang) in languages" :key="lang" class="lang">
                    {{ lang }}: {{ percentage }}%
                </span>
            </span>
        </div> -->
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: ['value'],
    data() {
        return {
            languages: {},
        };
    },
    async created() {
        try {
            const mockLanguagesData = {
                remembrall: {
                    JavaScript: 1500,
                    HTML: 800,
                    CSS: 700,
                },
                pillpro: {
                    Python: 1200,
                    JavaScript: 500,
                    HTML: 300,
                },
                website: {
                    Python: 1200,
                    JavaScript: 500,
                    HTML: 300,
                },
            };

            if (this.value.languagesUrl) {
                // console.log("Retrieving languages:" + this.value.languagesUrl);
                // const response = await axios.get(this.value.languagesUrl);
                const response = {data: mockLanguagesData[this.value.name]};
                const total = Object.values(response.data).reduce((acc, val) => acc + val, 0);
                this.languages = Object.fromEntries(
                    Object.entries(response.data).map(([lang, bytes]) => [
                        lang,
                        ((bytes / total) * 100).toFixed(1),
                    ])
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
    width: 100%;
    max-width: 400px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card:hover {
    transform: translateY(-5px);
    box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.2);
}
h3 {
    font-size: 1.5em;
    margin-bottom: 10px;
    color: #333;
}
.project-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 15px;
}
.description {
    font-size: 1em;
    color: #555;
    margin-bottom: 15px;
}
.links-container {
    display: flex;
    align-items: center; /* Align items to the center */
    gap: 10px; /* Adds spacing between items */
    flex-wrap: wrap; /* Ensures items wrap if screen size is too small */
}
/* .repo {
    margin-top: 15px;
} */
.btn {
    display: inline-block;
    /* margin: 5px 0; */
    padding: 10px 20px;
    background: transparent;
    color: #333;
    text-decoration: none;
    border: 2px solid #333;
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

.languages {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 15px;
}
.language-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.9em;
  margin-bottom: 5px;
}
.language-name {
  flex: 1;
  font-weight: bold;
  color: #333;
}
.progress-bar {
  flex: 4;
  height: 10px;
  background: #e0e0e0;
  border-radius: 5px;
  margin: 0 10px;
  overflow: hidden;
  position: relative;
}
.progress {
  height: 100%;
  background: linear-gradient(90deg, #42a5f5, #1e88e5);
  border-radius: 5px;
  transition: width 0.4s ease;
}
.percentage {
  flex: 1;
  text-align: right;
  color: #666;
  font-size: 0.85em;
}

</style>
