<template>
  <div class="iframe-container">
    <IFrameHost ref="iframeRef" :src="src" />
  </div>
</template>

<script setup lang="ts">
import IFrameHost from "../components/IFrameHost.vue";
import { onMounted, onUnmounted, ref } from "vue";
import { useIframeManager } from "../composables/useIframeManager.ts";

const id = "ide-editor-iframe";
const src = "src/assets/dummy-ide-frame.html";
const emit = defineEmits(["change-view"]);

const iframeRef = ref<InstanceType<typeof IFrameHost>>();
const { registerIframe, unregisterIframe, addMessageHandler, removeMessageHandler } = useIframeManager();

function onMessage(data: any) {
  // example message handler to handle messages from the iframe
  if (data?.action === "application-view") {
    emit("change-view", "application-view");
  }
}

onMounted(() => {
  if (iframeRef.value) {
    registerIframe(id, iframeRef.value.iframe);
  }
  addMessageHandler(onMessage, id); // scoped to this iframe only
});

onUnmounted(() => {
  unregisterIframe(id);
  removeMessageHandler(onMessage);
});
</script>
