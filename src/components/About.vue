<template>
    <SectionWrapper bgColor="#f3f4f6">
        <div class="about-section">
            <img :src="aboutInfo.portrait" alt="Portrait" class="portrait" />
            <div class="about-content">
                <h2 class="about-title">About Me</h2>
                <p class="about-paragraph">
                    {{ aboutInfo.description }}
                </p>
            </div>
        </div>
    </SectionWrapper>
</template>

<script>
// import aboutData from '@/assets/data.json'; // Future JSON import
import SectionWrapper from './SectionWrapper.vue';

const aboutInfo = {
    portrait: '../assets/github-mark.png',
    description: `Hi! I'm a Computer Engineering student at UCLA passionate about software development and technology. I enjoy building products that bridge the gap between business and technology. In my free time, you'll often find me exploring new technologies or working on community-driven projects.`,
};

function resolveImagePaths(info) {
    const updatedInfo = { ...info };
    if (info.portrait) {
        updatedInfo.portrait = new URL(info.portrait, import.meta.url).href;
    }
    return updatedInfo;
}

export default {
    components: {
        SectionWrapper,
    },
    data() {
        return {
            aboutInfo: resolveImagePaths(aboutInfo),
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
}

.portrait {
    width: 250px;
    height: 250px;
    margin: 0 20px;
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
    }

    .portrait {
        width: 200px;
        height: 200px;
        margin-bottom: 20px;
    }

    .about-content {
        max-width: 100%;
    }
}
</style>
