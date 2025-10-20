# Reporte de contexto: profile-next (Frontend)

## 📋 Información general

**profile-next** es el nuevo frontend de la aplicación de perfil, desarrollado con **Next.js 15**, **React 19** y **TypeScript**, siguiendo principios de **Clean Architecture**.

### Objetivo
Actuar como frontend consumiendo datos del backend `profile-nest` (localhost:3001), separando responsabilidades del antiguo monolito `profile-page`.

### Tecnologías principales
- **Framework**: Next.js 15.5.4 con App Router
- **UI Library**: React 19.1.0  
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Internationalization**: next-intl 4.3.9
- **Testing**: Playwright + NYC (coverage)
- **Performance**: Lighthouse CI

---

## 🏗️ Arquitectura

### Estructura de carpetas (Clean Architecture)
```
src/
├── app/                          # Next.js App Router
│   ├── [locale]/                # Rutas internacionalizadas
│   │   ├── portafolio/          # ✅ Página de portafolio
│   │   ├── info/                # ✅ Página de información
│   │   ├── estudios/            # ✅ Página de estudios
│   │   └── gradients/           # ✅ Página de gradientes
│   ├── favicon.ico
│   ├── globals.css
│   └── layout.tsx
├── components/                   # Componentes React
│   ├── portafolio/              # Componentes específicos de portafolio
│   ├── oth/                     # Otros componentes (particles, nav, slider, etc.)
│   └── ui/                      # UI components (shadcn/ui)
├── core/                        # Clean Architecture core
│   ├── application/             # Capa de aplicación
│   │   ├── interface/           # Interfaces de repositorios
│   │   └── usecases/            # Casos de uso
│   ├── domain/                  # Entidades de dominio (submodule Git)
│   └── infrastructure/          # Implementaciones de infraestructura
│       └── api/                 # Repositorios API
├── lib/                         # Utilidades y helpers
│   └── i18n/                    # Configuración i18n
└── middleware.ts                # Next.js middleware (i18n)
```

---

## 📄 Estado actual de las páginas principales

### 1. **Portafolio** (`/[locale]/portafolio`)
**Estado**: ✅ **MIGRADA - Consumiendo backend**

- **Componente**: `src/app/[locale]/portafolio/page.tsx`
- **Caso de uso**: `readExampleProjectsUC` ⚠️ **FALTA IMPLEMENTAR**
  - **Import actual**: `@/core/application/usecases/entities/project` (NO EXISTE)
  - **Debe crearse**: Función que use `ReadProjectUseCase` de `project.usecases.ts`
- **Backend endpoint**: `GET /project`
- **Componente de visualización**: `TabsSectionPortafolio`
- **Datos consumidos**: Array de proyectos de ejemplo

**⚠️ Problema identificado**: 
- El caso de uso `readExampleProjectsUC` está importado pero no existe en el código.
- Existe `ReadProjectUseCase` en `src/core/application/usecases/project.usecases.ts` pero no está exportada como `readExampleProjectsUC`.

### 2. **Info** (`/[locale]/info`)
**Estado**: ✅ **MIGRADA - Consumiendo backend**

- **Componente**: `src/app/[locale]/info/page.tsx`
- **Caso de uso**: `ReadTechFlattenUseCase` (directamente instanciado)
- **Backend endpoint**: `GET /tech/flatten`
- **Componente de visualización**: `SliderTechs`
- **Datos consumidos**: Array de tecnologías en formato plano (`FullTechData[]`)

**✅ Correctamente implementado**:
```typescript
const {data:allLeng} = await new ReadTechFlattenUseCase(techApiRepository).execute()
```

### 3. **Estudios** (`/[locale]/estudios`)
**Estado**: ⚠️ **NO MIGRADA - Datos hardcoded**

- **Componente**: `src/app/[locale]/estudios/page.tsx`
- **Datos**: Hardcoded en `dataStudiesPage` (array estático)
- **Backend endpoint**: **NO EXISTE** - No hay endpoint en backend para estudios
- **Componentes de visualización**: `CounterServices`, `TimeLine`

