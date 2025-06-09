import { createRouter, createWebHistory } from "vue-router";
import ViewManager from "../components/ViewManager.vue";

const routes = [
  // TODO: Return back to start with chat-view
  { path: "/", name: "AppBuilder", component: ViewManager, meta: { view: "application-view" } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
