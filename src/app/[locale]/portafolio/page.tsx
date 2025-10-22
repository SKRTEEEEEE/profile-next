import { TabsSectionPortafolio } from "@/components/portafolio/tabs-section";
import { readExampleProjectsUC } from "@/core/application/usecases/entities/project";
import { getTranslations } from "next-intl/server";

const PortfolioPage = async () => {
    const t = await getTranslations("ceo")
    const exProjects = await readExampleProjectsUC()

    return (
        <main>
            <h1 className="flex max-sm:flex-wrap gap-2 absolute top-[15%] sm:left-1/3 max-sm:pl-8 text-wrap sm:text-4xl sm:sr-only font-bold ">
                <span className="text-primary-ceo-500">{t("portafolio.h1.0")}</span>
                <span className="text-secondary-ceo-500">{t("portafolio.h1.1")}</span>
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