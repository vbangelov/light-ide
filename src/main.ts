import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { setupRpc } from "./rpc/utils";
import { getWorkspaceId, getWorkspaceBaseUrl } from "./utils/env-utils";

import "@ui5/webcomponents/dist/Avatar.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/SegmentedButton.js";
import "@ui5/webcomponents/dist/SegmentedButtonItem.js";
import "@ui5/webcomponents-fiori/dist/ShellBar.js";
import "@ui5/webcomponents-fiori/dist/ShellBarSpacer.js";

import "@ui5/webcomponents-icons/dist/customer.js";

function setupUrls(): void {
  const iframeUrl = window.location.href;
  console.log("Iframe URL:", iframeUrl);
  const h2oUrl = import.meta.env.VITE_H2O_URL;
  const workspaceId = getWorkspaceId(iframeUrl);
  const workspaceBaseUrl = getWorkspaceBaseUrl(iframeUrl);

  console.log("Workspace ID:", workspaceId);
  console.log("Workspace Base URL:", workspaceBaseUrl);
  console.log("H2O URL:", h2oUrl);

  (window as any).WORKSPACE_ID = workspaceId;
  (window as any).WORKSPACE_BASE_URL = workspaceBaseUrl;
  (window as any).H2O_URL = h2oUrl;
}

async function start(): Promise<void> {
  const app = createApp(App);
  app.use(router);
  router.isReady().then(async () => {
    await setupRpc(window);
    app.mount("#app");
    setupUrls();
  });
}

start();
