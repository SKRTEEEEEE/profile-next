# Refactor test
## Objetivo
Terminar correctamente los test 
## Contexto
Tienes un servidor de backend en :3001, y una no del frontend :3000. Por lo que puedes ejecutar test que requieren servidor sin problema (npm run test --individuales)
- No ejecutes npm run test 'completo', ya que este tarda casi 20/30 mins
- Tambien puedes fijarte en los ./docs/test-result para ver la ultima ejecucción

- **Tienes acceso al MCP de playwright**

## Key points
- [ ] Asegurar-se que pasan todos los test, se pueden eliminar los mas conflictivos

## Test que no pasan - antes de cambios

```bash
 integration/seo-metadata.spec.ts
SEO Metadata - Developer Portfolio › Home Page Metadata › should have Open Graph metadata in esintegration
22.8s
integration/seo-metadata.spec.ts:52
SEO Metadata - Developer Portfolio › Home Page Metadata › should have Open Graph metadata in enintegration
29.9s
integration/seo-metadata.spec.ts:52
SEO Metadata - Developer Portfolio › Home Page Metadata › should have Open Graph metadata in caintegration
18.1s
integration/seo-metadata.spec.ts:52
SEO Metadata - Developer Portfolio › Home Page Metadata › should have Open Graph metadata in deintegration
12.3s
integration/seo-metadata.spec.ts:52
SEO Metadata - Developer Portfolio › Home Page Metadata › should have canonical URLintegration
7.3s
integration/seo-metadata.spec.ts:95
integration/seo-robots-sitemap.spec.ts
SEO - robots.txt Configuration › should include sitemap referenceintegration
4.2s
integration/seo-robots-sitemap.spec.ts:35
SEO - sitemap.xml Configuration › should include home page URLs for all localesintegration
18.4s
integration/seo-robots-sitemap.spec.ts:75
SEO - sitemap.xml Configuration › should use correct domain (dev.desarrollador.tech)integration
18.2s
integration/seo-robots-sitemap.spec.ts:155
integration/structured-data.spec.ts
Structured Data Tests › Person Schema › should have Person schema on home pageintegration
16.7s
integration/structured-data.spec.ts:11
Structured Data Tests › WebSite Schema › should have WebSite schemaintegration
18.5s
integration/structured-data.spec.ts:75
component/pages-performance.spec.ts
Pages Performance Tests › Info page performancecomponent
1.1m
component/pages-performance.spec.ts:113
``` 
