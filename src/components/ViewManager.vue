<template>
  <div :class="['grid gap-2 h-full w-full', columnClass]">
    <template v-for="(views, position) in orderedColumns" :key="position">
      <div v-if="views.length" class="flex flex-col gap-2">
        <template v-for="view in views" :key="view.id">
          <component :is="loadedComponents[view.id]" v-bind="view" @change-view="handleViewChange" />
        </template>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { markRaw } from "vue";
import { View } from "../types/View";

const emit = defineEmits(["change-view"]);
const props = defineProps<{ activeView: string; toggleView: string }>();

const layout = ref<{ id: string; layout: string; views: View[] }>({ id: "", layout: "", views: [] });
const loadedComponents = ref<Record<string, any>>({});

// Computed view filters
const visibleViews = computed(() => layout.value.views.filter((v) => v.display !== false));
const leftViews = computed(() => visibleViews.value.filter((v) => v.position === "left"));
const mainViews = computed(() => visibleViews.value.filter((v) => v.position === "main"));
const rightViews = computed(() => visibleViews.value.filter((v) => v.position === "right"));

const orderedColumns = computed(() => ({
  left: leftViews.value,
  main: mainViews.value,
  right: rightViews.value,
}));

const columnCount = computed(
  () => [leftViews.value, mainViews.value, rightViews.value].filter((col) => col.length).length || 1,
);

const columnClass = computed(() => {
  const cols = columnCount.value;

  if (cols === 2) {
    return "grid-cols-[70%_30%]";
  }

  if (cols === 3) {
    return "grid-cols-[33.33%_33.33%_33.33%]";
  }

  return "grid-cols-1";
});

async function loadComponent(view: View) {
  const module = await import(/* @vite-ignore */ `${view.src}`);
  loadedComponents.value[view.id] = markRaw(module.default);
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

function handleViewChange(view: string) {
  loadView(view);
  emit("change-view", view);
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

    const targetPosition = targetView.position;

    layout.value.views = await Promise.all(
      layout.value.views.map(async (view) => {
        if (view.position === targetPosition) {
          const isTarget = view.id === newId;
          if (isTarget && !loadedComponents.value[view.id]) {
            await loadComponent(view);
          }
          return {
            ...view,
            display: isTarget,
          };
        }
        return view;
      }),
    );
  },
);
</script>
