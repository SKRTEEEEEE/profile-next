import { TabsSectionPortafolio } from "@/components/portafolio/tabs-section";
import { readExampleProjectsUC } from "@/core/application/usecases/entities/project";
import { getLocale, getTranslations } from "next-intl/server";
import { generateMetadata as generateSEOMetadata, generateProfilePageSchema } from "@/lib/metadata";
import { Metadata } from "next";

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  
  const titles = {
    es: 'Portfolio Open Source - Adan Reh Mañach | Desarrollador Barcelona',
    en: 'Open Source Portfolio - Adan Reh Mañach | Developer Barcelona',
    ca: 'Portfolio Open Source - Adan Reh Mañach | Desenvolupador Barcelona',
    de: 'Open-Source-Portfolio - Adan Reh Mañach | Entwickler Barcelona',
  };

  const descriptions = {
    es: 'Portfolio de proyectos open source destacados. Ejemplos de desarrollo web con React, Next.js, TypeScript, Node.js y tecnologías modernas. Desarrollador en Barcelona.',
    en: 'Featured open source projects portfolio. Web development examples with React, Next.js, TypeScript, Node.js and modern technologies. Developer in Barcelona.',
    ca: 'Portafoli de projectes open source destacats. Exemples de desenvolupament web amb React, Next.js, TypeScript, Node.js i tecnologies modernes. Desenvolupador a Barcelona.',
    de: 'Portfolio mit ausgewählten Open-Source-Projekten. Webentwicklungsbeispiele mit React, Next.js, TypeScript, Node.js und modernen Technologien. Entwickler in Barcelona.',
  };

  return generateSEOMetadata({
    locale: locale as 'es' | 'en' | 'ca' | 'de',
    title: titles[locale as keyof typeof titles] || titles.es,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.es,
    path: '/portafolio',
    type: 'profile',
  });
}

const PortfolioPage = async () => {
    const t = await getTranslations("ceo")
    const exProjects = await readExampleProjectsUC()

    return (
        <main>
            <h1 className="flex max-sm:flex-wrap gap-2 absolute top-[15%] sm:top-[5vh] sm:left-20 max-sm:pl-8 text-wrap sm:text-4xl font-bold ">
                <span className="text-primary-ceo-500">{t("portafolio.h1.0")}</span>
                <span className="text-secondary-ceo-300">{t("portafolio.h1.1")}</span>
                <span className="text-primary-ceo-300">{t("portafolio.h1.2")}</span>
            </h1>
            
            {exProjects.length === 0 ? (
                <div className="flex items-center justify-center h-screen">
                    <div className="text-center p-8">
                        <p className="text-xl text-yellow-500 mb-4">⚠️ No se encontraron proyectos de ejemplo</p>
                        <p className="text-sm text-gray-400">Verifica que el backend tenga datos en la base de datos</p>
                    </div>
                </div>
            ) : (
                <TabsSectionPortafolio selectedProjects={exProjects} />
            )}
        </main>
    );
}

export default PortfolioPage;