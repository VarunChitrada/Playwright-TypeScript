import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  timeout: 30 * 1000,
    expect: {
        /**
         * Maximum time expect() should wait for the condition to be met.
         * For example in `await expect(locator).toHaveText();`
         */
        timeout: 10000,
    },
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['dot'],
    ['json', { outputFile: 'test-result.json' }],
    ['html', { outputFolder: 'html-report', open: 'never' }],
    ['junit', { outputFile: 'results.xml' }],
    ['line'],
    ['allure-playwright', { detail: true, outputFolder: './allure-results', suiteTitle: false }],
],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    viewport: null, // This option will ensure that the viewport uses the entire screen
    headless: process.env.CI ? true : false,
    screenshot: 'on',
    video: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { 
        baseURL: process.env.ENVIRONMENT !== undefined
        ? `https://www.${process.env.ENVIRONMENT}-jdoodle.com/online-java-compiler`
        : 'https://www.jdoodle.com/online-java-compiler',
        ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { baseURL: process.env.ENVIRONMENT !== undefined
        ? `https://www.${process.env.ENVIRONMENT}-jdoodle.com/online-java-compiler`
        : 'https://www.jdoodle.com/online-java-compiler',
        ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { baseURL: process.env.ENVIRONMENT !== undefined
        ? `https://www.${process.env.ENVIRONMENT}-jdoodle.com/online-java-compiler`
        : 'https://www.jdoodle.com/online-java-compiler',
        ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
