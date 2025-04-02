<script setup>
import Navbar from './components/Navbar.vue';
import Home from './components/Home.vue';
import Experiences from './components/Experiences.vue';
import Projects from './components/Projects.vue';
import Skills from './components/Skills.vue';
import Footer from './components/Footer.vue';
import About from './components/About.vue';
</script>

<template>
    <Navbar />
    <main>
        <Home />
        <About />
        <Experiences />
        <Projects />
        <Skills />
        <Footer />
    </main>
</template>

<style scoped></style>
