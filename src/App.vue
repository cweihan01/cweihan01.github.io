<script setup>
// import HelloWorld from './components/HelloWorld.vue'
// import TheWelcome from './components/TheWelcome.vue'
import Home from './components/Home.vue';
import Experience from './components/Experience.vue';
import Projects from '@/components/Projects.vue';
import Skills from './components/Skills.vue';
import Footer from './components/Footer.vue';
import About from './components/About.vue';
</script>

<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header> -->
  
  <!-- <main>
    <TheWelcome />
  </main> -->

  <main>
    <Home />
    <About />
    <Experience />
    <Projects />
    <Skills />
    <Footer />
  </main>
</template>

<style scoped>

</style>
