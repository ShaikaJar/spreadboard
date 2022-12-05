import 'regenerator-runtime/runtime';
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import * as VueRouter from "vue-router";
import EditorPage from "./editor_page/EditorPage.vue";
import PreviewPage from "./preview_page/PreviewPage.vue";
import { init } from './editor/loadMenu';

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: EditorPage
        },
        {
            path: '/preview',
            component: PreviewPage
        }
    ],
});

const app = createApp(App)

app.use(router);

app.mount("#app");

init()