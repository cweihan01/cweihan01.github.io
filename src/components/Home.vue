<template>
    <div class="home-page" id="home" ref="home">
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
        <button @click="scrollToBody" class="scroll-button">
            <fa-icon icon="fas fa-angles-down" size="2x" />
        </button>
    </div>
</template>

<script>
import p5 from 'p5';
import aboutInfo from '@/assets/data/about.json';

export default {
    data() {
        return {
            aboutInfo,
            particles: [],
            maxParticles: 50,
            mouseLinkDist: 100,
        };
    },
    methods: {
        scrollToBody() {
            document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
        },
        // p5 sketch
        initSketch(container) {
            new p5((s) => {
                let isMobile;
                let lastW, lastH;
                const resizeThreshold = 100;

                // Create canvas and seed particles
                s.setup = () => {
                    isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
                    lastW = window.innerWidth;
                    lastH = window.innerHeight;
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
                                s.stroke(100, 200, 255, s.map(d, 0, this.mouseLinkDist, 200, 0));
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
                        s.resizeCanvas(w * 1.2, h * 1.2);
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
        newParticle(s, x = s.random(s.width), y = s.random(s.height)) {
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
                    s.ellipse(this.x, this.y, d);
                    this.angle += this.rotSpeed;
                },
                lineTo(other, s) {
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
                checkEdges(s) {
                    if (this.x > s.width + this.diameter) this.x = -this.diameter;
                    if (this.x < -this.diameter) this.x = s.width + this.diameter;
                    if (this.y > s.height + this.diameter) this.y = -this.diameter;
                    if (this.y < -this.diameter) this.y = s.height + this.diameter;
                },
            };
        },
    },
    mounted() {
        this.initSketch(this.$refs.home);
    },
};
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
    cursor: grabbing;
    overflow-x: hidden;
    overflow-y: hidden;
}

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
</style>
