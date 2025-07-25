<script>
import SectionWrapper from './SectionWrapper.vue';
import skills from '@/assets/data/skills.json';

export default {
    data() {
        return {
            selectedCategory: 'all',
            intersected: {},
            ...skills,
        };
    },
    directives: {
        /** Create v-intersect directive that updates intersected with new entry. */
        intersect: {
            mounted(el, { instance, value }) {
                const obs = new IntersectionObserver(
                    ([entry]) => {
                        if (entry.isIntersecting) {
                            instance.intersected[value] = true;
                            obs.unobserve(el);
                        }
                    },
                    { threshold: 0.5 }
                );
                obs.observe(el);
            },
        },
    },
    watch: {
        /** Reset intersected when tab changed. */
        selectedCategory() {
            this.intersected = {};
        },
    },
    computed: {
        /** Filter skills by selectedCategory and sort in descending proficiency level. */
        filteredSkills() {
            let skillsList =
                this.selectedCategory === 'all'
                    ? this.skills
                    : this.skills.filter((skill) => skill.category === this.selectedCategory);

            return skillsList.sort((a, b) => b.proficiency - a.proficiency);
        },
    },
    components: {
        SectionWrapper,
    },
};
</script>

<template>
    <SectionWrapper sectionId="skills" title="Skills">
        <div class="skills-container">
            <div class="nav-bar">
                <div
                    v-for="category in categories"
                    :key="category.name"
                    class="nav-item"
                    :class="{ active: selectedCategory === category.name }"
                    @click="selectedCategory = category.name"
                >
                    <fa-icon :icon="category.icon" size="2xl" class="category-icon" />
                    <span>{{ category.label }}</span>
                </div>
            </div>

            <div class="skills-list">
                <div
                    v-for="skill in filteredSkills"
                    :key="`${selectedCategory}::${skill.name}`"
                    class="skill-item"
                >
                    <div class="skill-info">
                        <fa-icon :icon="skill.icon" size="2x" class="skill-icon" />
                        <span class="skill-name">{{ skill.name }}</span>
                    </div>
                    <div class="progress-bar">
                        <div
                            class="progress"
                            v-intersect="skill.name"
                            :style="{
                                width: intersected[skill.name] ? skill.proficiency + '%' : '0%',
                            }"
                        ></div>
                    </div>
                    <span class="percentage">{{ skill.proficiency }}%</span>
                </div>
            </div>
        </div>
    </SectionWrapper>
</template>

<style scoped>
.skills-container {
    color: black;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    gap: 20px;
    border: 1px solid #e3e3e3;
    border-radius: 15px;
    background: #fefcfc;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.nav-bar {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: #f4f4f4;
    padding: 15px 20px;
    border-radius: 15px 0 0 15px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    transition: background 0.3s ease;
}

@media (max-width: 768px) {
    .nav-bar {
        flex-direction: row;
        width: 100%;
        overflow-x: auto;
        border-radius: 15px;
        gap: 5px;
    }

    .nav-item {
        display: flex;
        gap: 5px;
        padding: 10px;
    }

    .category-icon {
        transform: scale(0.8);
    }
}

.nav-item:hover,
.nav-item.active {
    background: #d1e8ff;
}

.category-icon {
    width: 50px;
    color: #333;
}

.skills-list {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    flex-grow: 1;
}

.skill-item {
    display: grid;
    grid-template-columns: 150px 1fr 50px;
    align-items: center;
    gap: 10px;
}

.skill-info {
    display: grid;
    grid-template-columns: 25% 75%;
    align-items: center;
    gap: 10px;
}

.skill-name {
    color: #333;
}

.skill-icon {
    color: #42a5f5;
    margin: auto;
}

.progress-bar {
    width: 100%;
    height: 10px;
    background: #e0e0e0;
    border-radius: 5px;
    overflow: hidden;
    position: relative;
}

.progress {
    height: 100%;
    background: linear-gradient(90deg, #42a5f5, #1e88e5);
    border-radius: 5px;
    transition: width 0.4s ease;
}

.percentage {
    font-size: 0.85em;
    color: #666;
    text-align: right;
}
</style>
