import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./setupTests.ts",
    exclude: ["./src/App.tsx", "./src/main.tsx", "**/node_modules/**"],
  },
});
