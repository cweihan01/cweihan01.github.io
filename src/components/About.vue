<template>
    <SectionWrapper bgColor="#f3f4f6">
        <div class="about-section">
            <img :src="portrait" alt="Portrait" class="portrait" />
            <div class="about-content">
                <h2 class="about-title">About Me</h2>
                <p class="about-paragraph">
                    Hi! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus nam
                    laboriosam odit facilis quis impedit commodi, excepturi earum ab? Iure modi
                    harum cupiditate consequatur nesciunt sequi possimus, qui aspernatur odio! Lorem
                    ipsum dolor sit amet consectetur adipisicing elit. Iusto temporibus voluptatem
                    quaerat, id nam at excepturi ab labore. Nobis, nostrum enim. Unde est rem modi
                    qui. Magni ducimus odio reprehenderit.
                </p>
            </div>
        </div>
    </SectionWrapper>
</template>

<script>
import SectionWrapper from './SectionWrapper.vue';
import selfPortrait from '@/assets/github-mark.png';

export default {
    components: {
        SectionWrapper,
    },
    data() {
        return {
            portrait: selfPortrait,
        };
    },
};
</script>

<style scoped>
.about-section {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 40px 20px;
    /* min-height: 60vh; */
}

.portrait {
    width: 250px;
    height: 250px;
    border-radius: 50%;
    box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.2);
    object-fit: cover;
}

.about-content {
    max-width: 600px;
}

.about-title {
    text-align: center;
    font-size: 3em;
    color: #333;
    margin-bottom: 20px;
}

.about-paragraph {
    font-size: 1.2em;
    color: #555;
    line-height: 1.8;
    text-align: justify;
}

@media (max-width: 768px) {
    .about-section {
        flex-direction: column;
        text-align: center;
        min-height: auto;
    }

    .portrait {
        margin-bottom: 20px;
    }

    .about-content {
        max-width: 100%;
    }
}
</style>
