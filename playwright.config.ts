import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: '*.spec.ts',
  timeout: 90000,
  retries: process.env.CI ? 2 : 1,
  outputDir: "docs/test-results/artifacts",
  fullyParallel: true,
  
  // Global expect timeout
  expect: {
    timeout: 10000,
  },
  
  // Automatic server management
  webServer: {
    command: process.env.CI ? 'npm run dev' : 'npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 120000,
    stdout: 'pipe',
    stderr: 'pipe',
  },
  
  // Configure projects for different test types
  projects: [
    {
      name: 'pw:unit',
      testMatch: /tests\/unit\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'pw:api',
      testMatch: /tests\/api\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'pw:component',
      testMatch: /tests\/component\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:3000',
      },
    },
    {
      name: 'pw:pages',
      testMatch: /tests\/pages\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:3000',
      },
    },
    {
      name: 'pw:integration',
      testMatch: /tests\/integration\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:3000',
      },
    },
    {
      name: 'pw:e2e',
      testMatch: /tests\/e2e\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:3000',
      },
    },
  ],
  
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  
  // Reporter configuration
  reporter: [
    ['list'],
    ['html', { outputFolder: 'docs/test-results/html-report', open: 'never' }],
    ['json', { outputFile: 'docs/test-results/test-results.json' }],
  ],
});
