<template>
    <div class="home-page" id="home" ref="home">
        <div class="custom-cursor" ref="cursor"></div>
        <div class="scroll-catcher"></div>
        <div class="intro-overlay">
            <div class="intro-section">
                <h1 class="name">{{ aboutInfo.firstName + ' ' + aboutInfo.lastName }}</h1>
                <p class="headline">{{ aboutInfo.headline }}</p>
                <div class="icons-container">
                    <a :href="aboutInfo.linkedin" target="_blank" aria-label="LinkedIn">
                        <fa-icon icon="fab fa-linkedin" size="3x" class="social-icons" />
                    </a>
                    <a :href="aboutInfo.github" target="_blank" aria-label="GitHub">
                        <fa-icon icon="fab fa-github" size="3x" class="social-icons" />
                    </a>
                    <a :href="aboutInfo.email" target="_blank" aria-label="Email">
                        <fa-icon icon="fas fa-envelope" size="3x" class="social-icons" />
                    </a>
                </div>
            </div>
        </div>
        <button @click="scrollToBody" :class="['scroll-button', { bounce }]">
            <fa-icon icon="fas fa-angles-down" size="2x" />
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import p5 from 'p5';
import aboutInfo from '@/assets/data/about.json';

interface AboutInfo {
    firstName: string;
    lastName: string;
    headline: string;
    linkedin: string;
    github: string;
    email: string;
}

interface Particle {
    x: number;
    y: number;
    diameter: number;
    speedX: number;
    speedY: number;
    angle: number;
    rotSpeed: number;
    opacity: number;
    move(): void;
    display(s: p5): void;
    checkEdges(s: p5): void;
    lineTo?(other: Particle, s: p5): void;
}

export default defineComponent({
    name: 'HomePage',
    beforeCreate() {
        (p5 as any).disableFriendlyErrors = true; // disable console output from p5.js
    },
    data() {
        return {
            aboutInfo: aboutInfo as AboutInfo,
            particles: [] as Particle[],
            maxParticles: 50,
            mouseLinkDist: 100,
            hasClicked: false, // whether scroll down button has been clicked
            bounce: false, // whether scroll down button has bounced yet
            bounceTimer: 0 as number,
        };
    },
    methods: {
        scrollToBody() {
            if (!this.hasClicked) {
                this.hasClicked = true;
                clearTimeout(this.bounceTimer);
                this.bounce = false;
            }
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        },
        // p5 sketch
        initSketch(container: HTMLElement) {
            new p5((s: p5) => {
                const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
                const resizeThreshold = 100;

                // Initial canvas width and height
                let lastW = window.innerWidth;
                let lastH = window.innerHeight;

                // Create canvas and seed particles
                s.setup = () => {
                    s.createCanvas(lastW * 1.2, lastH * 1.2).parent(container);

                    for (let i = 0; i < this.maxParticles; i++) {
                        this.particles.push(this.newParticle(s));
                    }
                };
                s.draw = () => {
                    const ctx = s.drawingContext;
                    const topColor = '#a8c0d8';
                    const bottomColor = '#f2f2f2';
                    const grad = ctx.createLinearGradient(0, 0, 0, s.height);
                    grad.addColorStop(0, topColor);
                    grad.addColorStop(1, bottomColor);
                    ctx.fillStyle = grad;
                    ctx.fillRect(0, 0, s.width, s.height);

                    this.particles.forEach((p, i) => {
                        p.move();
                        // Draw lines between close particles
                        // for (let j = i + 1; j < this.particles.length; j++) {
                        //     p.lineTo(this.particles[j], s);
                        // }
                        if (!isMobile) {
                            const d = s.dist(p.x, p.y, s.mouseX, s.mouseY);
                            if (d < this.mouseLinkDist) {
                                s.stroke(
                                    100,
                                    200,
                                    255,
                                    s.map(d, 0, this.mouseLinkDist, 200, 0, false)
                                );
                                s.line(p.x, p.y, s.mouseX, s.mouseY);
                            }
                        }
                        p.display(s);
                        p.checkEdges(s);
                    });
                };
                s.windowResized = () => {
                    // s.resizeCanvas(window.innerWidth, window.innerHeight * 1.2);
                    const w = window.innerWidth;
                    const h = window.innerHeight;
                    // If either dimension changed by more than threshold, resize
                    if (
                        Math.abs(w - lastW) > resizeThreshold ||
                        Math.abs(h - lastH) > resizeThreshold
                    ) {
                        lastW = w;
                        lastH = h;
                        s.resizeCanvas(w * 1.2, h * 1.2, false);
                    }
                };
                s.mouseClicked = () => {
                    if (this.particles.length < 70) {
                        this.particles.push(this.newParticle(s, s.mouseX, s.mouseY));
                    }
                };
            });
        },
        // Factory for a single particle
        newParticle(s: p5, x = s.random(s.width), y = s.random(s.height)): Particle {
            return {
                x,
                y,
                diameter: s.random(10, 15),
                speedX: s.random(-1.5, 1.5),
                speedY: s.random(-1.5, 1.5),
                angle: s.random(0, s.TWO_PI),
                rotSpeed: s.random(0.005, 0.03),
                opacity: s.random(180, 255),
                move() {
                    this.x += this.speedX;
                    this.y += this.speedY;
                },
                display(s) {
                    const d =
                        (s.sin(this.angle + s.PI / 2) * this.diameter) / 2 + this.diameter / 2;
                    s.noStroke();
                    s.fill(255, 255, 255, this.opacity);
                    s.ellipse(this.x, this.y, d, d);
                    this.angle += this.rotSpeed;
                },
                lineTo(other: Particle, s: p5) {
                    const distToMouse = s.dist(this.x, this.y, s.mouseX, s.mouseY);
                    const distToParticle = s.dist(this.x, this.y, other.x, other.y);
                    if (distToMouse < 127) {
                        s.stroke(0, 0, 255, 255 - 2 * distToMouse);
                        s.line(this.x, this.y, s.mouseX, s.mouseY);
                    }
                    if (distToParticle < 127) {
                        s.stroke(0, 0, 255, 255 - 2 * distToParticle);
                        s.line(this.x, this.y, other.x, other.y);
                    }
                },
                checkEdges(s: p5) {
                    if (this.x > s.width + this.diameter) this.x = -this.diameter;
                    if (this.x < -this.diameter) this.x = s.width + this.diameter;
                    if (this.y > s.height + this.diameter) this.y = -this.diameter;
                    if (this.y < -this.diameter) this.y = s.height + this.diameter;
                },
            };
        },
    },
    mounted() {
        const homeEl = this.$refs.home as HTMLElement;
        const cursorEl = this.$refs.cursor as HTMLElement;

        // Initialize background canvas
        if (homeEl) this.initSketch(homeEl);

        // Only display custom cursor within home page
        const onMove = (e: MouseEvent) => {
            cursorEl.style.top = e.clientY + 'px';
            cursorEl.style.left = e.clientX + 'px';
        };

        // Inside the canvas, display custom cursor
        const onEnter = () => {
            homeEl.style.cursor = 'none';
            cursorEl.style.display = 'block';
            window.addEventListener('mousemove', onMove);
        };

        // Outside the canvas, display normal cursor
        const onLeave = () => {
            homeEl.style.cursor = '';
            cursorEl.style.display = 'none';
            window.removeEventListener('mousemove', onMove);
        };

        homeEl.addEventListener('mouseenter', onEnter);
        homeEl.addEventListener('mouseleave', onLeave);

        // After 7s, if user still hasn't clicked, start bouncing the scroll down button
        this.bounceTimer = window.setTimeout(() => {
            if (!this.hasClicked) this.bounce = true;
        }, 7000);
    },
    beforeUnmount() {
        clearTimeout(this.bounceTimer);
    },
});
</script>

