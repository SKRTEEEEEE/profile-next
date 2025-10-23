# Reporte de contexto: profile-nest (Backend)

## 📋 Información general

**profile-nest** es el backend de la aplicación de perfil, desarrollado con **NestJS** siguiendo principios de **Clean Architecture** (arquitectura hexagonal vertical).

### Tecnologías principales
- **Framework**: NestJS
- **Base de datos**: MongoDB (Mongoose)
- **Autenticación**: JWT (encriptado y firmado)
- **Deploy**: Railway (producción) / localhost:3001 (desarrollo)
- **Integración**: Thirdweb, Nodemailer, Octokit (GitHub API)

---

## 🏗️ Arquitectura

### Estructura de carpetas
```
src/
├── domain/          # Entidades de dominio puras (submodulo Git)
├── modules/         # Funcionalidades por entidad
│   ├── <entidad>/
│   │   ├── presentation/     # Controladores, DTOs, validaciones
│   │   ├── application/      # Casos de uso, lógica de aplicación
│   │   └── infrastructure/   # Repositorios, servicios externos, persistencia
└── shareds/         # Funcionalidades compartidas / Capa de presentación (frameworks)
```

### Módulos principales identificados

#### 1. **Tech Module** (Tecnologías)
- **Controlador**: `/tech`
- **Endpoints públicos**:
  - `GET /tech/:type` - Obtener tecnologías en diferentes formatos
    - `/tech/db` - Formato anidado
    - `/tech/flatten` - Formato plano
    - `/tech/cat` - Categorías (langs y frameworks, no libs)
    - `/tech/full` - Todos los datos (db, flatten, cat)
- **Endpoints protegidos** (requieren JWT):
  - `POST /tech` - Crear nueva tecnología
  - `PUT /tech` - Actualizar tecnología
  - `DELETE /tech/:nameId` - Eliminar tecnología
  - `PATCH /tech/:type` - Actualizar archivos GitHub (all/json/md)
- **Características especiales**:
  - Rate limiting implementado (1 request/60s en endpoint público)
  - Integración con GitHub (Octokit) para actualizar archivos MD y JSON
  - Cache implementado

#### 2. **Project Module** (Proyectos)
- **Controlador**: `/project`
- **Endpoints públicos**:
  - `GET /project` - Obtener proyectos de ejemplo
- **Endpoints protegidos**:
  - `POST /project` - Poblar base de datos con proyectos

#### 3. **User Module** (Usuarios)
- **Controlador**: `/user`
- **Endpoints**:
  - `GET /user` - Leer todos los usuarios (aparece en búsqueda de código)

#### 4. **Pre-Tech Module** (Pre-Tecnologías)
- **Controlador**: `/pre-tech`
- **Características**:
  - Fetch y comparación automática de tecnologías disponibles desde GitHub

---

## 🔐 Seguridad implementada

### Utilidades NestJS implementadas ✅
- Controllers
- Providers
- Modules
- Middleware
- Exception filters
- Pipes
- Guards
- Interceptors
- Custom decorators
- Configuration
- Database (MongoDB)
- Validation
- Caching
- **Authorization** ✅
- **Rate Limiting** ✅

### Utilidades parcialmente implementadas 🟪
- Logging 🟪
- Authentication 🟪
- Encryption & Hashing 🟪

### Características de seguridad
- **JWT Encriptado**: Tokens JWT con payload encriptado
- **Firma por usuario**: Tokens firmados por usuario individual
- **Modo mock para desarrollo**: JWT sin encriptar para facilitar testing
- **Decorador público**: `@PublicRoute()` para endpoints sin autenticación
- **Guards**: Implementados para protección de rutas

---

## 🌍 Deployment

### URLs identificadas
- **Producción**: `https://kind-creation-production.up.railway.app`
- **Desarrollo**: `http://localhost:3001`

### Lógica de selección de entorno
El frontend (`profile-next`) selecciona el backend según la variable `process.env.TEST_ENV`:
- Si `TEST_ENV !== "development"` → usa URL de producción
- Si `TEST_ENV === "development"` → usa localhost:3001

---

## 📦 Flujo de datos identificado

### Para la migración de páginas principales

#### 1. **Página Info** (`/ceo/info`)
**Datos necesarios**: Tecnologías (techs)
- **Endpoint backend**: `GET /tech/flatten`
- **Caso de uso**: `readAllFlatten()`
- **Respuesta**: Array de tecnologías en formato plano (`FullTechData[]`)

#### 2. **Página Portafolio** (`/ceo/portafolio`)
**Datos necesarios**: Proyectos de ejemplo
- **Endpoint backend**: `GET /project`
- **Caso de uso**: `readEjemplo()`
- **Respuesta**: Array de proyectos (`ProjectDto[]`)

#### 3. **Página Estudios** (`/ceo/estudios`)
**Datos necesarios**: Actualmente hardcoded en el componente
- **Estado actual**: No consume backend
- **Datos**: Array estático en `dataStudiesPage`

#### 4. **Página Gradients** (`/ceo/gradients`)
**Estado**: Página existente en profile-next, naturaleza desconocida

---

## 🎯 Endpoints relevantes para migración

| Endpoint | Método | Autenticación | Descripción | Usado por |
|----------|--------|---------------|-------------|-----------|
| `/tech/flatten` | GET | Pública | Tecnologías en formato plano | Página Info |
| `/tech/cat` | GET | Pública | Categorías de tecnologías | Potencialmente Info |
| `/project` | GET | Pública | Proyectos de ejemplo | Página Portafolio |

---

## 📝 Notas importantes

1. **Domain como submodule**: El dominio está implementado como submódulo de Git, lo que facilita la reutilización entre diferentes aplicaciones (frontend y backend).

2. **Clean Architecture estricta**: La separación de capas es clara:
   - **Presentation**: Controllers, DTOs
   - **Application**: Use cases
   - **Infrastructure**: Repositories, external services

3. **Throttling**: El endpoint `GET /tech/:type` tiene rate limiting (1 request cada 60 segundos).

4. **Integración GitHub**: El módulo Tech puede actualizar automáticamente archivos en GitHub (MD y JSON) mediante Octokit.

5. **Validación**: DTOs con validación implementada (usando decoradores de NestJS).

6. **Swagger/OpenAPI**: Documentación completa con decoradores `@ApiOperation`, `@ApiTags`, etc.

---

## ⚠️ Consideraciones para la migración

1. **No modificar el dominio**: Según instrucciones, el dominio no debe ser modificado.

2. **Endpoints públicos**: Los endpoints necesarios para las páginas principales son todos públicos, no requieren autenticación.

3. **Formato de respuesta**: Todos los endpoints siguen un formato estándar con códigos de respuesta (ResCodes).

4. **Error handling**: Sistema centralizado de manejo de errores con códigos específicos (ErrorCodes).

5. **Environment-aware**: El backend detecta automáticamente el entorno (development/production) para diferentes comportamientos.

---

## 🔄 Estado actual del backend

✅ **Backend completamente funcional**
✅ **Endpoints necesarios para migración disponibles**
✅ **Documentación Swagger disponible**
✅ **Rate limiting implementado**
✅ **Autenticación JWT implementada (no necesaria para páginas principales)**
✅ **Integración GitHub funcional**

---

*Fecha de reporte*: 20/01/2025  
*Versión analizada*: profile-nest (branch: agent666/1-terminate-to-help-to-migrate)
