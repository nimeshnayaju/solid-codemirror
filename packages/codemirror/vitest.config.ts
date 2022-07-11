import { defineConfig } from "vitest/config";
import solid from "vite-plugin-solid";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    transformMode: {
      web: [/.[jt]sx?/],
    },
    setupFiles: "./setupVitest.ts",
    deps: {
      inline: [/solid-js/],
    },
    threads: false,
    isolate: false,
  },
  plugins: [solid()],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
  },
  resolve: {
    conditions: ["development", "browser"],
  },
});
