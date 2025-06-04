<template>
  <Header :activeView="activeView" @change-view="onChangeView" @toggle-view="onToggleView" />
  <ViewManager :activeView="activeView" :toggleView="toggleView" />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import ViewManager from "./components/ViewManager.vue";
import Header from "./components/Header.vue";
import { useRoute } from "vue-router";
import { watch } from "vue";
import { registerRpcMethods } from "./rpc/register-rpc";

const activeView = ref("");
const toggleView = ref("");
const route = useRoute();

onMounted(() => {
  registerRpcMethods([
    {
      name: "navigateTo",
      func: (view: string) => {
        activeView.value = view;
      },
    },
  ]);
});

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
