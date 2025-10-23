# 🧪 Testing Documentation

## Descripción General

Este proyecto utiliza **Playwright** como framework principal de testing, con soporte para tests unitarios, de componentes, de integración, E2E y de API. Los tests están organizados por tipo y requieren diferentes configuraciones según su categoría.

---

## 📁 Estructura de Tests

```
tests/
├── unit/                    # Tests unitarios (no requieren servidor)
│   ├── core-utils.spec.ts   # Tests para core/utils.ts
│   ├── lib-utils.spec.ts    # Tests para lib/utils.ts
│   ├── readme-validation.spec.ts  # Validación del README
│   ├── usecases/            # Tests de casos de uso
│   │   └── project.spec.ts
│   └── components/          # Tests unitarios de componentes
│       └── button.spec.ts
├── component/               # Tests de rendimiento de componentes (requieren servidor)
│   ├── mode-toggle.spec.ts
│   ├── navbar.spec.ts
│   ├── slider-techs.spec.ts
│   ├── ceo-components.spec.ts
│   ├── pages-performance.spec.ts
│   └── performance-report.spec.ts
├── pages/                   # Tests de páginas (requieren servidor)
│   ├── info.spec.ts
│   └── portafolio.spec.ts
├── integration/             # Tests de integración (requieren servidor)
│   └── usecases.spec.ts
├── api/                     # Tests de endpoints API (backend externo)
│   ├── tech.spec.ts
│   └── project.spec.ts
├── e2e/                     # Tests End-to-End (requieren servidor)
│   └── performance/
│       └── index.spec.ts
└── utils/                   # Utilidades para tests
    └── url.ts
```

---

## ⚙️ Configuración de Tests

### Proyectos de Test

Los tests están organizados en 6 proyectos diferentes en `playwright.config.ts`:

1. **unit** - Tests unitarios sin dependencias externas
2. **component** - Tests de componentes con servidor local
3. **pages** - Tests de páginas con servidor local
4. **integration** - Tests de integración con servidor local
5. **api** - Tests de API (backend externo)
6. **e2e** - Tests End-to-End con servidor local

### Variables de Entorno

- `TEST_ENV`: Entorno de testing (`development` o `production`)
  - **development**: Usa `http://localhost:3001` para API backend
  - **production**: Usa `https://kind-creation-production.up.railway.app` para API backend

---

## 🚀 Ejecutar Tests

### ⚠️ Prerequisitos IMPORTANTES

**Para la mayoría de tests (component, pages, integration, e2e), es OBLIGATORIO tener el servidor de desarrollo ejecutándose:**

```bash
npm run dev
```

El servidor debe estar corriendo en `http://localhost:3000`. Sin él, los tests de componentes, páginas, integración y E2E **FALLARÁN**.

### Ejecutar Todos los Tests

```bash
npm test
```

o con coverage:

```bash
npm run coverage
```

### Ejecutar Tests por Proyecto

#### 1. Tests Unitarios (NO requieren servidor)
```bash
npx playwright test --project=unit
```

✅ **No requiere servidor** - Estos tests son completamente independientes.

#### 2. Tests de Componentes (REQUIEREN servidor)
```bash
# Terminal 1: Servidor
npm run dev

# Terminal 2: Tests
npx playwright test --project=component
```

⚠️ **Requiere servidor en localhost:3000**

#### 3. Tests de Páginas (REQUIEREN servidor)
```bash
# Terminal 1: Servidor
npm run dev

# Terminal 2: Tests
npx playwright test --project=pages
```

⚠️ **Requiere servidor en localhost:3000**

#### 4. Tests de Integración (REQUIEREN servidor)
```bash
# Terminal 1: Servidor
npm run dev

# Terminal 2: Tests
npx playwright test --project=integration
```

⚠️ **Requiere servidor en localhost:3000**

#### 5. Tests de API (NO requieren servidor local)
```bash
npx playwright test --project=api
```

⚠️ **Requiere backend externo** - Por defecto apunta a Railway en producción o localhost:3001 en desarrollo.

#### 6. Tests E2E (REQUIEREN servidor)
```bash
# Terminal 1: Servidor
npm run dev

# Terminal 2: Tests
npx playwright test --project=e2e
```

