# Mejorar performance
## Objetivo
Crear una version de cada pagina: '/perf', la cual sea una version con una performance ceo y accesibilidad(lighthouse) del 100% pero que muestre la misma información que la original. En estas versiones puedes utilizar el minimo de librerias para acoseguir esto pero seguir utilizando tailwind i shadcnui(components/ui) preferiblemente, si es posible
- [locale]/page.tsx ->(crear) [locale]/perf/page.tsx 
- [locale]/portafolio/page.tsx ->(crear) [locale]/portafolio/perf/page.tsx
- etcetera
## Key points
- [ ] Crear una pagina nueva, por cada pagina actual y mantener las actuales
- [ ] En cada pagina nueva, añadir un 'Update Banner' en el que se informe que esta pagina es una pagina para performance 100% y que la pagina bonita esta haciendo click aqui (esto con un texto guapo)
- [ ] Todo el nuevo texto a de tener i18n con los idiomas habilitados
- [ ] Todas las paginas /perf han de tener un 100% en todos los parámetros de lighthouse
- [ ] Configurar lhci para comprobar que todas estas paginas /perf tengan un 100% en todos los campos

