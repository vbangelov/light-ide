import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith("ui5-"),
        },
      },
    }),
  ],
  test: {
    environment: "jsdom",
    globals: true,
  },
});