<style scoped>
.home-page {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    /* background: linear-gradient(135deg, #e3f2fd, #bbdefb); */
    text-align: center;
    overflow: hidden;
}

/* Fade to next section */
.home-page::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100px;
    pointer-events: none;
    background: linear-gradient(to bottom, rgba(168, 192, 216, 0) 0%, #f2f2f2 100%);
}

/* Disable default cursor on all elements on home page */
.home-page * {
    cursor: none !important;
}

/* Circular cursor on home page */
.custom-cursor {
    position: fixed;
    width: 16px;
    height: 16px;
    border: 2px solid #fff;
    border-radius: 50%;
    pointer-events: none;
    background: #fff;
    transform: translate(-50%, -50%);
    transition: background 0.2s ease;
    z-index: 999;
}

/* On touchscreen, prevent scrolls from interacting with background */
.scroll-catcher {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 5;
    background: transparent;
    touch-action: pan-y;
}

.intro-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    pointer-events: none;
}

.intro-section {
    width: 80%;
    padding: 20px;
    pointer-events: auto;
}

.scroll-button {
    position: absolute;
    bottom: 50px;
    background: transparent;
    border: none;
    cursor: pointer;
    pointer-events: auto;
    transition: transform 0.3s ease;
    z-index: 10;
}
.scroll-button:hover {
    transform: translateY(-12px);
}

@keyframes scrollBounce {
    0%,
    100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-30px);
    }
}

.scroll-button.bounce {
    animation: scrollBounce 0.6s ease-out 3; /* 3 bounces */
}

.name {
    font-size: 4.5em;
    font-weight: bold;
    margin-bottom: 20px;
    line-height: 90px;
    color: #333;
}

.headline {
    font-size: 1.5em;
    color: #555;
    margin-bottom: 20px;
}

.icons-container {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 30px;
}

.icons-container a {
    border-radius: 4px;
    z-index: 10;
}

.icons-container a:hover {
    background-color: rgb(187, 205, 204);

    .social-icons {
        color: rgb(57, 57, 149);
    }
}

.social-icons {
    color: rgb(94, 94, 118);
}

.scroll-button {
    position: absolute;
    bottom: 50px;
    margin: auto;
    padding: 10px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.scroll-button:hover {
    transform: translateY(-12px);
}

/* Disable custom cursor on touch-only devices */
@media (hover: none) {
    .custom-cursor {
        display: none !important;
    }
}
</style>
