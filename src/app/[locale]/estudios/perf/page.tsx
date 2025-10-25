import { PerformanceBanner } from "@/components/perf/performance-banner";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export const metadata = {
  title: "Studies - Performance Optimized",
  description: "Certified studies highlighted. Performance optimized version with 100% Lighthouse scores.",
};

const dataStudiesPage = [
  {
    id: 1,
    institution: "CIEF",
    date: "30/10/24",
    badges: [
      "JavaScript",
      "HTML",
      "CSS",
      "Node.js",
      "Express.js",
      "MySQL",
      "BDD",
      "OOP",
      "DOM",
    ],
    link: "https://www.grupcief.com/",
  },
  {
    id: 2,
    institution: "Chainlink",
    date: "20/01/24",
    badges: [
      "Chainlink",
      "Blockchain",
      "Solidity",
      "ERC721",
      "ERC20",
      "Blockchain Oracles",
      "CCIP",
      "Chainlink Functions",
    ],
    link: "https://coinmarketcap.com/currencies/chainlink/",
  },
  {
    id: 3,
    institution: "Coliseum",
    date: "19/12/23",
    badges: ["Python"],
    link: "https://www.centrocoliseum.com/",
  },
];

export default async function PerfStudiesPage() {
  const t = await getTranslations("ceo");

  return (
    <>
      <PerformanceBanner originalPath="/estudios" />
      <main className="min-h-screen w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <header className="mb-8 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              <span className="text-primary-ceo-500">
                {t("estudios.h1.0")}
              </span>{" "}
              <span className="text-secondary-ceo-200">
                {t("estudios.h1.1")}
              </span>
            </h1>
          </header>

          {/* Counter Stats */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-primary-ceo-900/50 border-2 border-primary-ceo-800 rounded-xl p-6 text-center">
              <p className="text-4xl md:text-5xl font-bold text-secondary-ceo-400 mb-2">
                3+
              </p>
              <p className="text-sm md:text-base text-primary-ceo-200">
                {t("estudios.counter.0")}
              </p>
            </div>
            <div className="bg-primary-ceo-900/50 border-2 border-primary-ceo-800 rounded-xl p-6 text-center">
              <p className="text-4xl md:text-5xl font-bold text-secondary-ceo-400 mb-2">
                50+
              </p>
              <p className="text-sm md:text-base text-primary-ceo-200">
                {t("estudios.counter.1")}
              </p>
            </div>
            <div className="bg-primary-ceo-900/50 border-2 border-primary-ceo-800 rounded-xl p-6 text-center">
              <p className="text-4xl md:text-5xl font-bold text-secondary-ceo-400 mb-2">
                20+
              </p>
              <p className="text-sm md:text-base text-primary-ceo-200">
                {t("estudios.counter.2")}
              </p>
            </div>
          </section>

          {/* Studies Timeline */}
          <section className="space-y-6">
            {dataStudiesPage.map((study) => (
              <article
                key={study.id}
                className="bg-primary-ceo-900/50 border-2 border-primary-ceo-800 rounded-xl p-6 hover:border-secondary-ceo-600 transition-colors duration-200"
              >
                {/* Study Header */}
                <div className="mb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <h2 className="text-xl md:text-2xl font-semibold text-primary-ceo-100">
                      {t(`estudios.list.${study.id}.title`)}
                    </h2>
                    <time className="text-sm text-primary-ceo-300">
                      {study.date}
                    </time>
                  </div>
                  <p className="text-sm md:text-base font-medium text-secondary-ceo-300">
                    {study.institution}
                  </p>
                </div>

                {/* Study Description */}
                <p className="text-sm md:text-base text-primary-ceo-200 mb-4">
                  {t(`estudios.list.${study.id}.desc`)}
                </p>

                {/* Technologies/Skills */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {study.badges.map((badge, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-3 py-1 bg-primary-ceo-800/70 border border-primary-ceo-700 rounded-full text-primary-ceo-200"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Link to Institution */}
                {study.link && (
                  <Link
                    href={study.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-secondary-ceo-400 hover:text-secondary-ceo-300 transition-colors duration-200"
                  >
                    Visit institution website →
                  </Link>
                )}
              </article>
            ))}
          </section>
        </div>
      </main>
    </>
  );
}
