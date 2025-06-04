import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // treat all tags with a ui5- as custom elements
          isCustomElement: (tag) => tag.includes("ui5-"),
        },
      },
    }),
    tailwindcss(),
  ],
  publicDir: "static",
  server: {
    host: true,
    port: 10123,
  },
  build: {
    chunkSizeWarningLimit: 700,
  },
});
