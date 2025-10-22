import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',          // Carpeta donde están tus tests
  testMatch: '*.spec.ts',      // Patrón de archivos
  timeout: 30000,              // Timeout por test
  retries: 2,                  // Reintentos si falla
  outputDir: "docs/test-results",
  use: {
    baseURL: 'http://localhost:3000',  // Base URL para los tests
    headless: true,            // Ejecutar en headless
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
