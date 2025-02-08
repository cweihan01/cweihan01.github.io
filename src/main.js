import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
// import { faGithub } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons';

/* add icons to the library */
library.add(faGithub);

createApp(App).component('fa-icon', FontAwesomeIcon).mount('#app');
