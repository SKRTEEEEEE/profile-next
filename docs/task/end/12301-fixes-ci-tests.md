# Fixes para Tests en CI - Issue #12301

## Problema

Los tests estaban fallando consistentemente en GitHub Actions CI pero pasaban localmente. Los fallos eran:

1. **Test de proyectos-id.spec.ts**: `should display tech sections when available`
   - Error: Seleccionaba una sección de notificaciones oculta (`aria-label="Notifications alt+T"`)
   - Fallaba con timeout esperando visibilidad

2. **Test de info.spec.ts**: `page should be responsive on desktop`
   - Error: El elemento `<main>` no era visible
   - Test flaky que a veces pasaba

## Causa Raíz

1. **Race conditions en CI**: El entorno CI es más lento que local
2. **Selectores demasiado genéricos**: `page.locator("section").first()` seleccionaba elementos incorrectos
3. **Timeouts insuficientes**: 5000ms no era suficiente en CI
4. **Falta de wait for server**: El workflow no esperaba a que el servidor estuviera listo

## Soluciones Implementadas

### 1. Mejora de Selectores (proyectos-id.spec.ts)

**Antes:**
```typescript
const section = page.locator("section").first();
await expect(section).toBeVisible();
```

**Después:**
```typescript
const section = page.locator("main section, article section")
  .filter({ hasNotText: /Notifications|alt\+T/i })
  .first();
await expect(section).toBeVisible({ timeout: 10000 });
```

**Beneficios:**
- Solo busca secciones dentro de `<main>` o `<article>`
- Filtra explícitamente secciones de notificaciones
- Timeout más largo (10s) para CI

### 2. Mejora de Waits (info.spec.ts)

**Antes:**
```typescript
const mainContent = page.locator('main').first();
await expect(mainContent).toBeVisible();
```

**Después:**
```typescript
await page.waitForLoadState('networkidle');
await page.waitForTimeout(1000); // Extra buffer for CI

const mainContent = page.locator('main').first();
await expect(mainContent).toBeVisible({ timeout: 10000 });
```

**Beneficios:**
- Espera a que la red esté inactiva
- Buffer adicional de 1s para CI
- Timeout extendido

### 3. Configuración de Playwright Mejorada

**playwright.config.ts:**
```typescript
export default defineConfig({
  retries: process.env.CI ? 3 : 2, // More retries in CI
  
  expect: {
    timeout: process.env.CI ? 10000 : 5000, // Longer timeout in CI
  },
  // ...
});
```

**Beneficios:**
- 3 reintentos en CI vs 2 localmente
- Timeouts automáticos más largos en CI (10s vs 5s)

### 4. GitHub Actions Workflow Mejorado

**Cambios en `.github/workflows/playwright.yml`:**

```yaml
# Wait for server to be ready
- name: Wait for server
  run: npx wait-on http://localhost:3000 --timeout 60000

# Run Playwright tests with coverage
- name: Run Playwright tests
  run: npm run test:coverage
  continue-on-error: false
  env:
    CI: true
```

**Beneficios:**
- Espera hasta 60s a que el servidor esté listo
- Variable de entorno `CI=true` para detectar CI
- Dependencia `wait-on` agregada al proyecto

### 5. Dependencias Agregadas

```bash
npm install --save-dev wait-on
```

## Resultados Esperados

### Antes:
```
✘ 127 [integration] should display tech sections when available (retry #2)
  Error: expect(locator).toBeVisible() failed
  Locator: locator('section').first()
  Received: <section aria-label="Notifications alt+T"></section> (hidden)

1 flaky [pages] page should be responsive on desktop
  Error: expect(locator).toBeVisible() failed
  Locator: locator('main').first()
  Received: <element(s) not found>
```

### Después:
- Tests más estables en CI
- Selectores más específicos y robustos
- Menos falsos positivos por race conditions
- Mejor handling de timeouts en entornos lentos

## Coverage Mantenido

El coverage total de JS se mantiene en **83.80%** o superior:

```
-----------|---------|----------|---------|---------|-------------------
File       | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------|---------|----------|---------|---------|-------------------
All files  |   92.59 |       50 |      90 |     100 |                   
 core      |     100 |      100 |     100 |     100 |                   
  utils.ts |     100 |      100 |     100 |     100 |                   
 lib       |      92 |       50 |    87.5 |     100 |                   
  data.ts  |     100 |      100 |     100 |     100 |                   
  utils.ts |    91.3 |       50 |    87.5 |     100 | 33                
-----------|---------|----------|---------|---------|-------------------
```

## Recomendaciones Futuras

1. **Considerar Page Object Model**: Para tests más complejos
2. **Agregar data-testid**: Para selectores más confiables
3. **Mock de APIs en tests de integración**: Para mayor control
4. **Test parallelization**: Configurar workers apropiadamente

## Referencias

- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [CI Optimization](https://playwright.dev/docs/ci)
- Issue: #12301
- Branch: `agent666/12301-mejorar-test`
