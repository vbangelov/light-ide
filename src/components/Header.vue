<template>
  <ui5-shellbar :primary-title="title">
    <img slot="logo" src="https://sap.github.io/ui5-webcomponents/images/sap-logo-svg.svg" />
    <template v-if="showActionButtons">
      <ui5-segmented-button slot="content" accessible-name="Font style">
        <ui5-segmented-button-item selected @click="toggleMainView('preview')">Preview</ui5-segmented-button-item>
        <ui5-segmented-button-item @click="toggleMainView('overview')">Overview</ui5-segmented-button-item>
      </ui5-segmented-button>
      <ui5-shellbar-spacer slot="content"></ui5-shellbar-spacer>
      <ui5-button slot="content" tooltip="Open BAS" @click="openExternal('bas')">Open BAS</ui5-button>
      <ui5-button slot="content" tooltip="Open Hybrid mode" @click="openExternal('hybrid')">Open Hybrid</ui5-button>
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

function openExternal(mode: "bas" | "hybrid") {
  const h2oUrl = (window as any).H2O_URL;
  const workspaceId = (window as any).WORKSPACE_ID;

  if (!h2oUrl || !workspaceId) {
    console.warn("Missing H2O_URL or WORKSPACE_ID");
    return;
  }

  if (mode === "bas") {
    const url = `${h2oUrl}/index.html#${workspaceId}?folder=/home/user/projects`;
    window.open(url, "_blank");
  } else if (mode === "hybrid") {
    const hostname = new URL(h2oUrl).hostname;
    const uri = `vscode://SAPOSS.app-studio-toolkit/open?landscape=${hostname}&devspaceid=${workspaceId}&folderpath=/home/user/projects`;
    window.open(uri, "_blank");
  }
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
  color: #0064d9;
  border: 1px solid #0064d9;
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
