import { PerformanceBanner } from "@/components/perf/performance-banner";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Adan Reh Mañach - Performance Optimized Portfolio",
  description: "Fullstack Developer specialized in web, IIoT and DevOps. Performance optimized version with 100% Lighthouse scores.",
};

export default async function PerfHomePage() {
  const t = await getTranslations("ceo.main.introduction");

  return (
    <>
      <PerformanceBanner originalPath="/" />
      <main className="min-h-screen w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <header className="mb-12 md:mb-16">
            <div className="flex gap-4 sm:gap-6 mb-4 text-base sm:text-xl lg:text-2xl">
              <span className="text-primary-ceo-300">{t("greeting")},</span>
              <span className="text-primary-ceo-400">{t("introduction")}</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Adan Reh Mañach
            </h1>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4">
              {t("developer_title")}
            </h2>

            <p className="text-lg sm:text-xl md:text-2xl text-primary-ceo-200 mb-6 max-w-3xl">
              {t("type_animation.1")}
            </p>

            <p className="text-md sm:text-lg md:text-xl font-medium text-primary-ceo-300 max-w-2xl">
              {t("description")}
            </p>
          </header>

          {/* Navigation Section */}
          <nav aria-label="Main navigation" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            <Link
              href="/portafolio"
              className={cn(
                "flex items-center justify-center px-6 py-4 text-center",
                "bg-primary-ceo-800/80 hover:bg-primary-ceo-900/20",
                "border-2 border-primary-ceo-700 rounded-xl",
                "transition-all duration-200",
                "hover:shadow-lg hover:shadow-primary-ceo-500/20",
                "focus:outline-none focus:ring-2 focus:ring-secondary-ceo-500",
                "text-base sm:text-lg font-semibold"
              )}
            >
              {t("buttons.view_projects")}
            </Link>

            <Link
              href="/info"
              className={cn(
                "flex items-center justify-center px-6 py-4 text-center",
                "bg-primary-ceo-800/70 hover:bg-primary-ceo-900/20",
                "border-2 border-primary-ceo-700 rounded-xl",
                "transition-all duration-200",
                "hover:shadow-lg hover:shadow-primary-ceo-500/20",
                "focus:outline-none focus:ring-2 focus:ring-secondary-ceo-500",
                "text-base sm:text-lg font-semibold"
              )}
            >
              {t("buttons.tech_stack")}
            </Link>

            <Link
              href="/estudios"
              className={cn(
                "flex items-center justify-center px-6 py-4 text-center",
                "bg-primary-ceo-800/60 hover:bg-primary-ceo-900/20",
                "border-2 border-primary-ceo-700 rounded-xl",
                "transition-all duration-200",
                "hover:shadow-lg hover:shadow-primary-ceo-500/20",
                "focus:outline-none focus:ring-2 focus:ring-secondary-ceo-500",
                "text-base sm:text-lg font-semibold"
              )}
            >
              {t("buttons.studies")}
            </Link>
          </nav>

          {/* Additional Information */}
          <section className="bg-primary-ceo-900/50 border-2 border-primary-ceo-800 rounded-xl p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-secondary-ceo-400">
              Professional Focus
            </h3>
            <ul className="space-y-2 text-primary-ceo-200">
              <li className="flex items-start gap-2">
                <span className="text-secondary-ceo-500 mt-1">▸</span>
                <span>{t("type_animation.1")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary-ceo-500 mt-1">▸</span>
                <span>{t("type_animation.2")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary-ceo-500 mt-1">▸</span>
                <span>{t("type_animation.3")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary-ceo-500 mt-1">▸</span>
                <span>{t("type_animation.4")}</span>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}