**Datos estáticos**:
```typescript
const dataStudiesPage = [
    { id: 1, institution: "CIEF", date: "30/10/24", badges: [...], link: "..." },
    { id: 2, institution: "Chainlink", date: "20/01/24", badges: [...], link: "..." },
    { id: 3, institution: "Coliseum", date: "19/12/23", badges: [...], link: "..." }
];
```

**⚠️ Estado**: Se mantiene con datos estáticos por ahora (no hay endpoint en backend).

### 4. **Gradients** (`/[locale]/gradients`)
**Estado**: ✅ **Implementada - Página de utilidad**

- **Componente**: `src/app/[locale]/gradients/page.tsx`
- **Propósito**: Página de preview de gradientes (utilidad de desarrollo)
- **Datos**: Gradientes definidos en `@/lib/utils`
- **Backend**: No requiere backend

---

## 🔌 Integración con Backend

### Repositorios API implementados

#### 1. **TechApiRepository** (`src/core/infrastructure/api/tech.repo.ts`)
```typescript
class TechApiRepository implements TechInterface {
  - readDb(): Promise<ResFlow<Lib[]>>
  - readFlatten(): Promise<ResFlow<FullTechData[]>>
  - readCategory(): Promise<ResFlow<ReadCategoryTechsRes>>
  - readFull(): Promise<ResFlow<ReadAllFlattenTechsRes>>
}
```

**Singleton exportado**: 
```typescript
export const techApiRepository = new TechApiRepository(
  process.env.TEST_ENV !== "development" 
    ? "https://kind-creation-production.up.railway.app" 
    : "http://localhost:3001"
);
```

#### 2. **ProjectApiRepository** (`src/core/infrastructure/api/project.repo.ts`)
```typescript
class ProjectApiRepository implements ProjectInterface {
  - readEjemplo(): Promise<ResFlow<Project[]>>
}
```

**Singleton exportado**: 
```typescript
export const projectApiRepository = new ProjectApiRepository(
  process.env.TEST_ENV !== "development" 
    ? "https://kind-creation-production.up.railway.app" 
    : "http://localhost:3001"
);
```

### Casos de uso implementados

#### Tech Use Cases (`src/core/application/usecases/tech.usecases.ts`)
- ✅ `ReadTechDbUseCase`
- ✅ `ReadTechFlattenUseCase`
- ✅ `ReadTechCategoryUseCase`
- ✅ `ReadTechFullUseCase`

#### Project Use Cases (`src/core/application/usecases/project.usecases.ts`)
- ✅ `ReadProjectUseCase`

---

## ⚠️ Problemas identificados

### 1. **Caso de uso faltante para proyectos**
**Archivo**: `src/app/[locale]/portafolio/page.tsx`

**Error**:
```typescript
import { readExampleProjectsUC } from "@/core/application/usecases/entities/project"; 
// ❌ NO EXISTE: @/core/application/usecases/entities/project
```

**Solución necesaria**: Crear helper o exportar el caso de uso:
```typescript
// Opción 1: Crear archivo src/core/application/usecases/entities/project.ts
import { ReadProjectUseCase } from "../project.usecases";
import { projectApiRepository } from "@/core/infrastructure/api/project.repo";

export const readExampleProjectsUC = async () => {
  const result = await new ReadProjectUseCase(projectApiRepository).execute();
  return result.data || [];
};
```

### 2. **Componentes faltantes**
Según los imports identificados en `profile-page`, estos componentes NO existen en `profile-next`:

**Componentes CEO que faltan**:
- ❌ `@/components/ceo/introduction` (usado en página principal CEO)
- ❌ `@/components/ceo/counter-services` (usado en estudios)
- ❌ `@/components/ceo/time-line` (usado en estudios)

**Componentes OTH que faltan**:
- ❌ `@/components/oth/transition-page` (usado en varias páginas)
- ❌ `@/components/oth/transition-component` (usado con `MotionTransition`)

### 3. **Páginas vacías**
**Directorio**: `src/app/[locale]/` está vacío

