<template>
  <div
    :class="{
      'iframe-container': true,
      'iframe-container-mint': isMintStyle,
    }"
  >
    <IFrameHost ref="iframeRef" :src="src" />
  </div>
</template>

<script setup lang="ts">
import IFrameHost from "../components/IFrameHost.vue";
import { onMounted, onUnmounted, ref } from "vue";
import { useIframeManager } from "../composables/useIframeManager.ts";

const id = "chat-iframe";
const src = "src/assets/dummy-chat-iframe.html";
const emit = defineEmits(["change-view"]);

const iframeRef = ref<InstanceType<typeof IFrameHost>>();
const isMintStyle = ref(false);
const { registerIframe, unregisterIframe, addMessageHandler, removeMessageHandler } = useIframeManager();

function onMessage(data: any) {
  // example message handler to handle messages from the iframe
  if (data?.action === "application-view") {
    emit("change-view", "application-view");
  }
  if (data?.action === "change-style") {
    isMintStyle.value = true;
  }
}

onMounted(() => {
  if (iframeRef.value) {
    registerIframe(id, iframeRef.value.iframe);
  }
  addMessageHandler(onMessage, id); // scoped to this iframe only
  addMessageHandler(onMessage, "application-iframe");
});

onUnmounted(() => {
  unregisterIframe(id);
  removeMessageHandler(onMessage);
  removeMessageHandler(onMessage, "application-iframe");
});
</script>
