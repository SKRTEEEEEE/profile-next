import { PerformanceBanner } from "@/components/perf/performance-banner";
import { getTranslations } from "next-intl/server";
import { creatorData } from "@/lib/data";
import Link from "next/link";

export const metadata = {
  title: "Web3 Projects - Performance Optimized",
  description: "Web3 development project examples. Performance optimized version with 100% Lighthouse scores.",
};

type Web3Stat = {
  id: number;
  path: string;
  contract: string;
};

const web3Static: Web3Stat[] = [
  {
    id: 1,
    path: "/nft-raffle",
    contract: `${creatorData.githubUrl}/trySolidity24/blob/main/markdown/contratos_desplegados.md`,
  },
  {
    id: 2,
    path: "/nft-membership",
    contract: `${creatorData.githubUrl}/trySolidity24/blob/main/markdown/contratos_desplegados.md`,
  },
  {
    id: 3,
    path: "/counter",
    contract: `${creatorData.githubUrl}/trySolidity24/blob/main/markdown/contratos_desplegados.md`,
  },
];

export default async function PerfCodePage() {
  const t = await getTranslations("ceo.code");

  return (
    <>
      <PerformanceBanner originalPath="/code" />
      <main className="min-h-screen w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <header className="mb-8 md:mb-12 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {t("h1.0")}
              <span className="block text-secondary-ceo-400">{t("h1.1")}</span>
            </h1>
          </header>

          {/* Projects List */}
          <div className="space-y-8">
            {web3Static.map((project) => (
              <article
                key={project.id}
                className="bg-primary-ceo-900/50 border-2 border-primary-ceo-800 rounded-xl p-6 hover:border-secondary-ceo-600 transition-colors duration-200"
              >
                {/* Project Title */}
                <h2 className="text-2xl md:text-3xl font-semibold text-primary-ceo-100 mb-4 text-center">
                  {t(`slider.${project.id - 1}.h2`)}
                </h2>

                {/* Project Description */}
                <p className="text-base md:text-lg text-primary-ceo-200 mb-6 text-center">
                  {t(`slider.${project.id - 1}.desc`)}
                </p>

                {/* Main Uses */}
                <section className="mb-6">
                  <h3 className="text-lg font-semibold text-secondary-ceo-300 mb-3">
                    {t("slider_list_tittle")}:
                  </h3>
                  <ul className="space-y-2">
                    {t.raw(`slider.${project.id - 1}.list`).map(
                      (item: string, idx: number) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-primary-ceo-200 bg-primary-ceo-800/30 border border-primary-ceo-700/50 rounded-lg px-4 py-2"
                        >
                          <span className="text-secondary-ceo-500 mt-0.5">
                            •
                          </span>
                          <span>{item}</span>
                        </li>
                      )
                    )}
                  </ul>
                </section>

                {/* Instructions (Optional - can be expanded) */}
                {t.raw(`slider.${project.id - 1}.instructions`) && (
                  <details className="mb-6">
                    <summary className="cursor-pointer text-lg font-semibold text-secondary-ceo-300 mb-3 hover:text-secondary-ceo-400">
                      Instructions →
                    </summary>
                    <ol className="space-y-2 list-decimal list-inside">
                      {t
                        .raw(`slider.${project.id - 1}.instructions`)
                        .map((instruction: string, idx: number) => (
                          <li
                            key={idx}
                            className="text-sm text-primary-ceo-200 ml-4"
                          >
                            {instruction}
                          </li>
                        ))}
                    </ol>
                  </details>
                )}

                {/* Action Links */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href={`https://ejemplos-d-apps.vercel.app${project.path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center px-6 py-3 text-base font-medium bg-secondary-ceo-700/80 hover:bg-secondary-ceo-700 border border-secondary-ceo-600 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-ceo-500 text-center"
                  >
                    {t("buttons.example")}
                  </Link>

                  <Link
                    href={project.contract}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center px-6 py-3 text-base font-medium bg-primary-ceo-800/80 hover:bg-primary-ceo-800 border border-primary-ceo-700 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-ceo-500 text-center"
                  >
                    <span className="hidden lg:inline">
                      {t("buttons.code.0")}{" "}
                    </span>
                    {t("buttons.code.1")}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
