<template>
    <div class="home-page" id="home">
        <div class="intro-section">
            <h1 class="name">{{ aboutInfo.firstName + ' ' + aboutInfo.lastName }}</h1>
            <p class="headline">{{ aboutInfo.headline }}</p>
            <div class="icons-container">
                <a :href="aboutInfo.linkedin" target="_blank" aria-label="LinkedIn">
                    <fa-icon icon="fab fa-linkedin" size="3x" class="social-icons" />
                </a>
                <a :href="aboutInfo.github" target="_blank" aria-label="GitHub">
                    <fa-icon icon="fab fa-github" size="3x" class="social-icons" />
                </a>
                <a :href="aboutInfo.email" target="_blank" aria-label="Email">
                    <fa-icon icon="fas fa-envelope" size="3x" class="social-icons" />
                </a>
            </div>
        </div>
        <button @click="scrollToBody" class="scroll-button">
            <fa-icon icon="fas fa-angles-down" size="2x" />
        </button>
    </div>
</template>

<script>
import aboutInfo from '@/assets/data/about.json';
export default {
    data() {
        return {
            aboutInfo,
        };
    },
    methods: {
        scrollToBody() {
            document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
        },
    },
};
</script>

<style scoped>
.home-page {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    background: linear-gradient(135deg, #e3f2fd, #bbdefb);
    text-align: center;
    color: #333;
}

.intro-section {
    width: 80%;
    padding: 20px;
}

.name {
    font-size: 4.5em;
    font-weight: bold;
    margin-bottom: 20px;
    line-height: 90px;
}

.headline {
    font-size: 1.5em;
    color: #555;
    margin-bottom: 20px;
}

.icons-container {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 30px;
}

.social-icons {
    color: rgb(94, 94, 118);
}

.scroll-button {
    position: absolute;
    bottom: 50px;
    margin: auto;
    padding: 10px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.scroll-button:hover {
    transform: translateY(-12px);
}
</style>
