import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {routes} from "./router/routes.js";
import {createRouter, createWebHistory} from "vue-router";
import {createPinia} from "pinia";
import VueAxios from "vue-axios";
import axios from "axios";

const router = new createRouter({
    history: createWebHistory(),
    routes
});

const pinia = createPinia();

const app = createApp(App)
app.use(router);
app.use(pinia);
app.use(VueAxios, axios);
// app.use(store);
app.mount('#app');