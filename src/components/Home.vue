<template>
    <div class="home-page">
        <div class="intro-section">
            <h1 class="name">Your Name</h1>
            <p class="study-info">Computer Engineering @ UCLA</p>
            <div class="icons-container">
                <a :href="links.github" target="_blank" aria-label="GitHub">
                    <fa-icon icon="fab fa-github" size="2x" class="social-icons" />
                </a>
                <a :href="links.linkedin" target="_blank" aria-label="LinkedIn">
                    <fa-icon icon="fab fa-linkedin" size="2x" class="social-icons" />
                </a>
                <a :href="links.email" target="_blank" aria-label="Email">
                    <fa-icon icon="fas fa-envelope" size="2x" class="social-icons" />
                </a>
            </div>
        </div>
        <button @click="scrollToBody" class="scroll-button">
            <fa-icon icon="fas fa-angles-down" size="2x" />
        </button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            links: {
                github: 'https://github.com/yourusername',
                linkedin: 'https://linkedin.com/in/yourprofile',
                email: 'mailto:your.email@example.com',
            },
        };
    },
    methods: {
        scrollToBody() {
            const bodySection = document.getElementById('body-section');
            bodySection.scrollIntoView({ behavior: 'smooth' });
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
    font-size: 3em;
    font-weight: bold;
    margin-bottom: 10px;
}

.study-info {
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
    bottom: 40px;
    margin: auto;
    /* left: 50%; */
    /* transform: translateX(-50%); */
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
