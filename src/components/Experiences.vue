<script>
import SectionWrapper from './SectionWrapper.vue';
import experiences from '@/assets/data/experiences.json';

export default {
    data() {
        return {
            experiences,
        };
    },
    components: {
        SectionWrapper,
    },
};
</script>

<template>
    <SectionWrapper title="Experience">
        <div class="timeline">
            <div class="entry" v-for="experience in experiences" :key="experience.id">
                <div class="title">
                    <h3>{{ experience.years }}</h3>
                    <p>{{ experience.title }}</p>
                    <p>{{ experience.company }}</p>
                </div>
                <div class="body">
                    <p>{{ experience.description }}</p>
                    <ul>
                        <li v-for="point in experience.points" :key="point">{{ point }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </SectionWrapper>
</template>

<style scoped>
.timeline {
    width: 100%;
    /* max-width: 800px; */
    /* background: #fff; */
    padding: 0 50px;
    padding-top: 20px;
    /* padding-bottom: 150px; */
    position: relative;
    /* box-shadow: 0.5rem 0.5rem 2rem 0 rgba(0, 0, 0, 0.2); */
    /* display: flex;
    flex-direction: column; */
}

/* Line for timeline */
.timeline:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    /* bottom: 30px; */
    left: calc(33% + 19px);
    width: 4px;
    /* background: #ddd; */
    border-radius: 2px;

    background: linear-gradient(
        to bottom,
        rgba(100, 100, 100, 0.8),
        rgba(150, 150, 150, 0.8) 50%,
        rgba(200, 200, 200, 0.8) 100%
    );
    transition: background 0.5s ease;
}

.entry::after {
    content: '';
    display: table;
    clear: both;
}

.title {
    margin-bottom: 0.5em;
    float: left;
    width: 33%;
    padding-right: 30px;
    text-align: right;
    position: relative;
}

/* Dot on timeline */
.title:before {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    border: 4px solid rgb(93, 93, 241);
    background-color: #fff;
    border-radius: 100%;
    top: 10px;
    right: -8px;
    z-index: 99;
}
.body {
    margin: 0 0 20px;
    float: right;
    width: 66%;
    padding-left: 30px;
}
.body p {
    line-height: 1.4em;
    font-weight: 400;
}
.body ul {
    color: #353535;
    padding-left: 0;
    list-style-type: none;
}
.body ul li:before {
    content: '•';
    margin-right: 0.5em;
}
</style>
