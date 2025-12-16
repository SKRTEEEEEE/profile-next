import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link as LinkLocale } from '@/lib/i18n/routing';
import { readProjectsDeployedUC } from '@/core/application/usecases/entities/project';
import { IntlKey } from '@skrteeeeee/profile-domain';
import { Project } from '@/core/application/interface/project.interface';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo/metadata';
import { Metadata } from 'next';

type SearchParams = Promise<{
  page?: string
}>

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  
  const titles = {
    es: 'Proyectos Web - Adan Reh Mañach | Desarrollador Fullstack Barcelona',
    en: 'Web Projects - Adan Reh Mañach | Fullstack Developer Barcelona',
    ca: 'Projectes Web - Adan Reh Mañach | Desenvolupador Fullstack Barcelona',
    de: 'Web-Projekte - Adan Reh Mañach | Fullstack-Entwickler Barcelona',
  };

  const descriptions = {
    es: 'Proyectos web desplegados. Portfolio fullstack con React, Next.js, TypeScript. Barcelona, España.',
    en: 'Deployed web projects. Fullstack portfolio with React, Next.js, TypeScript. Barcelona, Spain.',
    ca: 'Projectes web desplegats. Portafoli fullstack amb React, Next.js, TypeScript. Barcelona, Espanya.',
    de: 'Bereitgestellte Webprojekte. Fullstack-Portfolio mit React, Next.js, TypeScript. Barcelona, Spanien.',
  };

  return generateSEOMetadata({
    locale: locale as 'es' | 'en' | 'ca' | 'de',
    title: titles[locale as keyof typeof titles] || titles.es,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.es,
    path: '/proyectos',
  });
}

export default async function ProjectsPage({ searchParams }: { searchParams: SearchParams }) {
  const projectsPerPage = 4;
  const sp = (await searchParams).page
  const t = await getTranslations()
  const locale = await getLocale()
  const mappedProjects = await readProjectsDeployedUC()
  const currentPage = sp ? parseInt(sp) : 1;

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = mappedProjects.slice(indexOfFirstProject, indexOfLastProject);

  const totalPages = Math.ceil(mappedProjects.length / projectsPerPage);

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center">
      <h1 className="p-4 text-3xl xl:text-4xl font-bold mb-8">{t("ceo.proyectos.main.h1")}</h1>
      
      {/* Show message if no projects available */}
      {mappedProjects.length === 0 && (
        <div className="text-center p-8">
          <p className="text-xl text-yellow-500 mb-4">⚠️ No se encontraron proyectos</p>
          <p className="text-sm text-gray-400">Asegúrate de que el backend (profile-nest) esté corriendo en http://localhost:3001</p>
          <p className="text-sm text-gray-400">Prueba: <a href="http://localhost:3001/project" target="_blank" className="text-blue-400 underline">http://localhost:3001/project</a></p>
          <p className="text-sm text-gray-400 mt-2">Revisa la consola del navegador (F12) para más detalles</p>
        </div>
      )}
      
      <ul className="w-11/12 xl:w-9/12 flex flex-col gap-4">
        {currentProjects.map((data: Project) => {
          return (
            <li className="flex justify-between" key={data.id}>
              <h2 className='text-md xl:text-2xl'>{data.title[locale as IntlKey]}</h2>
              <div className='flex'>
                {data?.openSource &&
                  <Link
                    className='mr-4 px-2 py-1 border-2 border-primary-ceo-200 rounded-md bg-secondary-ceo-300/50
               hover:bg-secondary-ceo-600 hover:border-primary-ceo-400/80 sm:inline hidden'
                    href={data.openSource}
                    target='_blank'>
                    {t("ceo.proyectos.main.ul.buttons.url_demo.0")}
                    <span className="hidden xl:inline"> {t("ceo.proyectos.main.ul.buttons.url_demo.1")}
                    </span>🧑‍💻
                  </Link>
                }
                  {data?.operative && 
                  <Link 
                    className='mr-4 px-2 py-1 border-2 border-primary-ceo-200 rounded-md bg-secondary-ceo-300/50 
                    hover:bg-secondary-ceo-600 hover:border-primary-ceo-400/80 sm:inline hidden' 
                    href={data.operative} 
                    target='_blank'>
                    <span className="hidden xl:inline">{t("ceo.proyectos.main.ul.buttons.url_github.0")} </span>
                    {t("ceo.proyectos.main.ul.buttons.url_github.1")}📄
                  </Link>
                }

                <LinkLocale 
                  className='px-2 py-1 border-2 border-primary-ceo-200 rounded-md bg-secondary-ceo-400/30 
                  hover:bg-secondary-ceo-600 hover:border-primary-ceo-400/80' 
                  href={{ pathname: `/proyectos/[id]` as `/proyectos/[id]`, params: { id: data.id } }}>
                  {t("ceo.proyectos.main.ul.buttons.url_project.0")} 
                  <span className="hidden lg:inline mr-4"> {t("ceo.proyectos.main.ul.buttons.url_project.1")}</span>➡️
                </LinkLocale>
              </div>
            </li>
          )
        }

        )}
      </ul>
      <div className="mt-8 flex gap-4">
        <button
          className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-danger/10 text-primary-ceo-100/30 cursor-not-allowed' : 'border-secondary-ceo-200/80 hover:border-secondary-ceo-300 border-2 bg-primary-ceo-500/40 hover:bg-primary-ceo-800/80 text-primary-ceo-100'
            }`}
          disabled={currentPage === 1}
        >
          {
            currentPage !== 1 ?
              <LinkLocale
                className={currentPage === 1 ? "cursor-not-allowed" : ""}
                href={{ pathname: `/proyectos` as `/proyectos`, query: { page: (currentPage - 1).toString() } }}>
                {t("common.previous")}</LinkLocale> : t("common.previous")}
        </button>

        <button
          className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-danger/10 text-primary-ceo-100/30 cursor-not-allowed' : 'border-secondary-ceo-200/80 hover:border-secondary-ceo-300 border-2 bg-primary-ceo-500/40 hover:bg-primary-ceo-800/80 text-primary-ceo-100'
            }`}
          disabled={currentPage === totalPages}
        >
          {
            currentPage !== totalPages ?
              <LinkLocale
                className={currentPage === 1 ? "cursor-not-allowed" : ""}
                href={{ pathname: `/proyectos` as `/proyectos`, query: { page: (currentPage + 1).toString() } }}>
                {t("common.next")}</LinkLocale> : t("common.next")}
        </button>
      </div>
    </main >
  );
}
