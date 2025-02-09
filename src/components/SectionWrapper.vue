<script>
export default {
    props: {
        title: {
            type: String,
            default: "",
        },
        bgColor: {
            type: String,
            default: '#f9f9f9',
        },
        isContentSize: {
            type: Boolean,
            default: true,
        },
    },
};
</script>

<template>
    <div class="section-wrapper" :style="{ backgroundColor: bgColor }">
        <div class="section-content" :style="{ width: isContentSize ? '80%' : '100%' }">
            <h2 class="section-title">{{ title }}</h2>
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.section-wrapper {
    margin-bottom: 0px;
    padding: 20px;
    /* border-bottom: 1px solid #ddd; */
    /* border-radius: 10px; */
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
