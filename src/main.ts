import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { setupRpc } from "./rpc/utils";

import "@ui5/webcomponents/dist/Avatar.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/SegmentedButton.js";
import "@ui5/webcomponents/dist/SegmentedButtonItem.js";
import "@ui5/webcomponents-fiori/dist/ShellBar.js";
import "@ui5/webcomponents-fiori/dist/ShellBarSpacer.js";

import "@ui5/webcomponents-icons/dist/customer.js";
import "@ui5/webcomponents-icons/dist/direction-arrows.js";

async function start(): Promise<void> {
  const app = createApp(App);
  app.use(router);
  router.isReady().then(async () => {
    await setupRpc(window);
    app.mount("#app");
  });
}

start();
