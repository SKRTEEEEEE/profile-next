import { PerformanceBanner } from "@/components/perf/performance-banner";
import { readExampleProjectsUC } from "@/core/application/usecases/entities/project";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { IntlKey } from "@/core/domain/entities/intl.type";
import type { Project } from "@/core/application/interface/project.interface";

export const metadata = {
  title: "Portfolio - Performance Optimized",
  description: "Featured open-source examples. Performance optimized version with 100% Lighthouse scores.",
};

async function PerfPortfolioPage() {
  const t = await getTranslations("ceo");
  const exProjects = await readExampleProjectsUC();

  if (exProjects.length === 0) {
    return (
      <>
        <PerformanceBanner originalPath="/portafolio" />
        <main className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center p-8 bg-primary-ceo-900/50 border-2 border-primary-ceo-800 rounded-xl">
            <p className="text-xl text-yellow-500 mb-4">
              ⚠️ No se encontraron proyectos de ejemplo
            </p>
            <p className="text-sm text-primary-ceo-300">
              Verifica que el backend tenga datos en la base de datos
            </p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <PerformanceBanner originalPath="/portafolio" />
      <main className="min-h-screen w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="mb-8 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 flex flex-wrap gap-2">
              <span className="text-primary-ceo-500">{t("portafolio.h1.0")}</span>
              <span className="text-secondary-ceo-300">{t("portafolio.h1.1")}</span>
              <span className="text-primary-ceo-300">{t("portafolio.h1.2")}</span>
            </h1>
          </header>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exProjects.map((project, index) => (
              <ProjectCard key={project.id || index} project={project} t={t} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

// Simplified project card component for performance
function ProjectCard({ project, t }: { project: Project; t: ReturnType<typeof getTranslations> extends Promise<infer T> ? T : never }) {
  // Get current locale from the project data structure
  // Fallback to 'en' if locale detection fails
  const locale = (project.title.es ? "es" : "en") as IntlKey;

  const title = project.title[locale] || project.title.en || "Project";
  const description = project.desc?.[locale] || project.desc?.en || "";
  const lilDesc = project.lilDesc?.[locale] || project.lilDesc?.en || "";

  return (
    <article className="bg-primary-ceo-900/50 border-2 border-primary-ceo-800 rounded-xl p-6 hover:border-secondary-ceo-600 transition-colors duration-200">
      {/* Project Image */}
      {project.image && (
        <div className="mb-4 aspect-video bg-primary-ceo-800/50 rounded-lg overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={`${title} screenshot`}
            className="w-full h-full object-cover"
            loading="lazy"
            width="400"
            height="225"
          />
        </div>
      )}

      {/* Project Title */}
      <h2 className="text-xl md:text-2xl font-semibold mb-2 text-primary-ceo-100">
        {title}
      </h2>

      {/* Short Description */}
      {lilDesc && (
        <p className="text-sm text-primary-ceo-300 mb-3">{lilDesc}</p>
      )}

      {/* Full Description */}
      {description && (
        <p className="text-sm text-primary-ceo-200 mb-4 line-clamp-3">
          {description}
        </p>
      )}

      {/* Technologies */}
      {project.techs && project.techs.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-semibold text-secondary-ceo-400 mb-2">
            {t("portafolio.section.keys.tech")}:
          </p>
          <div className="flex flex-wrap gap-2">
            {project.techs.slice(0, 5).map((tech, idx: number) => (
              <span
                key={tech.id || idx}
                className="text-xs px-2 py-1 bg-primary-ceo-800/70 border border-primary-ceo-700 rounded-md text-primary-ceo-200"
              >
                {tech.nameBadge || tech.nameId}
              </span>
            ))}
            {project.techs.length > 5 && (
              <span className="text-xs px-2 py-1 text-primary-ceo-400">
                +{project.techs.length - 5} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Action Links */}
      <div className="flex flex-wrap gap-3 mt-4">
        {project.openSource && (
          <Link
            href={project.openSource}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 text-sm font-medium bg-primary-ceo-800/80 hover:bg-primary-ceo-800 border border-primary-ceo-700 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-ceo-500"
          >
            {t("portafolio.section.buttons.code")}
          </Link>
        )}

        {project.operative && (
          <Link
            href={project.operative}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 text-sm font-medium bg-secondary-ceo-700/80 hover:bg-secondary-ceo-700 border border-secondary-ceo-600 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-ceo-500"
          >
            {t("portafolio.section.buttons.ver")}
          </Link>
        )}
      </div>
    </article>
  );
}

export default PerfPortfolioPage;
