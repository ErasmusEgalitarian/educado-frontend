import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "aqx4gb",
  fixturesFolder: 'cypress/fixtures',
  supportFolder: 'cypress/support',
  e2e: {
    supportFile: false,
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
