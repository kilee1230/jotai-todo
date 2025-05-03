import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./setupTests.ts",
    exclude: ["**/node_modules/**", "**/dist/**"],
    coverage: {
      exclude: [
        "./src/App.tsx",
        "./src/main.tsx",
        "./dist/**",
        "**.config.**",
        "./src/vite-env.d.ts",
        "./src/atoms/**",
      ],
    },
  },
});
