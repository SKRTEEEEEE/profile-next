# Performance

## 🔎 Cosas que se usan en frontend para medir performance

Estas son **métricas y APIs que puedes usar directamente en tu app o navegador**:

### Métricas nativas del navegador

* **Navigation Timing API** → mide tiempos de carga de página:

  * `navigationStart`, `responseEnd`, `domContentLoadedEventEnd`, etc.
* **Resource Timing API** → mide tiempos de carga de recursos individuales (JS, CSS, imágenes).
* **Performance API** → obtiene timestamps y métricas más detalladas.
* **Long Tasks API** → detecta tareas largas que bloquean el main thread.

### Herramientas en el navegador

* **Lighthouse (integrado en Chrome DevTools)**

  * Score de performance, accesibilidad, SEO.
  * Detecta FCP, LCP, CLS, TTI, etc.
* **Web Vitals**

  * Métricas clave: FCP (First Contentful Paint), LCP (Largest Contentful Paint), CLS (Cumulative Layout Shift), FID (First Input Delay).
* **PerformanceObserver** → API para observar métricas en tiempo real.

### Librerías JS para medir performance

* `web-vitals` → extrae métricas de Core Web Vitals en tiempo real.
* `perfume.js` → mide métricas de carga, interactividad y render.

---

## 🔎 Herramientas de test que permiten medir performance de frontend

Estas son herramientas de testing que **corren tests y miden performance**, no solo funcionalidad:

* **Lighthouse CLI / CI**

  * Se puede correr en pipelines CI/CD para medir performance de páginas web.
* **WebPageTest**

  * Servicio para medir tiempos de carga en distintos dispositivos y redes.
* **Cypress + plugins**

  * Plugins como `cypress-audit` permiten correr Lighthouse dentro de tests e2e.
* **Playwright + tracing**

  * Permite medir tiempos de respuesta y capturar métricas de página.
* **Sitespeed.io**

  * Analiza carga de página, recursos, Core Web Vitals, etc.
* **Calibre, SpeedCurve** (herramientas comerciales)

  * Monitoring continuo de performance frontend.

---

💡 Resumen rápido:

| Tipo                           | Qué mide                              | Cómo se integra                   |
| ------------------------------ | ------------------------------------- | --------------------------------- |
| Browser APIs                   | Tiempos de carga, render, interacción | JS nativo en frontend             |
| Web Vitals / Perfume.js        | Core Web Vitals, interactividad       | Librerías JS en producción/QA     |
| Lighthouse / WebPageTest       | Velocidad, TTFB, LCP, CLS             | CLI o CI/CD                       |
| Cypress / Playwright + plugins | Performance dentro de tests e2e       | Integración con tests funcionales |
| Sitespeed.io / Calibre         | Monitoreo continuo, benchmarking      | Externo o pipeline                |


## 1️⃣ Core Web Vitals (CWV)

Estas son las métricas más importantes hoy para performance web:

| Métrica                            | Qué mide                                           | Cómo medir                                 | Herramientas / Librerías              |
| ---------------------------------- | -------------------------------------------------- | ------------------------------------------ | ------------------------------------- |
| **LCP** – Largest Contentful Paint | Tiempo hasta que el contenido principal es visible | `PerformanceObserver` o Web Vitals API     | `web-vitals`, Lighthouse, WebPageTest |
| **FID** – First Input Delay        | Tiempo de respuesta a la primera interacción       | `PerformanceObserver`                      | `web-vitals`, Lighthouse              |
| **CLS** – Cumulative Layout Shift  | Estabilidad visual de la página                    | `PerformanceObserver`                      | `web-vitals`, Lighthouse              |
| **TTFB** – Time to First Byte      | Tiempo de respuesta del servidor                   | `navigationTiming`                         | Lighthouse, WebPageTest               |
| **FCP** – First Contentful Paint   | Tiempo hasta que aparece el primer contenido       | `navigationTiming` o `PerformanceObserver` | Lighthouse, `perfume.js`, WebPageTest |

---

## 2️⃣ Otras métricas de frontend importantes

| Métrica                            | Qué mide                                        | Cómo medir                              | Herramientas / Librerías            |
| ---------------------------------- | ----------------------------------------------- | --------------------------------------- | ----------------------------------- |
| **TTI** – Time to Interactive      | Cuando la página está completamente interactiva | Lighthouse                              | Lighthouse, Sitespeed.io            |
| **Speed Index**                    | Qué tan rápido se ve la página visualmente      | Lighthouse                              | Lighthouse, WebPageTest             |
| **JS Execution Time / Long Tasks** | Tareas largas que bloquean el main thread       | `Long Tasks API`, `PerformanceObserver` | Perfume.js, web-vitals              |
| **Resource load times**            | Tiempo de carga de CSS, JS, imágenes            | `ResourceTiming API`                    | WebPageTest, Lighthouse, Perfume.js |
| **Memory / JS heap size**          | Uso de memoria en frontend                      | Chrome DevTools                         | Perfume.js, Chrome DevTools         |

---

## 3️⃣ Herramientas y cómo integrarlas

### 🔹 APIs del navegador

* `Performance API` → medir tiempos de carga y render.
* `Resource Timing API` → analizar carga de recursos individuales.
* `Long Tasks API` → detectar bloqueos del hilo principal.
* `PerformanceObserver` → observar métricas en tiempo real.

### 🔹 Librerías JavaScript

* `web-vitals` → Core Web Vitals en producción o tests.
* `perfume.js` → métricas de rendimiento, render y TTFB, con tracking en producción.

### 🔹 Testing / CI

* **Lighthouse CLI / CI** → medición automatizada de rendimiento, accesibilidad, SEO.
* **WebPageTest** → benchmarking remoto en distintos dispositivos/redes.
* **Sitespeed.io** → análisis de carga y métricas CWV en pipelines.
* **Cypress + plugins** (`cypress-audit`) → correr Lighthouse dentro de tests e2e.
* **Playwright + tracing** → medir tiempos de render y navegación dentro de tests.

### 🔹 Herramientas comerciales

* **Calibre**, **SpeedCurve**, **Datadog RUM** → monitoreo continuo de performance real en producción.

---

## 4️⃣ Cómo combinarlas

```maths
┌───────────────────────────┐
│        Producción         │
│ (Real User Monitoring)    │
│  - Web Vitals (FCP, LCP,  │
│    CLS, FID)              │
│  - Perfume.js             │
│  - Datadog RUM / Calibre  │
└─────────────┬─────────────┘
              │ mide la experiencia real
              │
┌─────────────┴─────────────┐
│       CI / E2E Tests       │
│ (Automated testing / PRs) │
│  - Lighthouse CI           │
│  - WebPageTest             │
│  - Sitespeed.io            │
│  - Cypress + cypress-audit │
│  - Playwright + tracing    │
└─────────────┬─────────────┘
              │ mide rendimiento pre-despliegue
              │
┌─────────────┴─────────────┐
│      Desarrollo / Dev      │
│ (Local measurement)        │
│  - Performance API         │
│  - Resource Timing API     │
│  - Long Tasks API          │
│  - PerformanceObserver     │
│  - web-vitals              │
│  - perfume.js              │
└───────────────────────────┘
                 mide rendimiento en despliegue
```