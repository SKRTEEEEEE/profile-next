import { PerformanceBanner } from "@/components/perf/performance-banner";
import { gradients } from "@/lib/utils";

export const metadata = {
  title: "Gradient Previews - Performance Optimized",
  description: "Gradient preview gallery. Performance optimized version with 100% Lighthouse scores.",
};

export default function PerfGradientsPage() {
  return (
    <>
      <PerformanceBanner originalPath="/gradients" />
      <main className="min-h-screen w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12 bg-black">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="mb-8 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Gradient Previews
            </h1>
            <p className="text-primary-ceo-200">
              Explore our collection of gradient designs
            </p>
          </header>

          {/* Gradients Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gradients.map((gradient, index) => (
              <div
                key={index}
                className="relative h-48 rounded-xl shadow-lg border-2 border-gray-900 overflow-hidden group"
                style={{
                  backgroundImage: gradient,
                  backgroundSize: "cover",
                }}
              >
                {/* Gradient Info Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/70 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center p-4">
                    <p className="text-white text-xs font-mono break-all">
                      {gradient}
                    </p>
                  </div>
                </div>

                {/* Gradient Number Badge */}
                <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                  #{index + 1}
                </div>
              </div>
            ))}
          </div>

          {/* Info Section */}
          <section className="mt-12 bg-primary-ceo-900/50 border-2 border-primary-ceo-800 rounded-xl p-6">
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">
              About These Gradients
            </h2>
            <p className="text-primary-ceo-200 mb-2">
              This collection contains {gradients.length} unique gradient
              designs that can be used throughout the application.
            </p>
            <p className="text-primary-ceo-300 text-sm">
              Hover over each gradient to see its CSS definition.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
