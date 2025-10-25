import { PerformanceBanner } from "@/components/perf/performance-banner";
import { ReadTechFlattenUseCase } from "@/core/application/usecases/tech.usecases";
import { techApiRepository } from "@/core/infrastructure/api/tech.repo";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Link as LinkLocale } from "@/lib/i18n/routing";

export const metadata = {
  title: "Tech Stack - Performance Optimized",
  description: "My skills and technologies. Performance optimized version with 100% Lighthouse scores.",
};

export default async function PerfInfoPage() {
  const { data: allTechs } = await new ReadTechFlattenUseCase(
    techApiRepository
  ).execute();
  const t = await getTranslations();

  return (
    <>
      <PerformanceBanner originalPath="/info" />
      <main className="min-h-screen w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <header className="mb-8 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {t("ceo.info.section.skills.h1.0")}{" "}
              <span className="text-primary-ceo-500">
                {t("ceo.info.section.skills.h1.1")}
              </span>
            </h1>
            <h2 className="text-xl md:text-2xl text-secondary-ceo-200">
              {t("ceo.info.section.skills.h2")}
            </h2>
          </header>

          {/* Skills Section */}
          <section className="mb-8 md:mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Fullstack Web */}
              <div className="bg-primary-ceo-900/50 border-2 border-secondary-ceo-700/30 rounded-xl p-6">
                <h3 className="text-2xl md:text-3xl font-semibold mb-3">
                  Fullstack web JS
                </h3>
                <p className="text-primary-ceo-200">
                  React.js, Next.js, Node.js, Express.js, MongoDB, Mongoose.js,
                  TailwindCss, etc...
                </p>
              </div>

              {/* Fullstack dApp */}
              <div className="bg-primary-ceo-900/50 border-2 border-secondary-ceo-700/30 rounded-xl p-6">
                <h3 className="text-2xl md:text-3xl font-semibold mb-3">
                  Fullstack dApp <em>EVM</em>
                </h3>
                <p className="text-primary-ceo-200">
                  Solidity, Ether.js, Thirdweb, Hardhat, Forge, Chainlink, etc...
                </p>
              </div>
            </div>
          </section>

          {/* Tech Stack List */}
          {allTechs && allTechs.length > 0 && (
            <section className="mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-primary-ceo-300">
                {t("ceo.info.section.slider.h2")}
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {allTechs.map((tech, index) => (
                  <TechCard key={tech.nameId || index} tech={tech} t={t} />
                ))}
              </div>
            </section>
          )}

          {/* Action Buttons */}
          <section className="flex flex-col sm:flex-row gap-4">
            <LinkLocale
              href={{ pathname: "/docs/[slug]", params: { slug: "techs" } }}
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium bg-secondary-ceo-700/80 hover:bg-secondary-ceo-700 border border-secondary-ceo-600 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-ceo-500"
            >
              {t("ceo.info.section.skills.buttons.tech")}
            </LinkLocale>

            <Link
              href="https://profile-skrt.vercel.app/ca/admin/techs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium bg-primary-ceo-800/80 hover:bg-primary-ceo-800 border border-primary-ceo-700 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-ceo-500"
            >
              {t("ceo.info.section.skills.buttons.admin")}
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}

// Simplified tech card component
import type { FullTechData } from "@/core/domain/entities/tech";

function TechCard({ tech, t }: { tech: FullTechData; t: ReturnType<typeof getTranslations> extends Promise<infer T> ? T : never }) {
  const getExperienceLabel = (exp: string) => {
    const expMap: Record<string, string> = {
      max: t("ceo.info.section.slider.values.max"),
      high: t("ceo.info.section.slider.values.high"),
      neut: t("ceo.info.section.slider.values.neut"),
      low: t("ceo.info.section.slider.values.low"),
      min: t("ceo.info.section.slider.values.min"),
    };
    return expMap[exp] || exp;
  };

  return (
    <div className="bg-primary-ceo-900/50 border-2 border-primary-ceo-800 rounded-lg p-4 hover:border-secondary-ceo-600 transition-colors duration-200">
      <div className="text-center">
        {/* Tech Name */}
        <h3 className="font-semibold text-sm md:text-base mb-2 text-primary-ceo-100">
          {tech.nameBadge || tech.nameId}
        </h3>

        {/* Experience Level */}
        {tech.valueExp && (
          <p className="text-xs text-primary-ceo-300 mb-1">
            <span className="font-medium">{t("ceo.info.section.slider.exp")}:</span>{" "}
            {getExperienceLabel(tech.valueExp)}
          </p>
        )}

        {/* Affinity Level */}
        {tech.valueAfin && (
          <p className="text-xs text-primary-ceo-300">
            <span className="font-medium">{t("ceo.info.section.slider.affinity")}:</span>{" "}
            {getExperienceLabel(tech.valueAfin)}
          </p>
        )}
      </div>
    </div>
  );
}
