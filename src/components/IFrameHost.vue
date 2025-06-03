<template>
  <iframe ref="iframe" :src="src" class="w-full h-full border-none" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps<{ src: string }>();
const emit = defineEmits(["message"]);

const iframe = ref<HTMLIFrameElement | null>(null);
defineExpose({ iframe });

function handleMessage(event: MessageEvent) {
  // a way to directly handle messages from the iframe in the wrapper component
  if (!event.data || typeof event.data !== "object") return;
  emit("message", event.data);
}

onMounted(() => {
  window.addEventListener("message", handleMessage);
});

onUnmounted(() => {
  window.removeEventListener("message", handleMessage);
});
</script>
