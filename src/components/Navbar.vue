<template>
    <nav :class="['navbar', { hide: shouldHideNavbar }]">
        <div class="navbar-content">
            <!-- Logo -->
            <div class="logo" @click="scrollTo('home')">
                <img src="/android-chrome-192x192.png" alt="Website logo" />
            </div>

            <!-- Mobile menu toggle button -->
            <button class="menu-toggle" v-if="isMobile" @click="toggleMenu">
                <fa-icon :icon="menuOpen ? 'fas fa-caret-down' : 'fa-solid fa-bars'" size="lg" />
            </button>

            <!-- Navigation Links (visible on desktop or when menu is toggled on mobile) -->
            <Transition name="slide-fade">
                <ul class="nav-links" v-if="!isMobile || menuOpen">
                    <li><a @click="scrollTo('about')">About</a></li>
                    <li><a @click="scrollTo('experience')">Experience</a></li>
                    <li><a @click="scrollTo('projects')">Projects</a></li>
                    <li><a @click="scrollTo('skills')">Skills</a></li>
                </ul>
            </Transition>
        </div>
    </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const menuOpen = ref(false);
const isMobile = ref(window.innerWidth < 768);
const shouldHideNavbar = ref(false);
const forceHideNavbar = ref(false);
let lastScrollY = window.scrollY;

// Toggles the navbar menu on mobile
const toggleMenu = () => {
    menuOpen.value = !menuOpen.value;
};

// Scrolls to a particular section and forces the navbar to hide
const scrollTo = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }

    // Force hide the navbar if user click on any link besides 'home'
    if (sectionId !== 'home') {
        forceHideNavbar.value = true;
        shouldHideNavbar.value = true;
    }

    // If on mobile, close the menu after clicking
    if (isMobile.value) {
        menuOpen.value = false;
    }

    // After a short delay, release the forced hide so scroll events resume normal behavior
    setTimeout(() => {
        forceHideNavbar.value = false;
        lastScrollY = window.scrollY;
    }, 1000);
};

// Handles hiding/showing navbar when user scrolls down a certain distance
const handleScroll = () => {
    // If user just clicked a navbar link, disregard scroll direction; always hide navbar
    if (forceHideNavbar.value) return;

    const currentScrollY = window.scrollY;
    // Hide navbar if scrolling down beyond a threshold, otherwise show it
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        shouldHideNavbar.value = true;
    } else {
        shouldHideNavbar.value = false;
    }
    lastScrollY = currentScrollY;

    // If on mobile, close the menu after scrolling
    if (isMobile.value) {
        menuOpen.value = false;
    }
};

// Checks whether to display mobile navbar when window is resized
const handleResize = () => {
    isMobile.value = window.innerWidth < 768;
};

// Add event listeners for scroll and resize
onMounted(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
});
onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.navbar {
    position: fixed;
    top: 0;
    width: 100%;
    background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0.95) 0%,
        rgba(245, 245, 245, 0.7) 100%
    );
    z-index: 1000;
    transform-origin: top center;
    transition: transform 1s ease, opacity 1s ease;
    opacity: 1;
}

.navbar.hide {
    transform: rotateX(90deg);
    opacity: 0;
}

.navbar-content {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
}

.logo {
    cursor: pointer;
}

.logo img {
    height: 40px;
}

.nav-links {
    list-style: none;
    display: flex;
    gap: 20px;
    margin: 0;
    padding: 0;
}

.nav-links li a {
    text-decoration: none;
    color: #333;
    font-weight: 500;
    cursor: pointer;
}

/* Mobile styles: collapsed menu */
.menu-toggle {
    background: none;
    border: none;
    font-size: 1.5em;
    cursor: pointer;
}

/* Transition for mobile menu */
.slide-fade-enter-active {
    transition: all 0.5s ease;
}
.slide-fade-leave-active {
    transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

/* Mobile specific: enhanced menu styling */
@media (max-width: 768px) {
    .nav-links {
        position: absolute;
        top: 100%;
        right: 0;
        left: 0;
        background: rgba(255, 255, 255, 0.9);
        flex-direction: column;
        padding: 15px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        border-radius: 0 0 10px 10px;
        gap: 15px;
    }

    .nav-links li a {
        font-size: 1.2em;
        color: #333;
    }
}
</style>
