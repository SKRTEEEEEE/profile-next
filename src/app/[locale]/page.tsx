// import { Link } from "@/libs/i18n/routing";
import { CTypeAnimation } from "@/components/oth/c/type-animation";
import { CoverParticles } from "@/components/oth/cover-particles";
import { creatorData } from "@/lib/data";
import { Link as LinkLocale } from "@/lib/i18n/routing";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function Home() {
  const t = await getTranslations("ceo");

  return (
    <main className="max-h-dvh w-full pb-8 pt-12 px-4 sm:px-6 lg:px-8">
      <CoverParticles />
      <div className="z-20 select-none w-full">
        <div className="flex justify-center w-full">
          <h1
            tabIndex={0}
            className="mt-6 lg:flex lg:items-center lg:gap-24 relative top-6 font-bold text-left"
          >
            {/* Texto de saludo + introducción */}
            <div className="flex gap-6">
              <span className="block text-[clamp(1rem,3vw,2rem)] text-primary-ceo-300">
                {t("main.introduction.greeting")},
              </span>
              <span className="block text-[clamp(1rem,3vw,2rem)] text-primary-ceo-400">
                {t("main.introduction.introduction")}
              </span>
            </div>

            <span className="block xl:mt-0 mt-2 text-[clamp(2.5rem,10vw,5rem)] leading-tight">
              Adan Reh Mañach
            </span>
            <span className="hidden xl:inline-block text-7xl hover:animate-caret-blink origin-bottom-left ">
              👋
            </span>
          </h1>
        </div>

        <div className="z-20 grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 items-start justify-around max-h-dvh p-6 py-10 xl:pt-24 md:my-auto">
          {/* Columna 1 */}
          <div className="flex flex-col items-center gap-1 font-semibold md:items-end md:gap-6 order-last md:order-none">
            <LinkLocale
              href="/"
              className=" w-52 flex items-center px-4 py-2 my-2 transition-all border-2 cursor-pointer text-md  bg-primary-ceo-800/80 hover:bg-primary-ceo-900/20 rounded-xl hover:shadow-md hover:shadow-white/50"
            >
              <div>💻</div>
              <div className="w-full text-center">
                {t("main.introduction.buttons.view_projects")}
              </div>
            </LinkLocale>
            <LinkLocale
              href="/"
              className=" w-52 flex items-center px-4 py-2 my-2 transition-all border-2 cursor-pointer text-md  bg-primary-ceo-800/70 hover:bg-primary-ceo-900/20 rounded-xl hover:shadow-md hover:shadow-white/50"
            >
              <div>⚙️</div>
              <div className="w-full text-center">
                {t("main.introduction.buttons.tech_stack")}
              </div>
            </LinkLocale>
            <LinkLocale
              href="/"
              className=" w-52 flex items-center px-4 py-2 my-2 transition-all border-2 cursor-pointer text-md  bg-primary-ceo-800/60 hover:bg-primary-ceo-900/20 rounded-xl hover:shadow-md hover:shadow-white/50"
            >
              <div>🧑‍🎓</div>
              <div className="w-full text-center">
                {t("main.introduction.buttons.studies")}
              </div>
            </LinkLocale>
            <LinkLocale
              href="/"
              className=" w-52 flex items-center px-4 py-2 my-2 transition-all border-2 cursor-pointer text-md  bg-primary-ceo-900/60 hover:bg-primary-ceo-900/20 rounded-xl hover:shadow-md hover:shadow-white/50"
            >
              <div>📋</div>
              <div className="w-full text-center">
                {t("main.introduction.buttons.cv")}
              </div>
            </LinkLocale>
            <Link
              href={creatorData.oldProfileWebUrl}
              target="_blank"
              className=" w-52 flex items-center justify-between px-4 py-2 my-5 transition-all border shadow-secondary-ceo-900 shadow-sm cursor-pointer text-md text-primary-ceo-200 border-secondary-ceo/10 rounded-xl hover:shadow-xl hover:shadow-secondary-ceo"
            >
              <div>🔸</div>
              <div className="w-full text-center">
                {t("main.introduction.buttons.old_frontend")}
              </div>
            </Link>
          </div>
          {/* Columna 2 + 3 */}
          <div className="flex flex-col justify-center max-w-xl col-span-2 order-first md:order-none">
            <h2 className="h-32 lg:h-44 text-2xl mt-2 leading-tight text-center md:text-left md:text-4xl md:mb-10">
              {t("main.introduction.developer_title")}, <br />
              <CTypeAnimation
                sequence={[
                  t("main.introduction.type_animation.1"),
                  2000,
                  t("main.introduction.type_animation.2"),
                  2000,
                  t("main.introduction.type_animation.3"),
                  2000,
                  t("main.introduction.type_animation.4"),
                  10000,
                ]}
              />
            </h2>

            <p
              tabIndex={0}
              className="mx-auto mb-2 text-md md:text-xl lg:text-3xl font-bold md:mx-0 md:mb-8"
            >
              {t("main.introduction.description")}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
