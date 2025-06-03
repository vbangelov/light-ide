<template>
  <Header :activeView="activeView" @change-view="onChangeView" @toggle-view="onToggleView" />
  <ViewManager :activeView="activeView" :toggleView="toggleView" @change-view="onChangeView" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import ViewManager from "./components/ViewManager.vue";
import Header from "./components/Header.vue";
import { useRoute } from "vue-router";
import { watch } from "vue";

const activeView = ref("home-view");
const toggleView = ref("");
const route = useRoute();

watch(
  () => route.meta.view,
  (view) => {
    if (view) {
      activeView.value = view;
    }
  },
  { immediate: true },
);

function onChangeView(view: string) {
  activeView.value = view;
}
function onToggleView(view: string) {
  toggleView.value = view;
}
</script>
