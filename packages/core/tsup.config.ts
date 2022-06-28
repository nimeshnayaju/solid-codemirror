import { defineConfig } from "tsup";
import { solidPlugin } from "esbuild-plugin-solid";

export default defineConfig({
  entryPoints: ["src/index.ts"],
  outDir: "dist",
  format: ["esm", "cjs"],
  tsconfig: "./tsconfig.json",
  target: "es2018",
  minify: false,
  minifySyntax: true,
  minifyWhitespace: false,
  minifyIdentifiers: true,
  clean: true,
  dts: true,
  esbuildPlugins: [solidPlugin()],
});
