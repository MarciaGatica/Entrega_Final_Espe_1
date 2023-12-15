
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './services/store';
import axiosInstance from './services/axios';


const app = createApp(App)

app.config.globalProperties.$axios = axiosInstance;

app.use(router)
app.use(store);

app.mount('#app')
