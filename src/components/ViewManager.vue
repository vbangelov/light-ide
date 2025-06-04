<template>
  <div :class="['grid gap-2 h-full w-full', columnClass]">
    <template v-for="(views, index) in orderedColumns" :key="index">
      <div v-if="views.length" class="flex flex-col gap-2">
        <template v-for="view in views" :key="view.id">
          <div class="iframe-container iframe-container-light-blue">
            <component :is="loadedComponents[view.id]" v-bind="view" />
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { markRaw } from "vue";
import type { ViewLayout, View } from "src/types/view";
import IFrameHost from "./IFrameHost.vue";

const props = defineProps<{ activeView: string; toggleView: string }>();

const layout = ref<ViewLayout>({ id: "", columns: 1, views: [] });
const loadedComponents = ref<Record<string, any>>({});

const orderedColumns = computed(() => {
  const activeViews = layout.value.views.filter((v) => v.display !== false);
  const columns = Array.from({ length: layout.value.columns }, () => [] as View[]);
  for (const view of activeViews) {
    const index = Math.max(0, Math.min(layout.value.columns - 1, (view.position ?? 1) - 1));
    columns[index].push(view);
  }
  return columns;
});

const columnClass = computed(() => {
  const cols = layout.value.columns;
  if (cols === 2) return "grid-cols-[70%_30%]";
  if (cols === 3) return "grid-cols-[33.33%_33.33%_33.33%]";
  return "grid-cols-1";
});

async function loadComponent(view: View) {
  if (view.src.endsWith(".html")) {
    loadedComponents.value[view.id] = markRaw({
      extends: IFrameHost,
      props: { src: { default: view.src } },
    });
  } else {
    const module = await import(/* @vite-ignore */ `${view.src}`);
    loadedComponents.value[view.id] = markRaw(module.default);
  }
}

async function loadView(file: string) {
  const module = await import(/* @vite-ignore */ `/src/views/${file}.ts`);
  const newLayout = module.default;
  layout.value = newLayout;

  for (const view of newLayout.views) {
    if (view.display !== false && !loadedComponents.value[view.id]) {
      await loadComponent(view);
    }
  }
}

watch(
  () => props.activeView,
  async (newView) => {
    if (!newView) return;
    await loadView(newView);
  },
  { immediate: true },
);

watch(
  () => props.toggleView,
  async (newId) => {
    if (!newId) return;
    const targetView = layout.value.views.find((v) => v.id === newId);
    if (!targetView) return;

    const targetPos = targetView.position;
    layout.value.views = await Promise.all(
      layout.value.views.map(async (view) => {
        if (view.position === targetPos) {
          const isTarget = view.id === newId;
          if (isTarget && !loadedComponents.value[view.id]) {
            await loadComponent(view);
          }
          return { ...view, display: isTarget };
        }
        return view;
      }),
    );
  },
);
</script>
