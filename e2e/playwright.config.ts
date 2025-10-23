import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: "./tests",
  reporter: "html",
  use: {
    headless: true,
    browserName: 'chromium',
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], channel: "chrome" },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
