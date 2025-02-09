<script>
import SectionWrapper from './SectionWrapper.vue';

export default {
    data() {
        return {
            experiences: [
                {
                    id: 1,
                    years: '2014 - Present',
                    title: 'Title',
                    company: 'Company',
                    description:
                        'Voluptatibus veniam ea reprehenderit atque reiciendis non laborum adipisci ipsa pariatur omnis.',
                    points: [
                        'Rerum sit libero possimus amet excepturi',
                        'Exercitationem enim dolores sunt praesentium dolorum praesentium',
                        'Modi aut dolores dignissimos sequi sit ut aliquid molestias deserunt illo',
                    ],
                },
                {
                    id: 2,
                    years: '2010 - Present',
                    title: 'Title',
                    company: 'Company',
                    description:
                        'Voluptatibus veniam ea reprehenderit atque reiciendis non laborum adipisci ipsa pariatur omnis.',
                    points: [
                        'Rerum sit libero possimus amet excepturi',
                        'Exercitationem enim dolores sunt praesentium dolorum praesentium',
                        'Modi aut dolores dignissimos sequi sit ut aliquid molestias deserunt illo',
                    ],
                },
                {
                    id: 3,
                    years: '2010 - 2013',
                    title: 'Title',
                    company: 'Company',
                    description:
                        'Voluptatibus veniam ea reprehenderit atque reiciendis non laborum adipisci ipsa pariatur omnis.',
                    points: [
                        'Rerum sit libero possimus amet excepturi',
                        'Exercitationem enim dolores sunt praesentium dolorum praesentium',
                        'Modi aut dolores dignissimos sequi sit ut aliquid molestias deserunt illo',
                    ],
                },
            ],
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
                    <p>{{ experience.title }}, {{ experience.company }}</p>
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
    padding: 100px 50px;
    padding-bottom: 200px;
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
    left: calc(33% + 19px);
    bottom: 0;
    width: 4px;
    background: #ddd;
}
.entry {
    clear: both;
    text-align: left;
    position: relative;
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
    border: 4px solid salmon;
    background-color: #fff;
    border-radius: 100%;
    top: 15%;
    right: -8px;
    z-index: 99;
}
.body {
    margin: 0 0 3em;
    float: right;
    width: 66%;
    padding-left: 30px;
}
.body p {
    line-height: 1.4em;
    font-weight: 400;
}
.body ul {
    color: #aaa;
    padding-left: 0;
    list-style-type: none;
}
.body ul li:before {
    content: '•';
    margin-right: 0.5em;
}
</style>
