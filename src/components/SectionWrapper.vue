<script>
export default {
    props: {
        title: {
            type: String,
            default: '',
        },
        bgColor: {
            type: String,
            default: '#f9f9f9',
        },
        isContentSize: {
            type: Boolean,
            default: true,
        },
        sectionId: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            windowWidth: window.innerWidth, // Track the window size
        };
    },
    computed: {
        contentWidth() {
            // Return 100% on small screens or based on isContentSize
            return this.windowWidth <= 768 ? '100%' : this.isContentSize ? '80%' : '100%';
        },
    },
    mounted() {
        window.addEventListener('resize', this.updateWindowWidth);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.updateWindowWidth);
    },
    methods: {
        updateWindowWidth() {
            this.windowWidth = window.innerWidth;
        },
    },
};
</script>

<template>
    <div class="section-wrapper" :id="sectionId" :style="{ backgroundColor: bgColor }">
        <div class="section-content" :style="{ width: contentWidth }">
            <h2 class="section-title">{{ title }}</h2>
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.section-wrapper {
    margin-bottom: 0px;
    padding: 20px;
    box-shadow: 0 2px rgba(0, 0, 0, 0.1);
}

.section-title {
    text-align: center;
    font-size: 3em;
    color: #333;
    margin-bottom: 20px;
}

.section-content {
    margin: auto;
    padding: 10px 0;
}
</style>