⚠️ **Requiere servidor en localhost:3000**

### Tests en Modo Producción

```bash
npm run test:prod
```

Esto ejecuta los tests contra el backend de producción en Railway.

---

## 📊 Reportes de Tests

### Ubicación de Reportes

Los reportes se generan en:

```
docs/test-results/
├── html-report/                  # Reporte HTML interactivo
├── test-results.json             # Resultados en JSON
└── reports/
    └── component-performance-report.md  # Reporte de rendimiento
```

### Ver Reporte HTML

```bash
npx playwright show-report docs/test-results/html-report
```

### Reporte de Rendimiento

El archivo `component-performance-report.md` contiene:
- Análisis de tamaño de componentes
- Tiempos de renderizado
- Uso de memoria
- Recomendaciones de optimización

---

## 🎯 Categorías de Tests

### 1. Tests Unitarios ✅

**Propósito**: Verificar funciones y componentes aislados  
**Requiere Servidor**: ❌ NO

**Contenido**:
- **core/utils**: Funciones matemáticas (`double`, `triple`)
- **lib/utils**: 
  - Función `cn()` para merge de clases
  - Array de `gradients`
- **Button Component**: Renderizado básico e interacciones
- **README Validation**: Validación de estructura y contenido del README
- **Use Cases**: Validación de estructura de archivos

**Estado**: ✅ Todos pasando

### 2. Tests de Componentes ⚡

**Propósito**: Medir rendimiento de componentes  
**Requiere Servidor**: ✅ SÍ (`http://localhost:3000`)

**Métricas medidas**:
- Tiempo de renderizado
- Tiempo de interacción
- Tamaño de scripts
- Uso de memoria
- CLS (Cumulative Layout Shift)

**Componentes testeados**:
- **ModeToggle**: Rendimiento de cambio de tema
- **Navbar**: Renderizado y navegación
- **SliderTechs**: Rendimiento del carrusel Swiper
- **CoverParticles**: Efectos de partículas
- **LocalSwitcher**: Selector de idioma

**Umbrales esperados**:
- Tiempo de renderizado: < 1000ms
- Tiempo de interacción: < 500ms
- CLS: < 0.1

### 3. Tests de Páginas 🌐

**Propósito**: Verificar carga y funcionalidad de páginas completas  
**Requiere Servidor**: ✅ SÍ (`http://localhost:3000`)

**Páginas testeadas**:
- **Info/About**: Carga de habilidades y tech stack
- **Portafolio**: Visualización de proyectos

**Verificaciones**:
- Carga correcta de la página
- Presencia de elementos principales
- Responsive design (móvil/desktop)
- Manejo de errores de API

### 4. Tests de Integración 🔗

**Propósito**: Verificar interacción entre capas (use cases, repositorios, API)  
**Requiere Servidor**: ✅ SÍ (`http://localhost:3000`)

**Casos testeados**:
- **Project Use Cases**:
  - `readExampleProjectsUC`: Lectura de proyectos
  - `readProjectsDeployedUC`: Proyectos desplegados
  - Manejo de errores
- **Tech Use Cases**:
  - `ReadTechFlattenUseCase`: Lectura de techs
  - Manejo de datos vacíos/malformados
- **Repository Layer**:
  - Construcción de URLs
  - Manejo de diferentes tipos

### 5. Tests de API 🔌

**Propósito**: Validar endpoints del backend (profile-nest)  
**Requiere Servidor**: ⚠️ Backend en `localhost:3001` o Railway

**Endpoints testeados**:
- `GET /tech/db`: Techs desde base de datos
- `GET /tech/flatten`: Techs aplanadas
- `GET /tech/cat`: Techs categorizadas
- `GET /tech/full`: Datos completos de techs
- `GET /project`: Proyectos de ejemplo

**Verificaciones**:
- Status 200
- Estructura de respuesta correcta
- Propiedades requeridas
- Tiempo de respuesta < 2s

**⚠️ Nota**: Estos tests pueden fallar si el backend no está disponible.

### 6. Tests E2E 🎭