Las páginas principales deben crearse en:
- `src/app/[locale]/page.tsx` (home)
- `src/app/[locale]/layout.tsx` (layout)

---

## 🎨 Componentes existentes

### Componentes de Portafolio
- ✅ `TabsSectionPortafolio`
- ✅ `ProjectSelect`
- ✅ `LinksButton`
- ✅ `DetailsArticle`
- ✅ `3d-card`
- ✅ `test-action-project`

### Componentes OTH (Other)
- ✅ `slider-techs` (SliderTechs)
- ✅ `cover-particles` (CoverParticles)
- ✅ `navbar`
- ✅ `local-switch`
- ✅ `render-local-nav`
- ✅ `time-line` (TimeLine)
- ✅ `dyn/dynamic-si` (Simple Icons dinámicos)
- ✅ `dyn/dynamic-lucide` (Lucide icons dinámicos)
- ✅ `c/type-animation` (TypeAnimation)

### Componentes UI (shadcn/ui)
- ✅ `button`, `badge`, `avatar`, `dialog`, `dropdown-menu`, `navigation-menu`, `popover`, `sonner`, `tabs`

---

## 📦 Configuración de deployment

### Variables de entorno
- `TEST_ENV`: Determina el backend a usar
  - `"development"` → `http://localhost:3001`
  - Otro valor → `https://kind-creation-production.up.railway.app`

### Scripts disponibles
```json
{
  "dev": "next dev --turbopack",
  "build": "next build --turbopack",
  "start": "next start",
  "lint": "eslint",
  "test": "nyc playwright test",
  "test:prod": "cross-env TEST_ENV=production npx playwright test",
  "lhci": "lhci autorun --config=lighthouserc.json"
}
```

---

## 🌍 Internacionalización (i18n)

### Idiomas soportados
- 🇬🇧 Inglés (en)
- 🇪🇸 Español (es)
- 🇨🇦 Catalán (ca)
- 🇩🇪 Alemán (de)

### Contenido
Los textos están gestionados con `next-intl`:
```typescript
const t = await getTranslations("ceo")
t("portafolio.h1.0")
```

---

## 🧪 Testing

### Configuración
- **Framework**: Playwright
- **Coverage**: NYC
- **Config**: `playwright.config.ts`

### Directorios de tests
```
tests/
├── e2e/                  # Tests end-to-end
└── unit/                 # Tests unitarios
```

---

## 🐳 Docker

### Archivos existentes
- ✅ `Dockerfile`
- ✅ `docker-compose.yml`
- ✅ `.dockerignore`

---

## 📊 Performance

### Lighthouse CI
Configuración en `lighthouserc.json`:
- Auditorías automáticas configuradas
- Target: 90+ en todas las métricas

---

## 🎯 Resumen de tareas para completar migración

### ✅ Completadas
1. Infraestructura API (repositories y singletons)
2. Casos de uso de Tech y Project
3. Página Info (consumiendo backend)
4. Componentes de Portafolio

### ⚠️ Pendientes (CRÍTICAS)
1. **Crear caso de uso exportable `readExampleProjectsUC`**
   - Archivo: `src/core/application/usecases/entities/project.ts`
   - Usar `ReadProjectUseCase` con `projectApiRepository`

2. **Copiar/migrar componentes faltantes** de `profile-page`:
   - `components/ceo/introduction`
   - `components/ceo/counter-services`
   - `components/ceo/time-line`
   - `components/oth/transition-page`
   - `components/oth/transition-component`

3. **Crear layouts y páginas principales**:
   - `src/app/[locale]/page.tsx`
   - `src/app/[locale]/layout.tsx`

### 📝 Opcionales
1. Crear endpoint en backend para estudios (si se desea consumir desde API)
2. Mejorar manejo de errores en páginas (actualmente solo `toast.error`)
3. Implementar tests para las nuevas páginas

---

*Fecha de reporte*: 20/01/2025  
*Versión analizada*: profile-next (branch: agent666/1-terminate-to-help-to-migrate)
