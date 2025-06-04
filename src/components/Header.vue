<template>
  <ui5-shellbar :primary-title="title">
    <img slot="logo" src="https://sap.github.io/ui5-webcomponents/images/sap-logo-svg.svg" />
    <template v-if="showActionButtons">
      <ui5-segmented-button slot="content" accessible-name="Font style">
        <ui5-segmented-button-item selected @click="toggleMainView('preview')">Preview</ui5-segmented-button-item>
        <ui5-segmented-button-item @click="toggleMainView('overview')">Overview</ui5-segmented-button-item>
      </ui5-segmented-button>
      <ui5-shellbar-spacer slot="content"></ui5-shellbar-spacer>
      <ui5-button slot="content" icon="direction-arrows" tooltip="Go to IDE View" @click="changeView('ide-view')"
        >IDE View</ui5-button
      >
    </template>
    <ui5-avatar slot="profile" icon="customer"></ui5-avatar>
  </ui5-shellbar>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{ activeView: string }>();
const emit = defineEmits(["change-view", "toggle-view"]);

const title = computed(() => {
  switch (props.activeView) {
    case "home-view":
      return "Build";
    default:
      return "App-Builder";
  }
});
const showActionButtons = computed(() => {
  return props.activeView !== "home-view" && props.activeView !== "chat-view";
});

function changeView(view: string) {
  emit("change-view", view);
}
function toggleMainView(view: string) {
  emit("toggle-view", view);
}
</script>
<style scoped>
.action-buttons-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-left: 1rem;
}

ui5-button::part(button) {
  border-radius: 999px;
  padding: 0.5rem 1rem;
  font-weight: 500;
  color: #6200ee; /* Adjust to match your primary color */
  border: 1px solid #8a2be2;
}
ui5-button:focus {
  outline: none;
  box-shadow: none;
}

ui5-segmented-button::part(root) {
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  color: #6200ee;
}
ui5-shellbar-spacer {
  display: none !important;
}
</style>
