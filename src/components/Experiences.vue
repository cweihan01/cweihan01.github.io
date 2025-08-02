<script lang="ts">
import { defineComponent } from 'vue';
import SectionWrapper from './SectionWrapper.vue';
import experiences from '@/assets/data/experiences.json';

interface Experience {
    title: string,
    company: string,
    location: string,
    startDate: string,
    endDate: string,
    description: string,
    points: string[],
}

export default defineComponent({
    name: "ExperienceSection",
    data() {
        return {
            experiences: experiences as Experience[],
        };
    },
    components: {
        SectionWrapper,
    },
});
</script>

<template>
    <SectionWrapper sectionId="experience" title="Experience">
        <div class="timeline">
            <div class="entry" v-for="(experience, idx) in experiences" :key="idx">
                <div class="title">
                    <p class="date">{{ experience.startDate }} — {{ experience.endDate }}</p>
                    <p class="position">{{ experience.title }}</p>
                    <p class="company">{{ experience.company }}</p>
                    <p class="location">{{ experience.location }}</p>
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
    padding: 0 30px;
    padding-top: 20px;
    /* padding-bottom: 150px; */
    position: relative;
    /* box-shadow: 0.5rem 0.5rem 2rem 0 rgba(0, 0, 0, 0.2); */
    /* display: flex; */
    /* flex-direction: column; */
}

/* Line for timeline */
.timeline:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    /* bottom: 30px; */
    /* left: calc(40% + 19px); */
    left: calc(40%);
    width: 4px;
    border-radius: 2px;

    background: linear-gradient(
        to bottom,
        rgba(100, 100, 100, 0.8),
        rgba(150, 150, 150, 0.8) 50%,
        rgba(200, 200, 200, 0.8) 100%
    );
    transition: background 0.5s ease;
}

.entry {
    display: flex;
    align-items: center;
    margin-bottom: 40px;
}

.entry::after {
    content: '';
    display: table;
    clear: both;
}

.title {
    margin-bottom: 0.5em;
    float: left;
    width: 40%;
    padding-right: 50px;
    text-align: right;
    position: relative;
}

/* Dot on timeline */
.title:before {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    border: 6px solid rgb(93, 93, 241);
    background-color: #fff;
    border-radius: 100%;
    top: 50%;
    right: -2px;
    z-index: 99;
}

.date {
    font-size: 1em;
    color: #555;
}

.position {
    font-weight: bold;
    font-size: 1.2em;
    color: #222;
}

.company {
    font-size: 0.95em;
    color: #4b4b4b;
}

.location {
    font-size: 0.9em;
    color: #5e5e5e;
    font-style: italic;
}

.body {
    float: right;
    width: 60%;
    padding-left: 30px;
}
.body p {
    line-height: 1.4em;
    font-weight: 400;
}
.body ul {
    color: #353535;
    padding-left: 20px;
    list-style-type: disc;
}
/* .body ul li:before {
    content: '•';
    margin-right: 0.5em;
} */

@media (max-width: 768px) {
    .timeline {
        padding: 0;
        /* padding: 0 20px; */
        padding-top: 20px;
    }

    .title {
        padding-right: 30px;
    }

    .title:before {
        /* right: -4px; */
        right: -8px;
    }

    .position {
        font-size: 1.1em;
    }

    /*
    .timeline:before {
        left: 50px;
    }
    
    .entry {
        flex-direction: column;
        width: 100%;
        align-items: end;
    }
    
    .title {
        text-align: left;
        width: 90%;
        padding-right: 0;
    }
    
    */
    /*
    .title:before {
        top: 50%;
        left: -31px;
        right: auto;
    }
        
    .body {
        width: 90%;
        padding-left: 0;
    } */
}
</style>
