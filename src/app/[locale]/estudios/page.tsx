import CounterServices from "@/components/ceo/counter-services";
import TimeLine, { DataTimeLine } from "@/components/ceo/time-line";
import { getLocale, getTranslations } from "next-intl/server";
import { generateMetadata as generateSEOMetadata } from "@/lib/metadata";
import { Metadata } from "next";

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  
  const titles = {
    es: 'Estudios y Formación - Adan Reh Mañach | Desarrollador Barcelona',
    en: 'Studies and Training - Adan Reh Mañach | Developer Barcelona',
    ca: 'Estudis i Formació - Adan Reh Mañach | Desenvolupador Barcelona',
    de: 'Studien und Ausbildung - Adan Reh Mañach | Entwickler Barcelona',
  };

  const descriptions = {
    es: 'Formación y certificaciones en desarrollo web fullstack, blockchain, Python y Big Data. Experiencia en JavaScript, Node.js, React, Solidity y más. Barcelona, España.',
    en: 'Training and certifications in fullstack web development, blockchain, Python and Big Data. Experience in JavaScript, Node.js, React, Solidity and more. Barcelona, Spain.',
    ca: 'Formació i certificacions en desenvolupament web fullstack, blockchain, Python i Big Data. Experiència en JavaScript, Node.js, React, Solidity i més. Barcelona, Espanya.',
    de: 'Ausbildung und Zertifizierungen in Fullstack-Webentwicklung, Blockchain, Python und Big Data. Erfahrung in JavaScript, Node.js, React, Solidity und mehr. Barcelona, Spanien.',
  };

  return generateSEOMetadata({
    locale: locale as 'es' | 'en' | 'ca' | 'de',
    title: titles[locale as keyof typeof titles] || titles.es,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.es,
    path: '/estudios',
  });
}

const dataStudiesPage = [
    {
        id: 1,
        institution: "CIEF",
        date: "30/10/24",
        badges: [
            "JavaScript", "HTML", "CSS", "Node.js", "Express.js", "MySQL", "BDD", "OOP", "DOM"
        ],
        link: "https://www.grupcief.com/"
    },
    {
        id: 2,
        institution: "Chainlink",
        date: "20/01/24",
        badges: [
            "Chainlink", "Blockchain", "Solidity", "ERC721", "ERC20", "Blockchain Oracles", "CCIP", "Chainlink Functions"
        ],
        link: "https://coinmarketcap.com/currencies/chainlink/"
    },
    {
        id: 3,
        institution: "Coliseum",
        date: "19/12/23",
        badges: [
            "Python"
        ],
        link: "https://www.centrocoliseum.com/"
    },
];

const StudiesPage = async () => {
    const t = await getTranslations("ceo")
    const arrData: DataTimeLine[] = dataStudiesPage.map((data) => ({
        id: data.id.toString(),
        title: t(`estudios.list.${data.id}.title`),
        desc: t(`estudios.list.${data.id}.desc`),
        subtitle: data.institution,
        date: data.date,
        web: data.link,
        badges: data.badges
    }))

    return (
        <main className="max-h-dvh max-w-dvw">
    

            <div className="max-h-dvh pt-24 xl:pt-4 gap-4 flex flex-col ">
                <span className="mx-6 min-sm:pt-2 max-sm:bg-blend-luminosity max-sm:h-[25dvh]">
                    <h1 tabIndex={0} className="text-2xl leading-tight text-center md:text-left md:text-5xl md:mt-10">
                        <span className="font-bold text-primary-ceo-500/70 hover:text-primary-ceo/80">
                            {t("estudios.h1.0")}
                        </span>
                        <span className="text-secondary-ceo-200">
                        {' '}{t("estudios.h1.1")}</span>
                    </h1>

                    <CounterServices />
                </span>

                <div className="relative h-[75dvh] overflow-hidden">
                    {/* Degradado en la parte superior e inferior para efecto de desvanecimiento */}
                    <div className="xl:hidden pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-violet-400/20 to-transparent" />
                    <div className="xl:hidden pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent" />

                    {/* Contenedor de TimeLine con overflow y scroll suave */}
                    <div className="h-full mx-12 overflow-y-auto pt-8 max-sm:pb-32 scroll-smooth shadow-lg rounded-lg">
                        <TimeLine arrData={arrData} classNameMain="2xl:mx-auto" />
                    </div>
                </div>
            </div>
        </main>
    );
}

export default StudiesPage;
