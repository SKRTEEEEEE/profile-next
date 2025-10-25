# Mejorar test
## Objetivo
Aconseguir un mejor test. Actualmente el test de CI no pasa (.github) y tambien he relajado el coverage de nyc del test ya que no llegava al 80%
## Key points
- [ ] Añadir la obligación de usar standard commits en pre-commit (`commit-msg`)
- [ ] Mejorar los test para que pasen en github tambien, acualmente tienen el fallo descrito en el punto [fallo actual github](#fallo-actual-github)
  - Creo que no es necesario mirar mode-toggle, este componente actualmente no se renderiza en ninguna pagina realmente
  - Lo extraño esque estos test en local pasan
- [ ] Mejorar los test para que llegen al 80% en todos los casos


### Fallo actual github
```bash
  ✓  125 [api] › tests/api/tech.spec.ts:85:7 › Tech API Endpoints › GET /tech/full - should return full tech data (276ms)
Testing URL: http://localhost:3000
  ✓  126 [api] › tests/api/tech.spec.ts:101:7 › Tech API Endpoints › GET /tech/flatten - response should contain correct tech properties (347ms)
  ✓  128 [api] › tests/api/tech.spec.ts:119:7 › Tech API Endpoints › GET /tech endpoints - should be fast (< 2s) (817ms)
Performance metrics: { loadTime: 820, LCP: 0, CLS: 0, FID: 0 }
JS Coverage total: 83.79%
  ✓  127 [e2e] › tests/e2e/performance/index.spec.ts:66:7 › Next.js Performance + JS Coverage › Home page metrics and coverage (6.2s)


  1) [component] › tests/component/mode-toggle.spec.ts:5:7 › ModeToggle Component Performance › should render and interact efficiently 

    Error: expect(locator).toBeVisible() failed

    Locator:  locator('button[aria-haspopup="menu"]').first()
    Expected: visible
    Received: <element(s) not found>
    Timeout:  10000ms

    Call log:
      - Expect "toBeVisible" with timeout 10000ms
      - waiting for locator('button[aria-haspopup="menu"]').first()


      12 |     // Measure initial render time
      13 |     const startTime = Date.now();
    > 14 |     await expect(themeToggle).toBeVisible({ timeout: 10000 });
         |                               ^
      15 |     const renderTime = Date.now() - startTime;
      16 |     
      17 |     console.log(`ModeToggle render time: ${renderTime}ms`);
        at /home/runner/work/profile-next/profile-next/tests/component/mode-toggle.spec.ts:14:31

    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
    docs/test-results/artifacts/component-mode-toggle-Mode-d8b62-er-and-interact-efficiently-component/test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: docs/test-results/artifacts/component-mode-toggle-Mode-d8b62-er-and-interact-efficiently-component/error-context.md

    attachment #3: trace (application/zip) ─────────────────────────────────────────────────────────
    docs/test-results/artifacts/component-mode-toggle-Mode-d8b62-er-and-interact-efficiently-component/trace.zip
    Usage:

        npx playwright show-trace docs/test-results/artifacts/component-mode-toggle-Mode-d8b62-er-and-interact-efficiently-component/trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────

    Retry #1 ───────────────────────────────────────────────────────────────────────────────────────

    Error: expect(locator).toBeVisible() failed

    Locator:  locator('button[aria-haspopup="menu"]').first()
    Expected: visible
    Received: <element(s) not found>
    Timeout:  10000ms

    Call log:
      - Expect "toBeVisible" with timeout 10000ms
      - waiting for locator('button[aria-haspopup="menu"]').first()


      12 |     // Measure initial render time
      13 |     const startTime = Date.now();
    > 14 |     await expect(themeToggle).toBeVisible({ timeout: 10000 });
         |                               ^
      15 |     const renderTime = Date.now() - startTime;
      16 |     
      17 |     console.log(`ModeToggle render time: ${renderTime}ms`);
        at /home/runner/work/profile-next/profile-next/tests/component/mode-toggle.spec.ts:14:31

    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
    docs/test-results/artifacts/component-mode-toggle-Mode-d8b62-er-and-interact-efficiently-component-retry1/test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: docs/test-results/artifacts/component-mode-toggle-Mode-d8b62-er-and-interact-efficiently-component-retry1/error-context.md

    attachment #3: trace (application/zip) ─────────────────────────────────────────────────────────
    docs/test-results/artifacts/component-mode-toggle-Mode-d8b62-er-and-interact-efficiently-component-retry1/trace.zip
    Usage:

        npx playwright show-trace docs/test-results/artifacts/component-mode-toggle-Mode-d8b62-er-and-interact-efficiently-component-retry1/trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────

    Retry #2 ───────────────────────────────────────────────────────────────────────────────────────

    Error: expect(locator).toBeVisible() failed

    Locator:  locator('button[aria-haspopup="menu"]').first()
    Expected: visible
    Received: <element(s) not found>
    Timeout:  10000ms

    Call log:
      - Expect "toBeVisible" with timeout 10000ms
      - waiting for locator('button[aria-haspopup="menu"]').first()


      12 |     // Measure initial render time
      13 |     const startTime = Date.now();
    > 14 |     await expect(themeToggle).toBeVisible({ timeout: 10000 });
         |                               ^
      15 |     const renderTime = Date.now() - startTime;
      16 |     
      17 |     console.log(`ModeToggle render time: ${renderTime}ms`);
        at /home/runner/work/profile-next/profile-next/tests/component/mode-toggle.spec.ts:14:31

    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
    docs/test-results/artifacts/component-mode-toggle-Mode-d8b62-er-and-interact-efficiently-component-retry2/test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: docs/test-results/artifacts/component-mode-toggle-Mode-d8b62-er-and-interact-efficiently-component-retry2/error-context.md

    attachment #3: trace (application/zip) ─────────────────────────────────────────────────────────
    docs/test-results/artifacts/component-mode-toggle-Mode-d8b62-er-and-interact-efficiently-component-retry2/trace.zip
    Usage:

        npx playwright show-trace docs/test-results/artifacts/component-mode-toggle-Mode-d8b62-er-and-interact-efficiently-component-retry2/trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────

  2) [component] › tests/component/mode-toggle.spec.ts:52:7 › ModeToggle Component Performance › should switch themes without performance degradation 

    TimeoutError: locator.click: Timeout 10000ms exceeded.
    Call log:
      - waiting for locator('button[aria-haspopup="menu"]').first()


      57 |     
      58 |     // Test theme switching performance
    > 59 |     await themeToggle.click({ timeout: 10000 });
         |                       ^
      60 |     
      61 |     // Try to wait for menu
      62 |     try {
        at /home/runner/work/profile-next/profile-next/tests/component/mode-toggle.spec.ts:59:23

    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
    docs/test-results/artifacts/component-mode-toggle-Mode-44070-out-performance-degradation-component/test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: docs/test-results/artifacts/component-mode-toggle-Mode-44070-out-performance-degradation-component/error-context.md

    attachment #3: trace (application/zip) ─────────────────────────────────────────────────────────
    docs/test-results/artifacts/component-mode-toggle-Mode-44070-out-performance-degradation-component/trace.zip
    Usage:

        npx playwright show-trace docs/test-results/artifacts/component-mode-toggle-Mode-44070-out-performance-degradation-component/trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────

    Retry #1 ───────────────────────────────────────────────────────────────────────────────────────

    TimeoutError: locator.click: Timeout 10000ms exceeded.
    Call log:
      - waiting for locator('button[aria-haspopup="menu"]').first()


      57 |     
      58 |     // Test theme switching performance
    > 59 |     await themeToggle.click({ timeout: 10000 });
         |                       ^
      60 |     
      61 |     // Try to wait for menu
      62 |     try {
        at /home/runner/work/profile-next/profile-next/tests/component/mode-toggle.spec.ts:59:23

    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
    docs/test-results/artifacts/component-mode-toggle-Mode-44070-out-performance-degradation-component-retry1/test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: docs/test-results/artifacts/component-mode-toggle-Mode-44070-out-performance-degradation-component-retry1/error-context.md

    attachment #3: trace (application/zip) ─────────────────────────────────────────────────────────
    docs/test-results/artifacts/component-mode-toggle-Mode-44070-out-performance-degradation-component-retry1/trace.zip
    Usage:

        npx playwright show-trace docs/test-results/artifacts/component-mode-toggle-Mode-44070-out-performance-degradation-component-retry1/trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────

    Retry #2 ───────────────────────────────────────────────────────────────────────────────────────

    TimeoutError: locator.click: Timeout 10000ms exceeded.
    Call log:
      - waiting for locator('button[aria-haspopup="menu"]').first()


      57 |     
      58 |     // Test theme switching performance
    > 59 |     await themeToggle.click({ timeout: 10000 });
         |                       ^
      60 |     
      61 |     // Try to wait for menu
      62 |     try {
        at /home/runner/work/profile-next/profile-next/tests/component/mode-toggle.spec.ts:59:23

    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
    docs/test-results/artifacts/component-mode-toggle-Mode-44070-out-performance-degradation-component-retry2/test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: docs/test-results/artifacts/component-mode-toggle-Mode-44070-out-performance-degradation-component-retry2/error-context.md

    attachment #3: trace (application/zip) ─────────────────────────────────────────────────────────
    docs/test-results/artifacts/component-mode-toggle-Mode-44070-out-performance-degradation-component-retry2/trace.zip
    Usage:

        npx playwright show-trace docs/test-results/artifacts/component-mode-toggle-Mode-44070-out-performance-degradation-component-retry2/trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────

  3) [component] › tests/component/performance-report.spec.ts:55:7 › Component Performance Report Generation › Measure ModeToggle component performance 

    Error: expect(locator).toBeVisible() failed

    Locator:  locator('button[aria-haspopup="menu"]').first()
    Expected: visible
    Received: <element(s) not found>
    Timeout:  5000ms

    Call log:
      - Expect "toBeVisible" with timeout 5000ms
      - waiting for locator('button[aria-haspopup="menu"]').first()


      58 |     const startTime = Date.now();
      59 |     const themeToggle = page.locator('button[aria-haspopup="menu"]').first();
    > 60 |     await expect(themeToggle).toBeVisible();
         |                               ^
      61 |     const renderTime = Date.now() - startTime;
      62 |
      63 |     const interactionStart = Date.now();
        at /home/runner/work/profile-next/profile-next/tests/component/performance-report.spec.ts:60:31

    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
    docs/test-results/artifacts/component-performance-repo-b6d0d-oggle-component-performance-component/test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: docs/test-results/artifacts/component-performance-repo-b6d0d-oggle-component-performance-component/error-context.md

    attachment #3: trace (application/zip) ─────────────────────────────────────────────────────────
    docs/test-results/artifacts/component-performance-repo-b6d0d-oggle-component-performance-component/trace.zip
    Usage:

        npx playwright show-trace docs/test-results/artifacts/component-performance-repo-b6d0d-oggle-component-performance-component/trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────

    Retry #1 ───────────────────────────────────────────────────────────────────────────────────────

    Error: expect(locator).toBeVisible() failed

    Locator:  locator('button[aria-haspopup="menu"]').first()
    Expected: visible
    Received: <element(s) not found>
    Timeout:  5000ms

    Call log:
      - Expect "toBeVisible" with timeout 5000ms
      - waiting for locator('button[aria-haspopup="menu"]').first()


      58 |     const startTime = Date.now();
      59 |     const themeToggle = page.locator('button[aria-haspopup="menu"]').first();
    > 60 |     await expect(themeToggle).toBeVisible();
         |                               ^
      61 |     const renderTime = Date.now() - startTime;
      62 |
      63 |     const interactionStart = Date.now();
        at /home/runner/work/profile-next/profile-next/tests/component/performance-report.spec.ts:60:31

    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
    docs/test-results/artifacts/component-performance-repo-b6d0d-oggle-component-performance-component-retry1/test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: docs/test-results/artifacts/component-performance-repo-b6d0d-oggle-component-performance-component-retry1/error-context.md

    attachment #3: trace (application/zip) ─────────────────────────────────────────────────────────
    docs/test-results/artifacts/component-performance-repo-b6d0d-oggle-component-performance-component-retry1/trace.zip
    Usage:

        npx playwright show-trace docs/test-results/artifacts/component-performance-repo-b6d0d-oggle-component-performance-component-retry1/trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────

    Retry #2 ───────────────────────────────────────────────────────────────────────────────────────

    Error: expect(locator).toBeVisible() failed

    Locator:  locator('button[aria-haspopup="menu"]').first()
    Expected: visible
    Received: <element(s) not found>
    Timeout:  5000ms

    Call log:
      - Expect "toBeVisible" with timeout 5000ms
      - waiting for locator('button[aria-haspopup="menu"]').first()


      58 |     const startTime = Date.now();
      59 |     const themeToggle = page.locator('button[aria-haspopup="menu"]').first();
    > 60 |     await expect(themeToggle).toBeVisible();
         |                               ^
      61 |     const renderTime = Date.now() - startTime;
      62 |
      63 |     const interactionStart = Date.now();
        at /home/runner/work/profile-next/profile-next/tests/component/performance-report.spec.ts:60:31

    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
    docs/test-results/artifacts/component-performance-repo-b6d0d-oggle-component-performance-component-retry2/test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: docs/test-results/artifacts/component-performance-repo-b6d0d-oggle-component-performance-component-retry2/error-context.md

    attachment #3: trace (application/zip) ─────────────────────────────────────────────────────────
    docs/test-results/artifacts/component-performance-repo-b6d0d-oggle-component-performance-component-retry2/trace.zip
    Usage:

        npx playwright show-trace docs/test-results/artifacts/component-performance-repo-b6d0d-oggle-component-performance-component-retry2/trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────

  4) [integration] › tests/integration/pages/proyectos-id.spec.ts:56:7 › Project Detail Page - /proyectos/[id] › should display tech sections when available 

    Error: expect.toBeVisible: Error: strict mode violation: locator('section') resolved to 2 elements:
        1) <section tabindex="-1" aria-live="polite" aria-atomic="false" aria-relevant="additions text" aria-label="Notifications alt+T"></section> aka getByRole('region', { name: 'Notifications alt+T' })
        2) <section class="">…</section> aka locator('section').filter({ hasText: 'FrontendNext.js Next.js v15' })

    Call log:
      - Expect "toBeVisible" with timeout 5000ms
      - waiting for locator('section')


      69 |       // Tech sections should be visible if project has techs
      70 |       const section = page.locator("section");
    > 71 |       await expect(section).toBeVisible();
         |                             ^
      72 |     }
      73 |   });
      74 |
        at /home/runner/work/profile-next/profile-next/tests/integration/pages/proyectos-id.spec.ts:71:29

    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
    docs/test-results/artifacts/integration-pages-proyecto-e4bc9-ech-sections-when-available-integration/test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: docs/test-results/artifacts/integration-pages-proyecto-e4bc9-ech-sections-when-available-integration/error-context.md

    attachment #3: trace (application/zip) ─────────────────────────────────────────────────────────
    docs/test-results/artifacts/integration-pages-proyecto-e4bc9-ech-sections-when-available-integration/trace.zip
    Usage:

        npx playwright show-trace docs/test-results/artifacts/integration-pages-proyecto-e4bc9-ech-sections-when-available-integration/trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────

    Retry #1 ───────────────────────────────────────────────────────────────────────────────────────

    Error: expect.toBeVisible: Error: strict mode violation: locator('section') resolved to 2 elements:
        1) <section tabindex="-1" aria-live="polite" aria-atomic="false" aria-relevant="additions text" aria-label="Notifications alt+T"></section> aka getByRole('region', { name: 'Notifications alt+T' })
        2) <section class="">…</section> aka locator('section').filter({ hasText: 'FrontendNext.js Next.js v15' })

    Call log:
      - Expect "toBeVisible" with timeout 5000ms
      - waiting for locator('section')


      69 |       // Tech sections should be visible if project has techs
      70 |       const section = page.locator("section");
    > 71 |       await expect(section).toBeVisible();
         |                             ^
      72 |     }
      73 |   });
      74 |
        at /home/runner/work/profile-next/profile-next/tests/integration/pages/proyectos-id.spec.ts:71:29

    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
    docs/test-results/artifacts/integration-pages-proyecto-e4bc9-ech-sections-when-available-integration-retry1/test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: docs/test-results/artifacts/integration-pages-proyecto-e4bc9-ech-sections-when-available-integration-retry1/error-context.md

    attachment #3: trace (application/zip) ─────────────────────────────────────────────────────────
    docs/test-results/artifacts/integration-pages-proyecto-e4bc9-ech-sections-when-available-integration-retry1/trace.zip
    Usage:

        npx playwright show-trace docs/test-results/artifacts/integration-pages-proyecto-e4bc9-ech-sections-when-available-integration-retry1/trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────

    Retry #2 ───────────────────────────────────────────────────────────────────────────────────────

    Error: expect.toBeVisible: Error: strict mode violation: locator('section') resolved to 2 elements:
        1) <section tabindex="-1" aria-live="polite" aria-atomic="false" aria-relevant="additions text" aria-label="Notifications alt+T"></section> aka getByRole('region', { name: 'Notifications alt+T' })
        2) <section class="">…</section> aka locator('section').filter({ hasText: 'FrontendNext.js Next.js v15' })

    Call log:
      - Expect "toBeVisible" with timeout 5000ms
      - waiting for locator('section')


      69 |       // Tech sections should be visible if project has techs
      70 |       const section = page.locator("section");
    > 71 |       await expect(section).toBeVisible();
         |                             ^
      72 |     }
      73 |   });
      74 |
        at /home/runner/work/profile-next/profile-next/tests/integration/pages/proyectos-id.spec.ts:71:29

    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
    docs/test-results/artifacts/integration-pages-proyecto-e4bc9-ech-sections-when-available-integration-retry2/test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: docs/test-results/artifacts/integration-pages-proyecto-e4bc9-ech-sections-when-available-integration-retry2/error-context.md

    attachment #3: trace (application/zip) ─────────────────────────────────────────────────────────
    docs/test-results/artifacts/integration-pages-proyecto-e4bc9-ech-sections-when-available-integration-retry2/trace.zip
    Usage:

        npx playwright show-trace docs/test-results/artifacts/integration-pages-proyecto-e4bc9-ech-sections-when-available-integration-retry2/trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────

  4 failed
    [component] › tests/component/mode-toggle.spec.ts:5:7 › ModeToggle Component Performance › should render and interact efficiently 
    [component] › tests/component/mode-toggle.spec.ts:52:7 › ModeToggle Component Performance › should switch themes without performance degradation 
    [component] › tests/component/performance-report.spec.ts:55:7 › Component Performance Report Generation › Measure ModeToggle component performance 
    [integration] › tests/integration/pages/proyectos-id.spec.ts:56:7 › Project Detail Page - /proyectos/[id] › should display tech sections when available 
  116 passed (2.1m)
---------------------------|---------|----------|---------|---------|-------------------
File                       | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
---------------------------|---------|----------|---------|---------|-------------------
All files                  |   69.69 |       50 |      90 |   73.33 |                   
 src                       |       0 |      100 |     100 |       0 |                   
  middleware.ts            |       0 |      100 |     100 |       0 | 5-9               
 src/components/portafolio |       0 |      100 |     100 |       0 |                   
  projects-hardcdd.ts      |       0 |      100 |     100 |       0 | 1-248             
 src/core                  |     100 |      100 |     100 |     100 |                   
  utils.ts                 |     100 |      100 |     100 |     100 |                   
 src/lib                   |      84 |       50 |    87.5 |    90.9 |                   
  data.ts                  |       0 |      100 |     100 |       0 | 6-16              
  utils.ts                 |    91.3 |       50 |    87.5 |     100 | 33                
---------------------------|---------|----------|---------|---------|-------------------
Error: Process completed with exit code 1.
4s
0s

```