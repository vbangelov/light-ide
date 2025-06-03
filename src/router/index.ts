import { createRouter, createWebHistory } from "vue-router";
import ViewManager from "../components/ViewManager.vue";

const routes = [
  { path: "/", name: "Home", component: ViewManager, meta: { view: "home-view" } },
  { path: "/app-builder", name: "AppBuilder", component: ViewManager, meta: { view: "chat-view" } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
