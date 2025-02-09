<script>
import aboutInfo from '@/assets/data/about.json';

export default {
    data() {
        return {
            aboutInfo,
        };
    },
};
</script>

<template>
    <footer id="footer" class="footer">
        <div class="contact-section">
            <h2 class="contact-title">Contact Me!</h2>
            <p class="contact-subtitle">
                {{ aboutInfo.footnote }}
            </p>
        </div>
        <div class="footer-content">
            <p class="footer-text">
                Contact me at
                <a :href="aboutInfo.contactLink" target="_blank">{{ aboutInfo.contact }}</a>
            </p>
            <p class="footer-text">
                Made with
                <fa-icon icon="fas fa-mug-hot" style="color: #967259" />
                by {{ aboutInfo.firstName }} using
                <a href="https://vuejs.org/" target="_blank" style="color: #42b883">
                    <fa-icon icon="fab fa-vuejs" />
                </a>
            </p>
            <p class="footer-text">
                <a :href="aboutInfo.sourceCode" target="_blank">Source Code</a>
            </p>
            <p class="footer-text">Last updated: {{ aboutInfo.lastUpdated }}</p>
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
