"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/routing";
import { useState } from "react";
import { X } from "lucide-react";

interface PerformanceBannerProps {
  /**
   * The original page path without /perf
   * e.g., "/" for home, "/portafolio" for portfolio
   */
  originalPath: string;
}

export function PerformanceBanner({ originalPath }: PerformanceBannerProps) {
  const t = useTranslations("ceo.perf.banner");
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div
      data-testid="performance-banner"
      className="relative w-full bg-gradient-to-r from-primary-ceo-900/95 to-secondary-ceo-900/95 border-b-2 border-secondary-ceo-500/50 py-3 px-4 sm:px-6 lg:px-8"
      role="banner"
      aria-label="Performance optimization notice"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-sm sm:text-base font-semibold text-primary-ceo-100 mb-1">
            {t("title")}
          </p>
          <p className="text-xs sm:text-sm text-primary-ceo-200">
            {t("description")}
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          <Link
            href={originalPath as "/perf" | "/portafolio" | "/info" | "/estudios" | "/code" | "/gradients"}
            className="inline-flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-primary-ceo-900 bg-secondary-ceo-400 hover:bg-secondary-ceo-500 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-ceo-500 focus:ring-offset-2 focus:ring-offset-primary-ceo-900"
            aria-label={t("link_text")}
          >
            <span className="hidden sm:inline">{t("link_text")}</span>
            <span className="sm:hidden">✨ Ver original</span>
          </Link>

          <button
            onClick={() => setIsVisible(false)}
            className="inline-flex items-center justify-center w-8 h-8 text-primary-ceo-300 hover:text-primary-ceo-100 hover:bg-primary-ceo-800/50 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-ceo-500 focus:ring-offset-2 focus:ring-offset-primary-ceo-900"
            aria-label={t("close")}
            data-testid="banner-close"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
