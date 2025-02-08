<script>
export default {
    data() {
        return {
            description: {
                subtitle: 'I am currently looking for Summer 2025 internships!',
                contact: 'chuaweihan0101@gmail.com',
                contactLink: 'mailto:chuaweihan0101@gmail.com',
                author: 'Wei Han',
                sourceCode: 'https://github.com/cweihan01/',
                lastUpdated: 'February 7, 2025',
            },
        };
    },
};
</script>

<template>
    <footer class="footer">
        <div class="contact-section">
            <h1 class="contact-title">Contact Me!</h1>
            <p class="contact-subtitle">
                {{ description.subtitle }}
            </p>
        </div>
        <div class="footer-content">
            <p class="footer-text">
                Contact me at
                <a :href="description.contactLink" target="_blank">{{ description.contact }}</a>
            </p>
            <p class="footer-text">
                Made with
                <fa-icon icon="fas fa-heart" style="color: #ff5733" />
                by {{ description.author }} using
                <a href="https://vuejs.org/" target="_blank" style="color: #42b883">
                    <fa-icon icon="fab fa-vuejs" />
                </a>
            </p>
            <p class="footer-text">
                <a :href="description.sourceCode" target="_blank">Source Code</a>
            </p>
            <p class="footer-text">Last updated: {{ description.lastUpdated }}</p>
        </div>
    </footer>
</template>

<style scoped>
.footer {
    background: #f4f4f4;
    padding: 30px 0;
    border-top: 2px solid #ddd;
    text-align: center;
    font-size: 0.9em;
}

.contact-section {
    margin-bottom: 20px;
}

.contact-title {
    font-size: 3em;
    color: #333;
    margin: 0;
}

.contact-subtitle {
    font-size: 1.2em;
    color: #666;
    margin: 5px 0 15px 0;
}

.footer-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: #555;
}

.footer-text {
    margin: 0;
}

.footer-text a {
    color: #42a5f5;
    text-decoration: none;
    font-weight: bold;
}

.footer-text a:hover {
    text-decoration: underline;
}
</style>
