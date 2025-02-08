<script setup>
// import HelloWorld from './components/HelloWorld.vue'
// import TheWelcome from './components/TheWelcome.vue'
import Home from './components/Home.vue';
import Experience from './components/Experience.vue';
import Projects from '@/components/Projects.vue';
import Skills from './components/Skills.vue';
import Footer from './components/Footer.vue';
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
    <div class="body">
      <Experience />
      <!-- <Projects /> -->
      <Skills />
    </div>
    <Footer />
  </main>
</template>

<style scoped>
.body {
  width: 80%;
  margin: auto;
}


</style>
