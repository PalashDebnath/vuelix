import 'bootstrap';
import { createApp } from 'vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import App from './app.vue';
import store from './store';
import router from './router';

const app = createApp(App);

app.use(store).use(router);

app.mount('#app')
