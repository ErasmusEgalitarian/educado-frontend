import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "aqx4gb",
  fixturesFolder: 'cypress/fixtures',
  supportFolder: 'cypress/support',
  e2e: {
    supportFile: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3000",
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
