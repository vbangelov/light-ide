<template>
  <div class="iframe-container iframe-container-lavender-gray">
    <IFrameHost ref="iframeRef" :src="src" />
  </div>
</template>

<script setup lang="ts">
import IFrameHost from "../components/IFrameHost.vue";
import { onMounted, onUnmounted, ref } from "vue";
import { useIframeManager } from "../composables/useIframeManager.ts";

const id = "application-overview-iframe";
const src = "src/assets/dummy-application-overview-iframe.html";

const iframeRef = ref<InstanceType<typeof IFrameHost>>();
const { registerIframe, unregisterIframe, addMessageHandler, removeMessageHandler } = useIframeManager();

function onMessage(data: any) {
  // TODO: add logic to handle messages from the iframe
}

onMounted(() => {
  if (iframeRef.value) {
    registerIframe(id, iframeRef.value.iframe);
  }
  addMessageHandler(onMessage, id);
});

onUnmounted(() => {
  unregisterIframe(id);
  removeMessageHandler(onMessage);
});
</script>