**Propósito**: Validar flujos completos de usuario  
**Requiere Servidor**: ✅ SÍ (`http://localhost:3000`)

**Métricas Core Web Vitals**:
- **LCP** (Largest Contentful Paint): < 2500ms
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

**Adicionales**:
- JavaScript coverage
- Tiempo de carga total
- Conteo de recursos
- Tamaño total de recursos

---

## 🐛 Troubleshooting

### Error: "ECONNREFUSED" o timeouts

**Causa**: El servidor de desarrollo no está ejecutándose  
**Solución**: 
```bash
npm run dev
```

### Error: "Cannot use import statement outside a module"

**Causa**: Problema de configuración de módulos ES  
**Solución**: Ya corregido en `playwright.config.ts` con configuración de proyectos

### Error: Tests de API fallan

**Causa**: Backend no disponible en localhost:3001 o Railway  
**Solución**: 
- Verificar que profile-nest esté corriendo en desarrollo
- O ejecutar tests en modo producción: `npm run test:prod`

### Tests son lentos o timeout

**Causa**: Sistema sobrecargado o conexión lenta  
**Solución**:
1. Aumentar timeout en `playwright.config.ts`:
   ```typescript
   timeout: 60000, // Aumentar de 30000
   ```
2. Cerrar otras aplicaciones
3. Ejecutar menos workers: `npx playwright test --workers=2`

### Las métricas de rendimiento no son esperadas

**Causa**: Normal - depende de recursos del sistema  
**Factores**:
- Recursos del sistema
- Otros procesos ejecutándose
- Estado de caché del navegador
- Condiciones de red

**Solución**: Las métricas son indicativas, no absolutas. Úsalas para comparación relativa.

---

## 📝 Mejores Prácticas

### Antes de Ejecutar Tests

1. ✅ **Servidor corriendo** (para component/pages/integration/e2e)
2. ✅ **Backend disponible** (para tests de API)
3. ✅ **Cerrar aplicaciones innecesarias** (para rendimiento consistente)
4. ✅ **Limpiar cache** si es necesario: `npx playwright clean`

### Durante el Desarrollo

1. Ejecutar tests unitarios frecuentemente (son rápidos)
2. Ejecutar tests de componentes después de cambios UI
3. Ejecutar tests E2E antes de commits importantes
4. Revisar reportes de rendimiento para optimizaciones

### Escritura de Tests

1. **Tests unitarios**: Deben ser independientes y rápidos
2. **Tests de componentes**: Medir métricas reales, no hardcodear valores
3. **Tests de páginas**: Ser resilientes a cambios menores de UI
4. **Tests de integración**: Verificar interacciones, no implementación
5. **Tests de API**: Mockear cuando sea apropiado
6. **Tests E2E**: Enfocarse en flujos críticos de usuario

---

## 🔄 CI/CD

### GitHub Actions

Los tests se pueden ejecutar en CI/CD con:

```yaml
- name: Install dependencies
  run: npm ci

- name: Install Playwright
  run: npx playwright install --with-deps

- name: Run unit tests
  run: npx playwright test --project=unit

- name: Build Next.js
  run: npm run build

- name: Start Next.js
  run: npm start &

- name: Run all tests
  run: npm test
```

---

## 📈 Métricas y Coverage

### NYC Coverage

Los reportes de coverage se generan con NYC y están en:

```
.nyc_output/
coverage/
```

### Lighthouse CI

Para auditorías de rendimiento adicionales:

```bash
npm run lhci
```

Resultados en `docs/lighthouse-reports/`

---

## 🎓 Recursos Adicionales

- [Playwright Documentation](https://playwright.dev/)
- [Next.js Testing](https://nextjs.org/docs/testing)
- [Web Vitals](https://web.dev/vitals/)
- [NYC Coverage](https://www.npmjs.com/package/nyc)

---

## 📞 Soporte

Para problemas con tests:

1. Verificar que el servidor esté corriendo
2. Revisar logs de console en reportes
3. Ejecutar con UI mode: `npx playwright test --ui`
4. Revisar screenshots en `docs/test-results/`

---

**Última actualización**: 2025-10-23  
**Versión de Playwright**: ^1.55.1  
**Versión de Node**: >=18.x
